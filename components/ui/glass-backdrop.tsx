import { LiquidGlass } from './liquid-glass';

type GlassBackdropProps = {
  radius?: number;
  compact?: boolean;
  frost?: number;
};

export function GlassBackdrop({ radius = 24, compact = false, frost = 1.2 }: GlassBackdropProps) {
  return (
    <LiquidGlass
      as="span"
      aria-hidden="true"
      className="glass-backdrop absolute inset-0 block pointer-events-none"
      radius={radius}
      bevelDepth={compact ? 10 : 18}
      scale={compact ? 18 : 28}
      aberration={0}
      frost={frost}
      style={{ backgroundColor: 'var(--glass-fill)' }}
    />
  );
}
