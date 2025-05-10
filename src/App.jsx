import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from '@emotion/styled';
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

function App() {
  return (
    <Router>
      <AppContainer>
        <BackgroundPattern />
        <Nav>
          <NavContainer>
            <Logo>פרנט ברנקה</Logo>
            <NavLinks>
              <StyledLink to="/">בית</StyledLink>
              <StyledLink to="/summary">סיכום</StyledLink>
              <StyledLink to="/game">משחק</StyledLink>
              <StyledLink to="/contact">צור קשר</StyledLink>
            </NavLinks>
          </NavContainer>
        </Nav>
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
