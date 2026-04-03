import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../themes/dan-koe-theme';

export interface RecapSlideProps {
  title?: string;
  items: string[];
}

export const RecapSlide: React.FC<RecapSlideProps> = ({
  title = '핵심 정리',
  items,
}) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: theme.spacing.page,
      }}
    >
      <h2
        style={{
          opacity: titleOpacity,
          fontFamily: theme.fonts.title,
          fontSize: theme.fontSizes.title,
          fontWeight: theme.fontWeights.bold,
          color: theme.colors.text,
          marginBottom: 60,
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.gap,
          maxWidth: 1000,
          width: '100%',
        }}
      >
        {items.map((item, index) => {
          const delay = index * 10;
          const itemOpacity = interpolate(
            frame,
            [15 + delay, 35 + delay],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          const slideUp = interpolate(
            frame,
            [15 + delay, 35 + delay],
            [20, 0],
            { extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={index}
              style={{
                opacity: itemOpacity,
                transform: `translateY(${slideUp}px)`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 24,
              }}
            >
              <span
                style={{
                  fontFamily: theme.fonts.title,
                  fontSize: theme.fontSizes.subtitle,
                  fontWeight: theme.fontWeights.extraBold,
                  color: theme.colors.accent,
                  minWidth: 40,
                }}
              >
                {index + 1}
              </span>
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: theme.fontSizes.body,
                  fontWeight: theme.fontWeights.medium,
                  color: theme.colors.text,
                  margin: 0,
                  lineHeight: 1.8,
                }}
              >
                {item}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
