import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { ordersData } from "../../../common/data/MyFackData";
import TableContainer from "../../../components/Common/TableContainer";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

const CorporateOrderDetails = () => {
  const { id } = useParams();

  document.title = "Corporate Order Details";

  const [showPaymentTerms, setShowPaymentTerms] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [showPIDetails, setShowPIDetails] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const order = ordersData.find((order) => order.orderId === id);

  const {
    customer,
    orderId,
    orderDetails,
    products,
    billingAddress,
    shippingAddress,
    summary,
    quantities,
    invoiceData,
    paymentTermsBreakdown,
  } = order;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      shippedQty: orderToEdit?.shippedQty || 0,
      availableStocks: orderToEdit?.stock || 0,
      quantity: orderToEdit?.quantity || 0,
      price: orderToEdit?.price || 0,
      total: orderToEdit?.total || 0,
    },
    validationSchema: Yup.object({
      shippedQty: Yup.number()
        .min(0, "Shipped quantity cannot be negative.")
        .required("Shipped quantity is required.")
        .max(
          Yup.ref("availableStocks"),
          "Shipped quantity cannot exceed available stocks."
        ),
      availableStocks: Yup.number()
        .min(0, "Available stocks cannot be negative.")
        .required("Available stocks are required."),
      quantity: Yup.number()
        .min(1, "Quantity must be greater than 0.")
        .required("Quantity is required."),
      price: Yup.number()
        .min(0, "Price must be greater than or equal to 0.")
        .required("Price is required."),
      total: Yup.number()
        .min(0, "Total must be greater than or equal to 0.")
        .required("Total is required."),
    }),
    onSubmit: (values) => {
      console.log("Updated Order Values", values);
      setEditModal(false);
    },
  });

  const handleCreatePI = () => {
    console.log("Proforma Invoice created for Order ID:", orderId);
  };

  const handleEditOrder = (order) => {
    setOrderToEdit(order);
    setEditModal(true);
  };

  const handleDeleteOrder = (order) => {
    setOrderToDelete(order);
    setDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Order ID: ${orderToDelete.orderId} deleted`);
    setDeleteModal(false);
    toast.success("Order deleted successfully!");
  };

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id", disableFilters: true },
      {
        Header: "Image",
        accessor: "image",
        disableFilters: true,
        Cell: ({ value }) => (
          <div className="text-center">
            <img className="avatar-md" src={value} alt="" />
          </div>
        ),
      },
      { Header: "Product Name", accessor: "name", disableFilters: true },
      { Header: "Quoted", accessor: "price", disableFilters: true },
      { Header: "Qty.", accessor: "quantity", disableFilters: true },
      { Header: "Total.", accessor: "total", disableFilters: true },
      { Header: "Ex. Stock", accessor: "stock", disableFilters: true },
      {
        Header: "Delivery Schedule",
        accessor: "deliverySchedule",
        disableFilters: true,
      },
    ],
    []
  );

  if (!order) {
    return (
      <div className="page-content">
        <Container fluid>
          <h4 className="text-center text-danger">
            Order not found for ID: {id}
          </h4>
        </Container>
      </div>
    );
  }

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          title="Customer Order"
          breadcrumbItem="Corporate Customer Order List"
        />

        <Row>
          <Col xl={12}>
            <Card className="mb-3">
              <CardBody>
                <CardTitle
                  className="mb-3 text-primary"
                  style={{
                    backgroundColor: "#ecf0f1",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  Order Summary
                </CardTitle>
                <Row>
                  <Col md="6">
                    <CardText>
                      <strong>Customer Name:</strong> {customer.name}
                    </CardText>
                    <CardText>
                      <strong>Customer ID:</strong> {customer.id}
                    </CardText>
                    <CardText>
                      <strong>Quoted User:</strong> {customer.quotedUser}
                    </CardText>
                    <CardText>
                      <strong>Cart User Name:</strong> {customer.cartUser}
                    </CardText>
                    <CardText>
                      <strong>Communication:</strong>
                      {customer.communication.email} |
                      {customer.communication.phone}
                    </CardText>
                  </Col>

                  <Col md="6">
                    <CardText>
                      <strong>Order ID:</strong> {orderId}
                      <small>(FORMAT: ORD-CARTID-ORDERCREATED DATE)</small>
                    </CardText>
                    <CardText>
                      <strong>Delivery Scheduled:</strong>
                      {orderDetails.deliveryScheduled}
                      <small>(Last Month: {orderDetails.lastMonth})</small>
                    </CardText>
                    <CardText>
                      <strong>Part Shipment:</strong>
                      <Badge
                        color={
                          orderDetails.partShipment === "Allowed"
                            ? "success"
                            : "danger"
                        }
                      >
                        {orderDetails.partShipment}
                      </Badge>
                    </CardText>
                    <CardText>
                      <strong>Purchase Order (PO):</strong>
                      <br />
                      {orderDetails.purchaseOrder.type} (
                      {orderDetails.purchaseOrder.uploadedBy}) —
                      <a href={orderDetails.purchaseOrder.downloadLink}>
                        Download PDF
                      </a>
                      <br />
                      Uploaded On: {orderDetails.purchaseOrder.uploadedOn}
                    </CardText>
                    <CardText>
                      <strong>Payment Terms:</strong>
                      <br />
                      {orderDetails.paymentTerms.type} by
                      {orderDetails.paymentTerms.verifiedBy}
                    </CardText>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle
                  className="mb-3 text-primary"
                  style={{
                    backgroundColor: "#ecf0f1",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  Order Details
                </CardTitle>
                <TableContainer
                  columns={columns}
                  data={products}
                  isGlobalFilter={true}
                  customPageSize={10}
                  className="custom-header-css"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xl={4}>
            <Card className="mb-3">
              <CardBody>
                <CardTitle
                  className="mb-3 text-primary"
                  style={{
                    backgroundColor: "#ecf0f1",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  Billing Address
                </CardTitle>
                <p>
                  {billingAddress?.fullName}
                  <br />
                  {billingAddress?.contactNumber}
                  <br />
                  {billingAddress?.landmark}
                  <br />
                  {billingAddress?.addressLine1}
                  <br />
                  {billingAddress?.addressLine2}
                  <br />
                  {billingAddress?.cityState}, {billingAddress?.pincode}
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col xl={4}>
            <Card className="mb-3">
              <CardBody>
                <CardTitle
                  className="mb-3 text-primary"
                  style={{
                    backgroundColor: "#ecf0f1",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  Shipping Address
                </CardTitle>
                <p>
                  {shippingAddress?.fullName}
                  <br />
                  {shippingAddress?.contactNumber}
                  <br />
                  {shippingAddress?.landmark}
                  <br />
                  {shippingAddress?.addressLine1}
                  <br />
                  {shippingAddress?.addressLine2}
                  <br />
                  {shippingAddress?.cityState} – {shippingAddress?.pincode}
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col xl={4}>
            <Card>
              <CardBody>
                <CardTitle
                  className="mb-3 text-primary"
                  style={{
                    backgroundColor: "#ecf0f1",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  Order Summary
                </CardTitle>

                <div className="table-responsive">
                  <Table
                    className="table mb-0"
                    style={{
                      borderCollapse: "separate",
                      borderSpacing: "0 10px",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#f9fafb",
                            fontWeight: "bold",
                          }}
                        >
                          Sub Total:
                        </td>
                        <td
                          style={{
                            backgroundColor: "#f9fafb",
                            color: "#27ae60",
                          }}
                        >
                          ₹ {summary?.subTotal}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#f9fafb",
                            fontWeight: "bold",
                          }}
                        >
                          GST:
                        </td>
                        <td
                          style={{
                            backgroundColor: "#f9fafb",
                            color: "#f39c12",
                          }}
                        >
                          ₹ {summary?.gst}
                        </td>
                      </tr>
                      <tr>
                        <th
                          style={{
                            backgroundColor: "#ecf0f1",
                            color: "#2980b9",
                          }}
                        >
                          Total:
                        </th>
                        <th
                          style={{
                            backgroundColor: "#ecf0f1",
                            color: "#2980b9",
                          }}
                        >
                          ₹ {summary?.total}
                        </th>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#f9fafb",
                            fontWeight: "bold",
                          }}
                        >
                          Advance Received (10%):
                        </td>
                        <td
                          style={{
                            backgroundColor: "#f9fafb",
                            color: "#e74c3c",
                          }}
                        >
                          ₹ {summary?.advanceReceived}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#f9fafb",
                            fontWeight: "bold",
                          }}
                        >
                          Total Ordered Qty:
                        </td>
                        <td
                          style={{
                            backgroundColor: "#f9fafb",
                            color: "#8e44ad",
                          }}
                        >
                          {quantities?.totalOrderedQty}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#f9fafb",
                            fontWeight: "bold",
                          }}
                        >
                          Total Shipped Qty:
                        </td>
                        <td
                          style={{
                            backgroundColor: "#f9fafb",
                            color: "#8e44ad",
                          }}
                        >
                          {quantities?.totalShippedQty}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#f9fafb",
                            fontWeight: "bold",
                          }}
                        >
                          Total Returns Qty:
                        </td>
                        <td
                          style={{
                            backgroundColor: "#f9fafb",
                            color: "#8e44ad",
                          }}
                        >
                          {quantities?.totalReturnsQty}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#f9fafb",
                            fontWeight: "bold",
                          }}
                        >
                          Balance Qty:
                        </td>
                        <td
                          style={{
                            backgroundColor: "#f9fafb",
                            color: "#8e44ad",
                          }}
                        >
                          {quantities?.balanceQty}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle
                  className="mb-3 text-primary"
                  style={{
                    backgroundColor: "#ecf0f1",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  Invoice Details
                </CardTitle>

                <div className="d-flex justify-content-end mb-3">
                  {orderDetails?.partShipment === "Not Allowed" ? (
                    <>
                      <Button type="button" color="primary" className="btn">
                        <i className="mdi mdi-plus me-1" />
                        Create PI
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        color="primary"
                        className="btn"
                        onClick={() => {
                          setCreateModal(true);
                        }}
                      >
                        <i className="mdi mdi-plus me-1" />
                        Create PI
                      </Button>
                    </>
                  )}
                </div>

                <div className="table-responsive">
                  <Table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>Sr.</th>
                        <th>PI Number</th>
                        <th>PI Date</th>
                        <th>Invoice Number</th>
                        <th>Invoice Date</th>
                        <th>Qty</th>
                        <th>Bill Amount (₹)</th>
                        <th>Received Amount (₹)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData?.length > 0 ? (
                        invoiceData.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.piNumber || "-"}</td>
                            <td>{item.piCreatedDate || "Yet Not Created"}</td>
                            <td>{item.invoiceNumber || "-"}</td>
                            <td>
                              {item.invoiceCreatedDate || "Yet Not Created"}
                            </td>
                            <td>{item.qty}</td>
                            <td>{item.billAmount.toLocaleString("en-IN")}</td>
                            <td>
                              {item.receivedAmount.toLocaleString("en-IN")}
                            </td>
                            <td>
                              <Link
                                to="#"
                                className="text-success"
                                onClick={() =>
                                  setShowPaymentTerms((prev) => !prev)
                                }
                              >
                                <i
                                  className="mdi mdi-eye-outline font-size-18"
                                  id={`viewtooltip-${index}`}
                                />
                                <UncontrolledTooltip
                                  placement="top"
                                  target={`viewtooltip-${index}`}
                                >
                                  {showPaymentTerms ? "Hide" : "View"} Payment
                                  Terms
                                </UncontrolledTooltip>
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No invoice data available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {showPaymentTerms && (
          <Row>
            <Col lg="12">
              <Card className="mb-4">
                <CardBody>
                  <CardTitle
                    className="mb-3 text-primary"
                    style={{
                      backgroundColor: "#ecf0f1",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    Payment Terms
                  </CardTitle>
                  <div className="table-responsive">
                    <Table bordered hover className="mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Description</th>
                          <th>In (%)</th>
                          <th>Days</th>
                          <th>Amount</th>
                          <th>Received Amount</th>
                          <th>Payment Due Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentTermsBreakdown?.map((term, index) => (
                          <tr key={index}>
                            <td>{term.id}</td>
                            <td>{term.description}</td>
                            <td>{term.percentage}</td>
                            <td>{term.days}</td>
                            <td>₹ {term.amount.toLocaleString()}</td>
                            <td>₹ {term.receivedAmount.toLocaleString()}</td>
                            <td>
                              {term.piCreated === false
                                ? "Yet Not Created"
                                : term.piDate
                                ? term.piDate
                                : term.invoiceCreated === false
                                ? "Yet Not Created"
                                : term.invoiceDate
                                ? term.invoiceDate
                                : term.paymentDueDate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                  <div className="mt-3">
                    <Col lg="6">
                      <h5 className="m-0" style={{ color: "#2c3e50" }}>
                        Other Terms
                      </h5>
                    </Col>
                    <Col lg="12" className="py-3">
                      <textarea
                        name="metaDescription"
                        placeholder="Add the Other Details by Admin"
                        className="form-control"
                        rows="5"
                        style={{
                          borderColor: "#ced4da",
                          borderRadius: "5px",
                          backgroundColor: "#f8f9fa",
                          color: "#495057",
                        }}
                      />
                    </Col>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        {showPIDetails && (
          <>
            <Row>
              <Card>
                <Row>
                  <Col xl={4}>
                    <Card className="mb-3">
                      <CardBody>
                        <Col md="12">
                          <CardText>
                            <strong>Customer Name:</strong> {customer.name}
                          </CardText>
                          <CardText>
                            <strong>Customer ID:</strong> {customer.id}
                          </CardText>
                          <CardText>
                            <strong>Quoted User:</strong> {customer.quotedUser}
                          </CardText>
                          <CardText>
                            <strong>Cart User Name:</strong> {customer.cartUser}
                          </CardText>
                          <CardText>
                            <strong>Communication:</strong>
                            {customer.communication.email} |
                            {customer.communication.phone}
                          </CardText>
                          <CardText>
                            <strong>Order ID:</strong> {orderId}
                            <small>
                              (FORMAT: ORD-CARTID-ORDERCREATED DATE)
                            </small>
                          </CardText>
                          <CardText>
                            <strong>Delivery Scheduled:</strong>
                            {orderDetails.deliveryScheduled}
                            <small>
                              (Last Month: {orderDetails.lastMonth})
                            </small>
                          </CardText>
                          <CardText>
                            <strong>Part Shipment:</strong>
                            <Badge
                              color={
                                orderDetails.partShipment === "Allowed"
                                  ? "success"
                                  : "danger"
                              }
                            >
                              {orderDetails.partShipment}
                            </Badge>
                          </CardText>
                        </Col>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col xl={4}>
                    <Card className="mb-3">
                      <CardBody>
                        <CardTitle
                          className="mb-3 text-primary"
                          style={{
                            backgroundColor: "#ecf0f1",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          Billing Address
                        </CardTitle>
                        <p>
                          {billingAddress?.fullName}
                          <br />
                          {billingAddress?.contactNumber}
                          <br />
                          {billingAddress?.landmark}
                          <br />
                          {billingAddress?.addressLine1}
                          <br />
                          {billingAddress?.addressLine2}
                          <br />
                          {billingAddress?.cityState}, {billingAddress?.pincode}
                        </p>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col xl={4}>
                    <Card className="mb-3">
                      <CardBody>
                        <CardTitle
                          className="mb-3 text-primary"
                          style={{
                            backgroundColor: "#ecf0f1",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          Shipping Address
                        </CardTitle>
                        <p>
                          {shippingAddress?.fullName}
                          <br />
                          {shippingAddress?.contactNumber}
                          <br />
                          {shippingAddress?.landmark}
                          <br />
                          {shippingAddress?.addressLine1}
                          <br />
                          {shippingAddress?.addressLine2}
                          <br />
                          {shippingAddress?.cityState},
                          {shippingAddress?.pincode}
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col xl={12}>
                    <div className="table-responsive mt-4">
                      <Table bordered hover>
                        <thead className="thead-dark">
                          <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Shipped Qty</th>
                            <th>Available Stocks</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products?.length > 0 && (
                            <>
                              {products?.map((product) => {
                                return (
                                  <>
                                    <tr>
                                      <td>1</td>
                                      <td>
                                        <img
                                          src={product?.image}
                                          alt="Laptop"
                                          width="50"
                                        />
                                      </td>
                                      <td>
                                        {product?.name}
                                        <br />
                                        <small>Code: {product?.code}</small>
                                      </td>
                                      <td>{product?.shippedQty}</td>
                                      <td>{product?.stock}</td>
                                      <td>
                                        <Button
                                          size="sm"
                                          color="secondary"
                                          className="me-2"
                                        >
                                          -
                                        </Button>
                                        {product?.quantity}
                                        <Button
                                          size="sm"
                                          color="secondary"
                                          className="ms-2"
                                        >
                                          +
                                        </Button>
                                      </td>
                                      <td>₹{product?.price}</td>
                                      <td>₹{product?.total}</td>
                                      <td>
                                        <div className="d-flex gap-3">
                                          <Link
                                            to="#"
                                            className="text-success"
                                            onClick={() =>
                                              handleEditOrder(product)
                                            }
                                          >
                                            <i
                                              className="mdi mdi-pencil font-size-18"
                                              id="viewtooltip"
                                            />
                                            <UncontrolledTooltip
                                              placement="top"
                                              target="viewtooltip"
                                            >
                                              Edit
                                            </UncontrolledTooltip>
                                          </Link>
                                          <Link
                                            to="#"
                                            className="text-success"
                                            onClick={() =>
                                              handleDeleteOrder(product)
                                            }
                                          >
                                            <i
                                              className="bx bx-trash-alt font-size-20"
                                              id="deletetooltip"
                                            ></i>
                                            <UncontrolledTooltip
                                              placement="top"
                                              target="deletetooltip"
                                            >
                                              Delete
                                            </UncontrolledTooltip>
                                          </Link>
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                            </>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col xl={8}>
                    <Card>
                      <CardBody>
                        <CardTitle
                          className="mb-3 text-primary"
                          style={{
                            backgroundColor: "#ecf0f1",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          GST Declaration
                        </CardTitle>

                        <div className="table-responsive">
                          <Table
                            bordered
                            style={{ borderCollapse: "collapse" }}
                          >
                            <thead
                              className="table-light"
                              style={{ backgroundColor: "#bdc3c7" }}
                            >
                              <tr>
                                <th
                                  style={{
                                    backgroundColor: "#ecf0f1",
                                    color: "#2c3e50",
                                  }}
                                >
                                  GST%
                                </th>
                                <th
                                  style={{
                                    backgroundColor: "#ecf0f1",
                                    color: "#2c3e50",
                                  }}
                                >
                                  Amount
                                </th>
                                <th
                                  style={{
                                    backgroundColor: "#ecf0f1",
                                    color: "#2c3e50",
                                  }}
                                >
                                  SGST
                                </th>
                                <th
                                  style={{
                                    backgroundColor: "#ecf0f1",
                                    color: "#2c3e50",
                                  }}
                                >
                                  CGST
                                </th>
                                <th
                                  style={{
                                    backgroundColor: "#ecf0f1",
                                    color: "#2c3e50",
                                  }}
                                >
                                  IGST
                                </th>
                                <th
                                  style={{
                                    backgroundColor: "#ecf0f1",
                                    color: "#2c3e50",
                                  }}
                                >
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr style={{ backgroundColor: "#f9fafb" }}>
                                <td>0%</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                              </tr>
                              <tr style={{ backgroundColor: "#f9fafb" }}>
                                <td>3%</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                              </tr>
                              <tr style={{ backgroundColor: "#f9fafb" }}>
                                <td>5%</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                              </tr>
                              <tr style={{ backgroundColor: "#f9fafb" }}>
                                <td>12%</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                              </tr>
                              <tr
                                style={{
                                  backgroundColor: "#ecf0f1",
                                  color: "#2980b9",
                                }}
                              >
                                <td>18%</td>
                                <td>₹2,80,000</td>
                                <td>₹25,200</td>
                                <td>₹25,200</td>
                                <td>₹0.00</td>
                                <td>₹3,30,400</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col xl={4}>
                    <Card>
                      <CardBody>
                        <CardTitle
                          className="mb-3 text-primary"
                          style={{
                            backgroundColor: "#ecf0f1",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          Order Summary
                        </CardTitle>

                        <div className="table-responsive">
                          <Table
                            className="table mb-0"
                            style={{
                              borderCollapse: "separate",
                              borderSpacing: "0 10px",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Sub Total:
                                </td>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    color: "#27ae60",
                                  }}
                                >
                                  ₹ {summary?.subTotal}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Total GST:
                                </td>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    color: "#f39c12",
                                  }}
                                >
                                  ₹ {summary?.gst}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    backgroundColor: "#ecf0f1",
                                    color: "#2980b9",
                                  }}
                                >
                                  Total:
                                </th>
                                <th
                                  style={{
                                    backgroundColor: "#ecf0f1",
                                    color: "#2980b9",
                                  }}
                                >
                                  ₹ {summary?.total}
                                </th>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Advance Received (10%):
                                </td>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    color: "#e74c3c",
                                  }}
                                >
                                  ₹ {summary?.advanceReceived}
                                </td>
                              </tr>
                              <hr />
                              <tr>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Settle Order Against (Material Readiness)
                                  Advance (10%):
                                </td>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    color: "#8e44ad",
                                  }}
                                >
                                  ₹ 14444
                                </td>
                              </tr>
                              <hr />
                              <tr>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Total Ordered Qty:
                                </td>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    color: "#8e44ad",
                                  }}
                                >
                                  {quantities?.totalOrderedQty}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Total Shipped Qty:
                                </td>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    color: "#8e44ad",
                                  }}
                                >
                                  {quantities?.totalShippedQty}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Total Returns Qty:
                                </td>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    color: "#8e44ad",
                                  }}
                                >
                                  {quantities?.totalReturnsQty}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Balance Qty:
                                </td>
                                <td
                                  style={{
                                    backgroundColor: "#f9fafb",
                                    color: "#8e44ad",
                                  }}
                                >
                                  {quantities?.balanceQty}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col lg="12">
                    <Card className="mb-4">
                      <CardBody>
                        <CardTitle
                          className="mb-3 text-primary"
                          style={{
                            backgroundColor: "#ecf0f1",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          Payment Terms
                        </CardTitle>
                        <div className="table-responsive">
                          <Table bordered hover className="mb-0">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Description</th>
                                <th>In (%)</th>
                                <th>Days</th>
                                <th>Amount</th>
                                <th>Received Amount</th>
                                <th>Payment Due Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {paymentTermsBreakdown?.map((term, index) => (
                                <tr key={index}>
                                  <td>{term.id}</td>
                                  <td>{term.description}</td>
                                  <td>{term.percentage}</td>
                                  <td>{term.days}</td>
                                  <td>₹ {term.amount.toLocaleString()}</td>
                                  <td>
                                    ₹ {term.receivedAmount.toLocaleString()}
                                  </td>
                                  <td>
                                    {term.piCreated === false
                                      ? "Yet Not Created"
                                      : term.piDate
                                      ? term.piDate
                                      : term.invoiceCreated === false
                                      ? "Yet Not Created"
                                      : term.invoiceDate
                                      ? term.invoiceDate
                                      : term.paymentDueDate}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>

                        <div className="mt-3">
                          <Col lg="6">
                            <h5 className="m-0" style={{ color: "#2c3e50" }}>
                              Other Terms
                            </h5>
                          </Col>
                          <Col lg="12" className="py-3">
                            <textarea
                              name="metaDescription"
                              placeholder="Add the Other Details by Admin"
                              className="form-control"
                              rows="5"
                              style={{
                                borderColor: "#ced4da",
                                borderRadius: "5px",
                                backgroundColor: "#f8f9fa",
                                color: "#495057",
                              }}
                            />
                          </Col>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Row>
          </>
        )}
      </Container>

      <Modal
        size="sm"
        isOpen={createModal}
        toggle={() => setCreateModal(false)}
        centered={true}
      >
        <div className="modal-content">
          <ModalBody className="px-4 py-5 text-center">
            <button
              type="button"
              onClick={() => setCreateModal(false)}
              className="btn-close position-absolute end-0 top-0 m-3"
            ></button>
            <div className="avatar-sm mb-4 mx-auto">
              <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-20 rounded-3">
                <i className="mdi mdi-trash-can-outline"></i>
              </div>
            </div>
            <p className="text-muted font-size-16 mb-4">
              Do you want to create a Proforma Invoice for this order?
            </p>

            <div className="hstack gap-2 justify-content-center mb-0">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCreateModal(false)}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setCreateModal(false);
                  setShowPIDetails(true);
                }}
              >
                Yes
              </button>
            </div>
          </ModalBody>
        </div>
      </Modal>

      <Modal
        isOpen={editModal}
        toggle={() => setEditModal(false)}
        centered
        backdrop="static"
        keyboard={false}
        size="md"
        scrollable={true}
      >
        <ModalHeader toggle={() => setEditModal(false)} tag="h4">
          Edit Order
        </ModalHeader>
        <div className="modal-content">
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <Label className="form-label">Shipped Qty</Label>
                <Input
                  name="shippedQty"
                  type="number"
                  placeholder="Enter shipped quantity"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.shippedQty || ""}
                  invalid={
                    formik.touched.shippedQty && formik.errors.shippedQty
                      ? true
                      : false
                  }
                />
                {formik.touched.shippedQty && formik.errors.shippedQty ? (
                  <FormFeedback type="invalid">
                    {formik.errors.shippedQty}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Available Stocks</Label>
                <Input
                  name="availableStocks"
                  type="number"
                  placeholder="Enter available stocks"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.availableStocks || ""}
                  invalid={
                    formik.touched.availableStocks &&
                    formik.errors.availableStocks
                      ? true
                      : false
                  }
                />
                {formik.touched.availableStocks &&
                formik.errors.availableStocks ? (
                  <FormFeedback type="invalid">
                    {formik.errors.availableStocks}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Quantity</Label>
                <Input
                  name="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.quantity || ""}
                  invalid={
                    formik.touched.quantity && formik.errors.quantity
                      ? true
                      : false
                  }
                />
                {formik.touched.quantity && formik.errors.quantity ? (
                  <FormFeedback type="invalid">
                    {formik.errors.quantity}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Price</Label>
                <Input
                  name="price"
                  type="number"
                  placeholder="Enter price"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price || ""}
                  invalid={
                    formik.touched.price && formik.errors.price ? true : false
                  }
                />
                {formik.touched.price && formik.errors.price ? (
                  <FormFeedback type="invalid">
                    {formik.errors.price}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Total</Label>
                <Input
                  name="total"
                  type="number"
                  placeholder="Enter total"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.total || ""}
                  invalid={
                    formik.touched.total && formik.errors.total ? true : false
                  }
                />
                {formik.touched.total && formik.errors.total ? (
                  <FormFeedback type="invalid">
                    {formik.errors.total}
                  </FormFeedback>
                ) : null}
              </div>

              <Col>
                <div className="text-end">
                  <Button type="submit" color="success">
                    Update
                  </Button>
                </div>
              </Col>
            </form>
          </ModalBody>
        </div>
      </Modal>

      <Modal
        size="sm"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(false)}
        centered
      >
        <div className="modal-content">
          <ModalBody className="px-4 py-5 text-center">
            <button
              type="button"
              onClick={() => setDeleteModal(false)}
              className="btn-close position-absolute end-0 top-0 m-3"
            ></button>
            <div className="avatar-sm mb-4 mx-auto">
              <div className="avatar-title bg-danger text-danger bg-opacity-10 font-size-20 rounded-3">
                <i className="mdi mdi-trash-can-outline"></i>
              </div>
            </div>
            <p className="text-muted font-size-16 mb-4">
              Are you sure you want to delete this order?
            </p>

            <div className="hstack gap-2 justify-content-center mb-0">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setDeleteModal(false)}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </div>
  );
};

export default CorporateOrderDetails;
