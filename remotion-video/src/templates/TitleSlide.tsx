import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../themes/dan-koe-theme';

export interface TitleSlideProps {
  partNumber: string;
  title: string;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({ partNumber, title }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const slideUp = interpolate(frame, [0, 30], [40, 0], {
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
      <div
        style={{
          opacity,
          transform: `translateY(${slideUp}px)`,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: theme.fonts.body,
            fontSize: theme.fontSizes.body,
            fontWeight: theme.fontWeights.medium,
            color: theme.colors.muted,
            marginBottom: theme.spacing.gap,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          {partNumber}
        </p>
        <h1
          style={{
            fontFamily: theme.fonts.title,
            fontSize: theme.fontSizes.hero,
            fontWeight: theme.fontWeights.extraBold,
            color: theme.colors.text,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  );
};
