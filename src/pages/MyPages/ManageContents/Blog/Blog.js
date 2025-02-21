import React, { useMemo } from "react";
import withRouter from "../../../../components/Common/withRouter";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import TableContainer from "../../../../components/Common/TableContainer";
import { Link, useNavigate } from "react-router-dom";
import { BlogData } from "../../../../common/data/MyFackData";

const Blog = () => {
  const navigate = useNavigate();

  const handleaddBlog = () => {
    navigate("/manage-contents/blogs/add-blog");
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        disableFilters: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Blog Title",
        accessor: "title",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Slug",
        accessor: "slug",
        filterable: true,
      },
      {
        Header: "	Category",
        accessor: "category",
        filterable: true,
      },
      {
        Header: "	Image",
        accessor: "image",
        disableFilters: true,
        Cell: ({ value }) => (
          <img className="rounded-circle avatar-md" src={value} alt="" />
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: ({ row }) => (
          <div className="d-flex gap-3">
            <Link
              to={`/manage-contents/blogs/view-blog/${row.original.id}`}
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
              to={`/manage-contents/blogs/edit-blog/${row.original.id}`}
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

  document.title = "Blog Section | Bieprocure";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Blogs" breadcrumbItem="Blogs List" />
          <Row className="mb-2"></Row>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={BlogData}
                    isGlobalFilter={true}
                    isAddBlog={true}
                    customPageSize={10}
                    handleaddBlog={handleaddBlog}
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

export default withRouter(Blog);
