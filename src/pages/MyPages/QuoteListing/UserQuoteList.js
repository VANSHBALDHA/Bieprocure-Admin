import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import withRouter from "../../../components/Common/withRouter";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";

const UserQuoteList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);

  const DeleteProduct = () => {
    setDeleteModal(true);
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Quotes" breadcrumbItem="Customer Quote List" />
          <Row>
            <Col lg="12">
              <Button
                type="button"
                color="primary"
                className="btn mb-3 me-2 d-flex align-items-center"
                onClick={() => navigate("/manage-request/quote")}
              >
                <i class="bx bx-arrow-back me-2"></i>
                Back To Quote
              </Button>
              <div className="card" style={{ border: "1px solid #e9ebec" }}>
                <div class="card-body">
                  <div class="flex-grow-1 mb-4">
                    <h4 class="mb-1 text-muted fw-bold">
                      Quote details - {id}
                    </h4>
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
                        <strong>Quote Number:</strong> #123w
                      </CardText>
                      <CardText>
                        <strong>Requested Date:</strong> 03-12-2024
                      </CardText>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="product_card mb-3">
                <div class="product_img">
                  <img
                    src="https://market.thingpark.com/media/catalog/product/cache/496f4b8029935cd1a435219c05e3e604/s/m/smart-energy-iot-new-boundary-technologies-1024x665-removebg-preview.jpg"
                    class="w-100"
                  />
                </div>
                <div class="product_detail">
                  <span class="product_stock">In Stock</span>
                  <p>
                    New Boundary Technologies | RemoteVista IoT Web Application
                    Starter Kit
                  </p>
                  <div class="product_info_inr">
                    <div class="product_sku">
                      <h3>SKU: 2011-16369</h3>
                    </div>
                    <div class="product_price_info">
                      <div class="row">
                        <div class="col-md-5">
                          <div class="product_price">
                            <div className="d-flex gap-3">
                              <div className="boxes">
                                <p>Original price</p>
                                <h3>₹20,000</h3>
                              </div>
                              <div className="boxes">
                                <p>Customer price</p>
                                <h3>₹18,000</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="your_price position-relative">
                            <input
                              type="text"
                              class="form-control "
                              placeholder="Your Price"
                            />
                            <i class="bx bx-info-circle your_price_input"></i>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="product_qty">
                            <span class="product_qty_counter">
                              <i class="bx bx-minus"></i>
                            </span>
                            <input type="text" class="form-control" value="2" />
                            <span class="product_qty_counter">
                              <i class="bx bx-plus"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="customer_review mt-4">
                    <textarea
                      name=""
                      rows="4"
                      class="form-control"
                      id=""
                      placeholder="Your comment"
                    ></textarea>
                  </div>
                  <div className="text-sm-end mt-4">
                    <Button
                      type="button"
                      color="danger"
                      className="btn-danger mb-2 me-2"
                      onClick={() => DeleteProduct()}
                    >
                      <i class="bx bx-trash-alt font-size-14"></i> Delete
                    </Button>
                    <Button
                      type="button"
                      color="success"
                      className="btn-secondary  mb-2 me-2"
                      onClick={() => navigate("/manage-request/quote")}
                    >
                      Update Quote
                    </Button>
                  </div>
                </div>
              </div>
              <div class="product_card">
                <div class="product_img">
                  <img
                    src="https://market.thingpark.com/media/catalog/product/cache/496f4b8029935cd1a435219c05e3e604/s/m/smart-energy-iot-new-boundary-technologies-1024x665-removebg-preview.jpg"
                    class="w-100"
                  />
                </div>
                <div class="product_detail">
                  <span class="product_stock">In Stock</span>
                  <p>
                    New Boundary Technologies | RemoteVista IoT Web Application
                    Starter Kit
                  </p>
                  <div class="product_info_inr">
                    <div class="product_sku">
                      <h3>SKU: 2011-16369</h3>
                    </div>
                    <div class="product_price_info">
                      <div class="row">
                        <div class="col-md-5">
                          <div class="product_price">
                            <div className="d-flex gap-3">
                              <div className="boxes">
                                <p>Original price</p>
                                <h3>₹20,000</h3>
                              </div>
                              <div className="boxes">
                                <p>Customer price</p>
                                <h3>₹18,000</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="your_price position-relative">
                            <input
                              type="text"
                              class="form-control "
                              placeholder="Your Price"
                            />
                            <i class="bx bx-info-circle your_price_input"></i>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="product_qty">
                            <span class="product_qty_counter">
                              <i class="bx bx-minus"></i>
                            </span>
                            <input type="text" class="form-control" value="2" />
                            <span class="product_qty_counter">
                              <i class="bx bx-plus"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="customer_review mt-4">
                    <textarea
                      name=""
                      rows="4"
                      class="form-control"
                      id=""
                      placeholder="Your comment"
                    ></textarea>
                  </div>
                  <div className="text-sm-end mt-4">
                    <Button
                      type="button"
                      color="danger"
                      className="btn-danger mb-2 me-2"
                      onClick={() => DeleteProduct()}
                    >
                      <i class="bx bx-trash-alt font-size-14"></i> Delete
                    </Button>
                    <Button
                      type="button"
                      color="success"
                      className="btn-secondary  mb-2 me-2"
                      onClick={() => navigate("/manage-request/quote")}
                    >
                      Update Quote
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Model For Delete Quote */}
          <Modal
            size="sm"
            isOpen={deleteModal}
            toggle={DeleteProduct}
            centered={true}
          >
            <div className="modal-content">
              <ModalBody className="px-4 py-5 text-center">
                <button
                  type="button"
                  onClick={() => setDeleteModal(false)}
                  className="btn-close position-absolute end-0 top-0 m-3"
                ></button>
                <div className="avatar-sm mb-4 mx-auto">
                  <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-20 rounded-3">
                    <i className="mdi mdi-trash-can-outline"></i>
                  </div>
                </div>
                <p className="text-muted font-size-16 mb-4">
                  Are you sure you want to permanently remove Quote
                </p>

                <div className="hstack gap-2 justify-content-center mb-0">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setDeleteModal(false)}
                  >
                    Delete Now
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setDeleteModal(false)}
                  >
                    Close
                  </button>
                </div>
              </ModalBody>
            </div>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default withRouter(UserQuoteList);
