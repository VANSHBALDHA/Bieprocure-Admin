import React, { useMemo, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";
import { ContactData } from "../../../common/data/MyFackData";

const Contact = () => {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Username",
        accessor: "customerName",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
      },
      {
        Header: "Inquiry Date",
        accessor: "date",
        filterable: true,
      },
      {
        Header: "Subject",
        accessor: "subject",
        filterable: true,
      },
      {
        Header: "Description",
        accessor: "message",
        filterable: true,
      },
      // {
      //   Header: "Action",
      //   accessor: "action",
      //   filterable: true,
      //   Cell: ({ row }) => {
      //     return (
      //       <ul className="list-unstyled hstack gap-1 mb-0">
      //         <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
      //           <Link to="#" className="btn btn-sm btn-soft-primary">
      //             <i className="mdi mdi-eye-outline" id="viewtooltip"></i>
      //           </Link>
      //         </li>
      //         <UncontrolledTooltip placement="top" target="viewtooltip">
      //           View
      //         </UncontrolledTooltip>
      //       </ul>
      //     );
      //   },
      // },
    ],
    []
  );

  document.title = "User Contact List | Admin";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contact" breadcrumbItem="User Contact List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={ContactData}
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

export default withRouter(Contact);
