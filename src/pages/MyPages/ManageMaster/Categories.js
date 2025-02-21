import React, { useMemo, useRef, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { combinedData } from "../../../common/data/MyFackData";
import { displayData } from "../../../common/data/MyFackData";
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
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import MediaModel from "../MediaUpload/MediaModel";

const Categories = () => {
  const imageInputRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCategories, setCurrentCategories] = useState(null);

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
      id: (currentCategories && currentCategories.id) || "",
      categoryName: (currentCategories && currentCategories.categoryName) || "",
      name: (currentCategories && currentCategories.name) || "",
      categoryImage:
        (currentCategories && currentCategories.categoryImage) || "",
      status: (currentCategories && currentCategories.status) || "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Please enter the category name"),
      name: Yup.string().required("Please select the display name"),
      categoryImage: Yup.mixed().test(
        "fileSelected",
        "Please select an image",
        () => uploadedImages && uploadedImages?.length > 0
      ),
      status: Yup.string().required("Please select the status"),
      metaTitle: Yup.string().required("Meta title is required"),
      metaDescription: Yup.string()
        .required("Meta description is required")
        .max(180, "Meta description cannot exceed 180 characters"),
      metaKeywords: Yup.string().required("Meta keywords are required"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        console.log("Updating categories:", values);
      } else {
        console.log("Adding new categories:", values);
      }
      toggleModal();
      formik.resetForm();
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
        Header: "Category Name",
        accessor: "categoryName",
        filterable: true,
      },
      {
        Header: "Display Name",
        accessor: "name",
        filterable: true,
      },
      {
        Header: "Category Image",
        accessor: "categoryImage",
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
        Cell: ({ value }) => (
          <Badge color={value === "active" ? "success" : "danger"}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
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

  const handleEditClick = (category) => {
    setCurrentCategories(category);
    setIsEdit(true);
    toggleModal();
  };

  const handleAddCategory = () => {
    setCurrentCategories(null);
    setIsEdit(false);
    toggleModal();
  };

  document.title = "Categories | Bieprocure";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Categories" breadcrumbItem="Manage Categories" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={combinedData}
                    isGlobalFilter={true}
                    customPageSize={10}
                    isAddCategory={true}
                    handleAddCategory={handleAddCategory}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Modal for Add/Edit Categories */}
          <Modal
            isOpen={modal}
            toggle={toggleModal}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <ModalHeader toggle={toggleModal} tag="h4">
              {isEdit ? "Edit Category" : "Add Category"}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col sm={6}>
                    <div className="mb-3">
                      <Label className="form-label">Category Name</Label>
                      <Input
                        name="categoryName"
                        type="text"
                        placeholder="Insert Categories Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.categoryName || ""}
                        invalid={
                          formik.touched.categoryName &&
                          formik.errors.categoryName
                            ? true
                            : false
                        }
                      />
                      {formik.touched.categoryName &&
                      formik.errors.categoryName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.categoryName}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="mb-3">
                      <Label className="form-label">Select Display Name</Label>
                      <Input
                        name="name"
                        type="select"
                        className="form-select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name || ""}
                        invalid={
                          formik.touched.name && formik.errors.name
                            ? true
                            : false
                        }
                      >
                        <option value="">Select Display Name</option>
                        {displayData?.map((data) => (
                          <option key={data.id} value={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </Input>
                      {formik.touched.name && formik.errors.name ? (
                        <FormFeedback type="invalid">
                          {formik.errors.name}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="mb-3">
                      <Label className="form-label">Category Image</Label>
                      <Input
                        name="categoryImage"
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleImageChange}
                        innerRef={imageInputRef}
                        style={{ display: "none" }}
                        invalid={
                          formik.touched.categoryImage &&
                          formik.errors.categoryImage
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
                      {formik.errors.categoryImage &&
                      formik.touched.categoryImage ? (
                        <FormFeedback type="invalid" className="d-block">
                          {formik.errors.categoryImage}
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
                  <Col sm={6}>
                    <div className="mb-3">
                      <Label className="form-label">Status</Label>
                      <Input
                        name="status"
                        type="select"
                        className="form-select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status || ""}
                        invalid={
                          formik.touched.status && formik.errors.status
                            ? true
                            : false
                        }
                      >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Input>
                      {formik.touched.status && formik.errors.status ? (
                        <FormFeedback type="invalid">
                          {formik.errors.status}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <CardTitle>Meta Data</CardTitle>
                  <p className="mb-3">Fill all information below</p>
                  <Col sm={6}>
                    <div className="mb-3">
                      <Label className="form-label">Meta title</Label>
                      <Input
                        name="metaTitle"
                        type="text"
                        placeholder="Meta title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.metaTitle || ""}
                        invalid={
                          formik.touched.metaTitle && formik.errors.metaTitle
                            ? true
                            : false
                        }
                      />
                      {formik.touched.metaTitle && formik.errors.metaTitle ? (
                        <FormFeedback type="invalid">
                          {formik.errors.metaTitle}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Meta Keywords</Label>
                      <Input
                        name="metaKeywords"
                        type="text"
                        placeholder="Meta Keywords"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.metaKeywords || ""}
                        invalid={
                          formik.touched.metaKeywords &&
                          formik.errors.metaKeywords
                            ? true
                            : false
                        }
                      />
                      {formik.touched.metaKeywords &&
                      formik.errors.metaKeywords ? (
                        <FormFeedback type="invalid">
                          {formik.errors.metaKeywords}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.metaDescription}
                    />
                    <div className="small text-muted">
                      {formik.values.metaDescription.length}/180 characters
                    </div>
                    {formik.touched.metaDescription &&
                    formik.errors.metaDescription ? (
                      <div className="text-danger">
                        {formik.errors.metaDescription}
                      </div>
                    ) : null}
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
    </>
  );
};

export default withRouter(Categories);
