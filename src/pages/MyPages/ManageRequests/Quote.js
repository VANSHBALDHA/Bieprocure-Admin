import React, { useMemo, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";
import { quoteRequestData } from "../../../common/data/MyFackData";
import { Link, useNavigate } from "react-router-dom";

const Quote = () => {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Quote Number",
        accessor: "quoteNumber",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Customer Name",
        accessor: "customerName",
        filterable: true,
      },
      {
        Header: "Phone No.",
        accessor: "customerContactNumber",
        filterable: true,
      },
      {
        Header: "Requested Date",
        accessor: "date",
        filterable: true,
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <div className="d-flex gap-3 align-items-center">
              <Link
                to={`/manage-request/quote/customre-quote-list/${row?.original?.quoteNumber}`}
                className="text-success"
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  document.title = "Customer Quote | Admin";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Quote" breadcrumbItem="Customer Quotes" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={quoteRequestData}
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

export default withRouter(Quote);
