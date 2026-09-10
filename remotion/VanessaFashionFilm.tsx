import React from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Atmosphere} from './components/Atmosphere';
import {EditorialCard} from './components/EditorialCard';
import {FilmTypography} from './components/FilmTypography';
import {fashionImages} from './images';

const fade = (frame: number, duration: number) => interpolate(frame, [0, 32, duration - 36, duration], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return <AbsoluteFill style={{opacity: fade(frame, durationInFrames), alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
    <Atmosphere />
    <div style={{position: 'absolute', width: 640, height: 640, border: '1px solid rgba(241,210,139,.2)', borderRadius: '50%', scale: interpolate(frame, [0, durationInFrames], [0.6, 1.9]), opacity: interpolate(frame, [0, durationInFrames], [0.7, 0])}} />
    <div style={{transform: `perspective(1200px) translate3d(0,0,${interpolate(frame, [0, durationInFrames], [-280, 640], {easing: Easing.inOut(Easing.cubic)})}px)`, zIndex: 2}}>
      <FilmTypography eyebrow="Fashion film · 2026" title="VANESSA MODAS" subtitle="A TENDÊNCIA É SER FELIZ" />
    </div>
  </AbsoluteFill>;
};

const GalleryOne: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const cameraZ = interpolate(frame, [0, durationInFrames], [-520, 420], {easing: Easing.inOut(Easing.cubic)});
  return <AbsoluteFill style={{opacity: fade(frame, durationInFrames), overflow: 'hidden', perspective: 1400}}>
    <Atmosphere />
    <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `translate3d(${interpolate(frame, [0, durationInFrames], [70, -85])}px, ${interpolate(frame, [0, durationInFrames], [35, -35])}px, ${cameraZ}px) rotateY(${interpolate(frame, [0, durationInFrames], [-7, 5])}deg)`}}>
      <EditorialCard src={fashionImages[0]} x={430} y={90} width={600} height={870} depth={-80} rotate={1} label="NEW COLLECTION" />
      <EditorialCard src={fashionImages[2]} x={-70} y={140} width={390} height={590} depth={170} rotate={-7} label="FEMININO" delay={18} />
      <EditorialCard src={fashionImages[3]} x={1090} y={230} width={340} height={510} depth={230} rotate={7} label="MASCULINO" delay={32} />
      <div style={{position: 'absolute', left: 86, top: 850, transform: 'translateZ(270px)', color: '#fffaf2'}}><FilmTypography eyebrow="Vanessa Modas" title="Nova Coleção" align="left" /></div>
    </div>
  </AbsoluteFill>;
};

const DetailScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return <AbsoluteFill style={{opacity: fade(frame, durationInFrames), overflow: 'hidden', perspective: 1600}}>
    <Atmosphere light />
    <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `translate3d(${interpolate(frame, [0, durationInFrames], [-100, 90])}px,0,${interpolate(frame, [0, durationInFrames], [120, -260])}px) rotateY(${interpolate(frame, [0, durationInFrames], [7, -5])}deg)`}}>
      <EditorialCard src={fashionImages[4]} x={70} y={85} width={550} height={880} depth={120} rotate={-3} label="TEXTURE · FORM · ATTITUDE" />
      <EditorialCard src={fashionImages[5]} x={690} y={40} width={680} height={470} depth={-40} rotate={3} label="ELEGÂNCIA" delay={14} />
      <EditorialCard src={fashionImages[7]} x={760} y={610} width={520} height={360} depth={190} rotate={-2} label="DETAILS" delay={30} />
      <div style={{position: 'absolute', left: 700, top: 510, width: 600, transform: 'translateZ(260px)', color: '#2b1d16'}}><FilmTypography title="Elegância em movimento" align="left" dark={false} /></div>
    </div>
  </AbsoluteFill>;
};

const IdentityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const sweep = interpolate(frame, [0, durationInFrames], [-140, 130], {easing: Easing.inOut(Easing.cubic)});
  return <AbsoluteFill style={{opacity: fade(frame, durationInFrames), overflow: 'hidden', perspective: 1500}}>
    <Atmosphere />
    <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `translate3d(${sweep}px,0,${interpolate(frame, [0, durationInFrames], [-260, 230])}px) rotateY(${interpolate(frame, [0, durationInFrames], [-5, 8])}deg)`}}>
      <EditorialCard src={fashionImages[6]} x={500} y={35} width={520} height={820} depth={-30} rotate={2} label="VANESSA MODAS" />
      <EditorialCard src={fashionImages[1]} x={30} y={360} width={430} height={650} depth={240} rotate={-6} label="STYLE" delay={18} />
      <EditorialCard src={fashionImages[2]} x={1070} y={210} width={400} height={610} depth={180} rotate={6} label="IDENTITY" delay={30} />
      <div style={{position: 'absolute', left: 510, top: 870, width: 650, transform: 'translateZ(300px)'}}><FilmTypography title="Seu estilo. Sua identidade." align="left" /></div>
    </div>
  </AbsoluteFill>;
};

const Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return <AbsoluteFill style={{opacity: fade(frame, durationInFrames), alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
    <Atmosphere />
    <div style={{position: 'absolute', width: 820, height: 820, border: '1px solid rgba(241,210,139,.22)', borderRadius: '50%', scale: interpolate(frame, [0, durationInFrames], [1.4, 0.8])}} />
    <div style={{zIndex: 2, scale: interpolate(frame, [0, durationInFrames], [1.12, 0.92]), filter: `blur(${interpolate(frame, [durationInFrames - 28, durationInFrames], [0, 9], {extrapolateLeft: 'clamp'})}px)`}}>
      <FilmTypography eyebrow="São José dos Pinhais · PR" title="VANESSA MODAS" subtitle="VISTA SUA MELHOR VERSÃO." />
    </div>
  </AbsoluteFill>;
};

export const FashionFilm: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#160e0b'}}>
    <Sequence durationInFrames={210}><Opening /></Sequence>
    <Sequence from={180} durationInFrames={330}><GalleryOne /></Sequence>
    <Sequence from={480} durationInFrames={310}><DetailScene /></Sequence>
    <Sequence from={760} durationInFrames={300}><IdentityScene /></Sequence>
    <Sequence from={1030} durationInFrames={230}><Finale /></Sequence>
  </AbsoluteFill>
);
