import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import TableContainer from "../../../../components/Common/TableContainer";
import { individualCartData } from "../../../../common/data/MyFackData";

const IndividualCart = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Cart ID",
        accessor: "cart_Id",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "	Cart Number",
        accessor: "Cart_Number",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Customer Name",
        accessor: "customer_name",
        filterable: true,
      },
      {
        Header: "Created Date",
        accessor: "created_date",
        filterable: true,
      },

      {
        Header: "Updated Date",
        accessor: "updated_date",
        filterable: true,
      },
      {
        Header: "Order Status",
        accessor: "status",
        filterable: true,
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

  document.title = "Individual Customer Cart | Admin";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Cart"
            breadcrumbItem="Individual Customer Cart List"
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={individualCartData}
                    isGlobalFilter={true}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default IndividualCart;
