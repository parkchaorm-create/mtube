import { Composition } from 'remotion';
import { MasterclassPreview } from './Composition';

export const RemotionRoot: React.FC = () => {
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
    </>
  );
};
