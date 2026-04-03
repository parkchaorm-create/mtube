import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../themes/dan-koe-theme';

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
            fontSize: theme.fontSizes.title,
            fontWeight: theme.fontWeights.bold,
            color: theme.colors.text,
            marginBottom: 50,
            textAlign: 'center',
            opacity: interpolate(frame, [0, 20], [0, 1], {
              extrapolateRight: 'clamp',
            }),
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
          const delay = 10 + i * 6;
          const itemOpacity = interpolate(frame, [delay, delay + 18], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const slideUp = interpolate(frame, [delay, delay + 18], [20, 0], {
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                opacity: itemOpacity,
                transform: `translateY(${slideUp}px)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '24px 16px',
                border: `${theme.lineWidth}px solid ${theme.colors.muted}33`,
                borderRadius: 12,
              }}
            >
              {item.icon && (
                <div style={{ fontSize: 40, marginBottom: 12 }}>
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
