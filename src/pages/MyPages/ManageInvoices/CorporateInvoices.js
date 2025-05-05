import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  UncontrolledTooltip,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Button,
  Modal,
  FormFeedback,
  Table,
  CardTitle,
} from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";
import * as Yup from "yup";
import { useFormik } from "formik";

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
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [createInvoice, setCreateInvoice] = useState(false);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [deleteInvoice, setDeleteInvoice] = useState(false);

  useEffect(() => {
    localStorage.setItem("invoiceTab", activeTab);
  }, [activeTab]);

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id", disableFilters: true },
      { Header: "PI Number", accessor: "piNumber" },
      { Header: "Invoice Created", accessor: "invoiceCreated" },
      { Header: "Qty", accessor: "qty" },
      { Header: "Bill Amount", accessor: "billAmount" },
      {
        Header: "Actions",
        accessor: "actions",
        disableFilters: true,
        Cell: ({ row }) => (
          <div className="d-flex gap-3 align-items-center">
            <Link
              to="#"
              className="text-success"
              onClick={() => {
                setCreateInvoice(true);
              }}
            >
              <i
                className="mdi mdi-ticket-account font-size-18"
                id="addShipment"
              ></i>
              <UncontrolledTooltip placement="top" target="addShipment">
                Create Invoice
              </UncontrolledTooltip>
            </Link>
            <Link to="#" className="text-success">
              <i className="mdi mdi-pencil font-size-18" id="editShipment"></i>
              <UncontrolledTooltip placement="top" target="editShipment">
                Modified PI
              </UncontrolledTooltip>
            </Link>
            <Link
              to="#"
              className="text-success"
              onClick={() => {
                setDeleteInvoice(true);
              }}
            >
              <i
                className="bx bx-trash-alt font-size-20"
                id="deletetooltip"
              ></i>
              <UncontrolledTooltip placement="top" target="deletetooltip">
                Delete
              </UncontrolledTooltip>
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const toggleModal = () => setModal(!modal);

  const handleAddClick = () => {
    setIsEdit(false);
    toggleModal();
  };

  const handleEditClick = () => {
    setIsEdit(true);
    toggleModal();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: 1,
      invoiceNumber: "Ak254815",
      shipmentDate: "06-05-2025",
      shipmentStatus: "Shipped",
    },
    validationSchema: Yup.object({
      invoiceNumber: Yup.string().required("Please enter invoice number"),
      shipmentDate: Yup.string().required("Please select date"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        console.log("Updating invoice:", values);
      } else {
        console.log("Adding new invoice:", values);
      }
      toggleModal();
    },
  });

  const invoiceDataColumn = useMemo(
    () => [
      { Header: "Sr.", accessor: "id", disableFilters: true },
      { Header: "Invoice Number", accessor: "piNumber" },
      {
        Header: "Shipment Status",
        accessor: "invoiceCreated",
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
        disableFilters: true,
        Cell: ({ row }) => (
          <div className="d-flex gap-3 align-items-center">
            <Link to="#" className="text-success" onClick={handleAddClick}>
              <i
                className="mdi mdi-ticket-account font-size-18"
                id="addShipment"
              ></i>
              <UncontrolledTooltip placement="top" target="addShipment">
                Add shipment
              </UncontrolledTooltip>
            </Link>
            <Link
              to="#"
              className="text-success"
              onClick={() => handleEditClick(row.original)}
            >
              <i className="mdi mdi-pencil font-size-18" id="editShipment"></i>
              <UncontrolledTooltip placement="top" target="editShipment">
                Edit shipment
              </UncontrolledTooltip>
            </Link>
          </div>
        ),
      },
    ],
    []
  );

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

          {showInvoiceDetails === true && (
            <>
              <CardTitle
                className="mb-3 text-primary"
                style={{
                  backgroundColor: "#ecf0f1",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Invoice Details
              </CardTitle>
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
                        <Link to="#" className="btn btn-success">
                          <i className="fa fa-print" />
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </>
          )}
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

      <Modal
        isOpen={modal}
        toggle={toggleModal}
        backdrop="static"
        keyboard={false}
        size="md"
        scrollable={true}
      >
        <ModalHeader toggle={toggleModal} tag="h4">
          {isEdit ? "Edit Invoice" : "Add Invoice"}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Label className="form-label">Shipment Number</Label>
                  <Input
                    name="invoiceNumber"
                    type="text"
                    placeholder="Insert shipment number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.invoiceNumber || ""}
                    invalid={
                      formik.touched.invoiceNumber &&
                      formik.errors.invoiceNumber
                        ? true
                        : false
                    }
                  />
                  {formik.touched.invoiceNumber &&
                  formik.errors.invoiceNumber ? (
                    <FormFeedback type="invalid">
                      {formik.errors.invoiceNumber}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Shipment Date</Label>
                  <Input
                    name="shipmentDate"
                    type="date"
                    placeholder="Select date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.shipmentDate || ""}
                    invalid={
                      formik.touched.shipmentDate && formik.errors.shipmentDate
                        ? true
                        : false
                    }
                  />
                  {formik.touched.shipmentDate && formik.errors.shipmentDate ? (
                    <FormFeedback type="invalid">
                      {formik.errors.shipmentDate}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Shipment Status</Label>
                  <Input
                    name="shipmentStatus"
                    onBlur={formik.handleBlur}
                    value={formik.values.shipmentStatus || ""}
                    disabled
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <Button type="submit" color="success">
                    {isEdit ? "Update" : "Save"}
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      <Modal
        size="md"
        isOpen={createInvoice}
        toggle={() => setCreateInvoice(false)}
        centered={true}
      >
        <div className="modal-content">
          <ModalBody className="px-4 py-5 text-center">
            <button
              type="button"
              onClick={() => setCreateInvoice(false)}
              className="btn-close position-absolute end-0 top-0 m-3"
            ></button>
            <div className="avatar-sm mb-4 mx-auto">
              <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-20 rounded-3">
                <i className="mdi mdi-trash-can-outline"></i>
              </div>
            </div>
            <p className="text-muted font-size-16 mb-4">
              Is the material ready for dispatch? Please confirm before
              proceeding with invoice creation.
            </p>

            <div className="hstack gap-2 justify-content-center mb-0">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCreateInvoice(false)}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setCreateInvoice(false);
                  setShowInvoiceDetails(true);
                }}
              >
                Yes
              </button>
            </div>
          </ModalBody>
        </div>
      </Modal>

      <Modal
        size="md"
        isOpen={deleteInvoice}
        toggle={() => setDeleteInvoice(false)}
        centered={true}
      >
        <div className="modal-content">
          <ModalBody className="px-4 py-5 text-center">
            <button
              type="button"
              onClick={() => setDeleteInvoice(false)}
              className="btn-close position-absolute end-0 top-0 m-3"
            ></button>
            <div className="avatar-sm mb-4 mx-auto">
              <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-20 rounded-3">
                <i className="mdi mdi-trash-can-outline"></i>
              </div>
            </div>
            <p className="text-muted font-size-16 mb-4">
              Do you want to delete a Proforma Invoice for this order?
            </p>

            <div className="hstack gap-2 justify-content-center mb-0">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setDeleteInvoice(false)}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setDeleteInvoice(false);
                }}
              >
                Yes
              </button>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};

export default CorporateInvoices;
