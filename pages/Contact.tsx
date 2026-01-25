import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { Mail, MapPin, Linkedin, Copy, Check } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const EMAIL_ADDRESS = 'mychalolguin@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/mychalolguin/';

const Contact: React.FC = () => {
  useSEO({
    title: 'Contact',
    description: 'Get in touch with Mychal Olguin for growth marketing, paid social, and analytics opportunities. Based in Texas, open to remote roles.'
  });
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-6 wash-cta min-h-screen">
        <div className="grid md:grid-cols-2 gap-16">

          <div>
            <Reveal>
              <div className="mb-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[var(--color-border-default)] shadow-lg">
                    <img
                      src="/images/mychal-headshot.png"
                      alt="Mychal Olguin headshot"
                      className="w-full h-full object-cover scale-[1.3] object-[center_20%]"
                    />
                  </div>
                  {/* Subtle glow ring */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-mint-500/20 to-mint-400/10 blur-sm -z-10" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-4xl font-semibold text-[var(--color-text-primary)] mb-6">Let's Connect</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[var(--color-text-tertiary)] text-lg leading-relaxed mb-12">
                Currently exploring full-time roles in growth marketing. Whether you have a question about my experience or want to see if I'm a good fit for your team, I'd love to hear from you.
              </p>
            </Reveal>

            {/* Open to roles badge */}
            <Reveal delay={0.15}>
              <motion.div
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-mint-500/10 border border-mint-500/20 text-sm text-[var(--color-accent)] mb-8"
                whileHover={{ scale: 1.02 }}
              >
                Open to Paid Social / Growth Marketing roles.
              </motion.div>
            </Reveal>

            <div className="space-y-6">
              {/* Email with copy button */}
              <Reveal delay={0.2}>
                <motion.div
                  className="flex items-center gap-4 text-[var(--color-text-secondary)]"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--card-border)]">
                    <Mail size={18} className="text-[var(--color-accent)]" />
                  </div>
                  <a href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-[var(--color-text-primary)] transition-colors">{EMAIL_ADDRESS}</a>
                  <motion.button
                    onClick={copyEmail}
                    className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--card-border)] text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-mint-400/50 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="copied"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-1.5"
                        >
                          <Check size={12} className="text-mint-500" />
                          <span className="text-mint-500">Copied</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-1.5"
                        >
                          <Copy size={12} />
                          <span>Copy</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </Reveal>

              {/* LinkedIn */}
              <Reveal delay={0.25}>
                <motion.div
                  className="flex items-center gap-4 text-[var(--color-text-secondary)]"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--card-border)]">
                    <Linkedin size={18} className="text-[var(--color-accent)]" />
                  </div>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    View LinkedIn Profile
                  </a>
                </motion.div>
              </Reveal>

              {/* Location */}
              <Reveal delay={0.3}>
                <motion.div
                  className="flex items-center gap-4 text-[var(--color-text-secondary)]"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--card-border)]">
                    <MapPin size={18} className="text-[var(--color-accent)]" />
                  </div>
                  <span>Texas (Remote Friendly)</span>
                </motion.div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.2}>
            <motion.div
              className="bg-[var(--color-bg-elevated)] p-8 rounded-3xl border border-[var(--card-border)] shadow-[var(--shadow-card)] hover:border-[var(--card-border-hover)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-mint-500/10 flex items-center justify-center mb-4 text-[var(--color-accent)]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    >
                      <Mail size={32} />
                    </motion.div>
                    <h3 className="text-xl font-medium text-[var(--color-text-primary)] mb-2">Message Sent</h3>
                    <p className="text-[var(--color-text-tertiary)]">Thanks for reaching out. I'll be in touch shortly.</p>
                    <motion.button
                      onClick={() => setFormState('idle')}
                      className="mt-6 text-sm text-[var(--color-accent)] hover:text-mint-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text-tertiary)] mb-2">Name</label>
                      <motion.input
                        type="text"
                        id="name"
                        required
                        className="w-full bg-[var(--color-bg-base)] border border-[var(--card-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-mint-500 focus:ring-1 focus:ring-mint-500 transition-all"
                        placeholder="Jane Doe"
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-tertiary)] mb-2">Email</label>
                      <motion.input
                        type="email"
                        id="email"
                        required
                        className="w-full bg-[var(--color-bg-base)] border border-[var(--card-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-mint-500 focus:ring-1 focus:ring-mint-500 transition-all"
                        placeholder="jane@company.com"
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text-tertiary)] mb-2">Message</label>
                      <motion.textarea
                        id="message"
                        required
                        rows={4}
                        className="w-full bg-[var(--color-bg-base)] border border-[var(--card-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-mint-500 focus:ring-1 focus:ring-mint-500 transition-all"
                        placeholder="Hi Mychal, I'd like to discuss a role..."
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full bg-[var(--color-text-primary)] text-[var(--color-bg-base)] font-medium py-3 rounded-lg hover:bg-mint-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: formState === 'submitting' ? 1 : 1.02 }}
                      whileTap={{ scale: formState === 'submitting' ? 1 : 0.98 }}
                    >
                      {formState === 'submitting' ? (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Sending...
                        </motion.span>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </Reveal>

        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
