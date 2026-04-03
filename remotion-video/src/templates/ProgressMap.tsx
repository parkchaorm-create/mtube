import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
import { theme } from '../themes/dan-koe-theme';
import { staggerDelay } from '../utils/animations';

export interface ActInfo {
  label: string;
  duration: string;
}

export interface ProgressMapProps {
  currentAct: number;
  currentPart?: number;
  acts: ActInfo[];
}

export const ProgressMap: React.FC<ProgressMapProps> = ({
  currentAct,
  acts,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading spring
  const headingSpring = spring({
    frame,
    fps,
    config: theme.animation.springGentle,
  });
  const headingOpacity = headingSpring;
  const headingY = interpolate(headingSpring, [0, 1], [30, 0]);

  // Connector line total length & draw timing
  const connectorLineLength = 120;
  const connectorDrawDuration = 18;

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
          opacity: headingOpacity,
          transform: `translateY(${headingY}px)`,
          fontFamily: theme.fonts.title,
          fontSize: Math.max(28, theme.fontSizes.title),
          fontWeight: theme.fontWeights.bold,
          color: theme.colors.text,
          marginBottom: 80,
        }}
      >
        코스 진행 현황
      </h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
          width: '100%',
          maxWidth: 1400,
        }}
      >
        {acts.map((act, index) => {
          const actNum = index + 1;
          const isCompleted = actNum < currentAct;
          const isCurrent = actNum === currentAct;
          const isFuture = actNum > currentAct;

          // Node: spring scale pop with stagger
          const nodeDelay = 10 + staggerDelay(index, 10);
          const nodeSpring = spring({
            frame: frame - nodeDelay,
            fps,
            config: { damping: 10, stiffness: 220, mass: 0.6 },
          });
          const nodeScale = interpolate(nodeSpring, [0, 1], [0, 1]);
          const nodeOpacity = nodeSpring;

          // Current node: glow pulse (Math.sin continuous)
          const glowPulse = isCurrent && frame > nodeDelay + 15
            ? 0.4 + 0.35 * Math.sin((frame - nodeDelay - 15) * 0.1)
            : 0;
          const currentScale = isCurrent && frame > nodeDelay + 15
            ? 1 + 0.04 * Math.sin((frame - nodeDelay - 15) * 0.1)
            : 1;

          // Completed node: checkmark fade-in
          const checkDelay = nodeDelay + 12;
          const checkOpacity = isCompleted
            ? interpolate(frame, [checkDelay, checkDelay + 12], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : 0;

          // Connector SVG draw (left→right)
          const lineDelay = nodeDelay + 6;
          const lineProgress = interpolate(
            frame,
            [lineDelay, lineDelay + connectorDrawDuration],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            },
          );

          return (
            <React.Fragment key={actNum}>
              <div
                style={{
                  opacity: nodeOpacity,
                  transform: `scale(${nodeScale * currentScale})`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16,
                  position: 'relative',
                }}
              >
                {/* Glow ring for current */}
                {isCurrent && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -8,
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      border: `2px solid ${theme.colors.accent}`,
                      boxShadow: `0 0 20px ${theme.animation.glowColor}, 0 0 40px ${theme.animation.glowColor}`,
                      opacity: glowPulse,
                      pointerEvents: 'none',
                    }}
                  />
                )}

                {/* Circle */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: theme.fonts.title,
                    fontSize: Math.max(28, theme.fontSizes.body),
                    fontWeight: theme.fontWeights.bold,
                    backgroundColor: isCurrent
                      ? theme.colors.accent
                      : 'transparent',
                    border: `2px solid ${
                      isCompleted
                        ? theme.colors.muted
                        : isCurrent
                        ? theme.colors.accent
                        : '#2A2A2A'
                    }`,
                    color: isCompleted
                      ? theme.colors.muted
                      : isCurrent
                      ? theme.colors.text
                      : '#2A2A2A',
                    boxShadow: isCurrent
                      ? `0 0 16px ${theme.animation.glowColor}`
                      : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {isCompleted ? (
                    // Checkmark with fade-in
                    <span style={{ opacity: checkOpacity }}>✓</span>
                  ) : (
                    actNum
                  )}
                </div>

                {/* Label */}
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: Math.max(28, theme.fontSizes.small),
                    fontWeight: isCurrent
                      ? theme.fontWeights.bold
                      : theme.fontWeights.regular,
                    color: isCurrent
                      ? theme.colors.text
                      : isFuture
                      ? '#2A2A2A'
                      : theme.colors.muted,
                    textAlign: 'center',
                    margin: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {act.label}
                </p>

                {/* Duration */}
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: Math.max(28, 14),
                    color: isCurrent
                      ? theme.colors.accent
                      : theme.colors.muted,
                    margin: 0,
                    opacity: isFuture ? 0.3 : 0.7,
                  }}
                >
                  {act.duration}
                </p>
              </div>

              {/* Connector line: SVG draw left→right */}
              {index < acts.length - 1 && (
                <div
                  style={{
                    marginBottom: 60,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <svg
                    width={connectorLineLength}
                    height={4}
                    viewBox={`0 0 ${connectorLineLength} 4`}
                  >
                    <line
                      x1={0}
                      y1={2}
                      x2={connectorLineLength}
                      y2={2}
                      stroke={actNum < currentAct ? theme.colors.muted : '#2A2A2A'}
                      strokeWidth={2}
                      strokeDasharray={connectorLineLength}
                      strokeDashoffset={connectorLineLength * (1 - lineProgress)}
                      strokeLinecap="round"
                    />
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
