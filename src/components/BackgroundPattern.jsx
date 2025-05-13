import styled from '@emotion/styled';
import backgroundImage from '../assets/Fernet-Branca.png';
import { useState, useEffect } from 'react';

const PatternContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-image: url(${props => props.isLoaded ? backgroundImage : props.placeholder});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
  transition: opacity 0.3s ease;
  opacity: ${props => props.isLoaded ? 1 : 0.5};
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [placeholder] = useState('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMyYTI5MjkiLz48L3N2Zz4=');

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <>
      <PatternContainer isLoaded={isLoaded} placeholder={placeholder} />
      <GradientOverlay />
      <AccentOverlay />
    </>
  );
} 