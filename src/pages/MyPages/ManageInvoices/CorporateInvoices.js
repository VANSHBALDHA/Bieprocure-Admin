import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Nav, NavItem, NavLink, Card, CardBody } from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";

const data = [
  {
    id: 1,
    piNumber: "O-10235-20250402/001/PRO-1",
    invoiceCreated: "Yes",
    qty: 150,
    billAmount: 140400,
  },
  {
    id: 2,
    piNumber: "O-10236-20250402/001/PRO-2",
    invoiceCreated: "No",
    qty: 150,
    billAmount: 190000,
  },
];

const invoiceData = [
  {
    id: 1,
    piNumber: "O-10235-20250402/001/INV-1",
    invoiceCreated: "Yes",
    proformaCreatedDate: "2023-05-01",
    qty: 150,
    billAmount: 140400,
    receivedAmount: 40400,
  },
  {
    id: 2,
    piNumber: "O-10236-20250402/001/INV-2",
    invoiceCreated: "No",
    proformaCreatedDate: null,
    qty: 150,
    billAmount: 190000,
    receivedAmount: 50000,
  },
];

const CorporateInvoices = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("invoiceTab") || "1"
  );

  useEffect(() => {
    localStorage.setItem("invoiceTab", activeTab);
  }, [activeTab]);

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "PI Number", accessor: "piNumber" },
      { Header: "Invoice Created", accessor: "invoiceCreated" },
      { Header: "Qty", accessor: "qty" },
      { Header: "Bill Amount", accessor: "billAmount" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex gap-3 align-items-center">
            <Link to="#" className="text-success"></Link>
          </div>
        ),
      },
    ],
    []
  );

  const invoiceDataColumn = useMemo(() => [
    { Header: "Sr.", accessor: "id" },
    { Header: "Invoice Number", accessor: "piNumber" },
    {
      Header: "Shipment Status",
      accessor: "invoiceCreated",
      Cell: ({ row }) => {
        return row.original.invoiceCreated === "No"
          ? "Yet Not Created"
          : `Created on ${row.original.proformaCreatedDate}`;
      },
    },
    { Header: "Qty", accessor: "qty" },
    {
      Header: "Bill Amt",
      accessor: "billAmount",
      Cell: ({ value }) => `Rs. ${value.toLocaleString()}`,
    },
    {
      Header: "Received Amt",
      accessor: "receivedAmount",
      Cell: ({ value }) => `Rs. ${value.toLocaleString()}`,
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <div className="d-flex gap-3 align-items-center">
          <Link to="#" className="text-success" title="View Invoice">
            <i
              className="mdi mdi-file-document-outline font-size-18"
              id="invoicetooltip"
            ></i>
          </Link>
        </div>
      ),
    },
  ]);

  return (
    <>
      <Row className="d-flex justify-content-between align-items-center mb-3">
        <Col lg="6">
          <h5 className="m-0">Manage Invoice</h5>
        </Col>
        <Col lg="3">
          <div
            className="text-sm-end"
            style={{
              padding: "5px",
              border: "1px solid #d3d3d3",
              borderRadius: "5px",
            }}
          >
            <Nav pills className="navtab-bg nav-justified">
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={activeTab === "1" ? "active" : ""}
                  onClick={() => setActiveTab("1")}
                >
                  <span className="d-block d-sm-none">
                    <i className="fas fa-home"></i>
                  </span>
                  <span className="d-none d-sm-block">Proforma</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={activeTab === "2" ? "active" : ""}
                  onClick={() => setActiveTab("2")}
                >
                  <span className="d-block d-sm-none">
                    <i className="far fa-user"></i>
                  </span>
                  <span className="d-none d-sm-block">Invoice</span>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Col>
      </Row>

      {activeTab === "1" && (
        <>
          <Row>
            <Col lg="12">
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
            </Col>
          </Row>
        </>
      )}

      {activeTab === "2" && (
        <>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={invoiceDataColumn}
                    data={invoiceData}
                    isGlobalFilter={true}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default CorporateInvoices;
