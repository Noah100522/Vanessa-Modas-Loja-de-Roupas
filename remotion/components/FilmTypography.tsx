import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

type FilmTypographyProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
};

export const FilmTypography: React.FC<FilmTypographyProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = true,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrance = spring({frame, fps, config: {damping: 180, stiffness: 80, mass: 1.1}});

  return (
    <div style={{textAlign: align, color: dark ? '#fffaf2' : '#2b1d16'}}>
      {eyebrow ? (
        <div style={{fontFamily: 'Arial, sans-serif', fontSize: 16, fontWeight: 700, letterSpacing: '0.34em', textTransform: 'uppercase', marginBottom: 28, opacity: interpolate(frame, [0, 24], [0, 0.75], {extrapolateRight: 'clamp'}), translate: `0 ${interpolate(entrance, [0, 1], [18, 0])}px`}}>
          {eyebrow}
        </div>
      ) : null}
      <div style={{fontFamily: 'Georgia, serif', fontSize: title.length > 20 ? 82 : 118, fontWeight: 600, lineHeight: 0.92, letterSpacing: '-0.055em', opacity: entrance, scale: interpolate(entrance, [0, 1], [0.88, 1]), filter: `blur(${interpolate(entrance, [0, 1], [18, 0])}px)`}}>
        {title}
      </div>
      {subtitle ? (
        <div style={{fontFamily: 'Arial, sans-serif', fontSize: 21, letterSpacing: '0.09em', marginTop: 28, opacity: interpolate(frame, [18, 50], [0, 0.82], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}), translate: `0 ${interpolate(frame, [18, 50], [16, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px`}}>
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};
