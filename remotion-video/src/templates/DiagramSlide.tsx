import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
import { theme } from '../themes/dan-koe-theme';
import { staggerDelay } from '../utils/animations';

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
  const { fps } = useVideoConfig();
  const isHorizontal = direction === 'horizontal';

  // Heading spring
  const headingSpring = spring({
    frame,
    fps,
    config: theme.animation.springGentle,
  });
  const headingOpacity = headingSpring;
  const headingY = interpolate(headingSpring, [0, 1], [30, 0]);

  // SVG arrow dimensions
  const arrowLength = isHorizontal ? 60 : 60;
  const arrowSvgW = isHorizontal ? 60 : 24;
  const arrowSvgH = isHorizontal ? 24 : 60;

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
            fontSize: Math.max(28, theme.fontSizes.title),
            fontWeight: theme.fontWeights.bold,
            color: theme.colors.text,
            marginBottom: 60,
            opacity: headingOpacity,
            transform: `translateY(${headingY}px)`,
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
          const delay = 10 + staggerDelay(i, 10);
          const isAccent = accentIndex === i;

          // Node: spring scale (0→1) with bounce
          const nodeSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 10, stiffness: 200, mass: 0.7 },
          });
          const nodeScale = interpolate(nodeSpring, [0, 1], [0, 1]);
          const nodeOpacity = nodeSpring;

          // Accent glow pulse (continuous Math.sin)
          const glowScale = isAccent && frame > delay + 15
            ? 1 + 0.06 * Math.sin((frame - delay - 15) * 0.12)
            : 1;
          const glowOpacity = isAccent && frame > delay + 15
            ? 0.4 + 0.3 * Math.sin((frame - delay - 15) * 0.12)
            : 0;

          // Arrow SVG draw
          const arrowDelay = delay + 8;
          const arrowDuration = 18;
          const arrowProgress = interpolate(
            frame,
            [arrowDelay, arrowDelay + arrowDuration],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) },
          );

          return (
            <React.Fragment key={i}>
              {/* Node */}
              <div
                style={{
                  opacity: nodeOpacity,
                  transform: `scale(${nodeScale * glowScale})`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 180,
                  position: 'relative',
                }}
              >
                {/* Accent glow border */}
                {isAccent && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: -6,
                      borderRadius: 18,
                      border: `2px solid ${theme.colors.accent}`,
                      boxShadow: `0 0 24px ${theme.animation.glowColor}, inset 0 0 24px ${theme.animation.glowColor}`,
                      opacity: glowOpacity,
                      pointerEvents: 'none',
                    }}
                  />
                )}

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
                    background: isAccent
                      ? 'rgba(229, 62, 62, 0.08)'
                      : 'transparent',
                  }}
                >
                  {node.label}
                </div>
              </div>

              {/* SVG Arrow with draw animation */}
              {i < nodes.length - 1 && (
                <div
                  style={{
                    margin: isHorizontal ? '0 12px' : '12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width={arrowSvgW}
                    height={arrowSvgH}
                    viewBox={isHorizontal ? '0 0 60 24' : '0 0 24 60'}
                  >
                    {isHorizontal ? (
                      <>
                        {/* Horizontal line */}
                        <line
                          x1={0}
                          y1={12}
                          x2={45}
                          y2={12}
                          stroke={theme.colors.muted}
                          strokeWidth={2}
                          strokeDasharray={45}
                          strokeDashoffset={45 * (1 - arrowProgress)}
                        />
                        {/* Arrowhead */}
                        <polyline
                          points="40,6 52,12 40,18"
                          fill="none"
                          stroke={theme.colors.muted}
                          strokeWidth={2}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeDasharray={30}
                          strokeDashoffset={30 * (1 - Math.max(0, (arrowProgress - 0.6) / 0.4))}
                        />
                      </>
                    ) : (
                      <>
                        {/* Vertical line */}
                        <line
                          x1={12}
                          y1={0}
                          x2={12}
                          y2={45}
                          stroke={theme.colors.muted}
                          strokeWidth={2}
                          strokeDasharray={45}
                          strokeDashoffset={45 * (1 - arrowProgress)}
                        />
                        {/* Arrowhead */}
                        <polyline
                          points="6,40 12,52 18,40"
                          fill="none"
                          stroke={theme.colors.muted}
                          strokeWidth={2}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeDasharray={30}
                          strokeDashoffset={30 * (1 - Math.max(0, (arrowProgress - 0.6) / 0.4))}
                        />
                      </>
                    )}
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
