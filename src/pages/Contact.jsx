import styled from '@emotion/styled';

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #ffffff;
  direction: rtl;
`;

const Title = styled.h1`
  color: #d4af37;
  margin-bottom: 2rem;
`;

function Contact() {
  return (
    <ContactContainer>
      <Title>צור קשר</Title>
      <p>בקרוב...</p>
    </ContactContainer>
  );
}

export default Contact; 