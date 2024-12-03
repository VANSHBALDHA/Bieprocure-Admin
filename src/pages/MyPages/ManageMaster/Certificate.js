import React, { useMemo, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { certificateData } from "../../../common/data/MyFackData";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  FormFeedback,
  Label,
  Input,
} from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Certificate = () => {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const toggleModal = () => setModal(!modal);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (currentCertificate && currentCertificate.id) || "",
      certificateName:
        (currentCertificate && currentCertificate.certificateName) || "",
      status: (currentCertificate && currentCertificate.status) || "active",
      certificateImage:
        (currentCertificate && currentCertificate.certificateImage) || "",
    },
    validationSchema: Yup.object({
      certificateName: Yup.string().required(
        "Please enter the certificate name"
      ),
      status: Yup.string().required("Please select the status"),
      certificateImage: Yup.string().when("id", {
        is: "",
        then: Yup.string().required("Please provide the image URL"),
      }),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        console.log("Updating certificate:", values);
      } else {
        console.log("Adding new certificate:", values);
      }
      toggleModal();
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        formik.setFieldValue("certificateImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Certificate Name",
        accessor: "certificateName",
        filterable: true,
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: ({ value }) => (
          <Badge color={value === "active" ? "success" : "danger"}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
        ),
      },
      {
        Header: "Certificate Image",
        accessor: "certificateImage",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => (
          <img className="rounded-circle avatar-xs" src={value} alt="" />
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: ({ row }) => (
          <div className="d-flex gap-3">
            <Link
              to="#"
              className="text-success"
              onClick={() => handleEditClick(row.original)}
            >
              <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              <UncontrolledTooltip placement="top" target="edittooltip">
                Edit
              </UncontrolledTooltip>
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const handleEditClick = (certificate) => {
    setCurrentCertificate(certificate);
    setIsEdit(true);
    setImagePreview(certificate.certificateImage || "");
    toggleModal();
  };

  const handleAddCertificate = () => {
    setCurrentCertificate(null);
    setIsEdit(false);
    toggleModal();
    setImagePreview("");
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Certificate" breadcrumbItem="Manage Certificate" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <TableContainer
                  columns={columns}
                  data={certificateData}
                  isGlobalFilter={true}
                  isAddCertificate={true}
                  customPageSize={10}
                  handleAddCertificate={handleAddCertificate}
                  className="custom-header-css"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Modal for Add/Edit Certificate */}
        <Modal
          isOpen={modal}
          toggle={toggleModal}
          backdrop="static"
          keyboard={false}
        >
          <ModalHeader toggle={toggleModal} tag="h4">
            {isEdit ? "Edit Certificate" : "Add Certificate"}
          </ModalHeader>
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Col className="col-12">
                  <div className="mb-3">
                    <Label className="form-label">Certificate Name</Label>
                    <Input
                      name="certificateName"
                      type="text"
                      placeholder="Insert Certificate Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.certificateName || ""}
                      invalid={
                        formik.touched.certificateName &&
                        formik.errors.certificateName
                          ? true
                          : false
                      }
                    />
                    {formik.touched.certificateName &&
                    formik.errors.certificateName ? (
                      <FormFeedback type="invalid">
                        {formik.errors.certificateName}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">Status</Label>
                    <Input
                      name="status"
                      type="select"
                      className="form-select"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.status || ""}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Input>
                    {formik.touched.status && formik.errors.status ? (
                      <FormFeedback type="invalid">
                        {formik.errors.status}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">Certificate Image</Label>
                    <Input
                      name="certificateImage"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      invalid={
                        formik.touched.certificateImage &&
                        formik.errors.certificateImage
                          ? true
                          : false
                      }
                    />
                    {imagePreview && (
                      <div className="mt-3">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="img-fluid rounded"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </div>
                    )}
                    {formik.touched.certificateImage &&
                    formik.errors.certificateImage ? (
                      <FormFeedback type="invalid">
                        {formik.errors.certificateImage}
                      </FormFeedback>
                    ) : null}
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
      </Container>
    </div>
  );
};

export default withRouter(Certificate);
