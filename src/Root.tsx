import { Composition } from 'remotion';
import { mockWeeklyHotData } from './data/mockWeeklyHot';
import { HotTopic102 } from './scenes/HotTopic102';
import {
  WeeklyHotTemplate,
  getWeeklyTemplateDurationInFrames,
} from './scenes/WeeklyHotTemplate';
import {
  WeeklyHotTemplateTrue3D,
  getWeeklyTrue3DDurationInFrames,
} from './scenes/WeeklyHotTemplateTrue3D';

export const RemotionRoot = () => {
  const fps = 30;

  return (
    <>
      <Composition
        id="HotTopic102"
        component={HotTopic102}
        durationInFrames={240}
        fps={fps}
        width={1920}
        height={1080}
      />
      <Composition
        id="WeeklyHotTemplate"
        component={WeeklyHotTemplate}
        durationInFrames={getWeeklyTemplateDurationInFrames(
          fps,
          mockWeeklyHotData.libraries.length,
        )}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={mockWeeklyHotData}
      />
      <Composition
        id="WeeklyHotTemplateTrue3D"
        component={WeeklyHotTemplateTrue3D}
        durationInFrames={getWeeklyTrue3DDurationInFrames(
          fps,
          mockWeeklyHotData.libraries.length,
        )}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={mockWeeklyHotData}
      />
    </>
  );
};
