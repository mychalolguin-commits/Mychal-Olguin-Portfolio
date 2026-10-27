import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

type Activity = { type: string; date: string | null; miles: number | null; seconds: number | null; pace: number | null };
type Summary = { latest: Activity | null; week: { miles: number; runs: number; start: string }; updatedAt: string };
const clock = (seconds: number) => { const rounded = Math.round(seconds); return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, '0')}`; };

export default function ActivityCard() {
  const [data, setData] = useState<Summary | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  async function load() {
    if (status === 'loading' || status === 'ready') return;
    setStatus('loading');
    try {
      const response = await fetch('/api/activity');
      if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Unavailable');
      const result = await response.json();
      if (!result.week || !result.updatedAt) throw new Error('Invalid response');
      setData(result); setStatus('ready');
    } catch { setStatus('error'); }
  }
  const latest = data?.latest;
  return <details className="home-activity" onToggle={event => { if (event.currentTarget.open) void load(); }}>
    <summary><span className="home-activity-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="16.5" cy="4" r="1.5" /><path d="m10 21 2-5-3-3 2-5 3 2 3 1m-6-3-3 1-2 3m8-2-1 4 3 2 1 4" /></svg></span><span>Activity <svg className="home-activity-pulse" aria-hidden="true" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M1 10h4l3-7 4 10 3-6 2 3h6" /></svg><small>Off the clock</small></span><span className="home-activity-toggle" aria-hidden="true">+</span></summary>
    <div className="home-activity-panel activity-card">
      <div aria-live="polite">
        {status === 'loading' && <p className="activity-message">Checking in with Garmin…</p>}
        {status === 'error' && <div className="activity-message"><p>Taking a breather.</p><p>Workout updates are unavailable right now.</p><button onClick={() => void load()}>Try again</button></div>}
        {status === 'ready' && <>
          <div className="activity-card-heading"><span>{latest ? `Latest ${latest.type.toLowerCase()}` : 'No workouts yet'}</span>{latest?.date && <time dateTime={latest.date}>{new Date(`${latest.date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time>}</div>
          {latest && <><p className="activity-distance">{latest.miles !== null ? latest.miles.toFixed(1) : '—'} <span>mi</span></p><dl className="activity-stats"><div><dt>Time</dt><dd>{latest.seconds !== null ? clock(latest.seconds) : '—'}</dd></div>{latest.pace !== null && <div><dt>Pace / mi</dt><dd>{clock(latest.pace)}</dd></div>}</dl></>}
          <div className="activity-week"><span>This week · running</span><strong>{data.week.miles.toFixed(1)} mi <span>· {data.week.runs} {data.week.runs === 1 ? 'run' : 'runs'}</span></strong></div>
          <p className="activity-source">Garmin · Updated {new Date(data.updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
        </>}
      </div>
      <a href="https://strava.app.link/YIw5h4HuA7b" target="_blank" rel="noopener noreferrer">Find me on Strava <ArrowUpRight size={15} aria-hidden="true" /></a>
    </div>
  </details>;
}
