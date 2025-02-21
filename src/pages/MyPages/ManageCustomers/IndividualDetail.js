import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalBody,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  Table,
  UncontrolledTooltip,
  ModalHeader,
  ModalFooter,
  Button,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  customerOrderData,
  individualCustomer,
} from "../../../common/data/MyFackData";
import IndividualCart from "./IndividualCart";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import TableContainer from "../../../components/Common/TableContainer";
import { PaymentStatus } from "../../Dashboard/LatestTranactionCol";

const loginRecords = [
  "02/15/2024, 10:30 AM",
  "02/14/2024, 09:15 AM",
  "02/13/2024, 08:45 PM",
  "02/12/2024, 11:20 AM",
];

const IndividualDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [customerModal, setCustomerModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [registerAs, setRegisterAs] = useState(
    customer?.register_as || "non-gst"
  );
  const [selectedValue, setSelectedValue] = useState(registerAs);
  const [status, setStatus] = useState("Inactive");
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "1"
  );

  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "orderId",
        disableFilters: true,
      },
      {
        Header: "Customer Name",
        accessor: "name",
        disableFilters: true,
      },
      {
        Header: "Date",
        accessor: "date",
        disableFilters: true,
      },
      {
        Header: "Total",
        accessor: "price",
        disableFilters: true,
      },
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
        disableFilters: true,
        Cell: (cellProps) => {
          return <PaymentStatus {...cellProps} />;
        },
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <span>
              <i
                className={
                  cellProps.value === "PayPal"
                    ? "fab fa-cc-paypal me-1"
                    : "" || cellProps.value === "Bank Transfer"
                    ? "fab fas fa-money-bill-alt me-1"
                    : "" || cellProps.value === "Debit Card"
                    ? "fab fa-cc-mastercard me-1"
                    : "" || cellProps.value === "Credit Card"
                    ? "fab fa-cc-visa me-1"
                    : ""
                }
              />{" "}
              {cellProps.value}
            </span>
          );
        },
      },
      {
        Header: "View Details",
        disableFilters: true,
        accessor: "view",
        Cell: (cellProps) => {
          const orderId = cellProps.row.original.orderId;
          return (
            <div className="d-flex gap-3 align-items-center">
              <Link
                to={`/manage-orders/individual-customer/order-details/${orderId}`}
                className="text-success"
              >
                <i
                  className="mdi mdi-eye-outline font-size-18"
                  id="viewtooltip"
                ></i>
                <UncontrolledTooltip placement="top" target="viewtooltip">
                  View
                </UncontrolledTooltip>
              </Link>
              <Link to="#" className="text-success">
                <i
                  className="fab fas fa-money-bill-alt font-size-14"
                  id="paymentbutton"
                />
                <UncontrolledTooltip placement="top" target="paymentbutton">
                  Payment Details
                </UncontrolledTooltip>
              </Link>
              <Link to="#" className="text-success">
                <i className="bx bxs-truck font-size-18" id="trackingbutton" />
                <UncontrolledTooltip placement="top" target="trackingbutton">
                  Tracking Details
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Username is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    status: Yup.string().required("Status is required"),
  });

  const toggleModal = () => setModal(!modal);
  const toggleRegisterModal = () => setShowModal(!showModal);
  const toggleCustomerModal = () => setCustomerModal(!customerModal);

  const handleSubmit = (values) => {
    console.log("Updated Customer Data:", values);
    toast.success("Customer updated successfully!");
    toggleCustomerModal();
  };

  useEffect(() => {
    const selectedCustomer = individualCustomer.find(
      (data) => data.id === Number(id)
    );
    setCustomer(selectedCustomer);
  }, [id]);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    toggleRegisterModal();
  };

  const confirmChange = () => {
    setRegisterAs(selectedValue);
    toggleRegisterModal();
  };

  const handleStatusChange = () => {
    setStatus(status === "Active" ? "Inactive" : "Active");
    toggleModal();
  };

  if (!customer) return <div>Loading...</div>;
  document.title = "Individual customer details | Bieprocures";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Manage Customers"
            breadcrumbItem="Customer Details"
          />

          <Row>
            <Col lg="3">
              <Card>
                <CardBody className="text-center d-flex justify-content-center align-items-center">
                  {customer.image ? (
                    <img
                      src={customer.image}
                      alt="Profile"
                      className="rounded-circle"
                      width="100"
                      height="100"
                    />
                  ) : (
                    <div
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        backgroundColor: "#ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "80px",
                        fontWeight: "bold",
                        color: "#555",
                      }}
                    >
                      {customer.name?.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>

            <Col lg="9">
              <table
                className="table table-bordered"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                <tbody>
                  <tr>
                    <th>Customer ID</th>
                    <td>{customer.id}</td>
                  </tr>
                  <tr>
                    <th>Company Name</th>
                    <td>{customer.company || "Bieprocure"}</td>
                  </tr>
                  <tr>
                    <th>GST Number</th>
                    <td>
                      {customer.gst_number ? (
                        customer.gst_number || 1900929347927
                      ) : (
                        <>
                          <Input
                            type="select"
                            name="register_as"
                            value={customer?.register_as}
                            onChange={handleSelectChange}
                            className="form-control"
                          >
                            <option value="non-gst">Non-GST Company</option>
                            <option value="gst">GST Company</option>
                            <option value="corporate">Corporate Company</option>
                          </Input>
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>PAN Card Number</th>
                    <td>{customer.pan || "GBQWE1212A"}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td className="d-flex align-items-center gap-2">
                      <span
                        className={`badge ${
                          status === "Active" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {status}
                      </span>
                      <Link
                        to="#"
                        className="text-success"
                        onClick={toggleModal}
                      >
                        <i
                          className="mdi mdi-pencil font-size-18"
                          id="edittooltip"
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="edittooltip"
                        >
                          Edit Status
                        </UncontrolledTooltip>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>

          <div className="my-3">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={activeTab === "1" ? "active" : ""}
                  onClick={() => setActiveTab("1")}
                  style={{ cursor: "pointer" }}
                >
                  Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "2" ? "active" : ""}
                  onClick={() => setActiveTab("2")}
                  style={{ cursor: "pointer" }}
                >
                  Cart
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "3" ? "active" : ""}
                  onClick={() => setActiveTab("3")}
                  style={{ cursor: "pointer" }}
                >
                  Orders
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "4" ? "active" : ""}
                  onClick={() => setActiveTab("4")}
                  style={{ cursor: "pointer" }}
                >
                  Login Records
                </NavLink>
              </NavItem>
            </Nav>
          </div>

          <TabContent activeTab={activeTab} className="mt-3">
            {activeTab === "1" && (
              <TabPane tabId="1">
                {/* Manage Customer */}
                <Row>
                  <Col lg="12">
                    <h5 style={{ marginBottom: "10px" }}>Manage Customer</h5>
                  </Col>
                </Row>
                <Row>
                  <Col lg="12">
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
                        style={{
                          backgroundColor: "#f8f9fa",
                          border: "2px solid #ddd",
                          borderRadius: "8px",
                          width: "100%",
                          marginBottom: "20px",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Username</th>
                            <th>Mobile No.</th>
                            <th>Mobile Status</th>
                            <th>Email Address</th>
                            <th>Status</th>
                            <th>Last Login</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{customer.name}</td>
                            <td>{customer.mobile || "9998887774"}</td>
                            <td>{customer.mobile_status || "Verified"}</td>
                            <td>{customer.email || "demo@gmail.com"}</td>
                            <td>{customer.status}</td>
                            <td>{customer.last_login_date}</td>
                            <td className="text-center">
                              <Link
                                to="#"
                                className="text-success"
                                onClick={toggleCustomerModal}
                              >
                                <i
                                  className="mdi mdi-pencil font-size-18"
                                  id="paymentbutton"
                                />
                                <UncontrolledTooltip
                                  placement="top"
                                  target="paymentbutton"
                                >
                                  Edit Customer
                                </UncontrolledTooltip>
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>

                {/* Customer Addresses */}
                <Row>
                  <Col lg="12">
                    <h5 style={{ marginBottom: "10px" }}>Customer Addresses</h5>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <div
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "15px",
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                        marginBottom: "15px",
                      }}
                    >
                      <h6>Billing Address:</h6>
                      <p>
                        123 Main Street, Apartment 4B
                        <br />
                        New York, NY 10001
                        <br />
                        Landmark: Near Central Park
                        <br />
                        United States
                      </p>
                    </div>
                  </Col>

                  <Col md="6">
                    <div
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "15px",
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                        marginBottom: "15px",
                      }}
                    >
                      <h6>Shipping Address:</h6>
                      <p>
                        45 Greenway Street, House No. 8
                        <br />
                        London, SW1A 1AA
                        <br />
                        Landmark: Near Hyde Park
                        <br />
                        United Kingdom
                      </p>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            )}

            {activeTab === "2" && (
              <TabPane tabId="2">
                <Card>
                  <CardBody>
                    <h5>Cart</h5>
                    <IndividualCart />
                  </CardBody>
                </Card>
              </TabPane>
            )}

            {activeTab === "3" && (
              <TabPane tabId="3">
                <Card>
                  <CardBody>
                    <h5>Orders</h5>
                    <TableContainer
                      columns={columns}
                      data={customerOrderData}
                      isGlobalFilter={true}
                      customPageSize={10}
                      className="custom-header-css"
                    />
                  </CardBody>
                </Card>
              </TabPane>
            )}

            {activeTab === "4" && (
              <TabPane tabId="4">
                <Card>
                  <CardBody>
                    <h5>Login Records</h5>
                    {loginRecords.length > 0 ? (
                      <Table bordered>
                        <thead>
                          <tr>
                            <th style={{ width: "5%" }}>No.</th>
                            <th>Login Date & Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loginRecords.map((record, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{record}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p>No login records available.</p>
                    )}
                  </CardBody>
                </Card>
              </TabPane>
            )}
          </TabContent>

          {/* Modal for Change Register As*/}
          <Modal
            size="sm"
            isOpen={showModal}
            toggle={toggleRegisterModal}
            centered={true}
          >
            <div className="modal-content">
              <ModalBody className="px-4 py-5 text-center">
                <button
                  type="button"
                  onClick={toggleRegisterModal}
                  className="btn-close position-absolute end-0 top-0 m-3"
                ></button>
                <p className="text-muted font-size-16 mb-4">
                  Are you sure you want to change the registration type to{" "}
                  <strong>{selectedValue}</strong>?
                </p>

                <div className="hstack gap-2 justify-content-center mb-0">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={toggleRegisterModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={confirmChange}
                  >
                    Yes, Change
                  </button>
                </div>
              </ModalBody>
            </div>
          </Modal>

          {/* Modal for Change Status*/}
          <Modal size="md" isOpen={modal} toggle={toggleModal} centered>
            <div className="modal-content">
              <ModalBody className="px-4 py-5 text-center">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="btn-close position-absolute end-0 top-0 m-3"
                ></button>
                <p className="text-muted font-size-16 mb-4">
                  Are you sure you want to change the status to{" "}
                  <strong>{status === "Active" ? "Inactive" : "Active"}</strong>
                  ?
                </p>

                <div className="hstack gap-2 justify-content-center mb-0">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleStatusChange}
                  >
                    Yes, Change to {status === "Active" ? "Inactive" : "Active"}
                  </button>
                </div>
              </ModalBody>
            </div>
          </Modal>

          {/* Edit Customer Modal with Formik */}
          <Modal
            isOpen={customerModal}
            toggle={toggleCustomerModal}
            centered
            backdrop="static"
            keyboard={false}
            scrollable={true}
          >
            <ModalHeader toggle={toggleCustomerModal}>
              Edit Customer
            </ModalHeader>
            <Formik
              initialValues={{
                name: customer.name || "",
                mobile: customer.mobile || "",
                email: customer.email || "",
                status: customer.status || "Active",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <ModalBody>
                    <div className="mb-3">
                      <label>Username</label>
                      <Field type="text" name="name" className="form-control" />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="mb-3">
                      <label>Mobile No.</label>
                      <Field
                        type="text"
                        name="mobile"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="mb-3">
                      <label>Email Address</label>
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="mb-3">
                      <label>Status</label>
                      <Field as="select" name="status" className="form-control">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </Field>
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={toggleCustomerModal}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="secondary"
                      disabled={isSubmitting}
                    >
                      Save Changes
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default IndividualDetail;
