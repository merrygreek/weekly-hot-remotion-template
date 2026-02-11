import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const gridStyle: React.CSSProperties = {
  position: 'absolute',
  inset: -320,
  backgroundColor: '#1f2229',
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
  backgroundSize: '110px 110px',
  transform: 'perspective(1000px) rotateX(17deg) rotateZ(-2deg)',
  transformOrigin: 'center center',
};

const handColor = '#f2d5c3';

export const HotTopic102: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const leftY = interpolate(frame, [0, 22], [40, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const phoneIn = spring({
    fps,
    frame,
    config: {
      damping: 16,
      stiffness: 120,
      mass: 0.8,
    },
    durationInFrames: 42,
  });

  const phoneX = interpolate(phoneIn, [0, 1], [460, 0]);
  const phoneRotate = interpolate(phoneIn, [0, 1], [22, 13]);

  const tagPop = spring({
    fps,
    frame: frame - 8,
    config: {
      damping: 12,
      stiffness: 180,
    },
    durationInFrames: 30,
  });

  const navOpacity = interpolate(frame, [25, 45], [0, 0.75], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ fontFamily: 'Arial Black, PingFang SC, sans-serif', opacity: fadeIn }}>
      <div style={gridStyle} />

      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 34,
          padding: '10px 18px 10px 10px',
          borderRadius: 22,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(45, 49, 57, 0.75)',
          border: '2px solid rgba(255, 255, 255, 0.08)',
          color: '#dbe0ea',
          transform: `translateY(${leftY * 0.4}px)`,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: 'linear-gradient(150deg,#ff67b8,#ff5f59 55%,#6b5cff)',
            display: 'grid',
            placeItems: 'center',
            color: 'white',
            fontSize: 36,
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          ▣
        </div>
        <div>
          <div style={{ fontSize: 57, fontWeight: 900, letterSpacing: 1 }}>云视听小电视</div>
          <div style={{ fontSize: 18, opacity: 0.8, marginTop: 2 }}>开电视 看B站TV版</div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 140, top: 250, transform: `translateY(${leftY}px)` }}>
        <div style={{ color: 'white', fontSize: 190, fontWeight: 900, lineHeight: 0.9 }}>一周</div>
        <div
          style={{
            color: '#ffe100',
            fontSize: 260,
            fontWeight: 900,
            marginTop: -6,
            lineHeight: 0.85,
            textShadow: '0 4px 0 rgba(0,0,0,0.25)',
          }}
        >
          热点
        </div>
        <div
          style={{
            color: '#d9e8f4',
            fontSize: 102,
            marginTop: 38,
            fontWeight: 900,
            letterSpacing: 1,
          }}
        >
          2025/1/25 - 2026/1/31
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 112,
          top: 120,
          width: 700,
          height: 850,
          transform: `translateX(${phoneX}px) rotate(${phoneRotate}deg)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -10,
            top: 90,
            width: 330,
            height: 560,
            background: handColor,
            borderRadius: '180px 130px 190px 220px',
            transform: 'rotate(-11deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 215,
            top: 540,
            width: 120,
            height: 130,
            background: handColor,
            borderRadius: '60px 60px 50px 50px',
            transform: 'rotate(-12deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 265,
            top: 630,
            width: 90,
            height: 110,
            background: handColor,
            borderRadius: '50px 50px 40px 40px',
            transform: 'rotate(-7deg)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: 130,
            top: 10,
            width: 405,
            height: 760,
            borderRadius: 52,
            background: '#0d0f14',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            padding: 14,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 42,
              background: '#f7f7f8',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 130,
                height: 30,
                borderBottomLeftRadius: 18,
                borderBottomRightRadius: 18,
                background: '#0d0f14',
              }}
            />

            <div
              style={{
                position: 'absolute',
                top: 170,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#111320',
              }}
            >
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 999,
                  background: '#1c1f2c',
                  color: 'white',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 44,
                  fontWeight: 900,
                }}
              >
                GH
              </div>
              <div style={{ fontSize: 80, fontWeight: 900, marginTop: 20 }}>GitHub</div>

              <div
                style={{
                  marginTop: 82,
                  background: '#ff1f4e',
                  color: 'white',
                  borderRadius: 30,
                  fontSize: 95,
                  fontWeight: 900,
                  letterSpacing: 1,
                  padding: '14px 48px',
                  transform: `scale(${0.8 + 0.2 * tagPop})`,
                }}
              >
                #102
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 48,
          width: '100%',
          textAlign: 'center',
          color: 'white',
          fontSize: 56,
          fontWeight: 900,
          textShadow: '0 4px 12px rgba(0,0,0,0.65)',
          letterSpacing: 1,
        }}
      >
        GitHub一周热点汇总第102期
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 52,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          color: 'rgba(255,255,255,0.92)',
          fontSize: 36,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(8px)',
          opacity: navOpacity,
        }}
      >
        <span>引言</span>
        <span>openclaw</span>
        <span>remotion</span>
        <span>kimi K2.5</span>
        <span>PageIndex</span>
        <span>langextract</span>
        <span>one more thing</span>
      </div>
    </AbsoluteFill>
  );
};
