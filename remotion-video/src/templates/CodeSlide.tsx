import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { theme } from '../themes/dan-koe-theme';
import { springIn } from '../utils/animations';

export interface CodeSlideProps {
  title?: string;
  code: string;
  language?: string;
  typing?: boolean;
}

export const CodeSlide: React.FC<CodeSlideProps> = ({
  title,
  code,
  typing = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 타이틀: spring 등장
  const titleAnim = springIn(frame, fps, 0, theme.animation.springGentle);

  // 코드 블록: spring scale(0.95→1) + opacity 등장
  const codeSpring = spring({
    frame: frame - 10,
    fps,
    config: theme.animation.spring,
  });
  const codeScale = interpolate(codeSpring, [0, 1], [0.95, 1]);

  // 윈도우 점 3개: 순차 scale pop
  const dotColors = ['#FF5F57', '#FFBD2E', '#28C840'];
  const dotDelays = [15, 19, 23];

  // 타이핑
  const charsPerFrame = 1.5;
  const typingStartFrame = 25;
  const visibleChars = typing
    ? Math.max(0, Math.floor((frame - typingStartFrame) * charsPerFrame))
    : code.length;
  const displayedCode = code.slice(0, visibleChars);
  const isTyping = typing && visibleChars < code.length && frame >= typingStartFrame;
  const typingComplete = typing && visibleChars >= code.length;

  // 커서: 타이핑 시 glow 블링크
  const cursorBlink = isTyping ? Math.round(frame / 8) % 2 === 0 ? 1 : 0.3 : 0;

  // 완료 시 border 색상 flash (muted → accent → muted)
  const flashStartFrame = typing
    ? typingStartFrame + Math.ceil(code.length / charsPerFrame) + 2
    : 999;
  const borderFlash = typingComplete
    ? interpolate(
        frame - flashStartFrame,
        [0, 8, 20],
        [0, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      )
    : 0;

  const borderColor = typingComplete
    ? `rgba(229, 62, 62, ${0.2 + borderFlash * 0.8})`
    : '#2A2A2A';

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
      {title && (
        <h2
          style={{
            opacity: titleAnim.opacity,
            transform: `translateY(${titleAnim.translateY}px)`,
            fontFamily: theme.fonts.title,
            fontSize: Math.max(28, theme.fontSizes.title),
            fontWeight: theme.fontWeights.bold,
            color: theme.colors.text,
            marginBottom: theme.spacing.gap,
          }}
        >
          {title}
        </h2>
      )}

      <div
        style={{
          opacity: codeSpring,
          transform: `scale(${codeScale})`,
          backgroundColor: theme.colors.codeBg,
          borderRadius: 16,
          padding: '48px 56px',
          maxWidth: 1200,
          width: '100%',
          border: `1.5px solid ${borderColor}`,
          boxShadow: borderFlash > 0.3
            ? `0 0 25px rgba(229, 62, 62, ${borderFlash * 0.4})`
            : 'none',
        }}
      >
        {/* Window dots: 순차 scale pop */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 32,
          }}
        >
          {dotColors.map((color, i) => {
            const dotSpring = spring({
              frame: frame - dotDelays[i],
              fps,
              config: { damping: 10, stiffness: 250, mass: 0.4 },
            });
            const dotScale = interpolate(dotSpring, [0, 1], [0, 1]);
            return (
              <div
                key={i}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: color,
                  transform: `scale(${dotScale})`,
                }}
              />
            );
          })}
        </div>

        <pre
          style={{
            fontFamily: theme.fonts.code,
            fontSize: Math.max(28, theme.fontSizes.code),
            color: theme.colors.text,
            margin: 0,
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {displayedCode}
          {/* 커서: 타이핑 시 glow */}
          <span
            style={{
              opacity: cursorBlink,
              color: theme.colors.accent,
              textShadow: isTyping
                ? `0 0 8px ${theme.animation.glowColor}, 0 0 16px ${theme.animation.glowColor}`
                : 'none',
              fontWeight: theme.fontWeights.bold,
            }}
          >
            |
          </span>
        </pre>
      </div>
    </AbsoluteFill>
  );
};
