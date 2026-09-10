import React from 'react';
import {Composition} from 'remotion';
import {FashionFilm} from './VanessaFashionFilm';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="VanessaFashionFilm"
    component={FashionFilm}
    durationInFrames={1260}
    fps={60}
    width={1440}
    height={1125}
  />
);
