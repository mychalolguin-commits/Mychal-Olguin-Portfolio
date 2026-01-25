import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Reveal, StaggerContainer, StaggerItem } from '../components/Reveal';
import { EXPERIENCE } from '../constants';
import { Download, Linkedin, Mail, FileText } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const RESUME_PDF_PATH = '/Mychal_Olguin_Resume.pdf';
const LINKEDIN_URL = 'https://www.linkedin.com/in/mychalolguin/';
const EMAIL_ADDRESS = 'mychalolguin@gmail.com';

const EDUCATION = [
  {
    degree: 'Master of Science in Marketing',
    school: 'The University of Texas Rio Grande Valley',
    period: 'Expected Aug 2026'
  },
  {
    degree: 'Bachelor of Arts in Communication',
    school: 'The University of Texas San Antonio',
    period: ''
  }
];

const CERTIFICATIONS = [
  'Meta Certified Media Buying Professional',
  'Google Search/Shopping Certified',
  'HubSpot Social Media Certified',
  'Adobe Premiere Pro',
  'Adobe Photoshop'
];

const SKILLS = {
  'Strategy & Analytics': ['SEO/SEM/GEO', 'HTML', 'CPL/CPC', 'Meta Ads', 'UTM Tracking', 'Campaign Optimization'],
  'Creative Tools': ['Adobe Photoshop', 'Adobe Premiere Pro', 'Canva', 'Gemini', 'ChatGPT'],
  'Platforms': ['Meta Ads Manager', 'Google Ads Manager', 'Google Analytics (GA4)', 'Meta Business Suite', 'Tableau', 'Excel'],
  'Execution': ['Social Media Campaigns', 'Content Development', 'Paid Social', 'Paid Search', 'Website Management']
};

