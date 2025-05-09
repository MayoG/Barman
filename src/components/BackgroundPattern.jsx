import styled from '@emotion/styled';
import backgroundImage from '../assets/Fernet-Branca.png';

const PatternContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
`;

const GradientOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(26, 26, 26, 0.8) 0%,
    rgba(10, 10, 10, 0.95) 100%
  );
  z-index: 0;
  pointer-events: none;
`;

const AccentOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(212, 175, 55, 0.2) 0%,
    transparent 70%
  );
  z-index: 0;
  pointer-events: none;
`;

export default function BackgroundPattern() {
  return (
    <>
      <PatternContainer />
      <GradientOverlay />
      <AccentOverlay />
    </>
  );
} 