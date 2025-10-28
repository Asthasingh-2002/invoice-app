"use client"

import { useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "../styles/PDFUploadArea.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

function PDFUploadArea({ pdfFile, onUpload }) {
  const fileInputRef = useRef(null)
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type === "application/pdf") {
        onUpload(file)
      } else {
        alert("Please upload a PDF file")
      }
    }
  }

  const handleFileSelect = (e) => {
    const files = e.target.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type === "application/pdf") {
        onUpload(file)
      } else {
        alert("Please upload a PDF file")
      }
    }
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  return (
    <div className="pdf-upload-area">
      {!pdfFile ? (
        <div
          className={`upload-box ${dragActive ? "drag-active" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="upload-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="35" fill="#E3F2FD" stroke="#2196F3" strokeWidth="2" />
              <path d="M40 25V55M25 40H55" stroke="#2196F3" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <h3>Upload Your Invoice</h3>
          <p>To auto-populate fields and save time</p>
          <button type="button" className="upload-button" onClick={() => fileInputRef.current?.click()}>
            Upload File
          </button>
          <p className="drag-text">Click to upload or Drag and drop</p>
          <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileSelect} style={{ display: "none" }} />
        </div>
      ) : (
        <div className="pdf-viewer">
          <div className="pdf-header">
            <button type="button" className="remove-pdf-button" onClick={() => onUpload(null)}>
              ✕ Remove PDF
            </button>
          </div>
          <div className="pdf-container">
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
          {numPages && (
            <div className="pdf-pagination">
              <button disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)}>
                ← Previous
              </button>
              <span>
                Page {pageNumber} of {numPages}
              </span>
              <button disabled={pageNumber >= numPages} onClick={() => setPageNumber(pageNumber + 1)}>
                Next →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PDFUploadArea
