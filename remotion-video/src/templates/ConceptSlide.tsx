import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { theme } from '../themes/dan-koe-theme';

export interface ConceptSlideProps {
  icon?: string;
  keyword: string;
  description: string;
  accentWord?: string;
  analogy?: string;
}

export const ConceptSlide: React.FC<ConceptSlideProps> = ({
  icon,
  keyword,
  description,
  accentWord,
  analogy,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 아이콘: spring scale 바운스
  const iconSpring = spring({ frame, fps, config: { damping: 10, stiffness: 200, mass: 0.5 } });
  const iconScale = interpolate(iconSpring, [0, 1], [0, 1]);

  // 키워드: spring 등장 (딜레이 10프레임)
  const kwSpring = spring({ frame: frame - 10, fps, config: theme.animation.spring });
  const kwOpacity = kwSpring;
  const kwY = interpolate(kwSpring, [0, 1], [30, 0]);

  // 강조 단어 펄스 (키워드 등장 완료 후)
  const pulseFrame = 35;
  const isPulse = accentWord && frame > pulseFrame && frame < pulseFrame + 20;
  const pulseScale = isPulse
    ? 1 + 0.08 * Math.sin(((frame - pulseFrame) / 20) * Math.PI)
    : 1;
  const pulseGlow = isPulse
    ? Math.sin(((frame - pulseFrame) / 20) * Math.PI) * 0.6
    : 0;

  // 설명: spring 등장 (딜레이 25프레임)
  const descSpring = spring({ frame: frame - 25, fps, config: theme.animation.springGentle });

  // 비유: spring 등장 (딜레이 40프레임)
  const analogySpring = analogy
    ? spring({ frame: frame - 40, fps, config: theme.animation.springGentle })
    : 0;

  const renderKeyword = () => {
    if (!accentWord) {
      return keyword;
    }
    const parts = keyword.split(accentWord);
    return (
      <>
        {parts[0]}
        <span
          style={{
            color: theme.colors.accent,
            display: 'inline-block',
            transform: `scale(${pulseScale})`,
            textShadow: pulseGlow > 0
              ? `0 0 ${30 * pulseGlow}px ${theme.animation.glowColor}`
              : 'none',
          }}
        >
          {accentWord}
        </span>
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
            transform: `scale(${iconScale})`,
            fontSize: 72,
            marginBottom: theme.spacing.gap,
          }}
        >
          {icon}
        </div>
      )}

      <h1
        style={{
          opacity: kwOpacity,
          transform: `translateY(${kwY}px)`,
          fontFamily: theme.fonts.title,
          fontSize: Math.max(28, theme.fontSizes.hero),
          fontWeight: theme.fontWeights.extraBold,
          color: theme.colors.text,
          textAlign: 'center',
          margin: 0,
          marginBottom: theme.spacing.gap / 2,
          letterSpacing: '-0.02em',
        }}
      >
        {renderKeyword()}
      </h1>

      <p
        style={{
          opacity: descSpring,
          transform: `translateY(${interpolate(descSpring, [0, 1], [20, 0])}px)`,
          fontFamily: theme.fonts.body,
          fontSize: Math.max(28, theme.fontSizes.subtitle),
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

      {analogy && (
        <p
          style={{
            opacity: analogySpring as number,
            transform: `translateY(${interpolate(analogySpring as number, [0, 1], [15, 0])}px)`,
            fontFamily: theme.fonts.body,
            fontSize: Math.max(28, theme.fontSizes.body),
            fontWeight: theme.fontWeights.medium,
            color: theme.colors.accent,
            textAlign: 'center',
            margin: 0,
            marginTop: theme.spacing.gap / 2,
            maxWidth: 900,
            textShadow: `0 0 20px ${theme.animation.glowColor}`,
          }}
        >
          = {analogy}
        </p>
      )}
    </AbsoluteFill>
  );
};
