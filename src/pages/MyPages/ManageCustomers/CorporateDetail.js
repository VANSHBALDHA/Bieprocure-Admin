import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
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
import CorporateCustomerCart from "../CorporateCart/CorporateCustomerCart";
import CorporatePaymentTerms from "./CorporatePaymentTerms";
import CorporateCustomerAdd from "./CorporateCustomerAdd";
import CorporateShipment from "../ManageShipment/CorporateShipment";
import CorporatePayment from "../ManagePayment/CorporatePayment";
import CorporateInvoices from "../ManageInvoices/CorporateInvoices";
import TableContainer from "../../../components/Common/TableContainer";
import CorporateOrder from "./CorporateOrder";

const CorporateDetail = () => {
  const { id } = useParams();
  const [quotes, setQuotes] = useState([
    {
      quoteNumber: "Q-1025",
      userName: "Ankit Gandhi",
      mobileNumber: "1234567890",
      role: "Technician",
      date: "28-02-2024",
      revisedDate: "28-02-2024",
      status: "Expired",
      products: [
        {
          productCode: "P-101",
          productImage: "path/to/image1",
          productName: "Product 1",
          orderQty: 10,
          actualPrice: 50,
          quotedPrice: 45,
          yourPrice: 40,
          currentStocks: 50,
          deliverySchedule: "4-5 Weeks",
        },
        {
          productCode: "P-102",
          productImage: "path/to/image2",
          productName: "Product 2",
          orderQty: 20,
          actualPrice: 60,
          quotedPrice: 55,
          yourPrice: 50,
          currentStocks: 30,
          deliverySchedule: "4-5 Weeks",
        },
      ],
    },
    {
      quoteNumber: "Q-1026",
      userName: "John Doe",
      mobileNumber: "1234567890",
      role: "Technician",
      date: "28-02-2024",
      revisedDate: "28-02-2024",
      status: "Revised",
      products: [
        {
          productCode: "P-103",
          productImage: "path/to/image3",
          productName: "Product 3",
          orderQty: 15,
          actualPrice: 70,
          quotedPrice: 65,
          yourPrice: 60,
          currentStocks: 20,
          deliverySchedule: "4-5 Weeks",
        },
      ],
    },
  ]);
  const [customer, setCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newRegisterAs, setNewRegisterAs] = useState("");
  const [selectedRegisterAs, setSelectedRegisterAs] = useState("");
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "1"
  );

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const selectedCustomer = corporateCustomer.find(
      (data) => data.id === Number(id)
    );
    setCustomer(selectedCustomer);
  }, [id]);

  const handleRegisterAsChange = (event) => {
    setNewRegisterAs(event.target.value);
    setSelectedRegisterAs(event.target.value);
    setShowModal(true);
  };

  const handleConfirm = () => {
    console.log("newRegisterAs", newRegisterAs);
    setShowModal(false);
  };

  const statusColors = {
    Expired: "danger",
    Revised: "warning",
    Cart: "info",
  };

  const columns = useMemo(
    () => [
      { Header: "Quote Number", accessor: "quoteNumber", disableFilters: true },
      { Header: "User Name", accessor: "userName" },
      { Header: "Mobile Number", accessor: "mobileNumber" },
      { Header: "Role", accessor: "role" },
      { Header: "Quoted Date", accessor: "date" },
      { Header: "Revised Quoted Date", accessor: "revisedDate" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge color={statusColors[status] || "secondary"}>{status}</Badge>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        disableFilters: true,
        Cell: ({ row }) => {
          const quote = row.original;
          const isExpired = quote.status === "Expired";
          const icon = (
            <span
              className={isExpired ? "text-muted" : "text-success"}
              style={{
                cursor: isExpired ? "not-allowed" : "pointer",
              }}
            >
              <i
                className="mdi mdi-message-text-outline"
                style={{
                  fontSize: "20px",
                  opacity: isExpired ? 0.5 : 1,
                }}
                id={`edit-${quote.quoteNumber}`}
              />
              <UncontrolledTooltip
                placement="top"
                target={`edit-${quote.quoteNumber}`}
              >
                {isExpired ? "Edit Disabled" : "Edit Quote"}
              </UncontrolledTooltip>
            </span>
          );

          return (
            <div className="d-flex gap-3 align-items-center">
              {isExpired ? (
                icon
              ) : (
                <Link
                  to={`/manage-corporate-customer-quote/${quote.quoteNumber}`}
                  target="_blank"
                >
                  {icon}
                </Link>
              )}
            </div>
          );
        },
      },
    ],
    []
  );

  if (!customer) return <div>Loading...</div>;

  document.title = "Corporate customer details | Bieprocure";

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          title="Manage Customers"
          breadcrumbItem="Corporate Customer Details"
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
            <div className="mb-3">
              <button
                className="btn btn-success d-flex align-items-center"
                style={{
                  fontSize: "16px",
                  borderRadius: "15px",
                  padding: "10px 20px",
                  fontWeight: "600",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <i
                  className="mdi mdi-shield-check me-2"
                  style={{ fontSize: "20px" }}
                ></i>
                Verified
              </button>
            </div>
            <div className="table-responsive">
              <table
                className="table table-bordered"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #ddd",
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
            </div>
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
              <CorporatePaymentTerms />
              <CorporateCustomerAdd />

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
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      marginBottom: "15px",
                    }}
                  >
                    <h6>Billing Address:</h6>
                    <p>
                      <strong>Full Name:</strong> John Doe
                      <br />
                      <strong>Contact Number:</strong> +1 234-567-8901
                      <br />
                      <strong>Pincode:</strong> 10001
                      <br />
                      <strong>
                        Flat, House No., Building, Company, Apartment:
                      </strong>{" "}
                      Apartment 4B
                      <br />
                      <strong>Area, Street, Sector, Village:</strong> 123 Main
                      Street
                      <br />
                      <strong>Landmark:</strong> Near Central Park
                      <br />
                      <strong>Town/City, State:</strong> New York, NY
                      <br />
                      <strong>Country:</strong> United States
                    </p>
                  </div>
                </Col>

                <Col md="6">
                  <div
                    style={{
                      backgroundColor: "#f8f9fa",
                      padding: "15px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      marginBottom: "15px",
                    }}
                  >
                    <h6>Shipping Address:</h6>
                    <p>
                      <strong>Full Name:</strong> Jane Smith
                      <br />
                      <strong>Contact Number:</strong> +44 789-456-1230
                      <br />
                      <strong>Pincode:</strong> 111222
                      <br />
                      <strong>
                        Flat, House No., Building, Company, Apartment:
                      </strong>{" "}
                      House No. 8
                      <br />
                      <strong>Area, Street, Sector, Village:</strong> 45
                      Greenway Street
                      <br />
                      <strong>Landmark:</strong> Near Hyde Park
                      <br />
                      <strong>Town/City, State:</strong> London
                      <br />
                      <strong>Country:</strong> United Kingdom
                    </p>
                  </div>
                </Col>
              </Row>
            </TabPane>
          )}

          {activeTab === "2" && (
            <TabPane tabId="2">
              <Row className="d-flex justify-content-between align-items-center my-3">
                <Col lg="6">
                  <h5 className="m-0">Manage Quotes</h5>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <Card>
                    <CardBody>
                      <TableContainer
                        columns={columns}
                        data={quotes}
                        isGlobalFilter={true}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          )}

          {activeTab === "3" && (
            <TabPane tabId="3">
              <Row className="d-flex justify-content-between align-items-center my-3">
                <Col lg="6">
                  <h5 className="m-0">Manage Carts</h5>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <CorporateCustomerCart />
                </Col>
              </Row>
            </TabPane>
          )}

          {activeTab === "4" && (
            <TabPane tabId="4">
              <Row className="d-flex justify-content-between align-items-center my-3">
                <Col lg="6">
                  <h5 className="m-0">Manage Orders</h5>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <CorporateOrder />
                </Col>
              </Row>
            </TabPane>
          )}

          {activeTab === "5" && (
            <TabPane tabId="5">
              <Row>
                <Col lg="12">
                  <CorporateInvoices />
                </Col>
              </Row>
            </TabPane>
          )}

          {activeTab === "6" && (
            <TabPane tabId="6">
              <Row>
                <Col lg="12">
                  <CorporatePayment />
                </Col>
              </Row>
            </TabPane>
          )}

          {activeTab === "7" && (
            <TabPane tabId="7">
              <Row>
                <Col lg="12">
                  <CorporateShipment />
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
