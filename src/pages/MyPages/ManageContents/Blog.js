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
import { BlogData } from "../../../common/data/MyFackData";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Blog = () => {
  const fileInputRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [addBlog, setAddBlog] = useState(null);
  const [viewBlog, setViewBlog] = useState(null);

  const [shortContent, setShortContent] = useState("");

  const handleShortContentChange = (newContent) => {
    setShortContent(newContent);
    console.log("setShortContent", newContent);
  };

  const [uploadedImages, setUploadedImages] = useState([]);

  const toggleModal = () => setModal(!modal);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (addBlog && addBlog.id) || "",
      title: (addBlog && addBlog.title) || "",
      slug: (addBlog && addBlog.slug) || "",
      category: (addBlog && addBlog.category) || "",
      published_date: (addBlog && addBlog.published_date) || "",
      status: (addBlog && addBlog.status) || "active",
      images: uploadedImages,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please enter the title"),
      category: Yup.string().required("Please select cacategory"),
      slug: Yup.string().required("Please add slug"),
      published_date: Yup.string().required("Please select date"),
      status: Yup.string().required("Please select the status"),
      images: Yup.array().min(1, "Please upload at least one image"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        console.log("Updating blog:", values);
      } else {
        console.log("Adding new blog:", values);
      }
      toggleModal();
    },
  });

  const handleEditClick = (blog) => {
    setAddBlog(blog);
    setIsEdit(true);
    toggleModal();
  };

  const handleViewClick = (blog) => {
    setIsView(true);
    setViewBlog(blog);
  };

  const handleaddBlog = () => {
    setAddBlog(null);
    setIsEdit(false);
    toggleModal();
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        disableFilters: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Blog Title",
        accessor: "title",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Slug",
        accessor: "slug",
        filterable: true,
      },
      {
        Header: "	Category",
        accessor: "category",
        filterable: true,
      },
      {
        Header: "	Image",
        accessor: "image",
        disableFilters: true,
        Cell: ({ value }) => (
          <img className="rounded-circle avatar-md" src={value} alt="" />
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
              onClick={() => handleViewClick(row.original)}
            >
              <i
                className="mdi mdi-eye-outline font-size-18"
                id="viewtooltip"
              ></i>
              <UncontrolledTooltip placement="top" target="viewtooltip">
                View
              </UncontrolledTooltip>
            </Link>
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImage = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setUploadedImages([newImage]);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

  document.title = "Blog Section | Bieprocure";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Blogs" breadcrumbItem="Blogs List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={BlogData}
                    isGlobalFilter={true}
                    isAddBlog={true}
                    customPageSize={10}
                    handleaddBlog={handleaddBlog}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Modal for Add/Edit Blog*/}
          <Modal
            isOpen={modal}
            toggle={toggleModal}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <ModalHeader toggle={toggleModal} tag="h4">
              {isEdit ? "Edit Blog" : "Add Blog"}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Blog Title</Label>
                      <Input
                        name="title"
                        type="text"
                        placeholder="Insert Blog Title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title || ""}
                        invalid={
                          formik.touched.title && formik.errors.title
                            ? true
                            : false
                        }
                      />
                      {formik.touched.title && formik.errors.title ? (
                        <FormFeedback type="invalid">
                          {formik.errors.title}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Slug</Label>
                      <Input
                        name="slug"
                        type="text"
                        placeholder="Insert Slug"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.slug || ""}
                        invalid={
                          formik.touched.slug && formik.errors.slug
                            ? true
                            : false
                        }
                      />
                      {formik.touched.slug && formik.errors.slug ? (
                        <FormFeedback type="invalid">
                          {formik.errors.slug}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Select Category</Label>
                      <Input
                        name="category"
                        type="select"
                        placeholder="Select Category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category || ""}
                        invalid={
                          formik.touched.category && formik.errors.category
                            ? true
                            : false
                        }
                      >
                        <option value="" label="Select category" />
                        <option value="1">Life Style</option>
                        <option value="2">Technology</option>
                        <option value="3">Business</option>
                        <option value="4">Others</option>
                        <option value="5">Entertainment</option>
                        <option value="6">Fashion</option>
                      </Input>
                      {formik.touched.category && formik.errors.category ? (
                        <FormFeedback type="invalid">
                          {formik.errors.category}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-3">
                    <div className="mb-3">
                      <Label className="form-label">Select Date</Label>
                      <Input
                        name="published_date"
                        type="date"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.published_date || ""}
                        invalid={
                          formik.touched.published_date &&
                          formik.errors.published_date
                            ? true
                            : false
                        }
                      />
                      {formik.touched.published_date &&
                      formik.errors.published_date ? (
                        <FormFeedback type="invalid">
                          {formik.errors.published_date}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-3">
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
                  </Col>
                  <Col className="col-6">
                    <div className="mb-3">
                      <Label className="form-label">Upload Blog Image</Label>
                      <Input
                        name="images"
                        type="file"
                        accept="image/jpeg, image/png"
                        innerRef={fileInputRef}
                        onChange={handleImageChange}
                        invalid={
                          formik.touched.images && formik.errors.images
                            ? true
                            : false
                        }
                      />
                      {formik.touched.images && formik.errors.images ? (
                        <FormFeedback type="invalid" className="d-block">
                          {formik.errors.images}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  {uploadedImages?.length > 0 && (
                    <Col className="col-12">
                      <div className="mb-3">
                        <Label className="form-label">Uploaded Images</Label>
                        <div className="image-preview-container">
                          {uploadedImages.map((image, index) => (
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={index + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={image.name}
                                      src={image.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {image.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{image.formattedSize}</strong>
                                    </p>
                                  </Col>
                                  <Col className="col-auto">
                                    <button
                                      type="button"
                                      className="btn btn-danger btn-sm"
                                      onClick={() => handleRemoveImage(index)}
                                    >
                                      Delete
                                    </button>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col className="col-12 mb-5">
                    <div className="mb-3">
                      <Label className="form-label">Blog Discription</Label>
                      <ReactQuill
                        value={shortContent}
                        theme="snow"
                        onChange={handleShortContentChange}
                        modules={quillModules}
                        formats={quillFormats}
                        style={{ height: "300px" }}
                        placeholder="Enter your content...."
                        className=""
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

          {/* Modal for View Blog Details*/}
          <Modal
            isOpen={isView}
            toggle={handleViewClick}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <ModalHeader toggle={() => setIsView(false)} tag="h4">
              Blog Details - {viewBlog?.title}
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col className="col-4">
                  <div className="mb-3">
                    <Label className="form-label">Blog Title</Label>
                    <Input type="text" value={viewBlog?.title || ""} disabled />
                  </div>
                </Col>
                <Col className="col-4">
                  <div className="mb-3">
                    <Label className="form-label">Slug</Label>
                    <Input type="text" value={viewBlog?.slug || ""} disabled />
                  </div>
                </Col>
                <Col className="col-4">
                  <div className="mb-3">
                    <Label className="form-label">Category</Label>
                    <Input
                      type="text"
                      value={viewBlog?.category || ""}
                      disabled
                    />
                  </div>
                </Col>
                <Col className="col-4">
                  <div className="mb-3">
                    <Label className="form-label">Published Date</Label>
                    <Input
                      type="text"
                      value={viewBlog?.published_date || ""}
                      disabled
                    />
                  </div>
                </Col>
                <Col className="col-4">
                  <div className="mb-3">
                    <Label className="form-label">Status</Label>
                    <Input
                      type="text"
                      value={viewBlog?.status || ""}
                      disabled
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="col-4">
                  <div className="mb-3 d-grid">
                    <Label className="form-label">Blog Image</Label>
                    <img
                      className="rounded me-2"
                      alt="200x200"
                      width="200"
                      src={viewBlog?.image}
                      data-holder-rendered="true"
                    />
                  </div>
                </Col>
                <Col className="col-8">
                  <div className="mb-3">
                    <Label className="form-label">Description</Label>
                    <textarea
                      className="form-control"
                      id="productdesc"
                      rows="6"
                      value={
                        viewBlog?.longDescription ||
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                      }
                      disabled
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="text-end">
                    <Button
                      type="submit"
                      color="success"
                      onClick={() => setIsView(false)}
                    >
                      Close
                    </Button>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default withRouter(Blog);
