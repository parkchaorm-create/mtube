import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../themes/dan-koe-theme';

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

  const containerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const charsPerFrame = 1.5;
  const visibleChars = typing
    ? Math.floor(frame * charsPerFrame)
    : code.length;
  const displayedCode = code.slice(0, visibleChars);

  const cursorOpacity =
    typing && visibleChars < code.length
      ? Math.round(frame / 8) % 2 === 0
        ? 1
        : 0
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
      {title && (
        <h2
          style={{
            opacity: containerOpacity,
            fontFamily: theme.fonts.title,
            fontSize: theme.fontSizes.title,
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
          opacity: containerOpacity,
          backgroundColor: theme.colors.codeBg,
          borderRadius: 16,
          padding: '48px 56px',
          maxWidth: 1200,
          width: '100%',
          border: `1px solid #2A2A2A`,
        }}
      >
        {/* Window dots */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#FF5F57',
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#FFBD2E',
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#28C840',
            }}
          />
        </div>

        <pre
          style={{
            fontFamily: theme.fonts.code,
            fontSize: theme.fontSizes.code,
            color: theme.colors.text,
            margin: 0,
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {displayedCode}
          <span
            style={{
              opacity: cursorOpacity,
              color: theme.colors.accent,
            }}
          >
            |
          </span>
        </pre>
      </div>
    </AbsoluteFill>
  );
};
