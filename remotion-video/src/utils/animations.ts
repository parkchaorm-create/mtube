import { spring, interpolate, Easing } from 'remotion';
import { theme } from '../themes/dan-koe-theme';

/**
 * Spring 기반 등장 애니메이션 (opacity + translateY)
 */
export const springIn = (
  frame: number,
  fps: number,
  delay: number = 0,
  config = theme.animation.spring
) => {
  const s = spring({ frame: frame - delay, fps, config });
  return {
    opacity: s,
    translateY: interpolate(s, [0, 1], [40, 0]),
    scale: interpolate(s, [0, 1], [0.95, 1]),
  };
};

/**
 * 가속 stagger 딜레이 (뒤로 갈수록 빨라짐)
 */
export const staggerDelay = (index: number, base: number = theme.animation.stagger) => {
  return Math.round(base * index * (1 - index * 0.03));
};

/**
 * SVG stroke-dashoffset 라인 드로잉
 */
export const svgDraw = (
  frame: number,
  startFrame: number,
  duration: number,
  pathLength: number
) => {
  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );
  return {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength * (1 - progress),
  };
};

/**
 * 숫자 카운트업 애니메이션
 */
export const countUp = (
  frame: number,
  startFrame: number,
  duration: number,
  from: number,
  to: number
) => {
  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );
  return Math.round(from + (to - from) * progress);
};

/**
 * 강조 펄스 (scale 1→1.12→1 + 색상 플래시)
 */
export const emphasisPulse = (frame: number, triggerFrame: number) => {
  const t = frame - triggerFrame;
  if (t < 0 || t > 20) return { scale: 1, glowOpacity: 0 };
  const scale = 1 + 0.12 * Math.sin((t / 20) * Math.PI);
  const glowOpacity = Math.sin((t / 20) * Math.PI) * 0.8;
  return { scale, glowOpacity };
};

/**
 * 슬라이드 진입/퇴장 전환
 */
export const slideTransition = (
  frame: number,
  durationInFrames: number,
  fadeFrames: number = theme.animation.fadeFrames
) => {
  const enterOpacity = interpolate(
    frame, [0, fadeFrames], [0, 1],
    { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );
  const exitOpacity = interpolate(
    frame, [durationInFrames - fadeFrames, durationInFrames], [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) }
  );
  const exitScale = interpolate(
    frame, [durationInFrames - fadeFrames, durationInFrames], [1, 0.97],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  return {
    opacity: Math.min(enterOpacity, exitOpacity),
    scale: frame > durationInFrames - fadeFrames ? exitScale : 1,
  };
};

/**
 * 비네팅 오버레이 스타일
 */
export const vignetteStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
  pointerEvents: 'none',
};
