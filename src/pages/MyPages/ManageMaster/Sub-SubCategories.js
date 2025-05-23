import React, { useMemo, useRef, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  categoryData,
  combineSubCategorydData,
} from "../../../common/data/MyFackData";
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
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import MediaModel from "../MediaUpload/MediaModel";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SubSubCategories = () => {
  const navigate = useNavigate();
  const imageInputRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentSubCategories, setCurrentSubCategories] = useState(null);
  const [shortContent, setShortContent] = useState("");
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

  const handleShortContentChange = (newContent) => {
    setShortContent(newContent);
    console.log("setShortContent", newContent);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (currentSubCategories && currentSubCategories.id) || "",
      subCategoryName:
        (currentSubCategories && currentSubCategories.subCategoryName) || "",
      categoryName:
        (currentSubCategories && currentSubCategories.categoryName) || "",
      isDisplay: "No",
      subSubCategoryImage:
        (currentSubCategories && currentSubCategories.subSubCategoryImage) ||
        "",
      status: (currentSubCategories && currentSubCategories.status) || "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
    validationSchema: Yup.object({
      subCategoryName: Yup.string().required(
        "Please enter the sub-sub category name"
      ),
      categoryName: Yup.string().required("Please select the sub category"),
      isDisplay: Yup.string().required("Please select the anyone"),
      subSubCategoryImage: Yup.mixed().test(
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
        Header: "	Sub-Sub Categories Name",
        accessor: "subCategoryName",
        filterable: true,
      },
      {
        Header: "Sub Category Name",
        accessor: "categoryName",
        filterable: true,
      },

      {
        Header: "Image",
        accessor: "subSubCategoryImage",
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
        Header: "#",
        Cell: ({ row }) => {
          const { id } = row.original;
          return (
            <Button
              type="button"
              color="success"
              className="btn-rounded mb-2 me-2"
              style={{ width: "150px" }}
              onClick={() =>
                navigate(`/manage-master/sub-sub-categories/${id}`)
              }
            >
              <i className="mdi mdi-plus me-1" />
              Add Features
            </Button>
          );
        },
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

  const handleEditClick = (subcategory) => {
    setCurrentSubCategories(subcategory);
    setIsEdit(true);
    toggleModal();
  };

  const handleAddSubSubCategory = () => {
    setCurrentSubCategories(null);
    setIsEdit(false);
    toggleModal();
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Sub Sub-Categories"
            breadcrumbItem="Manage Sub Sub-Categories"
          />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={combineSubCategorydData}
                    isGlobalFilter={true}
                    customPageSize={10}
                    isAddSubSubCategory={true}
                    handleAddSubSubCategory={handleAddSubSubCategory}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Modal for Add/Edit Sub Sub-Categories */}
          <Modal
            isOpen={modal}
            toggle={toggleModal}
            backdrop="static"
            keyboard={false}
            size="lg"
            scrollable={true}
          >
            <ModalHeader
              toggle={() => {
                toggleModal();
                formik.resetForm();
              }}
              tag="h4"
            >
              {isEdit ? "Edit Sub-Sub Category" : "Add Sub-Sub Category"}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col sm={6}>
                    <div className="mb-3">
                      <Label className="form-label">
                        Sub-Sub Category Name
                      </Label>
                      <Input
                        name="subCategoryName"
                        type="text"
                        placeholder="Insert Sub-Sub Categories Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.subCategoryName || ""}
                        invalid={
                          formik.touched.subCategoryName &&
                          formik.errors.subCategoryName
                            ? true
                            : false
                        }
                      />
                      {formik.touched.subCategoryName &&
                      formik.errors.subCategoryName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.subCategoryName}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="mb-3">
                      <Label className="form-label">Select Sub Category</Label>
                      <Input
                        name="categoryName"
                        type="select"
                        className="form-select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.categoryName || ""}
                        invalid={
                          formik.touched.categoryName &&
                          formik.errors.categoryName
                            ? true
                            : false
                        }
                      >
                        <option value="">Select sub category</option>
                        {categoryData?.map((data) => (
                          <option key={data.id} value={data.id}>
                            {data.categoryName}
                          </option>
                        ))}
                      </Input>
                      {formik.touched.categoryName &&
                      formik.errors.categoryName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.categoryName}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label className="form-label">isEnable?</Label>
                      <Input
                        name="isDisplay"
                        type="select"
                        className="form-select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.isDisplay || ""}
                        invalid={
                          formik.touched.isDisplay && formik.errors.isDisplay
                            ? true
                            : false
                        }
                      >
                        <option value="">Select Display </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Input>
                      {formik.touched.isDisplay && formik.errors.isDisplay ? (
                        <FormFeedback type="invalid">
                          {formik.errors.isDisplay}
                        </FormFeedback>
                      ) : null}
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
                  <Col lg={12}>
                    <Row>
                      <Col sm={6}>
                        <div className="mb-3">
                          <Label className="form-label">
                            Sub Sub Category Image
                          </Label>
                          <Input
                            name="subSubCategoryImage"
                            type="file"
                            accept="image/jpeg, image/png"
                            onChange={handleImageChange}
                            innerRef={imageInputRef}
                            style={{ display: "none" }}
                            invalid={
                              formik.touched.subSubCategoryImage &&
                              formik.errors.subSubCategoryImage
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
                          {formik.errors.subSubCategoryImage &&
                          formik.touched.subSubCategoryImage ? (
                            <FormFeedback type="invalid" className="d-block">
                              {formik.errors.subSubCategoryImage}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={6}>
                        {uploadedImages && (
                          <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                            <div className="p-1">
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
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={12}>
                    <div
                      className="card"
                      style={{ border: "1px solid #e9ebec" }}
                    >
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

export default withRouter(SubSubCategories);
