import React, { useMemo, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";
import { individualCustomer } from "../../../common/data/MyFackData";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

const Individual = () => {
  const [modal, setModal] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newRegisterAs, setNewRegisterAs] = useState("");
  const [selectedRegisterAs, setSelectedRegisterAs] = useState("");

  const toggleModal = () => setModal(!modal);

  const handleViewCustomer = (customer) => {
    setCustomer(customer);
    toggleModal();
  };

  const handleRegisterAsChange = (event) => {
    setNewRegisterAs(event.target.value);
    setSelectedRegisterAs(event.target.value);
    setShowModal(true);
  };

  const handleConfirm = () => {
    console.log("newRegisterAs", newRegisterAs);
    setShowModal(false);
    formik.setFieldValue("register_as", newRegisterAs);
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Username",
        accessor: "name",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "User Type",
        accessor: "customer_type",
        filterable: true,
      },
      {
        Header: "Joining Date",
        accessor: "date",
        filterable: true,
      },
      {
        Header: "Last Login Date",
        accessor: "last_login_date",
        filterable: true,
      },
      {
        Header: "Total Purchase",
        accessor: "balance",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">₹ {value}</div>,
      },
      {
        Header: "Transfer Customer",
        accessor: "register_as",
        filterable: false,
        Cell: ({ value }) => (
          <>
            <Input
              type="select"
              name="register_as"
              value={value}
              onChange={handleRegisterAsChange}
            >
              <option value="non-gst">Non-GST Company</option>
              <option value="gst">GST Company</option>
              <option value="corporate">Corporate Company</option>
            </Input>
          </>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: ({ value }) => {
          return (
            <Badge color={value === "active" ? "success" : "danger"}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Badge>
          );
        },
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <ul className="list-unstyled hstack gap-1 mb-0">
              <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                <Link
                  to="#"
                  className="text-success"
                  onClick={() => handleViewCustomer(row.original)}
                >
                  <i
                    className="mdi mdi-eye-outline font-size-18"
                    id="viewtooltip"
                  ></i>
                </Link>
              </li>
              <UncontrolledTooltip placement="top" target="viewtooltip">
                View
              </UncontrolledTooltip>
            </ul>
          );
        },
      },
    ],
    []
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (customer && customer.id) || "",
      name: (customer && customer.name) || "",
      customer_type: (customer && customer.customer_type) || "",
      last_login_date: (customer && customer.last_login_date) || "",
      date: (customer && customer.date) || "",
      balance: (customer && customer.balance) || "",
      status: (customer && customer.status) || "active",
    },
    onSubmit: () => {
      toggleModal();
    },
  });

  document.title = "Individual Customer | Admin";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Manage Customers" breadcrumbItem="individual" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={individualCustomer}
                    isGlobalFilter={true}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Modal for View Individual Customer List*/}
          <Modal
            isOpen={modal}
            toggle={toggleModal}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <ModalHeader toggle={toggleModal} tag="h4">
              User Details - <b>{formik.values.name}</b>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Username</Label>
                      <Input
                        type="text"
                        value={formik.values.name || ""}
                        disabled
                      />
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">user Type</Label>
                      <Input
                        type="text"
                        value={formik.values.customer_type || ""}
                        disabled
                      />
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Designation</Label>
                      <Input type="text" value="Software" disabled />
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Company Name</Label>
                      <Input type="text" value="CODINFOX" disabled />
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">GST Number</Label>
                      <Input type="text" value="22AAAAA0000A1Z5" disabled />
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Mobile No.</Label>
                      <Input type="text" value="9998887774" disabled />
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Email ID</Label>
                      <Input type="text" value="demo@gmail.com" disabled />
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Joining Date</Label>
                      <Input
                        type="text"
                        value={formik.values.date || ""}
                        disabled
                      />
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Last Login Date</Label>
                      <Input
                        type="text"
                        value={formik.values.last_login_date || ""}
                        disabled
                      />
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Total Purchase</Label>
                      <Input
                        type="text"
                        value={formik.values.balance || ""}
                        disabled
                      />
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Status</Label>
                      <Input
                        type="select"
                        name="status"
                        value={formik.values.status}
                      >
                        <option value="Active">Active</option>
                        <option value="inActive">inActive</option>
                      </Input>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button type="submit" color="success">
                        Close
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
            </ModalBody>
          </Modal>

          {/* Modal for Change Register As*/}
          <Modal
            size="sm"
            isOpen={showModal}
            toggle={() => setShowModal(!showModal)}
            centered={true}
          >
            <div className="modal-content">
              <ModalBody className="px-4 py-5 text-center">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-close position-absolute end-0 top-0 m-3"
                ></button>
                <p className="text-muted font-size-16 mb-4">
                  Are you sure you want to permanently change customer As -{" "}
                  <b>{selectedRegisterAs}</b>
                </p>

                <div className="hstack gap-2 justify-content-center mb-0">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleConfirm}
                  >
                    Yes
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

export default withRouter(Individual);
