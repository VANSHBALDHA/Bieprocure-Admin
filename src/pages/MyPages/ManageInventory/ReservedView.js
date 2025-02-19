import React, { useEffect, useState } from "react";
import { inventoryItems } from "../../../common/data/MyFackData";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
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

  console.log("data0", data);

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
                  <Row>
                    <Col md="4">
                      <Label>
                        <strong>Product Name:</strong>
                      </Label>
                      <Input type="text" value={data.productName} disabled />
                      <Label className="mt-3">
                        <strong>Display Quantity:</strong>
                      </Label>
                      <Input type="text" value={data.quantity} disabled />

                      <Label className="mt-3">
                        <strong>Purchase Price (Per item):</strong>
                      </Label>
                      <Input type="text" value={data.price} disabled />
                    </Col>
                    <Col md="4">
                      <Label>
                        <strong>Quantity:</strong>
                      </Label>
                      <Input type="text" value={data.quantity} disabled />

                      <Label className="mt-3">
                        <strong>Display Available Quantity:</strong>
                      </Label>
                      <Input type="text" value="90" disabled />
                    </Col>
                    <Col md="4">
                      <Label>
                        <strong>Available Quantity:</strong>
                      </Label>
                      <Input type="text" value="15" disabled />

                      <Label className="mt-3">
                        <strong>Reserved Product Quantity</strong>
                      </Label>
                      <Input type="text" value="15" disabled />
                    </Col>
                  </Row>
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
