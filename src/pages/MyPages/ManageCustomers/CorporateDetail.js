import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Label,
  CardTitle,
  Modal,
  ModalBody,
  UncontrolledTooltip,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Badge,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { corporateCustomer } from "../../../common/data/MyFackData";

const CorporateDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newRegisterAs, setNewRegisterAs] = useState("");
  const [selectedRegisterAs, setSelectedRegisterAs] = useState("");
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "1"
  );
  const [paymentTerms, setPaymentTerms] = useState([
    {
      type: "Advance 30% - Order Confirmation",
      dueDate: "Advance – Order Confirmation",
      percentage: "30%",
      days: "30",
      creditDays: "5",
    },
  ]);

  const addPaymentTerm = () => {
    setPaymentTerms([
      ...paymentTerms,
      {
        type: "New Term",
        dueDate: "Custom Due Date",
        percentage: "0%",
        days: "0",
        creditDays: "0",
      },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const selectedCustomer = corporateCustomer.find(
      (data) => data.id === Number(id)
    );
    setCustomer(selectedCustomer);
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  const handleRegisterAsChange = (event) => {
    setNewRegisterAs(event.target.value);
    setSelectedRegisterAs(event.target.value);
    setShowModal(true);
  };

  const handleConfirm = () => {
    console.log("newRegisterAs", newRegisterAs);
    setShowModal(false);
  };

  document.title = "Corporate customer details | Bieprocure";

  return (
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
                  <th style={{ width: "25%" }}>Company Name</th>
                  <td>Bieprocure</td>
                </tr>
                <tr>
                  <th style={{ width: "25%" }}>GST Number</th>
                  <td>27ABCDE1234F1Z5</td>
                </tr>
                <tr>
                  <th style={{ width: "25%" }}>PAN Card Number</th>
                  <td>GBQWE1212A</td>
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
                Quotes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "3" ? "active" : ""}
                onClick={() => setActiveTab("3")}
                style={{ cursor: "pointer" }}
              >
                Carts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "4" ? "active" : ""}
                onClick={() => setActiveTab("4")}
                style={{ cursor: "pointer" }}
              >
                Orders
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "5" ? "active" : ""}
                onClick={() => setActiveTab("5")}
                style={{ cursor: "pointer" }}
              >
                Invoices
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "6" ? "active" : ""}
                onClick={() => setActiveTab("6")}
                style={{ cursor: "pointer" }}
              >
                Payment
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "7" ? "active" : ""}
                onClick={() => setActiveTab("7")}
                style={{ cursor: "pointer" }}
              >
                Shipment
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        <TabContent activeTab={activeTab} className="mt-3">
          {activeTab === "1" && (
            <TabPane tabId="1">
              <div
                style={{ border: "1px solid #ced4da " }}
                className="p-2 mb-5"
              >
                <Row className="d-flex justify-content-between align-items-center mb-2">
                  <Col lg="6">
                    <h5 className="m-0">Payment Terms</h5>
                  </Col>
                  <Col lg="6">
                    <div className="text-end d-flex justify-content-end align-items-center gap-2">
                      <div className="d-flex justify-content-end align-items-center gap-2">
                        <span>Remaining</span>
                        <Input type="text" placeholder="Enter remaining.." />
                      </div>
                      <div>
                        <Button
                          type="button"
                          color="primary"
                          className="btn"
                          onClick={addPaymentTerm}
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
                          border: "2px solid #ddd",
                          borderRadius: "8px",
                          width: "100%",
                          marginBottom: "20px",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Type Selection</th>
                            <th>Due Date Based on (DropDown)</th>
                            <th>In Percentage</th>
                            <th>Days</th>
                            <th>Credit Days</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paymentTerms.map((term, index) => (
                            <tr key={index}>
                              <td>{term.type}</td>
                              <td>{term.dueDate}</td>
                              <td>{term.percentage}</td>
                              <td>{term.days}</td>
                              <td>{term.creditDays}</td>
                              <td>
                                <div className="d-flex gap-3 align-items-center">
                                  <Link to="#" className="text-success">
                                    <i
                                      className="mdi mdi-pencil font-size-18"
                                      id={`edit-${index}`}
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target={`edit-${index}`}
                                    >
                                      Edit Payment Term
                                    </UncontrolledTooltip>
                                  </Link>
                                  <Link
                                    to="#"
                                    className="action-icon text-danger"
                                    onClick={() => {
                                      setPaymentTerms(
                                        paymentTerms.filter(
                                          (_, i) => i !== index
                                        )
                                      );
                                    }}
                                  >
                                    <i
                                      className="mdi mdi-trash-can font-size-18"
                                      id={`remove-${index}`}
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target={`remove-${index}`}
                                    >
                                      Remove
                                    </UncontrolledTooltip>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
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
              </div>

              {/* Manage Customer */}
              <Row className="d-flex justify-content-between align-items-center mb-2">
                <Col lg="6">
                  <h5 className="m-0">Manage Customer</h5>
                </Col>
                <Col lg="6">
                  <div className="text-end">
                    <Button type="button" color="primary" className="btn">
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
                        border: "2px solid #ddd",
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
                        <tr>
                          <td>Ankit Gandhi</td>
                          <td>
                            <Input
                              type="select"
                              name="register_as"
                              value={customer?.register_as}
                              onChange={handleRegisterAsChange}
                            >
                              <option value="Admin">Admin</option>
                              <option value="Sales">Sales</option>
                              <option value="Technition">Technition</option>
                            </Input>
                          </td>
                          <td>1234567890</td>
                          <td>
                            <Badge color="success">Verified</Badge>
                          </td>
                          <td>gandhiankit@gmail.com</td>
                          <td>
                            <Badge color="primary">Verified</Badge>
                          </td>
                          <td>30-06-2024</td>
                          <td className="text-center">
                            <Link
                              to="#"
                              className="text-success"
                              // onClick={toggleCustomerModal}
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
              <Row className="d-flex justify-content-between align-items-center mb-2">
                <Col lg="6">
                  <h5 className="m-0">Manage Quotess</h5>
                </Col>
              </Row>
            </TabPane>
          )}

          {activeTab === "3" && (
            <TabPane tabId="3">
              <Row className="d-flex justify-content-between align-items-center mb-2">
                <Col lg="6">
                  <h5 className="m-0">Manage Carts</h5>
                </Col>
              </Row>
            </TabPane>
          )}

          {activeTab === "4" && (
            <TabPane tabId="4">
              <Row className="d-flex justify-content-between align-items-center mb-2">
                <Col lg="6">
                  <h5 className="m-0">Manage Orders</h5>
                </Col>
              </Row>
            </TabPane>
          )}

          {activeTab === "5" && (
            <TabPane tabId="5">
              <Row className="d-flex justify-content-between align-items-center mb-2">
                <Col lg="6">
                  <h5 className="m-0">Manage Invoices</h5>
                </Col>
              </Row>
            </TabPane>
          )}

          {activeTab === "6" && (
            <TabPane tabId="6">
              <Row className="d-flex justify-content-between align-items-center mb-2">
                <Col lg="6">
                  <h5 className="m-0">Manage Payment</h5>
                </Col>
              </Row>
            </TabPane>
          )}

          {activeTab === "7" && (
            <TabPane tabId="7">
              <Row className="d-flex justify-content-between align-items-center mb-2">
                <Col lg="6">
                  <h5 className="m-0">Manage Shipment </h5>
                </Col>
              </Row>
            </TabPane>
          )}
        </TabContent>

        {/* Modal for Change Register As*/}
        <Modal
          size="sm"
          isOpen={showModal}
          toggle={() => setShowModal(!showModal)}
          centered={true}
        >
          <div className="modal-content">
            <ModalBody className="px-4 py-5 text-center">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="btn-close position-absolute end-0 top-0 m-3"
              ></button>
              <p className="text-muted font-size-16 mb-4">
                Are you sure you want to permanently change customer As -{" "}
                <b>{selectedRegisterAs}</b>
              </p>

              <div className="hstack gap-2 justify-content-center mb-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirm}
                >
                  Yes
                </button>
              </div>
            </ModalBody>
          </div>
        </Modal>
      </Container>
    </div>
  );
};

export default CorporateDetail;
