import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const CorporatePaymentTerms = () => {
  const [paymentTerms, setPaymentTerms] = useState([
    {
      type: "Advance 30% - Order Confirmation",
      dueDate: "Advance – Against Performa Invoice",
      percentage: 50,
      days: 30,
      creditDays: 15,
    },
    {
      type: "50% Performa Invoice Released",
      dueDate: "Advance – Order Confirmation",
      percentage: 30,
      days: 60,
      creditDays: 30,
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState(null);

  const dueDateOptions = [
    "Advance – Order Confirmation",
    "Advance – Against Performa Invoice",
    "Day(s) after invoice date",
  ];

  const validationSchema = Yup.object({
    type: Yup.string().required("Type is required"),
    dueDate: Yup.string().required("Due Date is required"),
    percentage: Yup.number().required("Percentage is required").min(1).max(100),
    days: Yup.number().required("Days are required").min(1),
    creditDays: Yup.number().required("Credit Days are required").min(1),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    if (editingTerm) {
      const updatedTerms = paymentTerms.map((term) =>
        term === editingTerm ? values : term
      );
      setPaymentTerms(updatedTerms);
      toast.success("Payment term updated successfully!");
    } else {
      setPaymentTerms([...paymentTerms, values]);
      toast.success("Payment term added successfully!");
    }

    setSubmitting(false);
    resetForm();
    setModalOpen(false);
    setEditingTerm(null);
  };

  const handleEdit = (term) => {
    setEditingTerm(term);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTerm(null);
    setModalOpen(true);
  };

  const handleDelete = (termToDelete) => {
    const updatedTerms = paymentTerms.filter((term) => term !== termToDelete);
    setPaymentTerms(updatedTerms);
    toast.success("Payment term deleted successfully!");
  };

  return (
    <>
      <div style={{ border: "1px solid #ced4da " }} className="p-2 mb-5">
        <Row className="d-flex justify-content-between align-items-center mb-2">
          <Col lg="6">
            <h5 className="m-0">Payment Terms</h5>
          </Col>
          <Col lg="6">
            <div className="text-end d-flex justify-content-end align-items-center gap-2">
              <div className="d-flex justify-content-end align-items-center gap-2">
                <span>Remaining</span>
                <Input type="text" value="20%" disabled />
              </div>
              <div>
                <Button
                  type="button"
                  color="primary"
                  className="btn"
                  onClick={handleAdd}
                >
                  <i className="mdi mdi-plus me-1" />
                  Add Payment Term
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg="12">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <thead>
                  <tr>
                    <th>Type Selection</th>
                    <th>Due Date</th>
                    <th>In Percentage</th>
                    <th>Days</th>
                    <th>Credit Days</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentTerms?.length > 0 ? (
                    <>
                      {paymentTerms.map((term, index) => (
                        <tr key={index}>
                          <td>{term.type}</td>
                          <td>{term.dueDate}</td>
                          <td>{term.percentage}%</td>
                          <td>{term.days || "-"}</td>
                          <td>{term.creditDays || "-"} </td>
                          <td>
                            <div className="d-flex gap-2 align-items-center text-center justify-content-center">
                              <Link
                                to="#"
                                className="text-success"
                                onClick={() => handleEdit(term)}
                              >
                                <i className="mdi mdi-pencil font-size-18" />
                              </Link>
                              <Link
                                to="#"
                                className="action-icon text-danger"
                                onClick={() => handleDelete(term)}
                              >
                                <i className="mdi mdi-trash-can font-size-18" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <p
                          style={{ fontSize: "16px", color: "#6c757d" }}
                          className="m-0"
                        >
                          No payment terms have been added yet. Please add a
                          payment term to get started.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg="6">
            <h5 className="m-0">Other Terms</h5>
          </Col>
          <div className="py-3">
            <textarea
              name="metaDescription"
              placeholder="Add the Other Details by Admin"
              className="form-control"
              rows="5"
            />
          </div>
          <div className="text-end">
            <Button type="button" color="secondary" className="btn">
              Save
            </Button>
          </div>
        </Row>

        {/* Modal for Add/Edit Payment Term */}
        <Modal
          isOpen={modalOpen}
          toggle={() => setModalOpen(!modalOpen)}
          backdrop="static"
          scrollable={true}
        >
          <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
            {editingTerm ? "Edit Payment Term" : "Add Payment Term"}
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                type: editingTerm ? editingTerm.type : "",
                dueDate: editingTerm ? editingTerm.dueDate : "",
                percentage: editingTerm ? editingTerm.percentage : "",
                days: editingTerm ? editingTerm.days : "",
                creditDays: editingTerm ? editingTerm.creditDays : "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
              }) => {
                const isAdvanceOrderConfirmation =
                  values.dueDate === "Advance – Order Confirmation";
                return (
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <Label for="type">Type Selection</Label>
                          <Field
                            name="type"
                            type="text"
                            className={`form-control ${
                              errors.type && touched.type ? "is-invalid" : ""
                            }`}
                            placeholder="Types..."
                          />
                          {errors.type && touched.type && (
                            <div className="invalid-feedback">
                              {errors.type}
                            </div>
                          )}
                        </FormGroup>
                      </Col>

                      <Col lg="12">
                        <FormGroup>
                          <Label for="dueDate">Due Date</Label>
                          <Field
                            name="dueDate"
                            as="select"
                            className={`form-control ${
                              errors.dueDate && touched.dueDate
                                ? "is-invalid"
                                : ""
                            }`}
                          >
                            <option value="">Select Due Date</option>
                            {dueDateOptions.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </Field>
                          {errors.dueDate && touched.dueDate && (
                            <div className="invalid-feedback">
                              {errors.dueDate}
                            </div>
                          )}
                        </FormGroup>
                      </Col>

                      <Col lg="12">
                        <FormGroup>
                          <Label for="percentage">In Percentage</Label>
                          <Field
                            type="number"
                            name="percentage"
                            className={`form-control ${
                              errors.percentage && touched.percentage
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Percentage"
                          />
                          {errors.percentage && touched.percentage && (
                            <div className="invalid-feedback">
                              {errors.percentage}
                            </div>
                          )}
                        </FormGroup>
                      </Col>

                      <Col lg="12">
                        <FormGroup>
                          <Label for="days">Days</Label>
                          <Field
                            type="number"
                            name="days"
                            className={`form-control ${
                              errors.days && touched.days ? "is-invalid" : ""
                            }`}
                            placeholder="Days"
                            disabled={isAdvanceOrderConfirmation}
                          />
                          {errors.days && touched.days && (
                            <div className="invalid-feedback">
                              {errors.days}
                            </div>
                          )}
                        </FormGroup>
                      </Col>

                      <Col lg="12">
                        <FormGroup>
                          <Label for="creditDays">Credit Days</Label>
                          <Field
                            type="number"
                            name="creditDays"
                            className={`form-control ${
                              errors.creditDays && touched.creditDays
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Credit Days"
                            disabled={isAdvanceOrderConfirmation}
                          />
                          {errors.creditDays && touched.creditDays && (
                            <div className="invalid-feedback">
                              {errors.creditDays}
                            </div>
                          )}
                        </FormGroup>
                      </Col>

                      <Col lg="12" className="text-end">
                        <Button type="submit" color="primary" disabled={false}>
                          {editingTerm ? "Save Changes" : "Add Payment Term"}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                );
              }}
            </Formik>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default CorporatePaymentTerms;
