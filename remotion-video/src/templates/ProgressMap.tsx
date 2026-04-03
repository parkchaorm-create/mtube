import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../themes/dan-koe-theme';

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
  const opacity = interpolate(frame, [0, 25], [0, 1], {
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
          opacity,
          fontFamily: theme.fonts.title,
          fontSize: theme.fontSizes.title,
          fontWeight: theme.fontWeights.bold,
          color: theme.colors.text,
          marginBottom: 80,
        }}
      >
        코스 진행 현황
      </h2>

      <div
        style={{
          opacity,
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

          const nodeDelay = index * 8;
          const nodeOpacity = interpolate(
            frame,
            [10 + nodeDelay, 25 + nodeDelay],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          return (
            <React.Fragment key={actNum}>
              <div
                style={{
                  opacity: nodeOpacity,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
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
                    fontSize: theme.fontSizes.body,
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
                  }}
                >
                  {isCompleted ? '✓' : actNum}
                </div>

                {/* Label */}
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: theme.fontSizes.small,
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
                    fontSize: 14,
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

              {/* Connector line */}
              {index < acts.length - 1 && (
                <div
                  style={{
                    opacity: nodeOpacity,
                    height: 2,
                    width: 120,
                    backgroundColor:
                      actNum < currentAct
                        ? theme.colors.muted
                        : '#2A2A2A',
                    marginBottom: 60,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
