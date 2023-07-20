import React, { useContext, useEffect, useState } from "react";
import "./Uploader.scss";
import { Document, Page, pdfjs } from "react-pdf";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import AppContext from "../../context";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.8.162/pdf.worker.min.js`;

interface PDFPreviewProps {
  pdfFile: File | any;
}

const PDFContentExtractor: React.FC<any> = (pdfFile) => {
  const { setFileContent } = React.useContext(AppContext);
  let text = "";

  useEffect(() => {
    const extractContent = async () => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfData = e.target?.result;
        const pdfArray = new Uint8Array(pdfData as ArrayBuffer);

        try {
          const loadingTask = getDocument({ data: pdfArray });
          const pdf = await loadingTask.promise;
          const totalNumPages = pdf.numPages;
          for (let i = 1; i <= totalNumPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item: any) => item.str).join(" ");
          }
          setFileContent(text);
        } catch (error) {
          console.error("Error loading PDF:", error);
          return error;
        }
      };

      reader.readAsArrayBuffer(pdfFile);
    };

    extractContent();
  }, [text, pdfFile]);

  return <div>PDF Content Extractor</div>;
};

export const RenderFilePreview: React.FC<PDFPreviewProps> = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  return (
    <div className="pdf-preview">
      <Document
        file={pdfFile}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading="Please wait..."
        renderMode="canvas"
        className={"pdf-preview"}
        onPassword={() => {
          throw new Error("PDF is locked");
        }}
      >
        <Page
          height={500}
          className="pdf-preview__page"
          pageNumber={pageNumber}
        />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div className="pdf-preview__controls">
        <button
          disabled={pageNumber <= 1}
          onClick={() => handlePageChange(pageNumber - 1)}
        >
          Previous Page
        </button>
        <button
          disabled={(numPages && pageNumber >= numPages) || false}
          onClick={() => handlePageChange(pageNumber + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};
const FileUploader: React.FC<any> = () => {
  const { selectedFile, setSelectedFile } = useContext(AppContext);
  PDFContentExtractor(selectedFile);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const allowedFileTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const selectedFile = Array.from(files).filter((file) =>
        allowedFileTypes.includes(file.type)
      );
      if (selectedFile.length !== files.length) {
        throw new Error(
          "Unsupported file type. Only PDF and DOC files are allowed."
        );
      }
      if (setSelectedFile) {
        setSelectedFile(selectedFile[0]);
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && setSelectedFile) {
      setSelectedFile(files[0]);
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className="file-uploader"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input type="file" id="file-input" onChange={handleFileSelect} />
      <label htmlFor="file-input">
        {selectedFile ? "Change PDF" : "Choose Files or Drag and Drop Here"}
      </label>
      {/* <div className="selected-files">
        {selectedFile && <RenderFilePreview pdfFile={selectedFile} />}
      </div> */}
    </div>
  );
};

export default FileUploader;
