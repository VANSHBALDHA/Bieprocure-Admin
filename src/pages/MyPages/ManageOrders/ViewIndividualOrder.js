import React from "react";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import withRouter from "../../../components/Common/withRouter";
import {
  Badge,
  Button,
  CardText,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

const ViewIndividualOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  document.title = "Order details | Bieprocure";
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Orders" breadcrumbItem="Order details" />
          <Button
            type="button"
            color="primary"
            className="btn mb-3 me-2 d-flex align-items-center"
            onClick={() => navigate("/manage-orders/individual-customer")}
          >
            <i class="bx bx-arrow-back me-1"></i>
            Back to Orders
          </Button>
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="card" style={{ border: "1px solid #e9ebec" }}>
                <div class="card-body">
                  <div class="flex-grow-1 mb-4">
                    <h4 class="mb-1 text-muted fw-bold">
                      Order details - {id}
                    </h4>
                    <p class="text-muted mb-0">Payment via Cash on delivery.</p>
                  </div>
                  <Row>
                    <Col md="4">
                      <CardText>
                        <strong>User ID:</strong> #123
                      </CardText>
                      <CardText>
                        <strong>User Name:</strong> Testing purpose
                      </CardText>
                      <CardText className="mb-3">
                        <strong>Mobile Number:</strong> 7778889994
                      </CardText>
                      <CardText>
                        <strong>Email:</strong> testing123@gmail.com
                      </CardText>
                      <CardText>
                        <strong>Order Date:</strong> 03-12-2024
                      </CardText>
                      <CardText>
                        <strong>Order Status:</strong> <Badge>Pending</Badge>
                      </CardText>
                      <CardText>
                        <strong>Payment Status:</strong> <Badge>Pending</Badge>
                      </CardText>
                    </Col>
                    <Col md="4">
                      <CardText>
                        <strong>Billing Address:</strong>
                      </CardText>
                      <CardText>123 Main Street, Apartment 4B</CardText>
                      <CardText>New York, NY 10001</CardText>
                      <CardText>United States</CardText>
                    </Col>
                    <Col md="4">
                      <CardText>
                        <strong>Shipping Address:</strong>
                      </CardText>
                      <CardText>123 Main Street, Apartment 4B</CardText>
                      <CardText>New York, NY 10001</CardText>
                      <CardText>United States</CardText>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="card" style={{ border: "1px solid #e9ebec" }}>
                <div className="card-body">
                  <h5 className="mb-3">Products in this Order</h5>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#101</td>
                        <td>
                          <img
                            src="https://virtina.com/wp-content/uploads/2019/05/electronics.png"
                            alt="Product"
                            className="avatar-md"
                          />
                        </td>
                        <td>Product Name 1</td>
                        <td>₹10.00</td>
                        <td>2</td>
                        <td>₹20.00</td>
                      </tr>
                      <tr>
                        <td>#102</td>
                        <td>
                          <img
                            src="https://virtina.com/wp-content/uploads/2019/05/electronics.png"
                            alt="Product"
                            className="avatar-md"
                          />
                        </td>
                        <td>Product Name 2</td>
                        <td>₹15.00</td>
                        <td>1</td>
                        <td>₹15.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8"></div>
                <div className="col-md-4">
                  <div className="card" style={{ border: "1px solid #e9ebec" }}>
                    <div className="card-body">
                      <h5 className="mb-3 fw-bold">Order Summary</h5>
                      <div className="table-responsive">
                        <Table className="table mb-0">
                          <tbody>
                            <tr>
                              <td>Grand Total :</td>
                              <td>₹ 1,857</td>
                            </tr>
                            <tr>
                              <td>Discount : </td>
                              <td>- ₹ 157</td>
                            </tr>
                            <tr>
                              <td>Shipping Charge :</td>
                              <td>₹ 25</td>
                            </tr>
                            <tr>
                              <td>Estimated Tax : </td>
                              <td>₹ 19.22</td>
                            </tr>
                            <tr>
                              <th>Total :</th>
                              <th>₹ 1744.22</th>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default withRouter(ViewIndividualOrder);
