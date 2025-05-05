import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";
import { useFormik } from "formik";
import * as Yup from "yup";

const data = [
  {
    sr: 1,
    orderId: "O-10235-20250430",
    piId: "NA",
    invoiceId: "NA",
    description: "10% Advance against Order",
    percentage: "10%",
    days: "0 Days",
    amount: "Rs. 33,040.00",
    receivedAmount: "Rs. 14,040.00",
    dueDate: "03-Apr-2025",
  },
  {
    sr: 2,
    orderId: "O-10235-20250430",
    piId: "O-10235-20250402/001/PRO-1",
    invoiceId: "O-10235-20250430/001/INV-1",
    description: "Advance With Order Confirmation",
    percentage: "10%",
    days: "0 Days",
    amount: "Rs. 33,040.00",
    receivedAmount: "Rs. 14,040.00",
    dueDate: "03-Apr-2025",
  },
  {
    sr: 3,
    orderId: "O-10235-20250430",
    piId: "O-10235-20250402/001/PRO-1",
    invoiceId: "O-10235-20250430/001/INV-1",
    description: "Advance Against PI on Readiness",
    percentage: "40%",
    days: "10 Days",
    amount: "Rs. 1,32,160.00",
    receivedAmount: "Rs. 0.00",
    dueDate: "30-Apr-2025",
  },
  {
    sr: 4,
    orderId: "O-10235-20250430",
    piId: "O-10235-20250402/001/PRO-1",
    invoiceId: "O-10235-20250430/001/INV-1",
    description: "Against Invoice",
    percentage: "50%",
    days: "30 Days",
    amount: "Rs. 1,62,200.00",
    receivedAmount: "Rs. 0.00",
    dueDate: "03-Apr-2025",
  },
  {
    sr: 5,
    orderId: "O-10235-20250430",
    piId: "O-10235-20250402/001/PRO-2",
    invoiceId: "Yet Not Created",
    description: "Advance With Order Confirmation",
    percentage: "10%",
    days: "0 Days",
    amount: "Rs. 33,040.00",
    receivedAmount: "Rs. 0.00",
    dueDate: "03-Apr-2025",
  },
  {
    sr: 6,
    orderId: "O-10235-20250430",
    piId: "Yet Not Created",
    invoiceId: "Yet Not Created",
    description: "Advance Against PI on Readiness",
    percentage: "40%",
    days: "10 Days",
    amount: "Rs. 1,32,160.00",
    receivedAmount: "Rs. 0.00",
    dueDate: "Yet Not Created",
  },
  {
    sr: 7,
    orderId: "O-10235-20250430",
    piId: "O-10235-20250402/001/PRO-2",
    invoiceId: "Yet Not Created",
    description: "Against Invoice",
    percentage: "50%",
    days: "30 Days",
    amount: "Rs. 1,62,200.00",
    receivedAmount: "Rs. 0.00",
    dueDate: "Yet Not Created",
  },
];

