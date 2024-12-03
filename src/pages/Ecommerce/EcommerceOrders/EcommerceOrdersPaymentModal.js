import React from "react";
import PropTypes from "prop-types";
import {
  Badge,
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import img7 from "../../../assets/images/product/img-7.png";
import img4 from "../../../assets/images/product/img-4.png";

const EcommerceOrdersPaymentModal = (props) => {
  const { isOpen, toggle } = props;
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
      size="xl"
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Payment Details</ModalHeader>
        <ModalBody>
          <Row>
            <p className="mb-2">
              Product id: <span className="text-primary">#SK2540</span>
            </p>
            <p className="mb-4">
              Billing Name: <span className="text-primary">Neal Matthews</span>
            </p>

            <div className="table-responsive">
              <Table className="table align-middle table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Received Amount</th>
                    <th scope="col">Pending Amount</th>
                    <th scope="col">Payment Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Payment Mode</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div className="text-success">
                        <span>₹10,000</span>
                      </div>
                    </th>
                    <td>
                      <div className="text-primary">
                        <span>₹6000</span>
                      </div>
                    </td>
                    <td>
                      <div className="text-danger">
                        <span>₹4000</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span>20-07-2024</span>
                      </div>
                    </td>
                    <td>
                      <Badge className="font-size-12 badge-soft-danger">
                        Pending
                      </Badge>
                    </td>
                    <td>
                      <div>
                        <span className="text-danger">20-08-2024</span>
                      </div>
                    </td>
                    <td>
                      <span>
                        <i className="fab fas fa-money-bill-alt me-1" /> Check
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <Col className="col-3">
              <div className="mb-3">
                <Label className="form-label">Add Pending Amount</Label>
                <Input
                  name="feature"
                  type="number"
                  placeholder="Insert Pending Amount"
                />
              </div>
            </Col>
            <Col className="col-3">
              <div className="mb-3">
                <Label className="form-label">Check Number</Label>
                <Input
                  name="feature"
                  type="number"
                  placeholder="Insert Check Number"
                />
              </div>
            </Col>
            <Col className="col-3">
              <div className="mb-3">
                <Label className="form-label">Account Number</Label>
                <Input
                  name="feature"
                  type="number"
                  placeholder="Insert Account Number"
                />
              </div>
            </Col>
            <Col className="col-3">
              <div className="mb-3">
                <Label className="form-label">IFSC Code</Label>
                <Input
                  name="feature"
                  type="number"
                  placeholder="Insert IFSC Code"
                />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Save
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

EcommerceOrdersPaymentModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default EcommerceOrdersPaymentModal;
