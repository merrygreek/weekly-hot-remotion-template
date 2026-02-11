import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { LibraryHotItem, WeeklyHotTemplateProps } from '../data/mockWeeklyHot';

const INTRO_SECONDS = 4;
const ITEM_SECONDS = 5;
const OUTRO_SECONDS = 2;

export const getWeeklyTemplateDurationInFrames = (
  fps: number,
  itemCount: number,
): number => {
  return Math.round((INTRO_SECONDS + itemCount * ITEM_SECONDS + OUTRO_SECONDS) * fps);
};

const FrameBackground: React.FC<{ tint?: string }> = ({ tint = '#20242f' }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 300], [0, -80], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sway = Math.sin(frame / 42) * 10;

  return (
    <AbsoluteFill style={{ backgroundColor: '#171a21' }}>
      <div
        style={{
          position: 'absolute',
          inset: -400,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.11) 1px, transparent 1px)',
          backgroundSize: '95px 95px',
          transform: `perspective(980px) rotateX(16deg) rotateY(${sway * 0.08}deg) translateY(${drift}px) translateX(${sway * 0.9}px)`,
          transformOrigin: 'center',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 80% 15%, ${tint}66 0%, transparent 45%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.46) 70%, rgba(0,0,0,0.75) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

const IntroScene: React.FC<{
  issueTitle: string;
  period: string;
  introTitle: string;
  introBody: string;
}> = ({ issueTitle, period, introTitle, introBody }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    fps,
    frame,
    durationInFrames: Math.round(1.2 * fps),
    config: { damping: 14, stiffness: 130 },
  });

  const bodyOpacity = interpolate(frame, [16, 40], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ fontFamily: 'Arial Black, PingFang SC, sans-serif', color: 'white' }}>
      <FrameBackground tint="#53c5ff" />
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: 130,
          borderRadius: 24,
          padding: '14px 26px',
          fontSize: 42,
          color: '#0f172a',
          background: '#f8fafc',
          transform: `scale(${0.92 + 0.08 * titleProgress})`,
        }}
      >
        {introTitle}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 270,
          fontSize: 118,
          lineHeight: 1,
          letterSpacing: 2,
          transform: `translateY(${(1 - titleProgress) * 40}px)`,
          opacity: titleProgress,
        }}
      >
        {issueTitle}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 430,
          width: 1120,
          fontSize: 54,
          lineHeight: 1.35,
          opacity: bodyOpacity,
          color: '#dbeafe',
        }}
      >
        {introBody}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 130,
          bottom: 130,
          fontSize: 66,
          color: '#f8fafc',
          opacity: bodyOpacity,
        }}
      >
        {period}
      </div>
    </AbsoluteFill>
  );
};

