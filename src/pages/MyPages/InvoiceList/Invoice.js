import React, { useMemo } from "react";
import withRouter from "../../../components/Common/withRouter";
import { invoiceData } from "../../../common/data/MyFackData";
import { Badge, Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from "../../../components/Common/TableContainer";
import { Link, useParams } from "react-router-dom";

const Invoice = () => {
  const params = useParams();

  console.log("params", params?.id);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Invoice ID",
        accessor: "invoiceId",
        filterable: true,
        Cell: ({ value }) => (
          <Link
            to={`/manage-inventory/sales/invoices/${params?.id}/invoice-details/${value}`}
            className="text-body fw-bold"
          >
            {value}
          </Link>
        ),
      },
      {
        Header: "Title",
        accessor: "title",
        filterable: true,
      },
      {
        Header: "Amount",
        accessor: "amount",
        filterable: true,
      },
      {
        Header: "Created At",
        accessor: "dateCreate",
        filterable: true,
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: ({ value }) => (
          <Badge color={value === "Cancel" ? "danger" : "success"}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
        ),
      },
    ],
    []
  );

  document.title = "invoice list | Admin";
  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Sales - Invoices"
            breadcrumbItem="User Invoices"
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={invoiceData}
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

export default withRouter(Invoice);
