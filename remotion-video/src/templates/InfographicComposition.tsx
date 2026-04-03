import React from 'react';
import { Series } from 'remotion';
import { TitleSlide } from './TitleSlide';
import { ConceptSlide } from './ConceptSlide';
import { ProgressMap } from './ProgressMap';
import { ComparisonSlide } from './ComparisonSlide';
import { StepSlide } from './StepSlide';
import { RecapSlide } from './RecapSlide';
import { CodeSlide } from './CodeSlide';
import { DiagramSlide } from './DiagramSlide';
import { GridSlide } from './GridSlide';

export interface SlideData {
  type: 'title' | 'concept' | 'progress' | 'comparison' | 'step' | 'recap' | 'code' | 'diagram' | 'grid';
  durationInFrames: number;
  props: Record<string, unknown>;
}

export interface InfographicProps {
  slides: SlideData[];
}

const SlideRenderer: React.FC<{ slide: SlideData }> = ({ slide }) => {
  switch (slide.type) {
    case 'title':
      return <TitleSlide {...(slide.props as any)} />;
    case 'concept':
      return <ConceptSlide {...(slide.props as any)} />;
    case 'progress':
      return <ProgressMap {...(slide.props as any)} />;
    case 'comparison':
      return <ComparisonSlide {...(slide.props as any)} />;
    case 'step':
      return <StepSlide {...(slide.props as any)} />;
    case 'recap':
      return <RecapSlide {...(slide.props as any)} />;
    case 'code':
      return <CodeSlide {...(slide.props as any)} />;
    case 'diagram':
      return <DiagramSlide {...(slide.props as any)} />;
    case 'grid':
      return <GridSlide {...(slide.props as any)} />;
    default:
      return null;
  }
};

export const InfographicComposition: React.FC<InfographicProps> = ({
  slides,
}) => {
  return (
    <Series>
      {slides.map((slide, index) => (
        <Series.Sequence key={index} durationInFrames={slide.durationInFrames}>
          <SlideRenderer slide={slide} />
        </Series.Sequence>
      ))}
    </Series>
  );
};
