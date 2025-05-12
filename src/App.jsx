import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useState } from 'react';
import Home from './pages/Home';
import Summary from './pages/Summary';
import Contact from './pages/Contact';
import Game from './pages/Game';
import BackgroundPattern from './components/BackgroundPattern';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: transparent;
  color: #d4af37;
  position: relative;
  direction: rtl;
`;

const Nav = styled.nav`
  background-color: rgba(10, 10, 10, 0.7);
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #d4af37;
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    right: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d4af37, transparent);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-100%'};
  width: 250px;
  height: 100vh;
  background-color: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(8px);
  padding: 2rem;
  transition: right 0.3s ease-in-out;
  z-index: 1001;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #d4af37;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1002;

  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledLink = styled(Link)`
  color: #d4af37;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 2px;
    background-color: #d4af37;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #ffffff;
    text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);

    &::after {
      width: 100%;
    }
  }
`;

const Overlay = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Router>
      <AppContainer>
        <BackgroundPattern />
        <Nav>
          <NavContainer>
            <Logo>פרנט ברנקה</Logo>
            <NavLinks>
              <StyledLink to="/" onClick={closeMenu}>בית</StyledLink>
              <StyledLink to="/summary" onClick={closeMenu}>סיכום</StyledLink>
              <StyledLink to="/game" onClick={closeMenu}>משחק</StyledLink>
              <StyledLink to="/contact" onClick={closeMenu}>צור קשר</StyledLink>
            </NavLinks>
            <HamburgerButton onClick={toggleMenu}>
              {isMenuOpen ? '✕' : '☰'}
            </HamburgerButton>
          </NavContainer>
        </Nav>
        <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
        <MobileMenu isOpen={isMenuOpen}>
          <StyledLink to="/" onClick={closeMenu}>בית</StyledLink>
          <StyledLink to="/summary" onClick={closeMenu}>סיכום</StyledLink>
          <StyledLink to="/game" onClick={closeMenu}>משחק</StyledLink>
          <StyledLink to="/contact" onClick={closeMenu}>צור קשר</StyledLink>
        </MobileMenu>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/game" element={<Game />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
