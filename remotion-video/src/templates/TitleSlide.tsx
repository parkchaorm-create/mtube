import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
import { theme } from '../themes/dan-koe-theme';

export interface TitleSlideProps {
  partNumber: string;
  title: string;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({ partNumber, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part 번호: spring 등장
  const partSpring = spring({ frame, fps, config: theme.animation.springGentle });
  const partOpacity = partSpring;
  const partY = interpolate(partSpring, [0, 1], [30, 0]);

  // 타이틀: 단어별 spring stagger
  const words = title.split('');
  const titleDelay = 12;

  // 하단 언더라인: 와이프 애니메이션
  const lineProgress = interpolate(
    frame,
    [titleDelay + words.length * 2 + 10, titleDelay + words.length * 2 + 30],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // 글로우 펄스 (라인 완성 후)
  const glowFrame = titleDelay + words.length * 2 + 35;
  const glowOpacity = frame > glowFrame
    ? interpolate(frame - glowFrame, [0, 15, 30], [0, 0.6, 0], { extrapolateRight: 'clamp' })
    : 0;

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
      {/* Part 번호 */}
      <p
        style={{
          opacity: partOpacity,
          transform: `translateY(${partY}px)`,
          fontFamily: theme.fonts.body,
          fontSize: theme.fontSizes.body,
          fontWeight: theme.fontWeights.medium,
          color: theme.colors.accent,
          marginBottom: theme.spacing.gap,
          letterSpacing: 6,
          textTransform: 'uppercase',
        }}
      >
        {partNumber}
      </p>

      {/* 타이틀: 글자별 순차 등장 */}
      <h1
        style={{
          fontFamily: theme.fonts.title,
          fontSize: Math.max(28, theme.fontSizes.hero),
          fontWeight: theme.fontWeights.extraBold,
          color: theme.colors.text,
          lineHeight: 1.2,
          margin: 0,
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}
      >
        {words.map((char, i) => {
          const delay = titleDelay + i * 2;
          const charSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 200, mass: 0.6 },
          });
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: charSpring,
                transform: `translateY(${interpolate(charSpring, [0, 1], [25, 0])}px)`,
                whiteSpace: char === ' ' ? 'pre' : undefined,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </h1>

      {/* 레드 언더라인 와이프 */}
      <div
        style={{
          width: 200,
          height: 3,
          background: theme.colors.accent,
          marginTop: 24,
          transformOrigin: 'left',
          transform: `scaleX(${lineProgress})`,
          boxShadow: lineProgress > 0.5
            ? `0 0 20px ${theme.animation.glowColor}`
            : 'none',
        }}
      />

      {/* 글로우 플래시 */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.animation.glowColor} 0%, transparent 70%)`,
          opacity: glowOpacity,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
