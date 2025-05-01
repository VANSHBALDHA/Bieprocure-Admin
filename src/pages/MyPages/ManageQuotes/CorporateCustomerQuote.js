import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Modal,
  ModalBody,
  UncontrolledTooltip,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Badge,
  FormGroup,
  Label,
  ModalFooter,
  ModalHeader,
  FormFeedback,
  CardText,
} from "reactstrap";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import quoteImage from "../../../assets/images/product/Pro-12b.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const CorporateCustomerQuote = () => {
  const { id } = useParams();

  const [quotes, setQuotes] = useState([
    {
      quoteNumber: "Q-1025",
      userName: "Ankit Gandhi",
      mobileNumber: "1234567890",
      role: "Technician",
      date: "28-02-2024",
      revisedDate: "28-02-2024",
      status: "Expired",
      products: [
        {
          productCode: "P-101",
          productImage: "path/to/image1",
          productName: "Product 1",
          orderQty: 10,
          actualPrice: 50,
          quotedPrice: 45,
          yourPrice: 40,
          currentStocks: 50,
          deliverySchedule: "4-5 Weeks",
        },
        {
          productCode: "P-102",
          productImage: "path/to/image2",
          productName: "Product 2",
          orderQty: 20,
          actualPrice: 60,
          quotedPrice: 55,
          yourPrice: 50,
          currentStocks: 30,
          deliverySchedule: "4-5 Weeks",
        },
      ],
    },
    {
      quoteNumber: "Q-1026",
      userName: "John Doe",
      mobileNumber: "1234567890",
      role: "Technician",
      date: "28-02-2024",
      revisedDate: "28-02-2024",
      status: "Revised",
      products: [
        {
          productCode: "P-103",
          productImage: "path/to/image3",
          productName: "Product 3",
          orderQty: 15,
          actualPrice: 70,
          quotedPrice: 65,
          yourPrice: 60,
          currentStocks: 20,
          deliverySchedule: "4-5 Weeks",
        },
      ],
    },
  ]);
  const [modal, setModal] = useState(false);
  const [quoteModel, setQuoteModel] = useState(false);
  const [addProduct, setAddProduct] = useState(null);
  const toggleModal = () => setModal(!modal);
  const toggleQuoteModal = () => setQuoteModel(!quoteModel);

  const handleEditClicks = (product) => {
    toggleModal();
    setAddProduct(product);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (addProduct && addProduct.productCode) || "",
      actualPrice: (addProduct && addProduct.actualPrice) || "",
      quotedPrice: (addProduct && addProduct.quotedPrice) || "",
      yourPrice: (addProduct && addProduct.yourPrice) || "",
    },
    validationSchema: Yup.object({
      actualPrice: Yup.string().required("Please enter actual price"),
      quotedPrice: Yup.string().required("Please enter quoted price"),
      yourPrice: Yup.string().required("Please enter your price"),
    }),
    onSubmit: (values) => {
      console.log(":", values);
      toggleModal();
      toast.success("Quote edit successfully!!");
    },
  });

  document.title = "Corporate Customer Quote | Bieprocure";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Quote"
            breadcrumbItem="Corporate Customer Quotes"
          />
          <Row>
            <div className="card" style={{ border: "1px solid #e9ebec" }}>
              <div class="card-body">
                <div class="flex-grow-1 mb-4">
                  <h4 class="mb-1 text-muted fw-bold">Quote details - {id}</h4>
                </div>
                <Row>
                  {quotes
                    .filter((quote) => quote.quoteNumber === id)
                    .map((quote, idx) => (
                      <Col md="4" key={idx}>
                        <CardText>
                          <strong>User ID:</strong> #123
                        </CardText>
                        <CardText>
                          <strong>User Name:</strong> {quote.userName}
                        </CardText>
                        <CardText>
                          <strong>Mobile Number:</strong> {quote.mobileNumber}
                        </CardText>
                        <CardText>
                          <strong>Email:</strong> test@example.com
                        </CardText>
                        <CardText>
                          <strong>Quote Number:</strong> {quote.quoteNumber}
                        </CardText>
                        <CardText>
                          <strong>Requested Date:</strong> {quote.date}
                        </CardText>
                      </Col>
                    ))}
                </Row>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-between align-items-center mb-2">
            <Col lg="6">
              <h5 className="m-0">{id}</h5>
            </Col>
          </Row>
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
                    marginBottom: "20px",
                  }}
                >
                  <thead>
                    <tr>
                      <th>Product Code</th>
                      <th>Product Image</th>
                      <th>Product Name</th>
                      <th>Order Qty</th>
                      <th>Actual Price</th>
                      <th>Quoted Price</th>
                      <th>Your Price</th>
                      <th>Current Stocks</th>
                      <th>Delivery Schedule</th>
                      <th>Calculate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes
                      ?.find((quote) => quote.quoteNumber === id)
                      ?.products.map((product, index) => (
                        <tr key={index}>
                          <td>{product.productCode}</td>
                          <td className="text-center">
                            <img
                              src={product.image || quoteImage}
                              alt={product.productName}
                              style={{ width: "50px" }}
                            />
                          </td>
                          <td>{product.productName}</td>
                          <td>{product.orderQty}</td>
                          <td>₹{product.actualPrice}</td>
                          <td>₹{product.quotedPrice}</td>
                          <td>₹{product.yourPrice}</td>
                          <td>{product.currentStocks}</td>
                          <td>{product.deliverySchedule}</td>
                          <td className="text-center">
                            <div className="d-flex gap-3 align-items-center">
                              <Link
                                to="#"
                                className="text-success"
                                onClick={() => toggleQuoteModal()}
                              >
                                <i
                                  className="mdi mdi-calculator"
                                  style={{
                                    fontSize: "20px",
                                  }}
                                  id={`calculation-${product.quoteNumber}`}
                                />
                                <UncontrolledTooltip
                                  placement="top"
                                  target={`calculation-${product.quoteNumber}`}
                                >
                                  Calculation
                                </UncontrolledTooltip>
                              </Link>
                              <Link
                                to="#"
                                className="action-icon text-success"
                                // onClick={() => handleEditClick(product)}
                                onClick={() => handleEditClicks(product)}
                              >
                                <i
                                  className="mdi mdi-pencil font-size-18"
                                  id="edittooltip"
                                />
                                <UncontrolledTooltip
                                  placement="top"
                                  target="edittooltip"
                                >
                                  Edit Quote
                                </UncontrolledTooltip>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>

          {/* Model for quote */}
          <Modal
            isOpen={quoteModel}
            toggle={toggleQuoteModal}
            backdrop="static"
            size="lg"
          >
            <ModalHeader toggle={toggleQuoteModal}>
              Quote Calculation
            </ModalHeader>
            <div className="modal-content">
              <ModalBody>
                <Row>
                  <Col lg="6" className="mb-2">
                    <h5 className="m-0">Product Name</h5>
                  </Col>
                  <Col lg="12">
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
                        style={{
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          width: "100%",
                          marginBottom: "20px",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Purchase Price</th>
                            <th>Loading</th>
                            <th>Cost Price</th>
                            <th>Margin</th>
                            <th>Minimum Selling Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>₹200</td>
                            <td>2%</td>
                            <td>₹204</td>
                            <td>15%</td>
                            <td>Rs. 240</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg="6" className="mb-2">
                    <h5 className="m-0">Quoted Price History</h5>
                  </Col>
                  <Col lg="12">
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
                        style={{
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          width: "100%",
                          marginBottom: "20px",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Qty.</th>
                            <th>Quoted Amount</th>
                            <th>User Name</th>
                            <th>Quote Submission Date</th>
                            <th>Remarks</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>₹250</td>
                            <td>Animesh Choksi</td>
                            <td>20-02-2025</td>
                            <td>test</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>
              </ModalBody>
            </div>
          </Modal>

          <Modal
            isOpen={modal}
            toggle={toggleModal}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader toggle={toggleModal} tag="h4">
              Edit quote
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Actual Price</Label>
                      <Input
                        name="actualPrice"
                        type="text"
                        placeholder="Insert Actual Price"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.actualPrice}
                        invalid={
                          formik.touched.actualPrice &&
                          formik.errors.actualPrice
                            ? true
                            : false
                        }
                      />
                      {formik.touched.actualPrice &&
                      formik.errors.actualPrice ? (
                        <FormFeedback type="invalid">
                          {formik.errors.actualPrice}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Quoted Price </Label>
                      <Input
                        name="quotedPrice"
                        type="text"
                        placeholder="Insert Quoted Price	"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.quotedPrice}
                        invalid={
                          formik.touched.quotedPrice &&
                          formik.errors.quotedPrice
                            ? true
                            : false
                        }
                      />
                      {formik.touched.quotedPrice &&
                      formik.errors.quotedPrice ? (
                        <FormFeedback type="invalid">
                          {formik.errors.quotedPrice}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Your Price</Label>
                      <Input
                        name="yourPrice"
                        type="text"
                        placeholder="Insert Your Price"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.yourPrice}
                        invalid={
                          formik.touched.yourPrice && formik.errors.yourPrice
                            ? true
                            : false
                        }
                      />
                      {formik.touched.yourPrice && formik.errors.yourPrice ? (
                        <FormFeedback type="invalid">
                          {formik.errors.yourPrice}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button type="submit" color="success">
                        Save
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default withRouter(CorporateCustomerQuote);
