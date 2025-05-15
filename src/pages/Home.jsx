import styled from '@emotion/styled';
import { FaInstagram, FaFacebook, FaTiktok, FaLinkedin } from 'react-icons/fa';
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

const InstagramLinks = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 1rem;
`;

const InstagramLink = styled.a`
  color: #d4af37;
  font-size: 1.2rem;
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #ffffff;
  }

  svg {
    font-size: 1.4rem;
  }
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
  padding: 10rem 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const WinnersTitle = styled.h2`
  color: #d4af37;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  z-index: 2;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
`;

const WinnersSubtitle = styled.h3`
  color: #ffffff;
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.5rem;
  font-weight: normal;
  opacity: 0.9;
  position: relative;
  z-index: 2;
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
  justify-content: flex-start;
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
    padding: 0;
    margin: 0 -1rem 2rem -1rem;
    width: calc(100% + 2rem);

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 60px;
      background: linear-gradient(to left, transparent, rgba(0, 0, 0, 0.7));
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &::before {
      content: '←';
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: #d4af37;
      font-size: 24px;
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
      text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      z-index: 2;
    }

    &.has-more::after,
    &.has-more::before {
      opacity: 1;
    }

    &.has-more:hover::before {
      transform: translateY(-50%) translateX(-5px);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1rem;
    transition: transform 0.3s ease;
    opacity: ${props => props.isLoaded ? 1 : 0};
    transition: opacity 0.3s ease;

    @media (max-width: 768px) {
      scroll-snap-align: center;
      flex: 0 0 100%;
      min-width: 100%;
      padding: 1rem;
    }
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1rem;

    @media (max-width: 768px) {
      scroll-snap-align: center;
      flex: 0 0 100%;
      min-width: 100%;
      padding: 1rem;
    }
  }

  .youtube-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: #000;

    @media (max-width: 768px) {
      scroll-snap-align: center;
      flex: 0 0 100%;
      min-width: 100%;
    }

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

const StorySection = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const StoryTitle = styled.h2`
  color: #d4af37;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  z-index: 2;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
`;

const StoryContent = styled.div`
  background: rgba(10, 10, 10, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  margin: 0 auto;
  max-width: 800px;
  position: relative;
  z-index: 1;
`;

const StoryParagraph = styled.p`
  color: #ffffff;
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  text-align: right;

  &:last-child {
    margin-bottom: 0;
  }
`;

function Home() {
  const [zoomedImage, setZoomedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

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

  const handleImageLoad = (winnerId) => {
    setLoadedImages(prev => ({
      ...prev,
      [winnerId]: true
    }));
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
        <InstagramLinks>
          <InstagramLink href="https://instagram.com/the.scottish" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
            the.scottish
          </InstagramLink>
          <InstagramLink href="https://instagram.com/zmanamiti" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
            zmanamiti
          </InstagramLink>
        </InstagramLinks>
      </Hero>

      <StorySection>
        <StoryTitle>הסיפור שלנו</StoryTitle>
        <StoryContent>
          <StoryParagraph>
            פרנט ברנקה נולד בשנת 1845 במילאנו, איטליה, כאשר ברנרדינו ברנקה יצר את המתכון הסודי הראשון. המתכון המקורי, שעובר מדור לדור, משלב 27 עשבי תיבול ותבלינים מארבע יבשות שונות, כולל מור, קמומיל, רוזמרי, כורכום, וספיגנום.
          </StoryParagraph>
          <StoryParagraph>
            המשקה, שהיה במקור תרופה, הפך במהרה לסמל של תרבות האוכל והשתייה האיטלקית. הוא נחשב לאחד האמארו המסורתיים החשובים ביותר, עם טעם מריר-מתוק מורכב שמשלב עשבי תיבול, תבלינים, וסוכר.
          </StoryParagraph>
          <StoryParagraph>
            כיום, פרנט ברנקה הוא לא רק משקה, אלא חלק בלתי נפרד מהמורשת האיטלקית. הוא מוגש בבתי קפה, מסעדות, ובתים ברחבי העולם, ומשמש כבסיס למגוון קוקטיילים קלאסיים ומודרניים כאחד.
          </StoryParagraph>
        </StoryContent>
      </StorySection>

      <Features>
        <FeatureCard>
          <FeatureTitle>מורשת</FeatureTitle>
          <FeatureDescription>
            מאז 1845, על פי מתכון סודי העובד מדור לדור – שילוב מרתק של 27 עשבי תיבול ותבלינים מארבע יבשות
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>מסורת</FeatureTitle>
          <FeatureDescription>
            מסורת איטלקית של דיוק, אומנות וחתירה לאיכות בלתי מתפשרת
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>חוויה</FeatureTitle>
          <FeatureDescription>
            טעם עז, איזון מושלם בין מרירות לעדינות – חוויה בלתי נשכחת בכל לגימה
          </FeatureDescription>
        </FeatureCard>
      </Features>

      <WinnersSection>
        <WinnersTitle>זוכי תחרות פרנט ברנקה</WinnersTitle>
        <WinnersSubtitle>גלריית הזוכים המרשימים שלנו לאורך השנים</WinnersSubtitle>
        <WinnersGrid>
          {sortedWinners.map((winner) => (
            <WinnerCard key={winner.id}>
              <WinnerMedia className={winner.media.length > 1 ? 'has-more' : ''} isLoaded={loadedImages[winner.id]}>
                {winner.media.map((item, index) => {
                  if (item.type === "image") {
                    return (
                      <img 
                        key={index} 
                        src={item.url} 
                        alt={`${winner.name}'s creation`}
                        style={{ cursor: 'zoom-in' }}
                        onClick={() => handleImageClick(winner.id, item.url)}
                        loading="lazy"
                        onLoad={() => handleImageLoad(winner.id)}
                      />
                    );
                  } else if (item.type === "video") {
                    return (
                      <video 
                        key={index} 
                        src={item.url} 
                        controls 
                        loading="lazy"
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
                  {winner.social.linkedin && (
                    <SocialLink href={winner.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
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