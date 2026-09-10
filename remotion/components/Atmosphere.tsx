import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

export const Atmosphere: React.FC<{light?: boolean}> = ({light = false}) => {
  const frame = useCurrentFrame();
  const glowX = interpolate(Math.sin(frame / 95), [-1, 1], [24, 76]);
  return (
    <AbsoluteFill style={{pointerEvents: 'none', background: light ? '#f4eadc' : '#160e0b'}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at ${glowX}% 42%, rgba(217,164,65,.24), transparent 37%), radial-gradient(circle at 16% 80%, rgba(155,75,79,.2), transparent 34%)`}} />
      <AbsoluteFill style={{opacity: 0.065, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 180 180\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")'}} />
      <AbsoluteFill style={{boxShadow: 'inset 0 0 190px rgba(5,2,1,.75)'}} />
    </AbsoluteFill>
  );
};
