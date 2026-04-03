import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../themes/dan-koe-theme';

export interface Step {
  title: string;
  description?: string;
}

export interface StepSlideProps {
  steps: Step[];
  heading?: string;
}

export const StepSlide: React.FC<StepSlideProps> = ({ steps, heading }) => {
  const frame = useCurrentFrame();

  const headingOpacity = interpolate(frame, [0, 20], [0, 1], {
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
      {heading && (
        <h2
          style={{
            opacity: headingOpacity,
            fontFamily: theme.fonts.title,
            fontSize: theme.fontSizes.title,
            fontWeight: theme.fontWeights.bold,
            color: theme.colors.text,
            marginBottom: 60,
          }}
        >
          {heading}
        </h2>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 0,
          maxWidth: 900,
          width: '100%',
        }}
      >
        {steps.map((step, index) => {
          const delay = index * 12;
          const stepOpacity = interpolate(
            frame,
            [10 + delay, 30 + delay],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          const slideUp = interpolate(
            frame,
            [10 + delay, 30 + delay],
            [20, 0],
            { extrapolateRight: 'clamp' }
          );

          return (
            <React.Fragment key={index}>
              <div
                style={{
                  opacity: stepOpacity,
                  transform: `translateY(${slideUp}px)`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 32,
                }}
              >
                {/* Step number */}
                <span
                  style={{
                    fontFamily: theme.fonts.title,
                    fontSize: theme.fontSizes.title,
                    fontWeight: theme.fontWeights.extraBold,
                    color: theme.colors.accent,
                    minWidth: 50,
                  }}
                >
                  {index + 1}
                </span>

                <div>
                  <p
                    style={{
                      fontFamily: theme.fonts.title,
                      fontSize: theme.fontSizes.subtitle,
                      fontWeight: theme.fontWeights.bold,
                      color: theme.colors.text,
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p
                      style={{
                        fontFamily: theme.fonts.body,
                        fontSize: theme.fontSizes.body,
                        fontWeight: theme.fontWeights.regular,
                        color: theme.colors.muted,
                        margin: 0,
                        marginTop: 8,
                        lineHeight: 1.6,
                      }}
                    >
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  style={{
                    opacity: stepOpacity,
                    width: theme.lineWidth,
                    height: 40,
                    backgroundColor: theme.colors.muted,
                    marginLeft: 24,
                    opacity: 0.4,
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
