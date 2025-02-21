import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Card,
  CardBody,
  Col,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";
import { individualCartData } from "../../../common/data/MyFackData";
import EcommerceOrdersPaymentModal from "../../Ecommerce/EcommerceOrders/EcommerceOrdersPaymentModal";

const IndividualCart = () => {
  const [paymentDetailsModel, setPaymentDetailsModal] = useState(false);

  const togglePaymentDetailsViewModal = () =>
    setPaymentDetailsModal(!paymentDetailsModel);

  const columns = useMemo(
    () => [
      {
        Header: "Cart ID",
        accessor: "cart_Id",
        disableFilters: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "	Cart Number",
        accessor: "Cart_Number",
        disableFilters: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Customer Name",
        accessor: "customer_name",
        disableFilters: true,
      },
      {
        Header: "Created Date",
        accessor: "created_date",
        disableFilters: true,
      },

      {
        Header: "Updated Date",
        accessor: "updated_date",
        disableFilters: true,
      },
      {
        Header: "Order Status",
        accessor: "status",
        disableFilters: true,
        Cell: ({ value }) => (
          <Badge color={value === "order confirmed" ? "success" : "danger"}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: ({ row }) => {
          const status = row.original.status;
          const isExpired = status === "expired";
          return (
            <div className="d-flex gap-3 align-items-center">
              <Link
                to="#"
                className="text-success"
                onClick={togglePaymentDetailsViewModal}
              >
                <i
                  className="fab fas fa-eye font-size-14"
                  id="paymentbutton"
                />
                <UncontrolledTooltip placement="top" target="paymentbutton">
                  Payment Details
                </UncontrolledTooltip>
              </Link>

              <Link
                to={`/manage-request/cart/individual-customers/cart-list/${row.original.Cart_Number}`}
                className={`text-success ${isExpired ? "disabled-link" : ""}`}
                aria-disabled={isExpired}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit Cart
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
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <TableContainer
                columns={columns}
                data={individualCartData}
                isGlobalFilter={false}
                customPageSize={10}
                className="custom-header-css"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <EcommerceOrdersPaymentModal
        isOpen={paymentDetailsModel}
        toggle={togglePaymentDetailsViewModal}
      />
    </>
  );
};

export default IndividualCart;
