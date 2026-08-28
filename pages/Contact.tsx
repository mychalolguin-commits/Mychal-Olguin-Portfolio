import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { useSEO } from '../hooks/useSEO';
import { CONTAINER, BTN_PRIMARY, LINK_UNDERLINE } from '../components/layout';

const EMAIL_ADDRESS = 'mychalolguin@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/mychalolguin/';

/**
 * Reach rails. Same label/figure grammar as the homepage performance summary:
 * a key on the left, the value on the right, one hairline rule between each.
 */
const CHANNELS: { label: string; value: string; href?: string; external?: boolean }[] = [
  { label: 'Email', value: EMAIL_ADDRESS, href: `mailto:${EMAIL_ADDRESS}` },
  { label: 'LinkedIn', value: '/in/mychalolguin', href: LINKEDIN_URL, external: true },
  { label: 'Based in', value: 'Texas — remote friendly' },
  { label: 'Status', value: 'Open to paid social + growth roles' },
  { label: 'Reply time', value: 'Same day, weekdays' },
];

const FIELD =
  'w-full bg-[var(--color-bg-base)] border border-[var(--rule)] rounded-[3px] px-3.5 py-2.5 text-[15px] text-[var(--ink)] placeholder:text-[var(--graphite)] transition-colors duration-150 focus:outline-none focus:border-[var(--ink)]';

const Contact: React.FC = () => {
  useSEO({
    title: 'Contact',
    description:
      'Get in touch with Mychal Olguin about digital marketing work — web design, search, paid media, and analytics. Based in Texas, open to remote roles.',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * This composes a real message in the sender's own mail client. The previous
   * version faked a network request with setTimeout and then showed "Message
   * Sent" — nothing was ever delivered, so anyone who used it silently vanished.
   * A mailto hand-off needs no backend and cannot drop a message on the floor.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio inquiry${name.trim() ? ` — ${name.trim()}` : ''}`;
    const body = `${message.trim()}\n\n—\n${name.trim()}\n${email.trim()}`;
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <section className="pt-36 md:pt-52 pb-28 md:pb-40">
        <div className={CONTAINER}>
          <Reveal>
            <h1 className="label">Contact</h1>
            <h2 className="display text-[2.25rem] sm:text-5xl lg:text-6xl text-[var(--ink)] mt-5 max-w-[16ch]">
              Tell me what you need built and measured.
            </h2>
            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-[var(--color-text-tertiary)]">
              I'm looking for my next digital marketing or growth role. Ask me anything about the
              sites, the campaigns, the tracking setup, or the reporting behind them.
            </p>
          </Reveal>

          <div className="mt-14 md:mt-20 grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
            {/* ── Reach rails ──────────────────────────────────────── */}
            <Reveal>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="label">Direct</h3>
                <button
                  onClick={copyEmail}
                  className={`label ${LINK_UNDERLINE} inline-flex items-center gap-1.5`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-1.5"
                      >
                        <Check size={12} /> Copied
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-1.5"
                      >
                        <Copy size={12} /> Copy email
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              <dl className="mt-4">
                {CHANNELS.map((channel) => (
                  <div
                    key={channel.label}
                    className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-t border-[var(--rule)] py-3.5 transition-colors duration-150 hover:bg-[var(--surfaceHover)]"
                  >
                    <dt className="label">{channel.label}</dt>
                    <dd className="text-[15px] text-[var(--color-text-secondary)] break-words">
                      {channel.href ? (
                        <a
                          href={channel.href}
                          {...(channel.external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className={LINK_UNDERLINE}
                        >
                          {channel.value}
                        </a>
                      ) : (
                        channel.value
                      )}
                    </dd>
                  </div>
                ))}
                <div className="border-t border-[var(--rule)]" />
              </dl>
            </Reveal>

            {/* ── Composer ─────────────────────────────────────────── */}
            <Reveal delay={0.1}>
              <form onSubmit={handleSubmit} className="border border-[var(--rule)] p-6 sm:p-8">
                <h3 className="label">Draft a message</h3>

                <div className="mt-6 space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[13px] font-medium text-[var(--color-text-secondary)] mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className={FIELD}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[13px] font-medium text-[var(--color-text-secondary)] mb-2"
                    >
                      Your email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className={FIELD}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[13px] font-medium text-[var(--color-text-secondary)] mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi Mychal, I'd like to discuss a role..."
                      className={`${FIELD} resize-y`}
                    />
                  </div>
                </div>

                <button type="submit" className={`${BTN_PRIMARY} mt-7 w-full justify-center`}>
                  Open in your mail app
                </button>

                {/* The button names exactly what it does. No fake success state. */}
                <p className="mt-3 text-[13px] leading-relaxed text-[var(--graphite)]">
                  This opens a pre-filled draft in your own mail client so you keep a copy of what
                  you sent. Prefer to write it yourself? {EMAIL_ADDRESS}
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
