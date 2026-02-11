import React from 'react';
import { ThreeCanvas } from '@remotion/three';
import '@react-three/fiber';
import {
  AbsoluteFill,
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

export const getWeeklyTrue3DDurationInFrames = (fps: number, itemCount: number): number => {
  return Math.round((INTRO_SECONDS + itemCount * ITEM_SECONDS + OUTRO_SECONDS) * fps);
};

const ThreeWorld: React.FC<{ accent: string; density?: number }> = ({ accent, density = 1 }) => {
  const frame = useCurrentFrame();
  const yaw = Math.sin(frame / 35) * 0.22;
  const pitch = -0.28 + Math.sin(frame / 50) * 0.06;
  const zDrift = -6 + Math.sin(frame / 40) * 0.35;
  const floatY = Math.sin(frame / 28) * 0.18;

  return (
    <>
      <color attach="background" args={['#0b0f16']} />
      <fog attach="fog" args={['#0b0f16', 8, 26]} />

      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 7, 4]} intensity={1.0} color={accent} />
      <directionalLight position={[-6, 3, 1]} intensity={0.6} color="#93c5fd" />

      <group position={[0, -1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <planeGeometry args={[26, 26]} />
          <meshStandardMaterial color="#111827" roughness={0.92} metalness={0.05} />
        </mesh>
      </group>

      <group position={[0, floatY, zDrift]} rotation={[pitch, yaw, 0]}>
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[2.1, 2.1, 2.1]} />
          <meshStandardMaterial color={accent} roughness={0.3} metalness={0.5} />
        </mesh>

        <mesh position={[-3.3, 0.4, -1.2]} rotation={[0.15, frame * 0.01, 0]}>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.35} metalness={0.55} />
        </mesh>

        <mesh position={[3.2, 0.5, -1.1]} rotation={[0.2, -frame * 0.01, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.25} metalness={0.65} />
        </mesh>
      </group>

      <group position={[0, 0, -3.8]}>
        {Array.from({ length: Math.max(8, Math.round(10 * density)) }).map((_, i) => {
          const radius = 6 + i * 0.9;
          const y = -1.4 + i * 0.11;
          return (
            <mesh key={i} position={[0, y, -i * 1.5]} rotation={[Math.PI / 2, 0, frame * 0.01 + i * 0.06]}>
              <torusGeometry args={[radius, 0.025, 8, 70]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.6} metalness={0.1} />
            </mesh>
          );
        })}
      </group>
    </>
  );
};

const Intro3D: React.FC<{
  issueTitle: string;
  period: string;
  introTitle: string;
  introBody: string;
}> = ({ issueTitle, period, introTitle, introBody }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const reveal = spring({
    fps,
    frame,
    durationInFrames: 36,
    config: { damping: 13, stiffness: 140 },
  });

  return (
    <AbsoluteFill style={{ fontFamily: 'Arial Black, PingFang SC, sans-serif', color: 'white' }}>
      <ThreeCanvas width={width} height={height} camera={{ fov: 38, position: [0, 1.5, 9] }}>
        <ThreeWorld accent="#22d3ee" density={1.2} />
      </ThreeCanvas>

      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 104,
          borderRadius: 18,
          padding: '10px 20px',
          background: 'rgba(255,255,255,0.86)',
          color: '#0f172a',
          fontSize: 34,
          transform: `translateY(${(1 - reveal) * 18}px)`,
          opacity: reveal,
        }}
      >
        {introTitle}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 102,
          top: 200,
          width: 1300,
          fontSize: 102,
          lineHeight: 1.04,
          transform: `translateY(${(1 - reveal) * 24}px)`,
          opacity: reveal,
          textShadow: '0 10px 26px rgba(0,0,0,0.42)',
        }}
      >
        {issueTitle}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 104,
          top: 430,
          width: 980,
          fontSize: 44,
          lineHeight: 1.34,
          color: '#e2e8f0',
          opacity: interpolate(frame, [16, 38], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        {introBody}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 104,
          bottom: 110,
          fontSize: 56,
          color: '#dbeafe',
          opacity: 0.95,
        }}
      >
        {period}
      </div>
    </AbsoluteFill>
  );
};

