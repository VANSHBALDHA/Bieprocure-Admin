import React from "react";
import { Row, Col, Button, Card, CardBody } from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";

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

const CorporatePayment = () => {
  return (
    <>
      <Row className="d-flex justify-content-between align-items-center">
        <Col lg="6">
          <h5 className="m-0">Manage Payment</h5>
        </Col>
        <Col lg="6">
          <div className="text-sm-end">
            <Button type="button" color="primary" className="btn me-2">
              <i className="mdi mdi-plus me-1" />
              Add Received Amt
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Card>
          <CardBody>
            <TableContainer
              columns={columns}
              data={data}
              isGlobalFilter={true}
              customPageSize={10}
              className="custom-header-css"
            />
          </CardBody>
        </Card>
      </Row>
    </>
  );
};

export default CorporatePayment;
