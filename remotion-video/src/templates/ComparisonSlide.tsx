import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { theme } from '../themes/dan-koe-theme';
import { svgDraw } from '../utils/animations';

export interface ComparisonSlideProps {
  leftTitle: string;
  rightTitle: string;
  leftItems: string[];
  rightItems: string[];
  accentSide?: 'left' | 'right';
}

export const ComparisonSlide: React.FC<ComparisonSlideProps> = ({
  leftTitle,
  rightTitle,
  leftItems,
  rightItems,
  accentSide = 'right',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 중앙 구분선 SVG draw 길이
  const dividerHeight = 400;

  // 중앙 구분선: SVG strokeDashoffset 드로잉 (위→아래)
  const dividerDraw = svgDraw(frame, 5, 30, dividerHeight);

  const renderColumn = (
    title: string,
    items: string[],
    isAccent: boolean,
    side: 'left' | 'right'
  ) => {
    // 좌/우 컬럼: spring으로 바깥에서 안으로 슬라이드
    const columnSpring = spring({
      frame: frame - 8,
      fps,
      config: theme.animation.spring,
    });
    const slideX = interpolate(
      columnSpring,
      [0, 1],
      [side === 'left' ? -80 : 80, 0]
    );
    const columnOpacity = columnSpring;

    // 타이틀 spring
    const titleSpring = spring({
      frame: frame - 12,
      fps,
      config: theme.animation.springGentle,
    });

    return (
      <div
        style={{
          opacity: columnOpacity,
          transform: `translateX(${slideX}px)`,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: side === 'left' ? 'flex-end' : 'flex-start',
          padding: '0 60px',
        }}
      >
        <h2
          style={{
            opacity: titleSpring,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
            fontFamily: theme.fonts.title,
            fontSize: Math.max(28, theme.fontSizes.title),
            fontWeight: theme.fontWeights.bold,
            color: isAccent ? theme.colors.accent : theme.colors.muted,
            marginBottom: theme.spacing.gap,
            textShadow: isAccent
              ? `0 0 20px ${theme.animation.glowColor}`
              : 'none',
          }}
        >
          {title}
        </h2>
        {items.map((item, i) => {
          // 아이템: Easing.out(Easing.cubic) stagger 등장
          const itemDelay = 20 + i * 8;
          const itemProgress = interpolate(
            frame,
            [itemDelay, itemDelay + 18],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            }
          );
          const itemY = interpolate(itemProgress, [0, 1], [25, 0]);

          return (
            <p
              key={i}
              style={{
                opacity: itemProgress,
                transform: `translateY(${itemY}px)`,
                fontFamily: theme.fonts.body,
                fontSize: Math.max(28, theme.fontSizes.body),
                fontWeight: theme.fontWeights.regular,
                color: isAccent ? theme.colors.text : theme.colors.muted,
                margin: 0,
                marginBottom: 20,
                textAlign: side === 'left' ? 'right' : 'left',
                lineHeight: 1.8,
                padding: isAccent ? '8px 16px' : '8px 0',
                borderRadius: isAccent ? 8 : 0,
                border: isAccent
                  ? `1px solid rgba(229, 62, 62, ${0.3 * itemProgress})`
                  : 'none',
                boxShadow: isAccent && itemProgress > 0.8
                  ? `0 0 15px ${theme.animation.glowColor}, inset 0 0 15px rgba(229, 62, 62, 0.05)`
                  : 'none',
              }}
            >
              {item}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.page,
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: 1400,
          alignItems: 'flex-start',
        }}
      >
        {renderColumn(leftTitle, leftItems, accentSide === 'left', 'left')}

        {/* 중앙 구분선: SVG draw 애니메이션 */}
        <svg
          width={4}
          height={dividerHeight}
          style={{ flexShrink: 0, overflow: 'visible' }}
        >
          <line
            x1={2}
            y1={0}
            x2={2}
            y2={dividerHeight}
            stroke={theme.colors.muted}
            strokeWidth={theme.lineWidth}
            strokeDasharray={dividerDraw.strokeDasharray}
            strokeDashoffset={dividerDraw.strokeDashoffset}
            strokeLinecap="round"
          />
          {/* 구분선 glow */}
          <line
            x1={2}
            y1={0}
            x2={2}
            y2={dividerHeight}
            stroke={theme.animation.glowColor}
            strokeWidth={4}
            strokeDasharray={dividerDraw.strokeDasharray}
            strokeDashoffset={dividerDraw.strokeDashoffset}
            strokeLinecap="round"
            opacity={0.4}
          />
        </svg>

        {renderColumn(rightTitle, rightItems, accentSide === 'right', 'right')}
      </div>
    </AbsoluteFill>
  );
};
