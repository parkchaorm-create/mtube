import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { theme } from '../themes/dan-koe-theme';
import { staggerDelay } from '../utils/animations';

export interface GridItem {
  icon?: string;
  title: string;
  description?: string;
}

export interface GridSlideProps {
  columns?: 2 | 3 | 4;
  items: GridItem[];
  heading?: string;
}

export const GridSlide: React.FC<GridSlideProps> = ({
  columns = 3,
  items,
  heading,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading: spring entrance
  const headingSpring = spring({
    frame,
    fps,
    config: theme.animation.springGentle,
  });
  const headingOpacity = headingSpring;
  const headingY = interpolate(headingSpring, [0, 1], [30, 0]);

  // Highlight cycle: each item gets highlighted in sequence
  const highlightCycleDuration = 20; // frames per item highlight
  const highlightStart = 40; // start highlighting after items appear

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.page,
      }}
    >
      {heading && (
        <h2
          style={{
            fontFamily: theme.fonts.title,
            fontSize: Math.max(28, theme.fontSizes.title),
            fontWeight: theme.fontWeights.bold,
            color: theme.colors.text,
            marginBottom: 50,
            textAlign: 'center',
            opacity: headingOpacity,
            transform: `translateY(${headingY}px)`,
          }}
        >
          {heading}
        </h2>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 30,
          maxWidth: 1600,
          width: '100%',
        }}
      >
        {items.map((item, i) => {
          const delay = 10 + staggerDelay(i, 8);

          // Item: spring scale from center (0.8→1) + opacity
          const itemSpring = spring({
            frame: frame - delay,
            fps,
            config: theme.animation.spring,
          });
          const itemScale = interpolate(itemSpring, [0, 1], [0.8, 1]);
          const itemOpacity = itemSpring;

          // Icon: spring pop with slight extra delay
          const iconDelay = delay + 6;
          const iconSpring = spring({
            frame: frame - iconDelay,
            fps,
            config: { damping: 8, stiffness: 250, mass: 0.5 },
          });
          const iconScale = interpolate(iconSpring, [0, 1], [0, 1]);

          // Sequential highlight border: muted → accent → muted
          const cyclePos = frame - highlightStart;
          const itemCycleStart = i * highlightCycleDuration;
          const highlightProgress = cyclePos >= itemCycleStart && cyclePos < itemCycleStart + highlightCycleDuration
            ? Math.sin(((cyclePos - itemCycleStart) / highlightCycleDuration) * Math.PI)
            : 0;

          const borderColor = highlightProgress > 0
            ? interpolateColor(
                highlightProgress,
                theme.colors.muted + '33',
                theme.colors.accent,
              )
            : theme.colors.muted + '33';

          const borderWidth = interpolate(highlightProgress, [0, 1], [theme.lineWidth, 2]);

          return (
            <div
              key={i}
              style={{
                opacity: itemOpacity,
                transform: `scale(${itemScale})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '24px 16px',
                border: `${borderWidth}px solid ${borderColor}`,
                borderRadius: 12,
                boxShadow: highlightProgress > 0.3
                  ? `0 0 ${20 * highlightProgress}px ${theme.animation.glowColor}`
                  : 'none',
                transition: 'box-shadow 0.1s',
              }}
            >
              {item.icon && (
                <div
                  style={{
                    fontSize: 40,
                    marginBottom: 12,
                    transform: `scale(${iconScale})`,
                  }}
                >
                  {item.icon}
                </div>
              )}
              <div
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: Math.max(28, theme.fontSizes.body),
                  fontWeight: theme.fontWeights.bold,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                {item.title}
              </div>
              {item.description && (
                <div
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: Math.max(28, 20),
                    fontWeight: theme.fontWeights.regular,
                    color: theme.colors.muted,
                    lineHeight: 1.5,
                  }}
                >
                  {item.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/**
 * Simple color interpolation between two CSS colors (hex/rgba string)
 * Returns accent color at t=1, muted at t=0
 */
function interpolateColor(t: number, mutedColor: string, accentColor: string): string {
  if (t <= 0) return mutedColor;
  if (t >= 1) return accentColor;

  const muted = parseColor(mutedColor);
  const accent = parseColor(accentColor);
  if (!muted || !accent) return t > 0.5 ? accentColor : mutedColor;

  const r = Math.round(muted.r + (accent.r - muted.r) * t);
  const g = Math.round(muted.g + (accent.g - muted.g) * t);
  const b = Math.round(muted.b + (accent.b - muted.b) * t);
  const a = muted.a + (accent.a - muted.a) * t;
  return `rgba(${r},${g},${b},${a.toFixed(2)})`;
}

function parseColor(c: string): { r: number; g: number; b: number; a: number } | null {
  // Handle hex (#RRGGBB or #RRGGBBAA)
  const hex = c.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i);
  if (hex) {
    return {
      r: parseInt(hex[1], 16),
      g: parseInt(hex[2], 16),
      b: parseInt(hex[3], 16),
      a: hex[4] ? parseInt(hex[4], 16) / 255 : 1,
    };
  }
  // Handle rgba(r,g,b,a)
  const rgba = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgba) {
    return {
      r: parseInt(rgba[1]),
      g: parseInt(rgba[2]),
      b: parseInt(rgba[3]),
      a: rgba[4] ? parseFloat(rgba[4]) : 1,
    };
  }
  return null;
}
