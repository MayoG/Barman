import styled from '@emotion/styled';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #ffffff;
  direction: rtl;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 100px;
`;

const Title = styled.h1`
  color: #d4af37;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.5rem;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
`;

const ContactCard = styled.div`
  background: rgba(10, 10, 10, 0.5);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.1);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #d4af37;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(212, 175, 55, 0.2);
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.5rem;
  }
`;

const ContactText = styled.p`
  color: #ffffff;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
`;

function Contact() {
  return (
    <ContactContainer>
      <Title>צור קשר</Title>
      <ContactCard>
        <ContactText>
          יש לך שאלות או הצעות? אשמח לשמוע ממך! צור איתי קשר דרך אחד מהערוצים הבאים:
        </ContactText>
        <ContactLinks>
          <ContactLink href="https://www.instagram.com/guy_mayo" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
            <span>@guy_mayo</span>
          </ContactLink>
          <ContactLink href="https://www.linkedin.com/in/guy-mayo" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
            <span>Guy Mayo</span>
          </ContactLink>
          <ContactLink href="mailto:mayoguy12@gmail.com">
            <FaEnvelope />
            <span>mayoguy12@gmail.com</span>
          </ContactLink>
        </ContactLinks>
      </ContactCard>
    </ContactContainer>
  );
}

export default Contact; 