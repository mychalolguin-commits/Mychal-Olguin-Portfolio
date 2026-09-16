import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { CONTAINER, BTN_PRIMARY } from '../components/layout';
import { EditorialHeader } from '../components/EditorialPage';

const EMAIL_ADDRESS = 'mychalolguin@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/mychalolguin/';

const Contact: React.FC = () => {
  useSEO({ title: 'Contact', description: 'Get in touch with Mychal Olguin about digital marketing and growth roles. Based in Austin, Texas, open to remote roles.' });
  const [copyStatus, setCopyStatus] = useState('');
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopyStatus('Email copied.');
    } catch {
      setCopyStatus('Select the email address above to copy it.');
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(`Portfolio inquiry — ${name}`)}&body=${encodeURIComponent(`${message}\n\n—\n${name}\n${email}`)}`;
  };
  return <div className="editorial-page">
    <EditorialHeader label="Contact" title="Start with a conversation.">
      <p>I’m looking for my next digital marketing or growth role. Tell me about the work you have in mind.</p>
    </EditorialHeader>
    <section className="contact-content"><div className={`${CONTAINER} contact-layout`}>
      <div className="contact-direct"><p className="editorial-eyebrow">Say hello</p><h2><a href={`mailto:${EMAIL_ADDRESS}`}>{EMAIL_ADDRESS}</a></h2>
        <button className="editorial-link" type="button" onClick={copyEmail}>Copy email address</button><p className="editorial-note copy-status" role="status">{copyStatus}</p>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="editorial-link">Connect on LinkedIn <ArrowUpRight size={18} aria-hidden="true" /></a>
        <div className="contact-context"><p>Austin, Texas · Remote friendly</p><p>Open to paid social and growth roles.</p><p>Usually replies on weekdays.</p></div>
      </div>
      <form onSubmit={handleSubmit} className="contact-composer"><p className="editorial-eyebrow">Prefer a starting point?</p><h2>Draft a message.</h2>
        <div className="contact-fields"><div><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" required /></div><div><label htmlFor="contact-email">Your email</label><input id="contact-email" name="email" type="email" autoComplete="email" required /></div><div><label htmlFor="contact-message">What would you like to discuss?</label><textarea id="contact-message" name="message" rows={5} required /></div></div>
        <button type="submit" className={`${BTN_PRIMARY} editorial-button`}>Open in your mail app <ArrowUpRight size={18} aria-hidden="true" /></button>
        <p className="editorial-note">Opens a draft in your email app. You review and send it there.</p>
      </form>
    </div></section>
  </div>;
};
export default Contact;
