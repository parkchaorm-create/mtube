import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../themes/dan-koe-theme';

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

  const opacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const renderColumn = (
    title: string,
    items: string[],
    isAccent: boolean,
    side: 'left' | 'right'
  ) => {
    const slideX = interpolate(
      frame,
      [5, 30],
      [side === 'left' ? -40 : 40, 0],
      { extrapolateRight: 'clamp' }
    );

    return (
      <div
        style={{
          opacity,
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
            fontFamily: theme.fonts.title,
            fontSize: theme.fontSizes.title,
            fontWeight: theme.fontWeights.bold,
            color: isAccent ? theme.colors.accent : theme.colors.muted,
            marginBottom: theme.spacing.gap,
          }}
        >
          {title}
        </h2>
        {items.map((item, i) => {
          const itemDelay = i * 6;
          const itemOpacity = interpolate(
            frame,
            [20 + itemDelay, 35 + itemDelay],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          return (
            <p
              key={i}
              style={{
                opacity: itemOpacity,
                fontFamily: theme.fonts.body,
                fontSize: theme.fontSizes.body,
                fontWeight: theme.fontWeights.regular,
                color: isAccent ? theme.colors.text : theme.colors.muted,
                margin: 0,
                marginBottom: 20,
                textAlign: side === 'left' ? 'right' : 'left',
                lineHeight: 1.8,
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

        {/* Divider */}
        <div
          style={{
            opacity,
            width: theme.lineWidth,
            backgroundColor: theme.colors.muted,
            alignSelf: 'stretch',
            minHeight: 300,
          }}
        />

        {renderColumn(rightTitle, rightItems, accentSide === 'right', 'right')}
      </div>
    </AbsoluteFill>
  );
};