const CorporatePayment = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const handleAddReceivedaAmount = () => {
    toggleModal();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: 1,
      categoryName: "",
      orderId: "",
      piId: "",
      invoiceId: "",
      receivedAmount: "",
      remainingBalance: "",
      payableAmount: "",
      checkNumber: "",
      checkDate: "",
      bankName: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Please enter the category name"),
      orderId: Yup.string().required("Please select an order"),
      piId: Yup.string().required("Please enter PI Number"),
      invoiceId: Yup.string().required("Please enter Invoice Number"),
      receivedAmount: Yup.number()
        .typeError("Received Amount must be a number")
        .required("Please enter the received amount")
        .min(0, "Amount cannot be negative"),
      payableAmount: Yup.number()
        .typeError("Payable Amount must be a number")
        .required("Please enter payable amount")
        .min(0, "Amount cannot be negative"),
      checkNumber: Yup.string().required("Please enter check number"),
      checkDate: Yup.date()
        .required("Please select a check date")
        .typeError("Check Date must be a valid date"),
      bankName: Yup.string().required("Please enter bank name"),
    }),
    onSubmit: (values) => {
      console.log("Adding received amount:", values);
      toggleModal();
      formik.resetForm();
    },
  });

  const columns = [
    { Header: "Sr.", accessor: "sr", disableFilters: true },
    { Header: "Order ID", accessor: "orderId" },
    { Header: "PI ID", accessor: "piId" },
    { Header: "Invoice ID", accessor: "invoiceId" },
    { Header: "Description", accessor: "description" },
    { Header: "In (%)", accessor: "percentage" },
    { Header: "Days", accessor: "days" },
    { Header: "Amount", accessor: "amount" },
    { Header: "Received Amount", accessor: "receivedAmount" },
    { Header: "Payment Due Date", accessor: "dueDate" },
  ];

  return (
    <>
      <Row className="d-flex justify-content-between align-items-center">
        <Col lg="6">
          <h5 className="mb-2">Manage Payment</h5>
        </Col>
      </Row>

      <Row>
        <Card>
          <CardBody>
            <TableContainer
              columns={columns}
              data={data}
              isGlobalFilter={true}
              handleAddReceivedaAmount={handleAddReceivedaAmount}
              customPageSize={10}
              className="custom-header-css"
            />
          </CardBody>
        </Card>
      </Row>

      <Modal
        isOpen={modal}
        toggle={toggleModal}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
        scrollable={true}
      >
        <ModalHeader toggle={toggleModal} tag="h4">
          Add Received Amount
        </ModalHeader>
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={12}>
                <div className="mb-3">
                  <Label className="form-label">Select Order</Label>
                  <Input
                    name="orderId"
                    type="text"
                    placeholder="Search Order"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.orderId || ""}
                    invalid={formik.touched.orderId && !!formik.errors.orderId}
                  />
                  {formik.touched.orderId && formik.errors.orderId && (
                    <FormFeedback type="invalid">
                      {formik.errors.orderId}
                    </FormFeedback>
                  )}
                </div>
              </Col>

              <Col sm={6}>
                <div className="mb-3">
                  <Label className="form-label">PI Number</Label>
                  <Input
                    name="piId"
                    type="text"
                    placeholder="PI Number"
                    onChange={formik.handleChange}
                    value={formik.values.piId || ""}
                    invalid={formik.touched.piId && !!formik.errors.piId}
                  />
                  {formik.touched.piId && formik.errors.piId && (
                    <FormFeedback type="invalid">
                      {formik.errors.piId}
                    </FormFeedback>
                  )}
                </div>
              </Col>

              <Col sm={6}>
                <div className="mb-3">
                  <Label className="form-label">Invoice Number</Label>
                  <Input
                    name="invoiceId"
                    type="text"
                    placeholder="Invoice Number"
                    onChange={formik.handleChange}
                    value={formik.values.invoiceId || ""}
                    invalid={
                      formik.touched.invoiceId && !!formik.errors.invoiceId
                    }
                  />
                  {formik.touched.invoiceId && formik.errors.invoiceId && (
                    <FormFeedback type="invalid">
                      {formik.errors.invoiceId}
                    </FormFeedback>
                  )}
                </div>
              </Col>

              <Col sm={6}>
                <div className="mb-3">
                  <Label className="form-label">Received Amount</Label>
                  <Input
                    name="receivedAmount"
                    type="number"
                    placeholder="Enter Received Amount"
                    onChange={formik.handleChange}
                    value={formik.values.receivedAmount || ""}
                    invalid={
                      formik.touched.receivedAmount &&
                      !!formik.errors.receivedAmount
                    }
                  />
                  {formik.touched.receivedAmount &&
                    formik.errors.receivedAmount && (
                      <FormFeedback type="invalid">
                        {formik.errors.receivedAmount}
                      </FormFeedback>
                    )}
                </div>
              </Col>

              <Col sm={6}>
                <div className="mb-3">
                  <Label className="form-label">Remaining Balance</Label>
                  <Input
                    name="remainingBalance"
                    type="number"
                    placeholder="Auto-calculated"
                    value={formik.values.remainingBalance || ""}
                    readOnly
                  />
                </div>
              </Col>

              <Col sm={6}>
                <div className="mb-3">
                  <Label className="form-label">Payable Amount</Label>
                  <Input
                    name="payableAmount"
                    type="number"
                    placeholder="Payable Amount"
                    onChange={formik.handleChange}
                    value={formik.values.payableAmount || ""}
                    invalid={
                      formik.touched.payableAmount &&
                      !!formik.errors.payableAmount
                    }
                  />
                  {formik.touched.payableAmount &&
                    formik.errors.payableAmount && (
                      <FormFeedback type="invalid">
                        {formik.errors.payableAmount}
                      </FormFeedback>
                    )}
                </div>
              </Col>

              <Col sm={6}>
                <div className="mb-3">
                  <Label className="form-label">Check Number</Label>
                  <Input
                    name="checkNumber"
                    type="text"
                    placeholder="Check Number"
                    onChange={formik.handleChange}
                    value={formik.values.checkNumber || ""}
                    invalid={
                      formik.touched.checkNumber && !!formik.errors.checkNumber
                    }
                  />
                  {formik.touched.checkNumber && formik.errors.checkNumber && (
                    <FormFeedback type="invalid">
                      {formik.errors.checkNumber}
                    </FormFeedback>
                  )}
                </div>
              </Col>

              <Col sm={6}>
                <div className="mb-3">
                  <Label className="form-label">Check Date</Label>
                  <Input
                    name="checkDate"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.checkDate || ""}
                    invalid={
                      formik.touched.checkDate && !!formik.errors.checkDate
                    }
                  />
                  {formik.touched.checkDate && formik.errors.checkDate && (
                    <FormFeedback type="invalid">
                      {formik.errors.checkDate}
                    </FormFeedback>
                  )}
                </div>
              </Col>

              <Col sm={6}>
                <div className="mb-3">
                  <Label className="form-label">Bank Name</Label>
                  <Input
                    name="bankName"
                    type="text"
                    placeholder="Bank Name"
                    onChange={formik.handleChange}
                    value={formik.values.bankName || ""}
                    invalid={
                      formik.touched.bankName && !!formik.errors.bankName
                    }
                  />
                  {formik.touched.bankName && formik.errors.bankName && (
                    <FormFeedback type="invalid">
                      {formik.errors.bankName}
                    </FormFeedback>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="text-end">
                <Button type="submit" color="success">
                  Submit
                </Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CorporatePayment;
