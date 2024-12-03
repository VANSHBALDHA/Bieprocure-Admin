import React from "react";
import PropTypes from "prop-types";
import {
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

const EcommerceOrdersTrackingModal = (props) => {
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
      scrollable={true}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Order Tracking Details</ModalHeader>
        <ModalBody>
          <p className="mb-2">
            Order id: <span className="text-primary">#SK2540</span>
          </p>
          <p className="mb-4">
            Billing Name: <span className="text-primary">Neal Matthews</span>
          </p>
          <p className="mb-4">
            Total Quantity : <span className="text-primary fw-bold">40</span>
          </p>

          <Row>
            <Col className="col-6">
              <div className="mb-3">
                <Label className="form-label">Add Tracking Quantity</Label>
                <Input
                  name="feature"
                  type="number"
                  placeholder="Insert tracking quantity"
                />
              </div>
            </Col>
            <Col className="col-6">
              <div className="mb-3">
                <Label className="form-label">Add Tracking Number</Label>
                <Input
                  name="feature"
                  type="number"
                  placeholder="Insert tracking number"
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

EcommerceOrdersTrackingModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default EcommerceOrdersTrackingModal;
