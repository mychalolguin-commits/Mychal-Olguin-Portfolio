const BASE = 'https://personal.connectapi.garmin.com';
let stage = 'idle';
let token, tokenUntil = 0, cached, cacheUntil = 0, pending;

async function garmin(path) {
  if (!token || Date.now() >= tokenUntil) {
    stage = 'authentication';
    const response = await fetch(`${BASE}/personalapitoken-service/personal-api/personal-api-key/token`, {
      method: 'POST', headers: { Authorization: `ApiKey ${process.env.GARMIN_PERSONAL_API_KEY.trim()}` }, signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Garmin authentication: ${response.status}`);
    const data = await response.json();
    token = data.access_token || data.accessToken;
    if (typeof token !== 'string') throw new Error('Garmin token missing');
    tokenUntil = Date.now() + 23 * 3600000;
  }
  stage = 'activities';
  const response = await fetch(`${BASE}${path}`, { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(10000) });
  if (!response.ok) {
    if (response.status === 401) tokenUntil = 0;
    throw new Error(`Garmin activities: ${response.status}`);
  }
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error('Invalid activity list');
  return data;
}
const number = value => typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null;
export function summarize(activity) {
  const distance = number(activity.distance), seconds = number(activity.duration);
  const type = activity.activityType?.typeKey || '';
  // Deliberately omit names, GPS coordinates, routes, health data and account IDs.
  return {
    type: type.includes('running') ? 'Run' : type.includes('cycling') ? 'Ride' : type.includes('walking') ? 'Walk' : type.includes('swimming') ? 'Swim' : 'Workout',
    date: /^\d{4}-\d{2}-\d{2}/.test(activity.startTimeLocal || '') ? activity.startTimeLocal.slice(0, 10) : null,
    miles: distance === null ? null : distance / 1609.344,
    seconds,
    pace: type.includes('running') && distance > 0 && seconds > 0 ? seconds / (distance / 1609.344) : null,
  };
}
async function load() {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const monday = new Date(`${today}T12:00:00Z`);
  monday.setUTCDate(monday.getUTCDate() - (monday.getUTCDay() + 6) % 7);
  const weekStart = monday.toISOString().slice(0, 10);
  const latest = await garmin('/activitylist-service/activities/search/activities?limit=1&sortOrder=desc');
  const week = await garmin(`/activitylist-service/activities/search/activities?limit=200&startDate=${weekStart}&endDate=${today}&activityType=running`);
  return { latest: latest[0] ? summarize(latest[0]) : null, week: { miles: week.reduce((sum, a) => sum + (number(a.distance) || 0), 0) / 1609.344, runs: week.length, start: weekStart }, updatedAt: new Date().toISOString(), source: 'Garmin' };
}
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.GARMIN_PERSONAL_API_KEY) return res.status(503).json({ error: 'Activity unavailable' });
  try {
    if (!cached || Date.now() >= cacheUntil) {
      pending ||= load().then(data => { cached = data; cacheUntil = Date.now() + 900000; }).finally(() => { pending = null; });
      await pending;
    }
    res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600');
    return res.status(200).json(cached);
  } catch (error) {
    console.error('Garmin connection failed', stage, error.name); // Status only; never log keys, tokens or Garmin response bodies.
    res.setHeader('Cache-Control', 'no-store');
    return res.status(502).json({ error: 'Activity unavailable', code: /^Garmin (authentication|activities): \d{3}$/.test(error.message) ? error.message : error.message === 'Garmin token missing' ? 'Token response format' : `Upstream ${stage}: ${error.name}` });
  }
}
