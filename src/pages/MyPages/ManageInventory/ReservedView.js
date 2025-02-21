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
              <Card className="shadow-sm">
                <CardBody>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Field</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Product Name</strong>
                        </td>
                        <td>{data.productName}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Display Quantity</strong>
                        </td>
                        <td>{data.quantity}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Purchase Price (Per item)</strong>
                        </td>
                        <td>{data.price}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Quantity</strong>
                        </td>
                        <td>{data.quantity}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Display Available Quantity</strong>
                        </td>
                        <td>90</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Available Quantity</strong>
                        </td>
                        <td>15</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Reserved Product Quantity</strong>
                        </td>
                        <td>15</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="text-center mt-4">
                    <Link to="/manage-inventory/reserved">
                      <Button color="secondary">Back</Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ReservedView;
