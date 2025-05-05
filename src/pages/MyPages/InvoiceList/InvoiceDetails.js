import React from "react";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Link, useParams } from "react-router-dom";

const InvoiceDetails = () => {
  const params = useParams();

  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice Detail" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="invoice-title">
                    <h4 className="float-end font-size-16">Order # 12345</h4>
                  </div>
                  <hr />
                  <Row>
                    <Col sm="6">
                      <address>
                        <strong>Billed To:</strong>
                        <br />
                        <span>
                          John Smith
                          <br /> 1234 Main
                          <br /> Apt. 4B <br />
                          Springfield ST 54321
                        </span>
                      </address>
                    </Col>
                    <Col sm="6" className="text-sm-end">
                      <address>
                        <strong>Shipped To:</strong>
                        <br />
                        <span>
                          Kenny Rigdon <br />
                          1234 Main <br />
                          Apt. 4B
                          <br /> Springfield ST 54321
                        </span>
                      </address>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6" className="mt-3">
                      <address>
                        <strong>Payment Method:</strong>
                        <br />
                        Visa ending **** 4242
                        <br />
                        demo@email.com
                      </address>
                    </Col>
                    <Col sm="6" className="mt-3 text-sm-end">
                      <address>
                        <strong>Order Date:</strong>
                        <br />
                        October 16, 2024
                        <br />
                        <br />
                      </address>
                    </Col>
                  </Row>
                  <div className="py-2 mt-3">
                    <h3 className="font-size-15 fw-bold">Order summary</h3>
                  </div>
                  <div className="table-responsive">
                    <Table className="table-nowrap">
                      <thead>
                        <tr>
                          <th style={{ width: "70px" }}>No.</th>
                          <th>Item</th>
                          <th className="text-end">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Grand Slam Indoor Of Show Jumping Novel</td>
                          <td className="text-end">₹ 32999.99</td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="text-end">
                            Sub Total
                          </td>
                          <td className="text-end">₹ 32999.99</td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="border-0 text-end">
                            <strong>Shipping</strong>
                          </td>
                          <td className="border-0 text-end">₹ 99.00</td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="border-0 text-end">
                            <strong>Total</strong>
                          </td>
                          <td className="border-0 text-end">
                            <h4 className="m-0">₹ 32999.99</h4>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div className="d-print-none">
                    <div className="float-end">
                      {/* <Link to="#" className="btn btn-primary w-md me-2">
                        Back to Invoice
                      </Link> */}
                      <Link
                        to="#"
                        onClick={printInvoice}
                        className="btn btn-success"
                      >
                        <i className="fa fa-print" />
                      </Link>
                    </div>
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

export default InvoiceDetails;
