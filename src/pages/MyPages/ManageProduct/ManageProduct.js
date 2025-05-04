import React, { useMemo } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { productsData } from "../../../common/data/MyFackData";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
  Badge,
} from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

const ManageProduct = () => {
  document.title = "Products | Bieprocure";

  const columns = useMemo(() => [
      {
        Header: "Product Code",
        accessor: "productCode",
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Product Name",
        accessor: "productName",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Display Quan.",
        accessor: "displayQuantity",
        filterable: true,
      },
      {
        Header: "Reserved Quan.",
        accessor: "reservedQuantity",
        filterable: true,
      },
      {
        Header: "Sales Quan.",
        accessor: "salesQuantity",
        filterable: true,
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: ({ value }) => (
          <Badge color={value === "active" ? "success" : "danger"}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
        ),
      },

      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: ({ row }) => (
          <div className="d-flex gap-3">
            <Link
              to={`/manage-products/view-product/${row.original.productCode}`}
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
              to={`/manage-products/edit-product/${row.original.productCode}`}
              className="text-success"
            >
              <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              <UncontrolledTooltip placement="top" target="edittooltip">
                Edit
              </UncontrolledTooltip>
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Product" breadcrumbItem="Manage Products" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={productsData}
                    isGlobalFilter={true}
                    customPageSize={10}
                    isAddProduct={true}
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

export default withRouter(ManageProduct);
