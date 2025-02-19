import React, { useMemo, useState } from "react";
import { PaymentStatus } from "../../Dashboard/LatestTranactionCol";
import { Link } from "react-router-dom";
import { Col, Container, Row, UncontrolledTooltip } from "reactstrap";
import EcommerceOrdersModal from "../../Ecommerce/EcommerceOrders/EcommerceOrdersModal";
import EcommerceOrdersPaymentModal from "../../Ecommerce/EcommerceOrders/EcommerceOrdersPaymentModal";
import EcommerceOrdersTrackingModal from "../../Ecommerce/EcommerceOrders/EcommerceOrdersTrackingModal";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from "../../../components/Common/TableContainer";
import { customerOrderData } from "../../../common/data/MyFackData";

const CorporateOrder = () => {
  const [orderDetailsModel, setOrderDetailsModal] = useState(false);
  const [paymentDetailsModel, setPaymentDetailsModal] = useState(false);
  const [trackingDetailsModel, setTrackingDetailsModal] = useState(false);
  const toggleViewModal = () => setOrderDetailsModal(!orderDetailsModel);
  const togglePaymentDetailsViewModal = () =>
    setPaymentDetailsModal(!paymentDetailsModel);
  const toggleTrackingDetailsViewModal = () =>
    setTrackingDetailsModal(!trackingDetailsModel);

  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "orderId",
        filterable: true,
      },
      {
        Header: "Customer Name",
        accessor: "name",
        filterable: true,
      },
      {
        Header: "Date",
        accessor: "date",
        filterable: true,
      },
      {
        Header: "Total",
        accessor: "price",
        filterable: true,
      },
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
        filterable: true,
        Cell: (cellProps) => {
          return <PaymentStatus {...cellProps} />;
        },
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        filterable: true,
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
                to={`/manage-orders/corporate-customer/order-details/${orderId}`}
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
              <Link
                to="#"
                className="text-success"
                onClick={togglePaymentDetailsViewModal}
              >
                <i
                  className="fab fas fa-money-bill-alt font-size-14"
                  id="paymentbutton"
                />
                <UncontrolledTooltip placement="top" target="paymentbutton">
                  Payment Details
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-success"
                onClick={toggleTrackingDetailsViewModal}
              >
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

  document.title = "Corporate Customer Orders | Bieprocure";
  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Orders" breadcrumbItem="Corporate Customer Orders" />
          <EcommerceOrdersModal
            isOpen={orderDetailsModel}
            toggle={toggleViewModal}
          />
          <EcommerceOrdersPaymentModal
            isOpen={paymentDetailsModel}
            toggle={togglePaymentDetailsViewModal}
          />
          <EcommerceOrdersTrackingModal
            isOpen={trackingDetailsModel}
            toggle={toggleTrackingDetailsViewModal}
          />
          <Row>
            <Col lg="12">
              <TableContainer
                columns={columns}
                data={customerOrderData}
                isGlobalFilter={true}
                customPageSize={10}
                className="custom-header-css"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CorporateOrder;
