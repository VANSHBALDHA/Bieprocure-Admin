import React from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Chat from "../../Chat/Chat";

const ManageTicket = () => {
  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Ticket" breadcrumbItem="Manage Ticket" />
          <Row>
            <Chat />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default withRouter(ManageTicket);
