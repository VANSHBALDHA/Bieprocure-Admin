import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";
import { subAdminData } from "../../../common/data/MyFackData";
import { useFormik } from "formik";
import * as Yup from "yup";
import withRouter from "../../../components/Common/withRouter";

const ManageAdminUsers = () => {
  const [addSubAdminModel, setSubAdminModel] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState(null);
  const [isView, setIsView] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  const toggleModal = () => setSubAdminModel(!addSubAdminModel);

  const handleEditClick = (users) => {
    setUser(users);
    setIsEdit(true);
    toggleModal();
  };

  const handleAddAdminUser = () => {
    setUser(null);
    setIsEdit(false);
    toggleModal();
  };

  const handleViewClick = (data) => {
    setIsView(true);
    setViewUser(data);
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "FullName",
        accessor: "fullName",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "DisplayName",
        accessor: "displayName",
        filterable: true,
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
      },
      {
        Header: "Role",
        accessor: "role",
        filterable: true,
      },
      {
        Header: "Phone",
        accessor: "phone",
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: ({ value }) => (
          <Badge color={value === "active" ? "success" : "danger"}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => handleViewClick(row.original)}
              >
                <i
                  className="mdi mdi-eye-outline font-size-18"
                  id="viewtooltip"
                ></i>
                <UncontrolledTooltip placement="top" target="viewtooltip">
                  View
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-success"
                onClick={() => handleEditClick(row.original)}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (user && user?.id) || "",
      fullName: (user && user?.fullName) || "",
      displayName: (user && user?.displayName) || "",
      email: (user && user?.email) || "",
      phone: (user && user?.phone) || "",
      role: (user && user?.role) || "",
      address: (user && user?.address) || "",
      password: (user && user?.password) || "",
      retype_password: (user && user?.retype_password) || "",
      status: (user && user.status) || "active",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Please enter full name"),
      displayName: Yup.string().required("Please enter display name"),
      email: Yup.string()
        .email("Must be a valid Email")
        .max(255)
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Please enter mobile number"),
      role: Yup.string().required("Please select user role"),
      address: Yup.string().required("Please enter your address"),
      password: Yup.string().required("Password is required"),
      retype_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Re-type Password is required"),
    }),
    status: (user && user.status) || "active",
    onSubmit: (values) => {
      if (isEdit) {
        console.log("Updating user:", values);
      } else {
        console.log("Adding new user:", values);
      }
      toggleModal();
    },
  });

  document.title = "Sub Admin Users | Admin";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Manage Admin Users" breadcrumbItem="Users" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={subAdminData}
                    isGlobalFilter={true}
                    isAddAdminUser={true}
                    handleAddAdminUser={handleAddAdminUser}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Modal for Add/Edit Admin User List*/}
          <Modal
            isOpen={addSubAdminModel}
            toggle={toggleModal}
            backdrop="static"
            keyboard={false}
            scrollable={true}
          >
            <ModalHeader toggle={toggleModal} tag="h4">
              {isEdit ? "Edit User Details" : "Fill All Details"}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">FullName</Label>
                      <Input
                        type="text"
                        name="fullName"
                        placeholder="Insert FullName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
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
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Display Name</Label>
                      <Input
                        type="text"
                        name="displayName"
                        placeholder="Insert Display Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.displayName}
                        invalid={
                          formik.touched.displayName &&
                          formik.errors.displayName
                            ? true
                            : false
                        }
                      />
                      {formik.touched.displayName &&
                      formik.errors.displayName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.displayName}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">E-Mail</Label>
                      <Input
                        name="email"
                        placeholder="Insert Valid Email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email || ""}
                        invalid={
                          formik.touched.email && formik.errors.email
                            ? true
                            : false
                        }
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <FormFeedback type="invalid">
                          {formik.errors.email}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Phone No</Label>
                      <Input
                        name="phone"
                        type="text"
                        inputMode="numeric"
                        minLength={10}
                        maxLength={10}
                        max={10}
                        min={10}
                        placeholder="Insert Phone No"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone || ""}
                        invalid={
                          formik.touched.phone && formik.errors.phone
                            ? true
                            : false
                        }
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <FormFeedback type="invalid">
                          {formik.errors.phone}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Address</Label>
                      <Input
                        name="address"
                        type="textarea"
                        placeholder="Insert Address"
                        rows="3"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address || ""}
                        invalid={
                          formik.touched.address && formik.errors.address
                            ? true
                            : false
                        }
                      />
                      {formik.touched.address && formik.errors.address ? (
                        <FormFeedback type="invalid">
                          {formik.errors.address}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Role</Label>
                      <Input
                        type="select"
                        name="role"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.role}
                        invalid={
                          formik.touched.address && formik.errors.address
                            ? true
                            : false
                        }
                      >
                        <option value="sub-admin">SubAdmin</option>
                        <option value="admin">Admin</option>
                      </Input>
                      {formik.touched.role && formik.errors.role ? (
                        <FormFeedback type="invalid">
                          {formik.errors.role}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Insert Password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        invalid={
                          formik.touched.password && formik.errors.password
                            ? true
                            : false
                        }
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <FormFeedback type="invalid">
                          {formik.errors.password}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Re-type Password</Label>
                      <Input
                        type="password"
                        name="retype_password"
                        placeholder="Insert Retype Password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.retype_password}
                        invalid={
                          formik.touched.retype_password &&
                          formik.errors.retype_password
                            ? true
                            : false
                        }
                      />
                      {formik.touched.retype_password &&
                      formik.errors.retype_password ? (
                        <FormFeedback type="invalid">
                          {formik.errors.retype_password}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <div className="mb-3">
                    <Label className="form-label">Status</Label>
                    <Input
                      name="status"
                      type="select"
                      className="form-select"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.status || ""}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Input>
                    {formik.touched.status && formik.errors.status ? (
                      <FormFeedback type="invalid">
                        {formik.errors.status}
                      </FormFeedback>
                    ) : null}
                  </div>
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

          {/* Modal for View Admin User List*/}
          <Modal
            isOpen={isView}
            toggle={handleViewClick}
            backdrop="static"
            keyboard={false}
            scrollable={true}
          >
            <ModalHeader toggle={() => setIsView(false)} tag="h4">
              User - {viewUser?.fullName}
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col className="col-12">
                  <div className="mb-3">
                    <Label className="form-label">FullName</Label>
                    <Input type="text" value={viewUser?.fullName} disabled />
                  </div>
                </Col>
                <Col className="col-12">
                  <div className="mb-3">
                    <Label className="form-label">Display Name</Label>
                    <Input type="text" value={viewUser?.displayName} disabled />
                  </div>
                </Col>
                <Col className="col-12">
                  <div className="mb-3">
                    <Label className="form-label">E-Mail</Label>
                    <Input
                      name="email"
                      value={viewUser?.email || ""}
                      disabled
                    />
                  </div>
                </Col>
                <Col className="col-12">
                  <div className="mb-3">
                    <Label className="form-label">Phone No</Label>
                    <Input
                      name="phone"
                      value={viewUser?.phone || ""}
                      disabled
                    />
                  </div>
                </Col>
                <Col className="col-12">
                  <div className="mb-3">
                    <Label className="form-label">Address</Label>
                    <Input
                      type="textarea"
                      rows="3"
                      value={viewUser?.address || ""}
                      disabled
                    />
                  </div>
                </Col>
                <Col className="col-12">
                  <div className="mb-3">
                    <Label className="form-label">Role</Label>
                    <Input type="text" value={viewUser?.role} disabled />
                  </div>
                </Col>
                <Col className="col-12">
                  <div className="mb-3">
                    <Label className="form-label">Password</Label>
                    <Input type="text" value={viewUser?.password} disabled />
                  </div>
                </Col>
                <Col className="col-12">
                  <div className="mb-3">
                    <Label className="form-label">Confirm Password</Label>
                    <Input
                      type="text"
                      value={viewUser?.retype_password}
                      disabled
                    />
                  </div>
                </Col>
                <Col className="col-12">
                  <div className="mb-3">
                    <Label className="form-label">Status</Label>
                    <Input type="text" value={viewUser?.status} disabled />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="text-end">
                    <Button
                      type="submit"
                      color="success"
                      onClick={() => setIsView(false)}
                    >
                      Close
                    </Button>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default withRouter(ManageAdminUsers);
