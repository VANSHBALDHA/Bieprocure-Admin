import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  FormFeedback,
  Badge,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";

const EcommerceOrdersTrackingModal = ({ isOpen, toggle }) => {
  const [statusHistory, setStatusHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // Track which row is being edited
  const [editingValues, setEditingValues] = useState({
    status: "",
    date: "",
  }); // Track the values being edited

  const validationSchema = Yup.object().shape({
    trackingQuantity: Yup.number()
      .typeError("Must be a number")
      .positive("Must be greater than 0")
      .required("Tracking Quantity is required"),
    trackingNumber: Yup.number()
      .typeError("Must be a number")
      .positive("Must be greater than 0")
      .required("Tracking Number is required"),
    shipmentStatus: Yup.string().required("Shipment Status is required"),
    shipmentDate: Yup.date().required("Shipment Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      trackingQuantity: "",
      trackingNumber: "",
      shipmentStatus: "",
      shipmentDate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);

      setStatusHistory((prevStatusHistory) => [
        ...prevStatusHistory,
        {
          status: values.shipmentStatus,
          date: values.shipmentDate,
        },
      ]);

      // toggle();
      formik.resetForm();
    },
  });

  const statusBadgeColors = {
    shipped: "success",
    "in-transit": "warning",
    "out-for-delivery": "info",
    delivered: "primary",
    default: "secondary",
  };

  const getBadgeColor = (status) => {
    return statusBadgeColors[status] || statusBadgeColors.default;
  };

  const handleEdit = (index) => {
    setIsEditing(index);
    setEditingValues({
      status: statusHistory[index].status,
      date: statusHistory[index].date,
    });
  };

  const handleSaveEdit = (index) => {
    const updatedStatusHistory = [...statusHistory];
    updatedStatusHistory[index] = {
      status: editingValues.status,
      date: editingValues.date,
    };
    setStatusHistory(updatedStatusHistory);
    setIsEditing(null);
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditingValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const statusHistoryList = statusHistory.map((entry) => entry.status);

  return (
    <Modal
      isOpen={isOpen}
      size="lg"
      centered={true}
      toggle={toggle}
      scrollable={true}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Order Shipment Details</ModalHeader>
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <p className="mb-2">
              Order id: <span className="text-primary">#SK2540</span>
            </p>
            <p className="mb-4">
              Billing Name: <span className="text-primary">Neal Matthews</span>
            </p>
            <p className="mb-4">
              Total Quantity: <span className="text-primary fw-bold">40</span>
            </p>

            <Row>
              <Col md="6">
                <div className="mb-3">
                  <Label className="form-label">Add Tracking Quantity</Label>
                  <Input
                    name="trackingQuantity"
                    type="number"
                    placeholder="Insert tracking quantity"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.trackingQuantity}
                    invalid={
                      formik.touched.trackingQuantity &&
                      !!formik.errors.trackingQuantity
                    }
                  />
                  {formik.touched.trackingQuantity &&
                    formik.errors.trackingQuantity && (
                      <FormFeedback>
                        {formik.errors.trackingQuantity}
                      </FormFeedback>
                    )}
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <Label className="form-label">Add Tracking Number</Label>
                  <Input
                    name="trackingNumber"
                    type="number"
                    placeholder="Insert tracking number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.trackingNumber}
                    invalid={
                      formik.touched.trackingNumber &&
                      !!formik.errors.trackingNumber
                    }
                  />
                  {formik.touched.trackingNumber &&
                    formik.errors.trackingNumber && (
                      <FormFeedback>
                        {formik.errors.trackingNumber}
                      </FormFeedback>
                    )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <div className="mb-3">
                  <Label className="form-label">Shipment Status</Label>
                  <Input
                    type="select"
                    name="shipmentStatus"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.shipmentStatus}
                    invalid={
                      formik.touched.shipmentStatus &&
                      !!formik.errors.shipmentStatus
                    }
                  >
                    <option value="">Select Status</option>
                    <option
                      value="shipped"
                      disabled={statusHistoryList.includes("shipped")}
                    >
                      Shipped
                    </option>
                    <option
                      value="in-transit"
                      disabled={statusHistoryList.includes("in-transit")}
                    >
                      In Transit
                    </option>
                    <option
                      value="out-for-delivery"
                      disabled={statusHistoryList.includes("out-for-delivery")}
                    >
                      Out for Delivery
                    </option>
                    <option
                      value="delivered"
                      disabled={statusHistoryList.includes("delivered")}
                    >
                      Delivered
                    </option>
                  </Input>
                  {formik.touched.shipmentStatus &&
                    formik.errors.shipmentStatus && (
                      <FormFeedback>
                        {formik.errors.shipmentStatus}
                      </FormFeedback>
                    )}
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <Label className="form-label">Shipment Date</Label>
                  <Input
                    type="date"
                    name="shipmentDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.shipmentDate}
                    invalid={
                      formik.touched.shipmentDate &&
                      !!formik.errors.shipmentDate
                    }
                  />
                  {formik.touched.shipmentDate &&
                    formik.errors.shipmentDate && (
                      <FormFeedback>{formik.errors.shipmentDate}</FormFeedback>
                    )}
                </div>
              </Col>
            </Row>

            <div className="table-responsive">
              <table
                className="table table-bordered"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                <thead>
                  <tr className="text-center">
                    <th>Shipment Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {statusHistory.map((entry, index) => (
                    <tr key={index} className="text-center">
                      <td style={{ width: "30%" }}>
                        {isEditing === index ? (
                          <Input
                            type="select"
                            name="status"
                            value={editingValues.status}
                            onChange={handleChangeEdit}
                          >
                            <option value="shipped">Shipped</option>
                            <option value="in-transit">In Transit</option>
                            <option value="out-for-delivery">
                              Out for Delivery
                            </option>
                            <option value="delivered">Delivered</option>
                          </Input>
                        ) : (
                          <Badge color={getBadgeColor(entry.status)}>
                            {entry.status.charAt(0).toUpperCase() +
                              entry.status.slice(1).replace(/-/g, " ")}
                          </Badge>
                        )}
                      </td>
                      <td>
                        {isEditing === index ? (
                          <Input
                            type="date"
                            name="date"
                            value={editingValues.date}
                            onChange={handleChangeEdit}
                          />
                        ) : (
                          entry.date
                        )}
                      </td>
                      <td>
                        {isEditing === index ? (
                          <Button
                            color="primary"
                            size="sm"
                            onClick={() => handleSaveEdit(index)}
                          >
                            Save
                          </Button>
                        ) : (
                          <Link
                            to="#"
                            className="text-success"
                            onClick={() => handleEdit(index)}
                          >
                            <i
                              className="mdi mdi-pencil font-size-18"
                              id="edittooltip"
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target="edittooltip"
                            >
                              Edit
                            </UncontrolledTooltip>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </ModalFooter>
        </form>
      </div>
    </Modal>
  );
};

EcommerceOrdersTrackingModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default EcommerceOrdersTrackingModal;
