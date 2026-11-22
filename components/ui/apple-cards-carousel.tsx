import { Children, useEffect, useId, useRef, useState } from 'react';
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CONTAINER } from '../layout';

export function Carousel({ items }: { items: ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  const trackId = useId();
  const itemCount = Children.count(items);
  const inView = useInView(track, { once: true, amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const [edges, setEdges] = useState({ start: true, end: true });

  function updateEdges() {
    const list = track.current;
    if (!list) return;

    const start = list.scrollLeft <= 1;
    const end = list.scrollLeft >= list.scrollWidth - list.clientWidth - 1;
    setEdges(previous => previous.start === start && previous.end === end ? previous : { start, end });
  }

  useEffect(() => {
    const list = track.current;
    if (!list) return;

    updateEdges();
    const observer = new ResizeObserver(updateEdges);
    observer.observe(list);
    return () => observer.disconnect();
  }, [itemCount]);

  function move(direction: -1 | 1) {
    const list = track.current;
    if (!list) return;

    const cards = Array.from(list.children) as HTMLLIElement[];
    if (!cards.length) return;

    const maxScroll = list.scrollWidth - list.clientWidth;
    const startOffset = cards[0].offsetLeft;
    const stops = cards.map(card => Math.min(card.offsetLeft - startOffset, maxScroll));
    const nextStop = direction === 1
      ? stops.find(stop => stop > list.scrollLeft + 1)
      : stops.reverse().find(stop => stop < list.scrollLeft - 1);

    if (nextStop !== undefined) {
      list.scrollTo({ left: nextStop, behavior: reducedMotion ? 'instant' : 'smooth' });
    }
  }

  return (
    <>
      <ul id={trackId} ref={track} onScroll={updateEdges} className="project-carousel" aria-label="Featured projects" role="list">
        {Children.map(items, (item, index) => (
          <motion.li
            className="w-56 shrink-0 snap-start md:w-96"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={inView || reducedMotion ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : index * 0.2, ease: 'easeOut' }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
      <div className={`${CONTAINER} flex gap-2 pt-4`}>
        <button type="button" className="project-carousel-arrow" aria-label="Previous project" aria-controls={trackId} aria-disabled={edges.start} onClick={() => move(-1)}>
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <button type="button" className="project-carousel-arrow" aria-label="Next project" aria-controls={trackId} aria-disabled={edges.end} onClick={() => move(1)}>
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </>
  );
}

type CardProps = {
  category: string;
  title: string;
  artwork: ReactNode;
  children: ReactNode;
};

export function Card({ category, title, artwork, children }: CardProps) {
  const preview = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  function openPreview(event: MouseEvent<HTMLButtonElement>) {
    event.currentTarget.focus({ preventScroll: true });
    preview.current?.showModal();
  }

  return (
    <article className="project-carousel-card relative flex h-80 flex-col overflow-hidden rounded-3xl md:h-[30rem]">
      <div className="min-h-[9rem] shrink-0 p-5 md:min-h-[10rem] md:p-7">
        <p className="editorial-eyebrow">{category}</p>
        <h3 className="mt-2">{title}</h3>
      </div>
      <div className="project-carousel-artwork min-h-0 flex-1 overflow-hidden">{artwork}</div>
      <button
        type="button"
        aria-label={`Preview ${title}`}
        aria-haspopup="dialog"
        onClick={openPreview}
        className="project-carousel-trigger absolute inset-0 rounded-3xl"
      >
        <span className="project-carousel-plus absolute bottom-3 right-3 grid size-10 place-items-center rounded-full md:bottom-4 md:right-4">
          <Plus size={20} aria-hidden="true" />
        </span>
      </button>
      <dialog
        ref={preview}
        className="project-preview"
        aria-labelledby={titleId}
        onClick={event => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="project-preview-panel mx-auto max-w-3xl rounded-3xl p-5 md:p-10">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="editorial-eyebrow">{category}</p>
              <h2 id={titleId} className="mt-2">{title}</h2>
            </div>
            <button type="button" className="project-preview-close grid size-11 shrink-0 place-items-center rounded-full" aria-label="Close preview" onClick={() => preview.current?.close()}>
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          {children}
          <div className="project-preview-artwork mt-6 overflow-hidden rounded-2xl">{artwork}</div>
        </div>
      </dialog>
    </article>
  );
}

type BlurImageProps = Pick<ComponentPropsWithoutRef<'img'>, 'src' | 'alt'>;

export function BlurImage({ src, alt }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`block w-full transition-[filter] duration-300 ${loaded ? 'blur-0' : 'blur-sm'}`}
    />
  );
}
