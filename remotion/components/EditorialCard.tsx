import React from 'react';
import {CanvasImage, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

type EditorialCardProps = {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  rotate?: number;
  delay?: number;
  label?: string;
  fit?: 'cover' | 'contain';
};

export const EditorialCard: React.FC<EditorialCardProps> = ({src, x, y, width, height, depth, rotate = 0, delay = 0, label, fit = 'cover'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = interpolate(frame, [delay, delay + 0.7 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const drift = Math.sin((frame + delay) / 55) * (5 + depth / 90);
  const depthScale = 1 + depth / 1700;

  return (
    <div style={{position: 'absolute', left: x, top: y, width, height, border: '8px solid rgba(255,250,242,.94)', background: '#261b16', overflow: 'hidden', opacity: reveal, transformStyle: 'preserve-3d', transform: `translate3d(0, ${interpolate(reveal, [0, 1], [80, drift])}px, ${depth}px) rotateY(${rotate * -0.35 + drift * 0.05}deg) rotateX(${drift * -0.08}deg) rotateZ(${rotate}deg) scale(${interpolate(reveal, [0, 1], [0.84, depthScale])})`, boxShadow: `0 ${30 + depth / 8}px ${70 + depth / 4}px rgba(16,8,5,.34)`, borderRadius: 4}}>
      <CanvasImage src={src} style={{width: '100%', height: '100%', objectFit: fit, scale: 1.035}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(20,10,7,.58))'}} />
      {label ? <div style={{position: 'absolute', left: 22, bottom: 20, color: '#fff', fontFamily: 'Arial, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.22em'}}>{label}</div> : null}
    </div>
  );
};
