import React, { useEffect, useMemo, useRef, useState } from 'react';
import { catalog } from './catalog';
import {
  ShelfEngine,
  type ShelfMode,
  type ShelfEnvironment,
} from './ShelfEngine';
import { shelfConfig } from './site-config';
import { useTheme } from '../../hooks/useTheme';
import './shelf.css';

/**
 * Room colors per theme. Book colors come from the catalog and stay constant —
 * only the wall, floor, and ambient light follow light/dark mode.
 */
const SHELF_ENVIRONMENTS: Record<'dark' | 'light', ShelfEnvironment> = {
  dark: {
    background: '#0C100E',
    wall: '#0C100E',
    ground: '#141210',
    hemisphereSky: '#93A79B',
    hemisphereGround: '#2A211A',
  },
  light: {
    background: '#EDEAE4',
    wall: '#EDEAE4',
    ground: '#E4DFD6',
    hemisphereSky: '#FFF8EA',
    hemisphereGround: '#6E5848',
  },
};

const Arrow: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {direction === 'left' ? (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ) : (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    )}
  </svg>
);

/**
 * Shown when WebGL is unavailable or the engine fails to start. The
 * certifications still need to be readable — the 3D shelf is presentation,
 * not the content itself.
 */
const ShelfFallback: React.FC = () => (
  <ul className="grid gap-3 sm:grid-cols-2">
    {catalog.map((cert) => (
      <li
        key={cert.id}
        className="rounded-xl border border-[var(--card-border)] bg-[var(--color-bg-elevated)] p-4"
      >
        <p className="text-[var(--color-text-primary)] text-sm font-medium">
          {cert.title}
        </p>
        <p className="text-[var(--color-text-tertiary)] text-xs mt-1">
          {cert.author} · {cert.format}
        </p>
      </li>
    ))}
  </ul>
);

