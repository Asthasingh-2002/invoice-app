"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Building2, FileText, MessageSquare } from "lucide-react";
import "../styles/InvoiceForm.css";

const InvoiceValidationSchema = Yup.object().shape({
  vendor: Yup.string().required("Vendor is required"),
  poNumber: Yup.string().required("PO Number is required"),
  invoiceNumber: Yup.string().required("Invoice Number is required"),
  invoiceDate: Yup.string().required("Invoice Date is required"),
  totalAmount: Yup.number().required("Total Amount is required").positive(),
  paymentTerms: Yup.string().required("Payment Terms is required"),
  invoiceDueDate: Yup.string().required("Invoice Due Date is required"),
  glPostDate: Yup.string().required("GL Post Date is required"),
  invoiceDescription: Yup.string(),
  expenses: Yup.array().of(
    Yup.object().shape({
      lineAmount: Yup.number().positive(),
      department: Yup.string(),
      account: Yup.string(),
      location: Yup.string(),
      description: Yup.string(),
    })
  ),
});

const DUMMY_DATA = {
  vendor: "A - 1 Exterminators",
  poNumber: "PO-2024-001",
  invoiceNumber: "INV-2024-001",
  invoiceDate: "10/15/2024",
  totalAmount: 1500.0,
  paymentTerms: "Net 30",
  invoiceDueDate: "11/15/2024",
  glPostDate: "10/20/2024",
  invoiceDescription: "Professional pest control services",
  expenses: [
    {
      lineAmount: 1500.0,
      department: "Operations",
      account: "Maintenance",
      location: "Main Office",
      description: "Monthly pest control service",
    },
  ],
};