const Resume: React.FC = () => {
  useSEO({
    title: 'Resume',
    description: 'View the professional resume of Mychal Olguin - Growth Marketing Specialist with expertise in paid social, GA4 analytics, SEO, and conversion optimization.'
  });

  const [pdfExists, setPdfExists] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if PDF exists
    fetch(RESUME_PDF_PATH, { method: 'HEAD' })
      .then(res => setPdfExists(res.ok))
      .catch(() => setPdfExists(false));
  }, []);

  return (
    <PageTransition>
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-12">
          <Reveal>
            <div>
              <h1 className="text-4xl font-semibold text-[var(--color-text-primary)] mb-2">Resume</h1>
              <p className="text-[var(--color-text-tertiary)]">Experience & Capabilities</p>
            </div>
          </Reveal>

          {/* Action Buttons */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              <motion.a
                href={RESUME_PDF_PATH}
                download="Mychal_Olguin_Resume.pdf"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-mint-500 text-slate-900 text-sm font-medium hover:bg-mint-400 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={16} />
                <span>Download Resume (PDF)</span>
              </motion.a>
              <motion.a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-mint-400/50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Linkedin size={16} />
                <span>View on LinkedIn</span>
              </motion.a>
              <motion.a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-mint-400/50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail size={16} />
                <span>Email Me</span>
              </motion.a>
            </div>
          </Reveal>
        </div>

        {/* PDF Preview Section - 8.5x11 aspect ratio */}
        <Reveal delay={0.15}>
          <section className="mb-16">
            {pdfExists === null ? (
              // Loading state
              <div
                className="w-full bg-[var(--color-bg-elevated)]/30 rounded-2xl border border-[var(--color-border-subtle)] flex items-center justify-center"
                style={{ aspectRatio: '8.5 / 11' }}
              >
                <p className="text-[var(--color-text-muted)] text-sm">Loading preview...</p>
              </div>
            ) : pdfExists ? (
              // PDF exists - show embed with 8.5x11 aspect ratio
              <div
                className="w-full rounded-2xl border border-[var(--color-border-subtle)] overflow-hidden bg-white"
                style={{ aspectRatio: '8.5 / 11' }}
              >
                <object
                  data={`${RESUME_PDF_PATH}#view=FitH&toolbar=0`}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <iframe
                    src={`${RESUME_PDF_PATH}#view=FitH&toolbar=0`}
                    title="Resume PDF Preview"
                    className="w-full h-full"
                  />
                </object>
              </div>
            ) : (
              // PDF placeholder
              <div
                className="w-full bg-[var(--color-bg-elevated)]/30 rounded-2xl border border-dashed border-[var(--color-border-default)] p-12 flex flex-col items-center justify-center text-center"
                style={{ aspectRatio: '8.5 / 11' }}
              >
                <FileText size={48} className="text-[var(--color-text-muted)] mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-[var(--color-text-secondary)] mb-2">Resume PDF Preview</h3>
                <p className="text-sm text-[var(--color-text-muted)] max-w-md mb-4">
                  Drop your resume PDF at <code className="text-xs bg-[var(--color-bg-elevated)] px-2 py-1 rounded">/public/Mychal_Olguin_Resume.pdf</code> to enable inline preview.
                </p>
                <p className="text-xs text-[var(--color-text-muted)] opacity-60">
                  The download button will work once the file is added.
                </p>
              </div>
            )}
          </section>
        </Reveal>

        <div className="space-y-16">
          {/* Experience */}
          <Reveal>
            <section>
              <h2 className="text-sm font-medium text-[var(--color-accent)] uppercase tracking-wider mb-8">Professional Experience</h2>
              <div className="space-y-12 border-l border-[var(--color-border-default)] pl-8 ml-3">
                {EXPERIENCE.map((job, idx) => (
                  <motion.div
                    key={idx}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-[var(--color-bg-base)] border-2 border-mint-500" />
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{job.role}</h3>
                      <span className="text-sm text-[var(--color-text-muted)] font-mono">{job.period}</span>
                    </div>
                    <div className="text-base text-[var(--color-text-secondary)] mb-4">{job.company}</div>
                    <ul className="list-disc list-outside ml-4 space-y-2 text-[var(--color-text-tertiary)] leading-relaxed text-sm">
                      {job.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Education */}
          <Reveal>
            <section>
              <h2 className="text-sm font-medium text-[var(--color-accent)] uppercase tracking-wider mb-8">Education</h2>
              <StaggerContainer className="space-y-4">
                {EDUCATION.map((edu, idx) => (
                  <StaggerItem key={idx}>
                    <motion.div
                      className="bg-[var(--color-bg-elevated)]/30 p-6 rounded-2xl border border-[var(--color-border-subtle)]"
                      whileHover={{ y: -2, borderColor: 'rgba(74, 222, 128, 0.2)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                        <div>
                          <h3 className="text-[var(--color-text-primary)] font-medium text-lg">{edu.degree}</h3>
                          <p className="text-[var(--color-text-tertiary)]">{edu.school}</p>
                        </div>
                        {edu.period && (
                          <span className="text-[var(--color-text-muted)] text-sm font-mono">{edu.period}</span>
                        )}
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          </Reveal>

          {/* Certifications */}
          <Reveal>
            <section>
              <h2 className="text-sm font-medium text-[var(--color-accent)] uppercase tracking-wider mb-8">Certifications</h2>
              <div className="flex flex-wrap gap-3">
                {CERTIFICATIONS.map((cert, idx) => (
                  <motion.div
                    key={cert}
                    className="px-4 py-2 rounded-full bg-[var(--color-bg-elevated)]/50 border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] text-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05, borderColor: 'rgba(74, 222, 128, 0.3)' }}
                  >
                    {cert}
                  </motion.div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Skills */}
          <Reveal>
            <section>
              <h2 className="text-sm font-medium text-[var(--color-accent)] uppercase tracking-wider mb-8">Skills & Competencies</h2>
              <div className="space-y-6">
                {Object.entries(SKILLS).map(([category, skills], catIdx) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: catIdx * 0.1 }}
                  >
                    <h3 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, idx) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1.5 rounded-lg bg-[var(--color-bg-elevated)]/50 border border-[var(--color-border-subtle)] text-[var(--color-text-tertiary)] text-xs"
                          whileHover={{ scale: 1.05, borderColor: 'rgba(74, 222, 128, 0.3)' }}
                          transition={{ duration: 0.15 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </PageTransition>
  );
};

export default Resume;
