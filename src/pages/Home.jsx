import styled from '@emotion/styled';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  direction: rtl;
`;

const Hero = styled.div`
  text-align: center;
  padding: 4rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
    z-index: -1;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
  animation: glow 2s ease-in-out infinite alternate;

  @keyframes glow {
    from {
      text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
    }
    to {
      text-shadow: 0 0 20px rgba(212, 175, 55, 0.5),
                   0 0 30px rgba(212, 175, 55, 0.3);
    }
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const FeatureCard = styled.div`
  background: rgba(10, 10, 10, 0.8);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(212, 175, 55, 0.1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(212, 175, 55, 0.3);
    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.1);
  }
`;

const FeatureTitle = styled.h3`
  color: #d4af37;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FeatureDescription = styled.p`
  color: #ffffff;
  line-height: 1.6;
  opacity: 0.9;
`;

function Home() {
  return (
    <HomeContainer>
      <Hero>
        <Title>פרנט ברנקה</Title>
        <Subtitle>
          חוו את המורשת העשירה והטעם הייחודי של האמארו האיטלקי האייקוני ביותר
        </Subtitle>
      </Hero>
      <Features>
        <FeatureCard>
          <FeatureTitle>מורשת</FeatureTitle>
          <FeatureDescription>
            מיוצר מאז 1845, המתכון הסודי שלנו משלב 27 עשבי תיבול ותבלינים מארבע יבשות
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>מסורת</FeatureTitle>
          <FeatureDescription>
            סמל לאומנות איטלקית ומסירות לאיכות
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>חוויה</FeatureTitle>
          <FeatureDescription>
            גלו את האיזון המושלם בין מריר ומתוק בכל לגימה
          </FeatureDescription>
        </FeatureCard>
      </Features>
    </HomeContainer>
  );
}

export default Home; 