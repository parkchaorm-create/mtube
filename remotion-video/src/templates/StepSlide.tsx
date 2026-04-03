import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { theme } from '../themes/dan-koe-theme';
import { springIn, svgDraw, staggerDelay } from '../utils/animations';

export interface Step {
  title: string;
  description?: string;
}

export interface StepSlideProps {
  steps: Step[];
  heading?: string;
  currentStep?: number;
}

export const StepSlide: React.FC<StepSlideProps> = ({ steps, heading, currentStep }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // heading: spring 등장
  const headingAnim = springIn(frame, fps, 0, theme.animation.springGentle);

  // 커넥터 라인 높이
  const connectorHeight = 40;

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
            opacity: headingAnim.opacity,
            transform: `translateY(${headingAnim.translateY}px)`,
            fontFamily: theme.fonts.title,
            fontSize: Math.max(28, theme.fontSizes.title),
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
          const delay = staggerDelay(index, 12);
          const stepBaseFrame = 10 + delay;

          // 번호: spring scale(0→1) 바운스 등장
          const numSpring = spring({
            frame: frame - stepBaseFrame,
            fps,
            config: { damping: 10, stiffness: 200, mass: 0.5 },
          });
          const numScale = interpolate(numSpring, [0, 1], [0, 1]);

          // 제목: spring slideUp
          const titleSpring = spring({
            frame: frame - (stepBaseFrame + 5),
            fps,
            config: theme.animation.spring,
          });
          const titleY = interpolate(titleSpring, [0, 1], [30, 0]);

          // 설명: spring 등장 (제목보다 살짝 늦게)
          const descSpring = spring({
            frame: frame - (stepBaseFrame + 10),
            fps,
            config: theme.animation.springGentle,
          });

          // 현재 step에 accent glow
          const isCurrentStep = currentStep !== undefined && currentStep === index;
          const glowIntensity = isCurrentStep
            ? interpolate(
                Math.sin(frame * 0.08),
                [-1, 1],
                [0.3, 0.7]
              )
            : 0;

          // 커넥터 라인: SVG draw 애니메이션
          const connectorStartFrame = stepBaseFrame + 15;
          const connectorDraw = svgDraw(frame, connectorStartFrame, 15, connectorHeight);

          return (
            <React.Fragment key={index}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 32,
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: isCurrentStep
                    ? `1px solid rgba(229, 62, 62, ${glowIntensity})`
                    : '1px solid transparent',
                  boxShadow: isCurrentStep
                    ? `0 0 20px rgba(229, 62, 62, ${glowIntensity * 0.5})`
                    : 'none',
                  transition: 'box-shadow 0.3s',
                }}
              >
                {/* Step number: spring scale bounce */}
                <span
                  style={{
                    fontFamily: theme.fonts.title,
                    fontSize: Math.max(28, theme.fontSizes.title),
                    fontWeight: theme.fontWeights.extraBold,
                    color: theme.colors.accent,
                    minWidth: 50,
                    display: 'inline-block',
                    transform: `scale(${numScale})`,
                    opacity: numSpring,
                    textShadow: isCurrentStep
                      ? `0 0 15px ${theme.animation.glowColor}`
                      : 'none',
                  }}
                >
                  {index + 1}
                </span>

                <div style={{ opacity: titleSpring }}>
                  <p
                    style={{
                      fontFamily: theme.fonts.title,
                      fontSize: Math.max(28, theme.fontSizes.subtitle),
                      fontWeight: theme.fontWeights.bold,
                      color: theme.colors.text,
                      margin: 0,
                      lineHeight: 1.4,
                      transform: `translateY(${titleY}px)`,
                    }}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p
                      style={{
                        opacity: descSpring,
                        transform: `translateY(${interpolate(descSpring, [0, 1], [15, 0])}px)`,
                        fontFamily: theme.fonts.body,
                        fontSize: Math.max(28, theme.fontSizes.body),
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

              {/* Connector line: SVG draw 애니메이션 */}
              {index < steps.length - 1 && (
                <svg
                  width={4}
                  height={connectorHeight}
                  style={{ marginLeft: 40, overflow: 'visible' }}
                >
                  <line
                    x1={2}
                    y1={0}
                    x2={2}
                    y2={connectorHeight}
                    stroke={theme.colors.muted}
                    strokeWidth={theme.lineWidth}
                    strokeDasharray={connectorDraw.strokeDasharray}
                    strokeDashoffset={connectorDraw.strokeDashoffset}
                    strokeLinecap="round"
                    opacity={0.6}
                  />
                </svg>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