const CertificationShelf: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ShelfEngine | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<ShelfMode>('browse');
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { theme } = useTheme();

  const activeCert = catalog[activeIndex];
  const selectedCert = useMemo(
    () => (selectedIndex === null ? null : catalog[selectedIndex]),
    [selectedIndex],
  );
  const isFocused = mode !== 'browse';

  useEffect(() => {
    let cancelled = false;
    let engine: ShelfEngine | null = null;

    async function start() {
      if (!canvasRef.current) return;
      // Covers are drawn to canvas textures using Inter and Newsreader, so the
      // fonts must be loaded before the first cover is generated.
      await document.fonts.ready;
      if (cancelled || !canvasRef.current) return;

      try {
        engine = new ShelfEngine(
          canvasRef.current,
          catalog,
          {
            onActiveIndex: setActiveIndex,
            onMode: (nextMode, index) => {
              setMode(nextMode);
              setSelectedIndex(index);
            },
            onStatus: () => {},
            onReady: () => setReady(true),
          },
          SHELF_ENVIRONMENTS[theme === 'light' ? 'light' : 'dark'],
        );
        engineRef.current = engine;
      } catch (error) {
        console.error('[cert-shelf] engine failed to start', error);
        if (!cancelled) setFailed(true);
      }
    }

    void start();
    return () => {
      cancelled = true;
      engine?.dispose();
      engineRef.current = null;
    };
    // Theme is intentionally omitted: recoloring is handled below without a
    // costly teardown and rebuild of the whole scene.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    engineRef.current?.setEnvironment(
      SHELF_ENVIRONMENTS[theme === 'light' ? 'light' : 'dark'],
    );
  }, [theme]);

  if (failed) return <ShelfFallback />;

  return (
    <div
      className={`cert-shelf ${ready ? 'is-ready' : ''} ${
        isFocused ? 'is-focused' : ''
      }`}
    >
      <canvas
        ref={canvasRef}
        className="cert-shelf__canvas"
        role="application"
        tabIndex={0}
        aria-label={`Interactive 3D shelf of ${catalog.length} certifications. Drag or use the arrow keys to browse. Press Enter to inspect the selected credential.`}
      />

      <div className="cert-shelf__scrim" aria-hidden="true" />

      <div className="cert-shelf__caption">
        <p className="cert-shelf__eyebrow">
          <span>{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="cert-shelf__eyebrow-line" />
          <span>{String(catalog.length).padStart(2, '0')}</span>
        </p>
        <h3>{activeCert.shortTitle}</h3>
        <p className="cert-shelf__issuer">{activeCert.author}</p>
        <button
          type="button"
          className="cert-shelf__inspect"
          disabled={isFocused}
          onClick={() => engineRef.current?.focusBook(activeIndex)}
          aria-label={`Inspect ${activeCert.title}`}
        >
          <span>Inspect credential</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      <button
        type="button"
        className="cert-shelf__arrow cert-shelf__arrow--left"
        aria-label="Previous certification"
        disabled={isFocused || activeIndex === 0}
        onClick={() => engineRef.current?.browseBy(-1)}
      >
        <Arrow direction="left" />
      </button>
      <button
        type="button"
        className="cert-shelf__arrow cert-shelf__arrow--right"
        aria-label="Next certification"
        disabled={isFocused || activeIndex === catalog.length - 1}
        onClick={() => engineRef.current?.browseBy(1)}
      >
        <Arrow direction="right" />
      </button>

      <nav className="cert-shelf__index" aria-label="Shelf position">
        <div className="cert-shelf__ticks">
          {catalog.map((cert, index) => (
            <button
              key={cert.id}
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              aria-label={`Browse to ${cert.title}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              disabled={isFocused}
              onClick={() => engineRef.current?.browseTo(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="cert-shelf__hint" aria-hidden="true">
          <span>DRAG</span>
          <i />
          <span>ARROW KEYS</span>
        </div>
      </nav>

      <aside
        className="cert-shelf__details"
        aria-hidden={!isFocused}
        aria-label={
          selectedCert
            ? `Details for ${selectedCert.title}`
            : 'Certification details'
        }
      >
        {selectedCert ? (
          <div>
            <button
              type="button"
              className="cert-shelf__back"
              onClick={() => engineRef.current?.returnToShelf()}
            >
              <Arrow direction="left" />
              <span>Return to shelf</span>
            </button>

            <p className="cert-shelf__details-eyebrow">
              {shelfConfig.editionEyebrow}
            </p>
            <h3>{selectedCert.title}</h3>
            <p className="cert-shelf__details-issuer">{selectedCert.author}</p>
            <p className="cert-shelf__details-description">
              {selectedCert.description}
            </p>

            <blockquote>
              <p>{selectedCert.quote}</p>
              <cite>{selectedCert.quoteBy}</cite>
            </blockquote>

            <dl className="cert-shelf__meta">
              <div>
                <dt>Issued</dt>
                <dd>{selectedCert.format}</dd>
              </div>
              <div>
                <dt>Credential</dt>
                <dd>{selectedCert.availability}</dd>
              </div>
            </dl>

            <a
              className="cert-shelf__link"
              href={selectedCert.url}
              target="_blank"
              rel="noreferrer"
            >
              <span>{selectedCert.linkLabel ?? shelfConfig.bookLinkLabel}</span>
              <span aria-hidden="true">↗</span>
            </a>

            <div className="cert-shelf__focus-controls">
              <span>Drag to orbit</span>
              <span>Scroll to zoom</span>
              <button
                type="button"
                onClick={() => engineRef.current?.resetFocusView()}
              >
                Reset view
              </button>
            </div>
          </div>
        ) : null}
      </aside>

      <div className="cert-shelf__loading" aria-hidden={ready}>
        <div className="cert-shelf__loading-mark">
          <span />
          <span />
          <span />
        </div>
        <p>ASSEMBLING {catalog.length} CREDENTIALS</p>
      </div>

      <div className="cert-shelf__sr" aria-live="polite">
        {isFocused && selectedCert
          ? `Inspecting ${selectedCert.title}, issued by ${selectedCert.author}.`
          : `Selected ${activeCert.title}, issued by ${activeCert.author}.`}
      </div>
    </div>
  );
};

export default CertificationShelf;
