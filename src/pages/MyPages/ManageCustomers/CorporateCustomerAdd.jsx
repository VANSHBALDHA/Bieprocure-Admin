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
  Badge,
  UncontrolledTooltip,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Field, Formik, useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const CorporateCustomerAdd = () => {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const [customers, setCustomers] = useState([
    {
      id: 1,
      fullName: "Ankit Gandhi",
      role: "Admin",
      mobileNumber: "1234567890",
      mobileStatus: "Verified",
      email: "gandhiankit@gmail.com",
      status: "Verified",
      lastLogin: "30-06-2024",
    },
  ]);

  const toggleModal = () => setModal(!modal);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (currentCustomer && currentCustomer.id) || "",
      fullName: (currentCustomer && currentCustomer.fullName) || "",
      role: (currentCustomer && currentCustomer.role) || "",
      mobileNumber: (currentCustomer && currentCustomer.mobileNumber) || "",
      mobileStatus: (currentCustomer && currentCustomer.mobileStatus) || "",
      email: (currentCustomer && currentCustomer.email) || "",
      status: (currentCustomer && currentCustomer.status) || "",
      lastLogin: (currentCustomer && currentCustomer.lastLogin) || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      role: Yup.string().required("Role is required"),
      mobileNumber: Yup.string().required("Mobile Number is required"),
      mobileStatus: Yup.string().required("Mobile Status is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      status: Yup.string().required("Status is required"),
      lastLogin: Yup.date().required("Last login date is required"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        console.log("Updating customer:", values);
      } else {
        console.log("Adding new customer:", values);
      }
      toggleModal();
      formik.resetForm();
    },
  });

  const handleEditClick = (customers) => {
    setCurrentCustomer(customers);
    setIsEdit(true);
    toggleModal();
  };

  const handleAddCustomer = () => {
    setCurrentCustomer(null);
    setIsEdit(false);
    toggleModal();
  };

  return (
    <>
      <Row className="d-flex justify-content-between align-items-center mb-2">
        <Col lg="6">
          <h5 className="m-0">Manage Customer</h5>
        </Col>
        <Col lg="6">
          <div className="text-end">
            <Button
              type="button"
              color="primary"
              className="btn"
              onClick={handleAddCustomer}
            >
              <i className="mdi mdi-plus me-1" />
              Add User
            </Button>
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
                  <th>Full Name</th>
                  <th>Role</th>
                  <th>Mobile Number</th>
                  <th>Mobile Status</th>
                  <th>Email Address</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.fullName}</td>
                    <td>{customer.role}</td>
                    <td>{customer.mobileNumber}</td>
                    <td>
                      <Badge color="success">{customer.mobileStatus}</Badge>
                    </td>
                    <td>{customer.email}</td>
                    <td>
                      <Badge color="primary">{customer.status}</Badge>
                    </td>
                    <td>{customer.lastLogin}</td>
                    <td className="text-center">
                      <Link
                        to="#"
                        className="text-success"
                        onClick={() => handleEditClick(customer)}
                      >
                        <i
                          className="mdi mdi-pencil font-size-18"
                          id="editCustomer"
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="editCustomer"
                        >
                          Edit Customer
                        </UncontrolledTooltip>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>

      <Modal
        isOpen={modal}
        toggle={toggleModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        scrollable={true}
        centered={true}
      >
        <ModalHeader toggle={toggleModal} tag="h4">
          {isEdit ? "Edit Customer" : "Add Customer"}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label className="form-label">Full Name</Label>
                  <Input
                    name="fullName"
                    type="text"
                    placeholder="Enter fullName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName || ""}
                    invalid={
                      formik.touched.fullName && formik.errors.fullName
                        ? true
                        : false
                    }
                  />
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <FormFeedback type="invalid">
                      {formik.errors.fullName}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label className="form-label">Role</Label>
                  <Input
                    name="role"
                    type="select"
                    className="form-select"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.role || ""}
                    invalid={
                      formik.touched.role && formik.errors.role ? true : false
                    }
                  >
                    <option value="">Select Display </option>
                    <option value="Admin">Admin</option>
                    <option value="Technition">Technition</option>
                  </Input>
                  {formik.touched.role && formik.errors.role ? (
                    <FormFeedback type="invalid">
                      {formik.errors.role}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label className="form-label">Mobile Number</Label>
                  <Input
                    name="mobileNumber"
                    type="text"
                    placeholder="Enter mobile number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobileNumber || ""}
                    invalid={
                      formik.touched.mobileNumber && formik.errors.mobileNumber
                        ? true
                        : false
                    }
                  />
                  {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                    <FormFeedback type="invalid">
                      {formik.errors.mobileNumber}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label className="form-label">Mobile Status</Label>
                  <Input
                    name="mobileStatus"
                    type="select"
                    className="form-select"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobileStatus || ""}
                    invalid={
                      formik.touched.mobileStatus && formik.errors.mobileStatus
                        ? true
                        : false
                    }
                  >
                    <option value="">Select Display </option>
                    <option value="Verified">Verified</option>
                    <option value="Not-Verified">Not-Verified</option>
                  </Input>
                  {formik.touched.mobileStatus && formik.errors.mobileStatus ? (
                    <FormFeedback type="invalid">
                      {formik.errors.mobileStatus}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label className="form-label">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email || ""}
                    invalid={
                      formik.touched.email && formik.errors.email ? true : false
                    }
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <FormFeedback type="invalid">
                      {formik.errors.email}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label className="form-label">Status</Label>
                  <Input
                    name="status"
                    type="select"
                    className="form-select"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.status || ""}
                    invalid={
                      formik.touched.status && formik.errors.status
                        ? true
                        : false
                    }
                  >
                    <option value="">Select Display </option>
                    <option value="Verified">Verified</option>
                    <option value="Not-Verified">Not-Verified</option>
                  </Input>
                  {formik.touched.status && formik.errors.status ? (
                    <FormFeedback type="invalid">
                      {formik.errors.status}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label className="form-label">Last Login</Label>
                  <Input
                    name="lastLogin"
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastLogin || ""}
                    invalid={
                      formik.touched.lastLogin && formik.errors.lastLogin
                        ? true
                        : false
                    }
                  />
                  {formik.touched.lastLogin && formik.errors.lastLogin ? (
                    <FormFeedback type="invalid">
                      {formik.errors.lastLogin}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <Button type="submit" color="success">
                    {isEdit ? "Update" : "Save"}
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CorporateCustomerAdd;
