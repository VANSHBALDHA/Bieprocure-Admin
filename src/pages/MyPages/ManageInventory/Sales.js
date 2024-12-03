import React, { useMemo, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";
import { salesData } from "../../../common/data/MyFackData";
import { Link } from "react-router-dom";

const Sales = () => {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Order ID",
        accessor: "orderNo",
        filterable: true,
        Cell: ({ value }) => (
          <Link
            to={`/manage-inventory/sales/orders/${value}`}
            className="text-body fw-bold"
          >
            {value}
          </Link>
        ),
      },
      {
        Header: "Billing Name",
        accessor: "customerName",
        filterable: true,
        Cell: ({ row }) => (
          <Link
            to={`/manage-inventory/sales/invoices/${row.original.orderNo}`}
            className="text-body fw-bold"
          >
            {row.original.customerName}
          </Link>
        ),
      },
      {
        Header: "Customer Type",
        accessor: "customerType",
        filterable: true,
      },
      {
        Header: "Total Amount",
        accessor: "totalAmount",
        filterable: true,
        Cell: ({ value }) => <div className="text-success">₹ {value}</div>,
      },
      {
        Header: "Received Amount",
        accessor: "receivedAmount",
        filterable: true,
        Cell: ({ value }) => <div className="text-secondary">₹ {value}</div>,
      },
      {
        Header: "Pending Amount",
        accessor: "pendingAmount",
        filterable: true,
        Cell: ({ value }) => (
          <div className="text-danger fw-bold">₹ {value}</div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Manage Inventory" breadcrumbItem="Sales" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={salesData}
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

export default withRouter(Sales);
