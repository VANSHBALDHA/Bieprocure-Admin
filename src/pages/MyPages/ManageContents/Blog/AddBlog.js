import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import MediaModel from "../../MediaUpload/MediaModel";

const AddBlog = () => {
  const imageInputRef = useRef(null);
  const [uploadedImages, setUploadedImages] = useState(null);
  const [imageModel, setImageModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      title: "",
      slug: "",
      category: "",
      published_date: "",
      status: "",
      images: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please enter the title"),
      category: Yup.string().required("Please select category"),
      slug: Yup.string().required("Please add slug"),
      published_date: Yup.string().required("Please select date"),
      status: Yup.string().required("Please select the status"),
      images: Yup.mixed().test(
        "fileSelected",
        "Please select an image",
        () => uploadedImages && uploadedImages?.length > 0
      ),
      metaTitle: Yup.string().required("Meta title is required"),
      metaDescription: Yup.string()
        .required("Meta description is required")
        .max(180, "Meta description cannot exceed 180 characters"),
      metaKeywords: Yup.string().required("Meta keywords are required"),
    }),
    onSubmit: (values) => {
      console.log("Adding new blog:", values);
      formik.resetForm();
    },
  });

  const [shortContent, setShortContent] = useState("");

  const handleShortContentChange = (newContent) => {
    setShortContent(newContent);
    console.log("setShortContent", newContent);
  };

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

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Blog" breadcrumbItem="Add blog" />
          <Card>
            <CardBody>
              <CardTitle>Meta Data</CardTitle>
              <p className="card-title-desc">Fill all information below</p>
              <Row>
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
            </CardBody>
          </Card>
          <Card>
            <CardBody>
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
                        formik.touched.slug && formik.errors.slug ? true : false
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
                <Col className="col-6">
                  <div className="mb-3">
                    <Label className="form-label">Upload Blog Image</Label>
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
                    {formik.errors.images && formik.touched.images ? (
                      <FormFeedback type="invalid" className="d-block">
                        {formik.errors.images}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                {uploadedImages && (
                  <Card className="mt-1 mb-3 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
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
                <Col>
                  <div className="text-end">
                    <Button
                      type="submit"
                      color="success"
                      onClick={() => formik.handleSubmit()}
                    >
                      Save
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>

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

export default AddBlog;
