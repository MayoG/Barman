import styled from '@emotion/styled';
import { pdfjs, Document, Page } from 'react-pdf';
import { useState, useCallback, memo, useMemo } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

const SummaryContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  color: #ffffff;
  direction: rtl;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #d4af37;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 2rem;
`;

const PDFContainer = styled.div`
  background: rgba(10, 10, 10, 0.5);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 35%;
  max-width: 35%;
  overflow: hidden;
  min-height: 600px;

  @media (max-width: 768px) {
    width: 95%;
    max-width: 95%;
    min-height: 500px;
    height: auto;
  }
`;

const PDFWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
  flex: 1;

  @media (max-width: 768px) {
    gap: 0.5rem;
    justify-content: flex-start;
    height: auto;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: white;
  border-radius: 4px;
  padding: 0.5rem;
  max-width: 100%;
  overflow: hidden;
  height: 800px;
  min-width: 350px;
  width: 100%;
  flex: 1;
  position: relative;

  @media (max-width: 768px) {
    height: 450px;
    min-width: 280px;
    flex: 0;
  }
`;

const LoadingPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  color: #d4af37;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  text-align: center;
  padding: 1rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 4px;
  margin: 1rem 0;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 0;
  position: relative;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const Button = styled.button`
  background: rgba(212, 175, 55, 0.2);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: #d4af37;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(212, 175, 55, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

const PageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    order: -1;
    width: 100%;
    justify-content: center;
    margin-bottom: 0.5rem;
  }
`;

const PageInput = styled.input`
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: #d4af37;
  padding: 0.5rem;
  border-radius: 4px;
  width: 60px;
  text-align: center;
  direction: ltr;

  &:focus {
    outline: none;
    border-color: rgba(212, 175, 55, 0.5);
  }

  /* Hide number input spinners */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }

  @media (max-width: 768px) {
    width: 50px;
    padding: 0.4rem;
  }
`;

const PageInfo = styled.span`
  color: #d4af37;
  font-size: 1.1rem;
`;

const DownloadButton = styled(Button)`
  position: absolute;
  right: 0;
  background: rgba(46, 204, 113, 0.2);
  border-color: rgba(46, 204, 113, 0.3);
  color: #2ecc71;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  min-width: 40px;
  height: 40px;

  &:hover {
    background: rgba(46, 204, 113, 0.3);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    position: relative;
    right: auto;
  }
`;

// Memoized Page component to prevent unnecessary re-renders
const MemoizedPage = memo(({ pageNumber, scale }) => (
  <PageWrapper>
    <Page 
      pageNumber={pageNumber}
      renderTextLayer={true}
      renderAnnotationLayer={true}
      scale={scale}
      loading={<LoadingPlaceholder>טוען עמוד...</LoadingPlaceholder>}
      error={<ErrorMessage>שגיאה בטעינת העמוד</ErrorMessage>}
      width={window.innerWidth > 1200 ? 800 : window.innerWidth}
    />
  </PageWrapper>
));

MemoizedPage.displayName = 'MemoizedPage';

// Memoized Controls component
const MemoizedControls = memo(({ pageNumber, numPages, onPageChange, onPageInputChange, onPageInputSubmit, inputPage, onDownload }) => (
  <Controls>
    <Button
      type="button"
      disabled={pageNumber <= 1}
      onClick={() => onPageChange(-1)}
    >
      עמוד קודם
    </Button>
    <PageSelector>
      <form onSubmit={onPageInputSubmit}>
        <PageInput
          type="number"
          min="1"
          max={numPages}
          value={inputPage}
          onChange={onPageInputChange}
          placeholder={pageNumber}
        />
      </form>
      <PageInfo>מתוך {numPages || '--'}</PageInfo>
    </PageSelector>
    <Button
      type="button"
      disabled={pageNumber >= (numPages || 0)}
      onClick={() => onPageChange(1)}
    >
      עמוד הבא
    </Button>
    <DownloadButton onClick={onDownload} title="הורד PDF">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </DownloadButton>
  </Controls>
));

MemoizedControls.displayName = 'MemoizedControls';

function Summary() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [inputPage, setInputPage] = useState('');
  const [scale] = useState(0.7);

  const documentOptions = useMemo(() => ({
    cMapUrl: 'https://unpkg.com/pdfjs-dist@3.4.120/cmaps/',
    cMapPacked: true,
  }), []);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
  }, []);

  const changePage = useCallback((offset) => {
    setPageNumber(prevPageNumber => {
      const newPage = prevPageNumber + offset;
      return Math.min(Math.max(1, newPage), numPages);
    });
  }, [numPages]);

  const handlePageInputChange = useCallback((e) => {
    const value = e.target.value;
    setInputPage(value);
  }, []);

  const handlePageInputSubmit = useCallback((e) => {
    e.preventDefault();
    const page = parseInt(inputPage);
    if (page && page >= 1 && page <= numPages) {
      setPageNumber(page);
    }
    setInputPage('');
  }, [inputPage, numPages]);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = './summary.pdf';
    link.download = 'summary.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <SummaryContainer>
      <Title>סיכום</Title>
      <PDFContainer>
        <PDFWrapper>
          <Document
            file="./summary.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div>טוען...</div>}
            error={<ErrorMessage>שגיאה בטעינת המסמך. אנא ודא שהקובץ קיים</ErrorMessage>}
            options={documentOptions}
          >
            <MemoizedPage pageNumber={pageNumber} scale={scale} />
          </Document>
          <MemoizedControls
            pageNumber={pageNumber}
            numPages={numPages}
            onPageChange={changePage}
            onPageInputChange={handlePageInputChange}
            onPageInputSubmit={handlePageInputSubmit}
            inputPage={inputPage}
            onDownload={handleDownload}
          />
        </PDFWrapper>
      </PDFContainer>
    </SummaryContainer>
  );
}

export default memo(Summary); 