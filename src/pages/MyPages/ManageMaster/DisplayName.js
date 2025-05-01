import React, { useMemo, useRef, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
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
  CardTitle,
} from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";
import { displayData } from "../../../common/data/MyFackData";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import MediaModel from "../MediaUpload/MediaModel";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DisplayName = () => {
  const imageInputRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [uploadedImages, setUploadedImages] = useState(null);
  const [imageModel, setImageModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [shortContent, setShortContent] = useState("");
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    status: "",
    image: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const toggleModal = () => setModal(!modal);

  const handleEditClick = (rowData) => {
    setEditData(rowData);
    setIsEdit(true);
    toggleModal();
  };

  const toggleImageModal = () => {
    setImageModel(!imageModel);
    setSelectedImage([]);
  };

  const handleUploadImage = (image) => {
    if (image) {
      setUploadedImages([image[0].image]);
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

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "video",
    "font",
    "size",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleShortContentChange = (newContent) => {
    setShortContent(newContent);
    console.log("setShortContent", newContent);
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: editData.name || "",
      status: editData.status || "",
      image: editData.image || "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter a display name"),
      status: Yup.string().required("Please select a status"),
      metaTitle: Yup.string().required("Meta title is required"),
      image: Yup.mixed().test(
        "fileSelected",
        "Please select an image",
        () => uploadedImages && uploadedImages.length > 0
      ),
      metaDescription: Yup.string()
        .required("Meta description is required")
        .max(180, "Meta description cannot exceed 180 characters"),
      metaKeywords: Yup.string().required("Meta keywords are required"),
    }),
    onSubmit: (values) => {
      const updatedData = displayData.map((item) =>
        item.id === editData.id ? { ...item, ...values } : item
      );

      console.log("Updated Data:", updatedData);
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
        Header: "Name",
        accessor: "name",
        filterable: true,
      },
      {
        Header: "Image",
        accessor: "brandLogo",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => (
          <div className="text-center">
            <img className="avatar-md" src={value} alt="" />
          </div>
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
          );
        },
      },
    ],
    []
  );

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          title="Display Name"
          breadcrumbItem="Manage Display Name"
        />

        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <TableContainer
                  columns={columns}
                  data={displayData}
                  isGlobalFilter={true}
                  customPageSize={10}
                  className="custom-header-css"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Modal for Edit Display Name */}
        <Modal
          isOpen={modal}
          toggle={toggleModal}
          backdrop="static"
          keyboard={false}
          size="lg"
          scrollable={true}
        >
          <ModalHeader toggle={toggleModal} tag="h4">
            Edit
          </ModalHeader>
          <ModalBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <Row>
                <Col className="col-6">
                  <div className="mb-3">
                    <Label className="form-label">Display Name</Label>
                    <Input
                      name="name"
                      type="text"
                      placeholder="Enter Display Name"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.name || ""}
                      invalid={
                        validation.touched.name && validation.errors.name
                          ? true
                          : false
                      }
                    />
                    {validation.touched.name && validation.errors.name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>

                <Col className="col-6">
                  <div className="mb-3">
                    <Label className="form-label">Status</Label>
                    <Input
                      name="status"
                      type="select"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.status || ""}
                      invalid={
                        validation.touched.status && validation.errors.status
                          ? true
                          : false
                      }
                    >
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Input>
                    {validation.touched.status && validation.errors.status ? (
                      <FormFeedback type="invalid">
                        {validation.errors.status}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>

                <Col className="col-12">
                  <div className="mb-3">
                    <Label className="form-label">Image</Label>
                    <Input
                      name="image"
                      type="file"
                      accept="image/jpeg, image/png"
                      onChange={handleImageChange}
                      innerRef={imageInputRef}
                      style={{ display: "none" }}
                      invalid={
                        validation.touched.image && validation.errors.image
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
                    {validation.errors.image && validation.touched.image ? (
                      <FormFeedback type="invalid" className="d-block">
                        {validation.errors.image}
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

                <Col className="col-12">
                  <div className="card" style={{ border: "1px solid #e9ebec" }}>
                    <div class="card-header">
                      <div class="flex-grow-1">
                        <h5 class="card-title m-0">Description</h5>
                      </div>
                    </div>
                    <div class="card-body">
                      <div className="mb-5">
                        <ReactQuill
                          value={shortContent}
                          theme="snow"
                          onChange={handleShortContentChange}
                          modules={quillModules}
                          formats={quillFormats}
                          style={{ height: "200px" }}
                          placeholder="Enter your content...."
                          className=""
                        />
                      </div>
                    </div>
                  </div>
                </Col>

                <Col className="col-12">
                  <div className="card" style={{ border: "1px solid #e9ebec" }}>
                    <div class="card-header">
                      <CardTitle>Meta Data</CardTitle>
                      <p className="m-0">Fill all information below</p>
                    </div>
                    <div className="card-body">
                      <Row>
                        <Col sm={6}>
                          <div className="mb-3">
                            <Label className="form-label">Meta title</Label>
                            <Input
                              name="metaTitle"
                              type="text"
                              placeholder="Meta title"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.metaTitle || ""}
                              invalid={
                                validation.touched.metaTitle &&
                                validation.errors.metaTitle
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.metaTitle &&
                            validation.errors.metaTitle ? (
                              <FormFeedback type="invalid">
                                {validation.errors.metaTitle}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">Meta Keywords</Label>
                            <Input
                              name="metaKeywords"
                              type="text"
                              placeholder="Meta Keywords"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.metaKeywords || ""}
                              invalid={
                                validation.touched.metaKeywords &&
                                validation.errors.metaKeywords
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.metaKeywords &&
                            validation.errors.metaKeywords ? (
                              <FormFeedback type="invalid">
                                {validation.errors.metaKeywords}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col sm={6}>
                          <Label className="form-label">
                            Meta Description (Max 180 Characters)
                          </Label>
                          <textarea
                            name="metaDescription"
                            placeholder="Enter Meta Description"
                            className="form-control"
                            rows="5"
                            maxLength="180"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.metaDescription}
                          />
                          <div className="small text-muted">
                            {validation.values.metaDescription.length}/180
                            characters
                          </div>
                          {validation.touched.metaDescription &&
                          validation.errors.metaDescription ? (
                            <div className="text-danger">
                              {validation.errors.metaDescription}
                            </div>
                          ) : null}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="text-end">
                <Button type="submit" color="success">
                  Save
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>

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

export default withRouter(DisplayName);
