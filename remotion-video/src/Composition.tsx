import { interpolate, useCurrentFrame, useVideoConfig, AbsoluteFill, Video, staticFile } from 'remotion';

export const MasterclassPreview: React.FC<{
  title: string;
  subtitle: string;
}> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 자막 애니메이션 (Glassmorphism + 페이드 인)
  const opacity = interpolate(frame, [0, 45], [0, 1]);
  const slideUp = interpolate(frame, [0, 45], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a' }}>
      {/* 힉스필드 배경 영상 (파일이 없으면 다크 네이비 배경) */}
      <Video 
        src={staticFile("higgsfield_bg.mp4")} 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.6,
        }}
        onError={(e) => console.log("Higgsfield video not found, using fallback color")}
      />

      {/* 프리미엄 UI 오버레이 */}
      <AbsoluteFill style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        background: 'radial-gradient(circle, transparent 40%, rgba(15, 23, 42, 0.8) 100%)'
      }}>
        
        {/* 브랜딩 뱃지 */}
        <div style={{
          opacity,
          transform: `translateY(${slideUp}px)`,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          padding: '20px 60px',
          borderRadius: '100px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '60px'
        }}>
          <span style={{ 
            color: '#a78bfa', 
            fontSize: '32px', 
            letterSpacing: '5px',
            fontWeight: 'bold'
          }}>💎 PAJAMABOSS PREMIUM MASTERCLASS</span>
        </div>

        {/* 메인 타이틀 */}
        <h1 style={{
          opacity,
          transform: `translateY(${slideUp}px)`,
          fontSize: '110px',
          color: 'white',
          fontWeight: 900,
          lineHeight: 1.2,
          textShadow: '0 10px 40px rgba(0,0,0,0.5)'
        }}>
          {title.split('\n').map((line, i) => <div key={i}>{line}</div>)}
        </h1>

        <div style={{
          height: '4px',
          width: '300px',
          background: 'linear-gradient(90deg, transparent, #a78bfa, transparent)',
          margin: '50px 0',
          opacity
        }} />

        <h2 style={{
          opacity,
          fontSize: '48px',
          color: '#94a3b8',
          fontWeight: 500
        }}>
          {subtitle}
        </h2>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
