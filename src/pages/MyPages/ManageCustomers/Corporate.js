import React, { useMemo } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  Badge,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";
import { corporateCustomer } from "../../../common/data/MyFackData";
import { Link } from "react-router-dom";

const Corporate = () => {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Username",
        accessor: "name",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "User Type",
        accessor: "customer_type",
        filterable: true,
      },
      {
        Header: "Joining Date",
        accessor: "date",
        filterable: true,
      },
      {
        Header: "Last Login Date",
        accessor: "last_login_date",
        filterable: true,
      },
      {
        Header: "Total Purchase",
        accessor: "balance",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">₹ {value}</div>,
      },

      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: ({ value }) => {
          return (
            <Badge color={value === "active" ? "success" : "danger"}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Badge>
          );
        },
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <ul className="list-unstyled hstack gap-1 mb-0">
              <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                <Link
                  to={`/manage-customers/corporate/customer-details/${row.original.id}`}
                  className="text-success"
                >
                  <i
                    className="mdi mdi-eye-outline font-size-18"
                    id="viewtooltip"
                  ></i>
                </Link>
              </li>
              <UncontrolledTooltip placement="top" target="viewtooltip">
                View
              </UncontrolledTooltip>
            </ul>
          );
        },
      },
    ],
    []
  );

  document.title = "Corporate Customer | Bieprocure";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Manage Customers" breadcrumbItem="Corporate" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={corporateCustomer}
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

export default withRouter(Corporate);