const Library3D: React.FC<{ item: LibraryHotItem; rank: number; total: number }> = ({
  item,
  rank,
  total,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const panelIn = spring({
    fps,
    frame,
    durationInFrames: 30,
    config: { damping: 14, stiffness: 150 },
  });

  return (
    <AbsoluteFill style={{ fontFamily: 'Arial Black, PingFang SC, sans-serif', color: 'white' }}>
      <ThreeCanvas width={width} height={height} camera={{ fov: 40, position: [0, 1.3, 9.5] }}>
        <ThreeWorld accent={item.color} density={1} />
      </ThreeCanvas>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.66) 0%, rgba(0,0,0,0.5) 36%, rgba(0,0,0,0.18) 66%, rgba(0,0,0,0.2) 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 86,
          left: 88,
          borderRadius: 16,
          padding: '10px 18px',
          fontSize: 32,
          color: '#0f172a',
          background: item.color,
          transform: `translateY(${(1 - panelIn) * 20}px)`,
          opacity: panelIn,
        }}
      >
        库介绍 {rank}/{total}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 88,
          top: 180,
          width: 920,
          borderRadius: 28,
          padding: '42px 42px 36px',
          background: 'rgba(2, 6, 14, 0.74)',
          border: `2px solid ${item.color}88`,
          boxShadow: '0 14px 40px rgba(0,0,0,0.4)',
          transform: `translateY(${(1 - panelIn) * 22}px)`,
          opacity: panelIn,
        }}
      >
        <div style={{ fontSize: 88, lineHeight: 1, color: item.color }}>{item.name}</div>
        <div style={{ marginTop: 14, fontSize: 33, color: '#bfdbfe' }}>{item.repo}</div>
        <div style={{ marginTop: 24, fontSize: 38, color: '#e5e7eb', lineHeight: 1.34 }}>{item.short}</div>

        <div style={{ marginTop: 34, fontSize: 36, color: '#f8fafc' }}>亮点</div>
        {item.highlights.map((point, i) => {
          const show = interpolate(frame, [18 + i * 6, 30 + i * 6], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={point}
              style={{
                marginTop: 16,
                fontSize: 32,
                opacity: show,
                transform: `translateX(${(1 - show) * 16}px)`,
                color: '#f8fafc',
              }}
            >
              {i + 1}. {point}
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          right: 88,
          top: 180,
          width: 340,
          borderRadius: 24,
          padding: '28px 30px',
          background: 'rgba(2, 6, 14, 0.72)',
          border: '2px solid rgba(255,255,255,0.18)',
          boxShadow: '0 12px 34px rgba(0,0,0,0.4)',
          opacity: panelIn,
        }}
      >
        <div style={{ fontSize: 28, color: '#94a3b8' }}>Rank</div>
        <div style={{ fontSize: 96, color: item.color, lineHeight: 1 }}>#{item.rank}</div>
        <div style={{ marginTop: 16, fontSize: 28, color: '#94a3b8' }}>Weekly Stars</div>
        <div style={{ fontSize: 64, color: '#f8fafc' }}>+{item.weeklyStars}</div>
      </div>
    </AbsoluteFill>
  );
};

const Outro3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const pop = spring({
    fps,
    frame,
    durationInFrames: 24,
    config: { damping: 12, stiffness: 180 },
  });

  return (
    <AbsoluteFill style={{ fontFamily: 'Arial Black, PingFang SC, sans-serif', color: 'white' }}>
      <ThreeCanvas width={width} height={height} camera={{ fov: 38, position: [0, 1.4, 9] }}>
        <ThreeWorld accent="#f59e0b" density={0.8} />
      </ThreeCanvas>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 120,
          transform: `scale(${0.9 + 0.1 * pop})`,
          textShadow: '0 14px 36px rgba(0,0,0,0.55)',
        }}
      >
        下期再见
      </div>
    </AbsoluteFill>
  );
};

export const WeeklyHotTemplateTrue3D: React.FC<WeeklyHotTemplateProps> = ({
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
        <Intro3D
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
          <Library3D item={item} rank={index + 1} total={libraries.length} />
        </Sequence>
      ))}

      <Sequence
        from={introFrames + libraries.length * itemFrames}
        durationInFrames={outroFrames}
        premountFor={fps}
      >
        <Outro3D />
      </Sequence>
    </AbsoluteFill>
  );
};
