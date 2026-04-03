import React from 'react';
import { Composition } from 'remotion';
import { MasterclassPreview } from './Composition';
import { InfographicComposition } from './templates/InfographicComposition';
import type { SlideData } from './templates/InfographicComposition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Masterclass"
        component={MasterclassPreview}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "AI 마케팅 자동화 마스터클래스",
          subtitle: "Part 00: 오케스트라의 탄생",
        }}
      />
      <Composition
        id="Infographic"
        component={InfographicComposition}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          slides: [] as SlideData[],
        }}
        calculateMetadata={async ({ props }) => {
          const duration = props.slides.reduce(
            (sum: number, s: SlideData) => sum + s.durationInFrames,
            0
          );
          return { durationInFrames: duration || 300 };
        }}
      />
    </>
  );
};
