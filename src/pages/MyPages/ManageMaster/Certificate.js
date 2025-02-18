import React, { useMemo, useRef, useState } from "react";
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
import MediaModel from "../MediaUpload/MediaModel";

const Certificate = () => {
  const imageInputRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState(null);

  const [uploadedImages, setUploadedImages] = useState(null);
  const [imageModel, setImageModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleModal = () => setModal(!modal);

  const toggleImageModal = () => {
    setImageModel(!imageModel);
    setSelectedImage([]);
  };

  const handleUploadImage = (image) => {
    if (image) {
      setUploadedImages([image?.image]);
    }
    toggleImageModal();
    setSelectedImage(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImage = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setUploadedImages([newImage]);
    }
  };

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
      certificateImage: Yup.string().when("fileSelected", {
        is: true, // Condition when 'fileSelected' is true
        then: Yup.string().required("Please select an image"),
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
    toggleModal();
  };

  const handleAddCertificate = () => {
    setCurrentCertificate(null);
    setIsEdit(false);
    toggleModal();
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
                      name="images"
                      type="file"
                      accept="image/jpeg, image/png"
                      onChange={handleImageChange}
                      innerRef={imageInputRef}
                      style={{ display: "none" }}
                      invalid={
                        formik.touched.images && formik.errors.images
                          ? true
                          : false
                      }
                    />
                    <div
                      className="custom-file-button"
                      onClick={toggleImageModal}
                    >
                      <i
                        class="bx bx-cloud-upload me-2"
                        style={{ fontSize: "25px" }}
                      ></i>
                      Choose File
                    </div>
                    {formik.errors.certificateImage &&
                    formik.touched.certificateImage ? (
                      <FormFeedback type="invalid" className="d-block">
                        {formik.errors.certificateImage}
                      </FormFeedback>
                    ) : null}

                    {uploadedImages && (
                      <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                        <div className="p-2">
                          <Row className="d-flex justify-content-between align-items-center">
                            <Col className="col-auto">
                              <img
                                data-dz-thumbnail=""
                                height="100"
                                width="100"
                                className="avatar-md rounded bg-light"
                                alt="images"
                                src={uploadedImages}
                              />
                            </Col>
                            <Col className="col-auto">
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  setUploadedImages(null);
                                }}
                              >
                                Delete
                              </button>
                            </Col>
                          </Row>
                        </div>
                      </Card>
                    )}
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

        {/* Modal for select image */}
        <MediaModel
          imageModel={imageModel}
          toggleModal={toggleImageModal}
          handleUploadImage={handleUploadImage}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </Container>
    </div>
  );
};

export default withRouter(Certificate);
