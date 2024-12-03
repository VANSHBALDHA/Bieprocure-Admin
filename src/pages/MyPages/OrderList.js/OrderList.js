import React from "react";
import { Col, Container, Row } from "reactstrap";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import LatestTranaction from "../../Dashboard/LatestTranaction";

const OrderList = () => {
  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Manage Inventory - Orders"
            breadcrumbItem="User Order List"
          />
          <Row>
            <Col lg="12">
              <LatestTranaction />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default withRouter(OrderList);
