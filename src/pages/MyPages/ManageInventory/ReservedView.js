import React, { useEffect, useState } from "react";
import { inventoryItems } from "../../../common/data/MyFackData";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const ReservedView = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const selectedItems = inventoryItems.find(
      (datas) => datas.id === Number(id)
    );
    setData(selectedItems);
  }, [id]);

  document.title = "Manage inventory - Reserved details | Bieprocure";
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Manage Inventory"
            breadcrumbItem="Reserved Details"
          />
          <Row>
            <Col lg="12">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  style={{
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                >
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Display Quantity</th>
                      <th>Quantity</th>
                      <th>Add Quantity</th>
                      <th>Purchase Price (Per item) </th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{data.productName}</td>
                      <td>{data.quantity}</td>
                      <td>30</td>
                      <td>200</td>
                      <td>{data.price}</td>
                      <td>28-02-2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ReservedView;
