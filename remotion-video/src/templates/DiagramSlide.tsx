import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../themes/dan-koe-theme';

export interface DiagramNode {
  label: string;
  icon?: string;
}

export interface DiagramSlideProps {
  nodes: DiagramNode[];
  direction?: 'horizontal' | 'vertical';
  accentIndex?: number;
  heading?: string;
}

export const DiagramSlide: React.FC<DiagramSlideProps> = ({
  nodes,
  direction = 'horizontal',
  accentIndex,
  heading,
}) => {
  const frame = useCurrentFrame();
  const isHorizontal = direction === 'horizontal';

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
      {heading && (
        <h2
          style={{
            fontFamily: theme.fonts.title,
            fontSize: theme.fontSizes.title,
            fontWeight: theme.fontWeights.bold,
            color: theme.colors.text,
            marginBottom: 60,
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
          display: 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {nodes.map((node, i) => {
          const delay = i * 12;
          const nodeOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const isAccent = accentIndex === i;
          const arrowDelay = delay + 10;
          const arrowOpacity = interpolate(
            frame,
            [arrowDelay, arrowDelay + 15],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  opacity: nodeOpacity,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 180,
                }}
              >
                {node.icon && (
                  <div style={{ fontSize: 48, marginBottom: 12 }}>
                    {node.icon}
                  </div>
                )}
                <div
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: Math.max(28, theme.fontSizes.body),
                    fontWeight: isAccent
                      ? theme.fontWeights.extraBold
                      : theme.fontWeights.medium,
                    color: isAccent ? theme.colors.accent : theme.colors.text,
                    textAlign: 'center',
                    padding: '16px 24px',
                    border: `${theme.lineWidth}px solid ${
                      isAccent ? theme.colors.accent : theme.colors.muted
                    }`,
                    borderRadius: 12,
                  }}
                >
                  {node.label}
                </div>
              </div>

              {i < nodes.length - 1 && (
                <div
                  style={{
                    opacity: arrowOpacity,
                    fontFamily: theme.fonts.body,
                    fontSize: 32,
                    color: theme.colors.muted,
                    margin: isHorizontal ? '0 20px' : '20px 0',
                  }}
                >
                  {isHorizontal ? '→' : '↓'}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
