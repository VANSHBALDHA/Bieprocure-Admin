import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Label,
  CardTitle,
  Modal,
  ModalBody,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { individualCustomer } from "../../../common/data/MyFackData";

const IndividualDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newRegisterAs, setNewRegisterAs] = useState("");
  const [selectedRegisterAs, setSelectedRegisterAs] = useState("");

  useEffect(() => {
    const selectedCustomer = individualCustomer.find(
      (data) => data.id === Number(id)
    );
    setCustomer(selectedCustomer);
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  const handleRegisterAsChange = (event) => {
    setNewRegisterAs(event.target.value);
    setSelectedRegisterAs(event.target.value);
    setShowModal(true);
  };

  const handleConfirm = () => {
    console.log("newRegisterAs", newRegisterAs);
    setShowModal(false);
  };

  document.title = "Individual customer details | Bieprocures";

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          title="Manage Customers"
          breadcrumbItem="Customer Details"
        />
        <Row>
          <Col lg="12">
            <Card className="shadow-sm">
              <CardBody>
                <CardTitle tag="h5" className="mb-4">
                  <strong>{customer.name}</strong> - Customer Details
                </CardTitle>

                <Row>
                  <Col md="4">
                    <Label>
                      <strong>Username:</strong>
                    </Label>
                    <Input type="text" value={customer.name} disabled />
                    <Label className="mt-3">
                      <strong>Mobile No.:</strong>
                    </Label>
                    <Input
                      type="text"
                      value={customer.mobile || "9998887774"}
                      disabled
                    />
                    <Label className="mt-3">
                      <strong>Joining Date:</strong>
                    </Label>
                    <Input type="text" value={customer.date} disabled />
                    <Label className="mt-3">
                      <strong>Status:</strong>
                    </Label>
                    <Input type="text" value={customer.status} disabled />
                  </Col>

                  <Col md="4">
                    <Label>
                      <strong>User Type:</strong>
                    </Label>
                    <Input
                      type="text"
                      value={customer.customer_type}
                      disabled
                    />

                    <Label className="mt-3">
                      <strong>Company:</strong>
                    </Label>
                    <Input type="text" value="CODINFOX" disabled />

                    <Label className="mt-3">
                      <strong>Last Login Date:</strong>
                    </Label>
                    <Input
                      type="text"
                      value={customer.last_login_date}
                      disabled
                    />
                    <Label className="mt-3">
                      <strong>Register as:</strong>
                    </Label>
                    <Input
                      type="select"
                      name="register_as"
                      value={customer?.register_as}
                      onChange={handleRegisterAsChange}
                    >
                      <option value="non-gst">Non-GST Company</option>
                      <option value="gst">GST Company</option>
                      <option value="corporate">Corporate Company</option>
                    </Input>
                  </Col>

                  <Col md="4">
                    <Label>
                      <strong>Email ID:</strong>
                    </Label>
                    <Input
                      type="text"
                      value={customer.email || "demo@gmail.com"}
                      disabled
                    />

                    <Label className="mt-3">
                      <strong>GST Number:</strong>
                    </Label>
                    <Input type="text" value="22AAAAA0000A1Z5" disabled />

                    <Label className="mt-3">
                      <strong>Total Purchase:</strong>
                    </Label>
                    <Input
                      type="text"
                      value={`₹ ${customer.balance}`}
                      disabled
                    />
                  </Col>
                </Row>

                <div className="text-center mt-4">
                  <Link to="/manage-customers/individual">
                    <Button color="secondary">Back</Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

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
  );
};

export default IndividualDetail;
