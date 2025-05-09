import styled from '@emotion/styled';

const AboutContainer = styled.div`
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

function About() {
  return (
    <AboutContainer>
      <Title>אודות פרנט ברנקה</Title>
      <p>בקרוב...</p>
    </AboutContainer>
  );
}

export default About; 