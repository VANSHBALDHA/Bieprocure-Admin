import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import withRouter from "../../../components/Common/withRouter";
import classnames from "classnames";
import TableContainer from "../../../components/Common/TableContainer";
import { customerOrderData } from "../../../common/data/MyFackData";
import { PaymentStatus } from "../../Dashboard/LatestTranactionCol";
import EcommerceOrdersModal from "../../Ecommerce/EcommerceOrders/EcommerceOrdersModal";
import EcommerceOrdersPaymentModal from "../../Ecommerce/EcommerceOrders/EcommerceOrdersPaymentModal";
import EcommerceOrdersTrackingModal from "../../Ecommerce/EcommerceOrders/EcommerceOrdersTrackingModal";
import { Link } from "react-router-dom";

const CustomerOrder = () => {
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [orderDetailsModel, setOrderDetailsModal] = useState(false);
  const [paymentDetailsModel, setPaymentDetailsModal] = useState(false);
  const [trackingDetailsModel, setTrackingDetailsModal] = useState(false);
  const toggleViewModal = () => setOrderDetailsModal(!orderDetailsModel);
  const togglePaymentDetailsViewModal = () =>
    setPaymentDetailsModal(!paymentDetailsModel);
  const toggleTrackingDetailsViewModal = () =>
    setTrackingDetailsModal(!trackingDetailsModel);

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  document.title = "Customer Orders | Bieprocure";

  // indivisual customer order list

  const columns = useMemo(
    () => [
      // {
      //   Header: "#",
      //   filterable: false,
      //   disableFilters: true,
      //   Cell: cellProps => {
      //     return <input type="checkbox" className="form-check-input" />;
      //   },
      // },
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
                to={`/manage-user-orders/view-order/${orderId}`}
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

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Orders" breadcrumbItem="Customer Orders" />
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
              <Card>
                <CardBody>
                  <Nav tabs className="nav-tabs-custom nav-justified">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "1",
                        })}
                        onClick={() => {
                          toggleCustom("1");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="fas fa-home"></i>
                        </span>
                        <span className="d-none d-sm-block">
                          Individual Customers
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "2",
                        })}
                        onClick={() => {
                          toggleCustom("2");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="far fa-user"></i>
                        </span>
                        <span className="d-none d-sm-block">
                          Corporate Customers
                        </span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent
                    activeTab={customActiveTab}
                    className="p-3 text-muted"
                  >
                    {/* indivisual customer tab 1 */}
                    <TabPane tabId="1">
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
                    </TabPane>

                    {/* indivisual customer tab 2 */}
                    <TabPane tabId="2">
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
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default withRouter(CustomerOrder);
