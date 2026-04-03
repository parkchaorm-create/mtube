import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../themes/dan-koe-theme';

export interface ConceptSlideProps {
  icon?: string;
  keyword: string;
  description: string;
  accentWord?: string;
}

export const ConceptSlide: React.FC<ConceptSlideProps> = ({
  icon,
  keyword,
  description,
  accentWord,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const slideUp = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: 'clamp',
  });
  const descOpacity = interpolate(frame, [15, 40], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const renderKeyword = () => {
    if (!accentWord) {
      return keyword;
    }
    const parts = keyword.split(accentWord);
    return (
      <>
        {parts[0]}
        <span style={{ color: theme.colors.accent }}>{accentWord}</span>
        {parts.slice(1).join(accentWord)}
      </>
    );
  };

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
      {icon && (
        <div
          style={{
            opacity,
            fontSize: 64,
            marginBottom: theme.spacing.gap,
          }}
        >
          {icon}
        </div>
      )}

      <h1
        style={{
          opacity,
          transform: `translateY(${slideUp}px)`,
          fontFamily: theme.fonts.title,
          fontSize: theme.fontSizes.hero,
          fontWeight: theme.fontWeights.extraBold,
          color: theme.colors.text,
          textAlign: 'center',
          margin: 0,
          marginBottom: theme.spacing.gap / 2,
        }}
      >
        {renderKeyword()}
      </h1>

      <p
        style={{
          opacity: descOpacity,
          fontFamily: theme.fonts.body,
          fontSize: theme.fontSizes.subtitle,
          fontWeight: theme.fontWeights.regular,
          color: theme.colors.muted,
          textAlign: 'center',
          margin: 0,
          maxWidth: 900,
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </AbsoluteFill>
  );
};
