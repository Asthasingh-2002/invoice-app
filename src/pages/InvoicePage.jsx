"use client"

import { useState, useEffect } from "react"
import InvoiceForm from "../components/InvoiceForm"
import PDFUploadArea from "../components/PDFUploadArea"
import Header from "../components/Header"
import "../styles/InvoicePage.css"

function InvoicePage({ onLogout }) {
  const [pdfFile, setPdfFile] = useState(null)
  const [formData, setFormData] = useState(null)

  useEffect(() => {
    // Load saved form data from localStorage
    const savedData = localStorage.getItem("invoiceFormData")
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  const handlePdfUpload = (file) => {
    setPdfFile(file)
  }

  const handleFormSubmit = (data) => {
    // Save form data to localStorage
    localStorage.setItem("invoiceFormData", JSON.stringify(data))
    setFormData(data)
  }

  return (
    <div className="invoice-page">
      <Header onLogout={onLogout} />
      <div className="invoice-container">
        <div className="invoice-content">
          <PDFUploadArea pdfFile={pdfFile} onUpload={handlePdfUpload} />
          <InvoiceForm onSubmit={handleFormSubmit} initialData={formData} />
        </div>
      </div>
    </div>
  )
}

export default InvoicePage
