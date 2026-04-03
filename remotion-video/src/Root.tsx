import { Composition } from 'remotion';
import { MasterclassPreview } from './Composition';
import { InfographicComposition } from './templates/InfographicComposition';
import part00Slides from './data/part00-slides.json';

export const RemotionRoot: React.FC = () => {
  const infographicDuration = part00Slides.slides.reduce(
    (sum: number, s: { durationInFrames: number }) => sum + s.durationInFrames,
    0
  );

  return (
    <>
      <Composition
        id="Masterclass"
        component={MasterclassPreview}
        durationInFrames={1800} // 30fps * 60s
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
        durationInFrames={infographicDuration}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          slides: part00Slides.slides,
        }}
      />
    </>
  );
};
