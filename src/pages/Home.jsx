import styled from '@emotion/styled';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { useState } from 'react';
import YouTube from 'react-youtube';
import winnersData from '../data/winners.json';

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

const WinnersSection = styled.section`
  padding: 2rem 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const WinnersTitle = styled.h2`
  color: #d4af37;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const WinnersGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 1rem;
`;

const WinnerCard = styled.div`
  background: rgba(10, 10, 10, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  &:hover {
    transform: translateY(-5px);
  }
`;

const WinnerMedia = styled.div`
  width: 100%;
  max-width: 800px;
  height: 500px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-bottom: 2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1rem;
    transition: transform 0.3s ease;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1rem;
  }

  .youtube-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: #000;

    iframe {
      width: 100% !important;
      height: 100% !important;
      padding: 0;
    }
  }
`;

const WinnerInfo = styled.div`
  color: #ffffff;
  text-align: center;
  max-width: 800px;
  width: 100%;
`;

const WinnerName = styled.h3`
  color: #d4af37;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
`;

const WinnerDate = styled.p`
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const WinnerDescription = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
  justify-content: center;
`;

const SocialLink = styled.a`
  color: #d4af37;
  font-size: 1.8rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
  }
`;

const ZoomOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: zoom-out;
  padding: 2rem;
`;

const ZoomedImage = styled.img`
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
  transition: transform 0.3s ease;
  cursor: zoom-out;
`;

function Home() {
  const [zoomedImage, setZoomedImage] = useState(null);

  const handleImageClick = (winnerId, imageUrl) => {
    setZoomedImage(zoomedImage === winnerId ? null : { id: winnerId, url: imageUrl });
  };

  const handleZoomedImageClick = () => {
    setZoomedImage(null);
  };

  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Sort winners by ID in descending order
  const sortedWinners = [...winnersData.winners].sort((a, b) => b.id - a.id);

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

      <WinnersSection>
        <WinnersTitle>זוכי תחרות פרנה ברנקה</WinnersTitle>
        <WinnersGrid>
          {sortedWinners.map((winner) => (
            <WinnerCard key={winner.id}>
              <WinnerMedia>
                {winner.media.map((item, index) => {
                  if (item.type === "image") {
                    return (
                      <img 
                        key={index} 
                        src={item.url} 
                        alt={`${winner.name}'s creation`}
                        style={{ cursor: 'zoom-in' }}
                        onClick={() => handleImageClick(winner.id, item.url)}
                      />
                    );
                  } else if (item.type === "video") {
                    return (
                      <video 
                        key={index} 
                        src={item.url} 
                        controls 
                      />
                    );
                  } else if (item.type === "youtube") {
                    const videoId = getYouTubeVideoId(item.url);
                    return videoId ? (
                      <div key={index} className="youtube-container">
                        <YouTube
                          videoId={videoId}
                          opts={{
                            width: '100%',
                            height: '100%',
                            playerVars: {
                              autoplay: 0,
                              modestbranding: 1,
                              rel: 0,
                              controls: 1,
                              showinfo: 0
                            }
                          }}
                          style={{
                            width: '100%',
                            height: '100%'
                          }}
                        />
                      </div>
                    ) : null;
                  }
                  return null;
                })}
              </WinnerMedia>
              <WinnerInfo>
                <WinnerName>{winner.name}</WinnerName>
                <WinnerDate>{winner.date}</WinnerDate>
                <WinnerDescription>{winner.description}</WinnerDescription>
                <SocialLinks>
                  {winner.social.instagram && (
                    <SocialLink href={winner.social.instagram} target="_blank" rel="noopener noreferrer">
                      <FaInstagram />
                    </SocialLink>
                  )}
                  {winner.social.facebook && (
                    <SocialLink href={winner.social.facebook} target="_blank" rel="noopener noreferrer">
                      <FaFacebook />
                    </SocialLink>
                  )}
                  {winner.social.tiktok && (
                    <SocialLink href={winner.social.tiktok} target="_blank" rel="noopener noreferrer">
                      <FaTiktok />
                    </SocialLink>
                  )}
                </SocialLinks>
              </WinnerInfo>
            </WinnerCard>
          ))}
        </WinnersGrid>
      </WinnersSection>

      {zoomedImage && (
        <ZoomOverlay onClick={handleZoomedImageClick}>
          <ZoomedImage 
            src={zoomedImage.url} 
            alt="Zoomed view"
            onClick={(e) => {
              e.stopPropagation();
              handleZoomedImageClick();
            }}
          />
        </ZoomOverlay>
      )}
    </HomeContainer>
  );
}

export default Home; 