function InvoiceForm({ onSubmit, initialData }) {
  const [activeTab, setActiveTab] = useState("vendor");
  const [totalExpense, setTotalExpense] = useState(0);
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState("");

  const initialValues = initialData || {
    vendor: "",
    poNumber: "",
    invoiceNumber: "",
    invoiceDate: "",
    totalAmount: "",
    paymentTerms: "",
    invoiceDueDate: "",
    glPostDate: "",
    invoiceDescription: "",
    expenses: [
      {
        lineAmount: "",
        department: "",
        account: "",
        location: "",
        description: "",
      },
    ],
  };

  return (
    <div className="invoice-form-container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "vendor" ? "active" : ""}`}
          onClick={() => setActiveTab("vendor")}
        >
          Vendor Details
        </button>
        <button
          className={`tab ${activeTab === "invoice" ? "active" : ""}`}
          onClick={() => setActiveTab("invoice")}
        >
          Invoice Details
        </button>
        <button
          className={`tab ${activeTab === "comments" ? "active" : ""}`}
          onClick={() => setActiveTab("comments")}
        >
          Comments
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={InvoiceValidationSchema}
        onSubmit={(values) => {
          onSubmit(values);
          alert("Invoice saved successfully!");
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="invoice-form">
            {/* Vendor Details Tab */}
            {activeTab === "vendor" && (
              <div className="tab-content">
                <div className="section">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "rgba(33, 150, 243, 0.1)",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Building2 size={24} color="#2196f3" strokeWidth={2} />
                    </div>
                    <h3 style={{ margin: 0 }}>Vendor Details</h3>
                  </div>
                  <h3>Vendor Information</h3>
                  <div className="form-group">
                    <label htmlFor="vendor">Vendor *</label>
                    <Field
                      as="select"
                      id="vendor"
                      name="vendor"
                      className={
                        touched.vendor && errors.vendor ? "input-error" : ""
                      }
                    >
                      <option value="">Select Vendor</option>
                      <option value="A - 1 Exterminators">
                        A - 1 Exterminators
                      </option>
                      <option value="ABC Supplies">ABC Supplies</option>
                      <option value="XYZ Services">XYZ Services</option>
                    </Field>
                    <ErrorMessage
                      name="vendor"
                      component="div"
                      className="error-message"
                    />
                    <p className="vendor-address">555 Main St., Lynn</p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <a href="#" className="view-details">
                        View Vendor Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Invoice Details Tab */}
            {activeTab === "invoice" && (
              <div className="tab-content">
                <div className="section">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "rgba(33, 150, 243, 0.1)",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FileText size={24} color="#2196f3" strokeWidth={2} />
                    </div>
                    <h3 style={{ margin: 0 }}>Invoice Details</h3>
                  </div>
                  <h3>General Information</h3>
                  <div className="form-group">
                    <label htmlFor="poNumber">Purchase Order Number *</label>
                    <Field
                      as="select"
                      id="poNumber"
                      name="poNumber"
                      className={
                        touched.poNumber && errors.poNumber ? "input-error" : ""
                      }
                    >
                      <option value="">Select PO Number</option>
                      <option value="PO-2024-001">PO-2024-001</option>
                      <option value="PO-2024-002">PO-2024-002</option>
                    </Field>
                    <ErrorMessage
                      name="poNumber"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>

                <div className="section">
                  <h3>Invoice Details</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="invoiceNumber">Invoice Number *</label>
                      <Field
                        as="select"
                        id="invoiceNumber"
                        name="invoiceNumber"
                        className={
                          touched.invoiceNumber && errors.invoiceNumber
                            ? "input-error"
                            : ""
                        }
                      >
                        <option value="">Select Vendor</option>
                        <option value="INV-2024-001">INV-2024-001</option>
                        <option value="INV-2024-002">INV-2024-002</option>
                      </Field>
                      <ErrorMessage
                        name="invoiceNumber"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="invoiceDate">Invoice Date *</label>
                      <Field
                        type="date"
                        id="invoiceDate"
                        name="invoiceDate"
                        className={
                          touched.invoiceDate && errors.invoiceDate
                            ? "input-error"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="invoiceDate"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="totalAmount">Total Amount *</label>
                      <div className="input-with-currency">
                        <span className="currency">$</span>
                        <Field
                          type="number"
                          id="totalAmount"
                          name="totalAmount"
                          placeholder="0.00"
                          step="0.01"
                          className={
                            touched.totalAmount && errors.totalAmount
                              ? "input-error"
                              : ""
                          }
                        />
                        <span className="currency-label">USD</span>
                      </div>
                      <ErrorMessage
                        name="totalAmount"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="paymentTerms">Payment Terms *</label>
                      <Field
                        as="select"
                        id="paymentTerms"
                        name="paymentTerms"
                        className={
                          touched.paymentTerms && errors.paymentTerms
                            ? "input-error"
                            : ""
                        }
                      >
                        <option value="">Select</option>
                        <option value="Net 30">Net 30</option>
                        <option value="Net 60">Net 60</option>
                        <option value="Due on Receipt">Due on Receipt</option>
                      </Field>
                      <ErrorMessage
                        name="paymentTerms"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="invoiceDueDate">Invoice Due Date *</label>
                      <Field
                        type="date"
                        id="invoiceDueDate"
                        name="invoiceDueDate"
                        className={
                          touched.invoiceDueDate && errors.invoiceDueDate
                            ? "input-error"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="invoiceDueDate"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="glPostDate">GL Post Date *</label>
                      <Field
                        type="date"
                        id="glPostDate"
                        name="glPostDate"
                        className={
                          touched.glPostDate && errors.glPostDate
                            ? "input-error"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="glPostDate"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="invoiceDescription">
                      Invoice Description *
                    </label>
                    <Field
                      as="textarea"
                      id="invoiceDescription"
                      name="invoiceDescription"
                      placeholder="Enter invoice description"
                      rows="3"
                    />
                  </div>
                </div>

                <div className="section">
                  <div className="expense-header">
                    <h3>Expense Details</h3>
                    <div className="expense-total">
                      <span>$ 0.00 / $ {values.totalAmount || "0.00"}</span>
                      <span className="percentage-badge">1</span>
                      <span>%</span>
                    </div>
                  </div>

                  <FieldArray name="expenses">
                    {({ push, remove }) => (
                      <div className="expenses-list">
                        {values.expenses.map((expense, index) => (
                          <div key={index} className="expense-item">
                            <div className="form-row">
                              <div className="form-group">
                                <label htmlFor={`expenses.${index}.lineAmount`}>
                                  Line Amount *
                                </label>
                                <div className="input-with-currency">
                                  <span className="currency">$</span>
                                  <Field
                                    type="number"
                                    id={`expenses.${index}.lineAmount`}
                                    name={`expenses.${index}.lineAmount`}
                                    placeholder="0.00"
                                    step="0.01"
                                  />
                                  <span className="currency-label">USD</span>
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor={`expenses.${index}.department`}>
                                  Department *
                                </label>
                                <Field
                                  as="select"
                                  id={`expenses.${index}.department`}
                                  name={`expenses.${index}.department`}
                                >
                                  <option value="">Select Department</option>
                                  <option value="Operations">Operations</option>
                                  <option value="Finance">Finance</option>
                                  <option value="HR">HR</option>
                                </Field>
                              </div>
                            </div>

                            <div className="form-row">
                              <div className="form-group">
                                <label htmlFor={`expenses.${index}.account`}>
                                  Account *
                                </label>
                                <Field
                                  as="select"
                                  id={`expenses.${index}.account`}
                                  name={`expenses.${index}.account`}
                                >
                                  <option value="">Select Account</option>
                                  <option value="Maintenance">
                                    Maintenance
                                  </option>
                                  <option value="Supplies">Supplies</option>
                                  <option value="Services">Services</option>
                                </Field>
                              </div>
                              <div className="form-group">
                                <label htmlFor={`expenses.${index}.location`}>
                                  Location *
                                </label>
                                <Field
                                  as="select"
                                  id={`expenses.${index}.location`}
                                  name={`expenses.${index}.location`}
                                >
                                  <option value="">Select Location</option>
                                  <option value="Main Office">
                                    Main Office
                                  </option>
                                  <option value="Branch 1">Branch 1</option>
                                  <option value="Branch 2">Branch 2</option>
                                </Field>
                              </div>
                            </div>

                            <div className="form-group">
                              <label htmlFor={`expenses.${index}.description`}>
                                Description *
                              </label>
                              <Field
                                as="textarea"
                                id={`expenses.${index}.description`}
                                name={`expenses.${index}.description`}
                                placeholder="Enter description"
                                rows="2"
                              />
                            </div>

                            {values.expenses.length > 1 && (
                              <button
                                type="button"
                                className="remove-expense-button"
                                onClick={() => remove(index)}
                              >
                                Remove Expense
                              </button>
                            )}
                          </div>
                        ))}
                        <div
                          className="flex  justify-end"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            type="button"
                            className="add-expense-button"
                            onClick={() =>
                              push({
                                lineAmount: "",
                                department: "",
                                account: "",
                                location: "",
                                description: "",
                              })
                            }
                          >
                            + Add Expense Line
                          </button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>
            )}

            {/* Comments Tab */}
            {activeTab === "comments" && (
              <div className="tab-content">
                <div className="section">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "rgba(33, 150, 243, 0.1)",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MessageSquare
                        size={24}
                        color="#2196f3"
                        strokeWidth={2}
                      />
                    </div>
                    <h3 style={{ margin: 0 }}>Comments</h3>
                  </div>

                  {/* Comments List */}
                  <div style={{ marginBottom: "20px" }}>
                    {comments.length === 0 ? (
                      <p style={{ color: "#666", fontStyle: "italic" }}>
                        No comments yet.
                      </p>
                    ) : (
                      comments.map((comment, index) => (
                        <div
                          key={index}
                          style={{
                            padding: "12px",
                            border: "1px solid #e0e0e0",
                            borderRadius: "4px",
                            marginBottom: "8px",
                            backgroundColor: "#fafafa",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "4px",
                            }}
                          >
                            <strong style={{ color: "#2196f3" }}>User</strong>
                            <span style={{ color: "#666", fontSize: "0.9em" }}>
                              {comment.timestamp}
                            </span>
                          </div>
                          <p style={{ margin: "0" }}>{comment.text}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Comment Input */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      value={currentComment}
                      onChange={(e) => setCurrentComment(e.target.value)}
                      placeholder="Add a comment and use @Name to tag someone"
                      style={{
                        flex: 1,
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "13px",
                        fontFamily: "inherit",
                        transition: "all 0.3s",
                        outline: "none",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#2196f3")}
                      onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && currentComment.trim()) {
                          setComments([
                            ...comments,
                            {
                              text: currentComment.trim(),
                              timestamp: new Date().toLocaleString(),
                            },
                          ]);
                          setCurrentComment("");
                        }
                      }}
                    />
                    <button
                      type="button"
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#2196f3",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "600",
                        transition: "background 0.3s",
                        outline: "none",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#1976d2")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#2196f3")
                      }
                      onClick={() => {
                        if (currentComment.trim()) {
                          setComments([
                            ...comments,
                            {
                              text: currentComment.trim(),
                              timestamp: new Date().toLocaleString(),
                            },
                          ]);
                          setCurrentComment("");
                        }
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="save-draft-button"
                onClick={() => {
                  try {
                    localStorage.setItem(
                      "invoiceDraft",
                      JSON.stringify(values)
                    );
                    alert("Draft saved locally.");
                  } catch (err) {
                    // log to console and inform the user
                    console.error("Failed to save draft", err);
                    alert("Failed to save draft. Check console for details.");
                  }
                }}
              >
                Save as Draft
              </button>
              <button type="submit" className="submit-button">
                Submit & New
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default InvoiceForm;
