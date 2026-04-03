import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { theme } from '../themes/dan-koe-theme';
import { springIn, staggerDelay, countUp } from '../utils/animations';

export interface RecapSlideProps {
  title?: string;
  items: string[];
}

export const RecapSlide: React.FC<RecapSlideProps> = ({
  title = '핵심 정리',
  items,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 타이틀: spring 등장
  const titleAnim = springIn(frame, fps, 0, theme.animation.springGentle);

  // 마지막 아이템의 등장 완료 프레임 계산
  const lastItemDelay = staggerDelay(items.length - 1);
  const lastItemDoneFrame = 15 + lastItemDelay + 20;

  // 전체 미세 glow flash (마지막 아이템 등장 후)
  const glowFlashOpacity = frame > lastItemDoneFrame
    ? interpolate(
        frame - lastItemDoneFrame,
        [0, 10, 25],
        [0, 0.5, 0],
        { extrapolateRight: 'clamp' }
      )
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
      {/* 타이틀: spring 등장 */}
      <h2
        style={{
          opacity: titleAnim.opacity,
          transform: `translateY(${titleAnim.translateY}px) scale(${titleAnim.scale})`,
          fontFamily: theme.fonts.title,
          fontSize: Math.max(28, theme.fontSizes.title),
          fontWeight: theme.fontWeights.bold,
          color: theme.colors.text,
          marginBottom: 60,
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.gap,
          maxWidth: 1000,
          width: '100%',
        }}
      >
        {items.map((item, index) => {
          // 가속 stagger (뒤로 갈수록 빨라짐)
          const delay = staggerDelay(index);
          const itemStartFrame = 15 + delay;

          // 아이템 spring 등장
          const itemSpring = spring({
            frame: frame - itemStartFrame,
            fps,
            config: theme.animation.spring,
          });
          const itemY = interpolate(itemSpring, [0, 1], [30, 0]);

          // 번호 카운트업 등장
          const numDisplay = countUp(frame, itemStartFrame, 12, 0, index + 1);

          return (
            <div
              key={index}
              style={{
                opacity: itemSpring,
                transform: `translateY(${itemY}px)`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 24,
              }}
            >
              <span
                style={{
                  fontFamily: theme.fonts.title,
                  fontSize: Math.max(28, theme.fontSizes.subtitle),
                  fontWeight: theme.fontWeights.extraBold,
                  color: theme.colors.accent,
                  minWidth: 40,
                  textShadow: itemSpring > 0.9
                    ? `0 0 12px ${theme.animation.glowColor}`
                    : 'none',
                }}
              >
                {numDisplay}
              </span>
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: Math.max(28, theme.fontSizes.body),
                  fontWeight: theme.fontWeights.medium,
                  color: theme.colors.text,
                  margin: 0,
                  lineHeight: 1.8,
                }}
              >
                {item}
              </p>
            </div>
          );
        })}
      </div>

      {/* 전체 미세 glow flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, ${theme.animation.glowColor} 0%, transparent 60%)`,
          opacity: glowFlashOpacity,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