const LibraryScene: React.FC<{ item: LibraryHotItem; total: number }> = ({ item, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelIn = spring({
    fps,
    frame,
    durationInFrames: Math.round(1 * fps),
    config: { damping: 16, stiffness: 150 },
  });

  const rightIn = spring({
    fps,
    frame: frame - 6,
    durationInFrames: Math.round(1.1 * fps),
    config: { damping: 16, stiffness: 120 },
  });

  const highlightStagger = (index: number): number => {
    return interpolate(frame, [18 + index * 6, 34 + index * 6], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  };
  const tiltWave = Math.sin(frame / 26);
  const depthShift = Math.sin(frame / 32) * 8;

  return (
    <AbsoluteFill
      style={{
        fontFamily: 'Arial Black, PingFang SC, sans-serif',
        color: 'white',
        perspective: 1700,
        transformStyle: 'preserve-3d',
      }}
    >
      <FrameBackground tint={item.color} />

      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 96,
          fontSize: 42,
          padding: '10px 22px',
          borderRadius: 20,
          color: '#0f172a',
          background: item.color,
          transform: `translateY(${(1 - panelIn) * 24}px)`,
          opacity: panelIn,
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
        }}
      >
        库介绍 {item.rank}/{total}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 210,
          width: 980,
          height: 710,
          borderRadius: 42,
          padding: '54px 56px',
          background: 'rgba(8, 12, 18, 0.72)',
          border: `3px solid ${item.color}88`,
          boxShadow: '0 18px 60px rgba(0,0,0,0.35)',
          transform: `translateY(${(1 - panelIn) * 40}px) translateZ(60px) rotateY(${tiltWave * 2.8}deg) rotateX(${(-tiltWave * 1.2).toFixed(3)}deg)`,
          transformStyle: 'preserve-3d',
          opacity: panelIn,
        }}
      >
        <div style={{ fontSize: 124, color: item.color, lineHeight: 1 }}>#{item.rank}</div>
        <div style={{ fontSize: 96, marginTop: 8, lineHeight: 1 }}>{item.name}</div>
        <div style={{ marginTop: 24, color: '#cbd5e1', fontSize: 38 }}>{item.repo}</div>
        <div style={{ marginTop: 34, color: '#e2e8f0', fontSize: 44, lineHeight: 1.35 }}>{item.short}</div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 110,
          top: 210,
          width: 620,
          height: 710,
          borderRadius: 42,
          padding: '54px 48px',
          background: 'rgba(2, 6, 12, 0.75)',
          border: '2px solid rgba(255,255,255,0.14)',
          transform: `translateX(${(1 - rightIn) * 50 + depthShift}px) translateZ(25px) rotateY(${(-tiltWave * 3.1).toFixed(3)}deg) rotateX(${(tiltWave * 1.8).toFixed(3)}deg)`,
          opacity: rightIn,
          boxShadow: '0 14px 48px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ fontSize: 44, color: '#94a3b8' }}>本周新增 Star</div>
        <div style={{ fontSize: 128, marginTop: 2, color: item.color }}>+{item.weeklyStars}</div>
        <div style={{ marginTop: 34, fontSize: 46 }}>亮点</div>

        {item.highlights.map((point, index) => {
          const progress = highlightStagger(index);
          return (
            <div
              key={point}
              style={{
                marginTop: 30,
                fontSize: 38,
                lineHeight: 1.35,
                opacity: progress,
                transform: `translateY(${(1 - progress) * 12}px)`,
                color: '#f8fafc',
              }}
            >
              {index + 1}. {point}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          right: 76,
          top: 120,
          width: 220,
          height: 220,
          borderRadius: 999,
          border: `2px solid ${item.color}88`,
          transform: `translateZ(140px) rotateX(64deg) rotateZ(${frame * 0.7}deg)`,
          opacity: 0.55,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 56,
          bottom: 120,
          width: 180,
          height: 180,
          borderRadius: 999,
          border: '2px solid rgba(255,255,255,0.32)',
          transform: `translateZ(130px) rotateX(62deg) rotateZ(${-frame * 0.6}deg)`,
          opacity: 0.3,
        }}
      />
    </AbsoluteFill>
  );
};

const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    fps,
    frame,
    durationInFrames: Math.round(0.8 * fps),
    config: { damping: 13, stiffness: 160 },
  });

  return (
    <AbsoluteFill style={{ fontFamily: 'Arial Black, PingFang SC, sans-serif', color: 'white' }}>
      <FrameBackground tint="#f59e0b" />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 126,
          transform: `scale(${0.9 + 0.1 * pop})`,
        }}
      >
        下期再见
      </div>
    </AbsoluteFill>
  );
};

export const WeeklyHotTemplate: React.FC<WeeklyHotTemplateProps> = ({
  issueTitle,
  period,
  introTitle,
  introBody,
  libraries,
}) => {
  const { fps } = useVideoConfig();
  const introFrames = Math.round(INTRO_SECONDS * fps);
  const itemFrames = Math.round(ITEM_SECONDS * fps);
  const outroFrames = Math.round(OUTRO_SECONDS * fps);

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={introFrames} premountFor={fps}>
        <IntroScene
          issueTitle={issueTitle}
          period={period}
          introTitle={introTitle}
          introBody={introBody}
        />
      </Sequence>

      {libraries.map((item, index) => (
        <Sequence
          key={item.id}
          from={introFrames + index * itemFrames}
          durationInFrames={itemFrames}
          premountFor={fps}
        >
          <LibraryScene item={item} total={libraries.length} />
        </Sequence>
      ))}

      <Sequence
        from={introFrames + libraries.length * itemFrames}
        durationInFrames={outroFrames}
        premountFor={fps}
      >
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
