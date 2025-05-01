import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import {
  categoryData,
  displayData,
  brandData,
  certificateData,
  subCategoryData,
} from "../../../common/data/MyFackData";
import Select from "react-select";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MediaModel from "../MediaUpload/MediaModel";

const AddProduct = () => {
  document.title = "Add product | Bieprocure";
  const fileInputRef = useRef(null);

  const [shortContent, setShortContent] = useState("");
  const [longContent, setLongContent] = useState("");

  const [modalType, setModalType] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageModel, setImageModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedOtherImages, setUploadedOtherImages] = useState([]);

  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [uploadedDataSheet, setUploadedDataSheet] = useState([]);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productCode: "",
      productName: "",
      displayName: "",
      categoryName: "",
      subCategoryName: "",
      subSubCategoryName: "",
      brandName: "",
      manufacturePartNumber: "",
      minimumStockQuantityWarning: "",
      mrp: "",
      reservedQuantity: "",
      CGST: "",
      SGST: "",
      IGST: "",
      status: "",
      visibility: "",
      purchasePrice: "",
      loading: "",
      margin: "",
      technicalDataSheets: uploadedDataSheet,
      images: uploadedImages,
      otherImages: uploadedOtherImages,
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
    validationSchema: Yup.object({
      productCode: Yup.string().required("Please enter the product code"),
      productName: Yup.string().required("Please enter the product name"),
      displayName: Yup.string().required("Please select a display name"),
      categoryName: Yup.string().required("Please select a category"),
      subCategoryName: Yup.string().required("Please select a sub-category"),
      subSubCategoryName: Yup.string().required(
        "Please select a sub-sub category"
      ),
      brandName: Yup.string().required("Please select a brand"),
      manufacturePartNumber: Yup.string().required(
        "Please enter the manufacturer part number"
      ),
      minimumStockQuantityWarning: Yup.number()
        .required("Please enter the minimum stock quantity warning")
        .positive("Must be a positive number"),

      mrp: Yup.number()
        .required("Please enter the MRP")
        .positive("Must be a positive number"),
      reservedQuantity: Yup.number()
        .required("Please enter the reserved quantity")
        .positive("Must be a positive number"),
      CGST: Yup.number()
        .required("Please enter the CGST percentage")
        .positive("Must be a positive number")
        .min(0, "CGST must be at least 0%")
        .max(100, "CGST cannot exceed 100%"),
      SGST: Yup.number()
        .required("Please enter the SGST percentage")
        .positive("Must be a positive number")
        .min(0, "SGST must be at least 0%")
        .max(100, "SGST cannot exceed 100%"),
      IGST: Yup.number()
        .required("Please enter the IGST percentage")
        .positive("Must be a positive number")
        .min(0, "IGST must be at least 0%")
        .max(100, "IGST cannot exceed 100%"),
      purchasePrice: Yup.string().required("Please enter purchase price"),
      loading: Yup.number()
        .required("Please enter loading percentage")
        .positive("Must be a positive number")
        .min(0, "loading must be at least 0%")
        .max(100, "loading cannot exceed 100%"),
      margin: Yup.number()
        .required("Please enter margin percentage")
        .positive("Must be a positive number")
        .min(0, "margin must be at least 0%")
        .max(100, "margin cannot exceed 100%"),
      visibility: Yup.string().required("Please select the visibility"),
      status: Yup.string().required("Please select the status"),
      images: Yup.array()
        .min(1, "Please upload an image")
        .max(1, "You can only upload 1 image"),
      otherImages: Yup.array()
        .min(1, "Please upload an image")
        .max(5, "You can upload maximum 5 images"),
      technicalDataSheets: Yup.array()
        .min(1, "Please upload a datasheet")
        .required("Datasheet is required"),
      metaTitle: Yup.string().required("Meta title is required"),
      metaDescription: Yup.string()
        .required("Meta description is required")
        .max(180, "Meta description cannot exceed 180 characters"),
      metaKeywords: Yup.string().required("Meta keywords are required"),
    }),
    onSubmit: (values) => {
      console.log("Adding new product:", values);
    },
  });

  const handleShortContentChange = (newContent) => {
    setShortContent(newContent);
    console.log("setShortContent", newContent);
  };

  const handleSubSubCategoryChange = (event) => {
    const selectedId = event.target.value;
    formik.setFieldValue("subSubCategoryName", selectedId);
    setSelectedFeatures(categoryData[selectedId] || []);
  };

  const handleLongContentChange = (newContent) => {
    setLongContent(newContent);
    console.log("setLongContent", newContent);
  };

  const options = certificateData?.map((data) => ({
    value: data?.certificateName,
    label: data?.certificateName,
  }));

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImage = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setUploadedImages([newImage]);
    }
  };

  const handleOtherImageChange = (event) => {
    const files = Array.from(event.target.files);
    const updatedImages = files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setUploadedOtherImages((prev) => [...prev, ...updatedImages]);
  };

  const toggleModal = (type = null) => {
    setImageModel(!imageModel);
    setSelectedImage([]);
    setModalType(type);
  };

  const handleUploadImage = (images) => {
    if (modalType === "feature") {
      setUploadedImages([images[0].image]);
    } else if (modalType === "other") {
      setUploadedOtherImages((prev) => {
        const newImages = images.map((img) => img.image);

        if (prev.length + newImages.length > 5) {
          return [...prev.slice(newImages.length), ...newImages];
        }
        return [...prev, ...newImages];
      });
    }
    setImageModel(false);
    setSelectedImage([]);
    setModalType(null);
  };

  const handleDataSheetChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === "application/pdf") {
        setUploadedDataSheet([file]);
        setPdfPreviewUrl(URL.createObjectURL(file));
      } else {
        alert("Only PDF files are allowed.");
      }
    }
  };

  const handleRemovePdf = () => {
    setUploadedDataSheet([]);
    setPdfPreviewUrl(null);
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

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Product" breadcrumbItem="Create product" />
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-9 col-12">
                <div className="card" style={{ border: "1px solid #e9ebec" }}>
                  <div class="card-header">
                    <div class="flex-grow-1">
                      <h5 class="card-title mb-1">Product Information</h5>
                      <p class="text-muted mb-0">Fill all information below.</p>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="mb-3">
                      <label class="form-label" for="product-title-input">
                        Product name
                      </label>
                      <Input
                        name="productName"
                        type="text"
                        placeholder="Insert product name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.productName}
                        invalid={
                          formik.touched.productName &&
                          formik.errors.productName
                            ? true
                            : false
                        }
                      />
                      {formik.touched.productName &&
                      formik.errors.productName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.productName}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-5">
                      <label class="form-label">Product description</label>
                      <ReactQuill
                        value={longContent}
                        theme="snow"
                        onChange={handleLongContentChange}
                        modules={quillModules}
                        formats={quillFormats}
                        style={{ height: "280px" }}
                        placeholder="Enter your content...."
                        className=""
                      />
                    </div>
                  </div>
                </div>

                <div className="card" style={{ border: "1px solid #e9ebec" }}>
                  <div class="card-header">
                    <div class="flex-grow-1">
                      <h5 class="card-title mb-1">General Information</h5>
                      <p class="text-muted mb-0">Fill all information below.</p>
                    </div>
                  </div>
                  <div class="card-body">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <Label className="form-label">Product Code</Label>
                        <Input
                          name="productCode"
                          type="text"
                          placeholder="Insert Product Code"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.productCode}
                          invalid={
                            formik.touched.productCode &&
                            formik.errors.productCode
                              ? true
                              : false
                          }
                        />
                        {formik.touched.productCode &&
                        formik.errors.productCode ? (
                          <FormFeedback type="invalid">
                            {formik.errors.productCode}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-4 mb-3">
                        <Label className="form-label">Select Certificate</Label>
                        <Select
                          classNamePrefix="select2-selection"
                          placeholder="Choose Certificate"
                          options={options}
                          isMulti
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <Label className="form-label">
                          Select Display Name
                        </Label>
                        <Input
                          name="displayName"
                          type="select"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.displayName}
                          invalid={
                            formik.touched.displayName &&
                            formik.errors.displayName
                              ? true
                              : false
                          }
                        >
                          <option value="" label="Select display name" />
                          {displayData.map((data) => (
                            <option key={data.id} value={data.id}>
                              {data.name}
                            </option>
                          ))}
                        </Input>
                        {formik.touched.displayName &&
                        formik.errors.displayName ? (
                          <FormFeedback type="invalid">
                            {formik.errors.displayName}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-4 mb-3">
                        <Label className="form-label">Select Category</Label>
                        <Input
                          name="categoryName"
                          type="select"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.categoryName}
                          invalid={
                            formik.touched.categoryName &&
                            formik.errors.categoryName
                              ? true
                              : false
                          }
                        >
                          <option value="" label="Select category" />
                          {categoryData.map((data) => (
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
                      <div className="col-md-4 mb-3">
                        <Label className="form-label">
                          Select Sub-Category
                        </Label>
                        <Input
                          name="subCategoryName"
                          type="select"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.subCategoryName}
                          invalid={
                            formik.touched.subCategoryName &&
                            formik.errors.subCategoryName
                              ? true
                              : false
                          }
                        >
                          <option value="" label="Select sub-category" />
                          {subCategoryData.map((data) => (
                            <option
                              key={data.subCategoryNameId}
                              value={data.subCategoryNameId}
                            >
                              {data.subCategoryName}
                            </option>
                          ))}
                        </Input>
                        {formik.touched.subCategoryName &&
                        formik.errors.subCategoryName ? (
                          <FormFeedback type="invalid">
                            {formik.errors.subCategoryName}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-4 mb-3">
                        <Label className="form-label">
                          Select Sub-sub Category
                        </Label>
                        <Input
                          name="subSubCategoryName"
                          type="select"
                          onChange={handleSubSubCategoryChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.subSubCategoryName}
                          invalid={
                            formik.touched.subSubCategoryName &&
                            formik.errors.subSubCategoryName
                              ? true
                              : false
                          }
                        >
                          <option value="" label="Select sub-sub category" />
                          {categoryData.map((data) => (
                            <option key={data.id} value={data.id}>
                              {data.categoryName}
                            </option>
                          ))}
                        </Input>
                        {formik.touched.subSubCategoryName &&
                        formik.errors.subSubCategoryName ? (
                          <FormFeedback type="invalid">
                            {formik.errors.subSubCategoryName}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="col-md-4 mb-3">
                        <Label className="form-label">
                          Manufacturer Part No.
                        </Label>
                        <Input
                          name="manufacturePartNumber"
                          type="text"
                          placeholder="Insert Manufacturer Part No."
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.manufacturePartNumber}
                          invalid={
                            formik.touched.manufacturePartNumber &&
                            formik.errors.manufacturePartNumber
                              ? true
                              : false
                          }
                        />
                        {formik.touched.manufacturePartNumber &&
                        formik.errors.manufacturePartNumber ? (
                          <FormFeedback type="invalid">
                            {formik.errors.manufacturePartNumber}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="col-md-4 mb-3">
                        <Label className="form-label">
                          Minimum Stock Qty. Warning
                        </Label>
                        <Input
                          name="minimumStockQuantityWarning"
                          type="number"
                          placeholder="Insert Minimum Stock Warning"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.minimumStockQuantityWarning}
                          invalid={
                            formik.touched.minimumStockQuantityWarning &&
                            formik.errors.minimumStockQuantityWarning
                              ? true
                              : false
                          }
                        />
                        {formik.touched.minimumStockQuantityWarning &&
                        formik.errors.minimumStockQuantityWarning ? (
                          <FormFeedback type="invalid">
                            {formik.errors.minimumStockQuantityWarning}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="col-md-4 mb-3">
                        <Label className="form-label">MRP (Per Item)</Label>
                        <Input
                          name="mrp"
                          type="number"
                          placeholder="Insert MRP"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.mrp}
                          invalid={
                            formik.touched.mrp && formik.errors.mrp
                              ? true
                              : false
                          }
                        />
                        {formik.touched.mrp && formik.errors.mrp ? (
                          <FormFeedback type="invalid">
                            {formik.errors.mrp}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-4 mb-3">
                        <Label className="form-label">Reserved Quantity</Label>
                        <Input
                          name="reservedQuantity"
                          type="number"
                          placeholder="Insert Reserved Quantity"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.reservedQuantity}
                          invalid={
                            formik.touched.reservedQuantity &&
                            formik.errors.reservedQuantity
                              ? true
                              : false
                          }
                        />
                        {formik.touched.reservedQuantity &&
                        formik.errors.reservedQuantity ? (
                          <FormFeedback type="invalid">
                            {formik.errors.reservedQuantity}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-4 mb-3">
                        <Label className="form-label" htmlFor="CGST">
                          CGST Percentage (%)
                        </Label>
                        <Input
                          id="CGST"
                          name="CGST"
                          type="number"
                          placeholder="Enter CGST percentage (0-100%)"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.CGST}
                          invalid={
                            formik.touched.CGST && formik.errors.CGST
                              ? true
                              : false
                          }
                        />
                        {formik.touched.CGST && formik.errors.CGST ? (
                          <FormFeedback type="invalid">
                            {formik.errors.CGST}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-4 mb-3">
                        <Label className="form-label" htmlFor="SGST">
                          SGST Percentage (%)
                        </Label>
                        <Input
                          id="SGST"
                          name="SGST"
                          type="number"
                          placeholder="Enter SGST percentage (0-100%)"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.SGST}
                          invalid={
                            formik.touched.SGST && formik.errors.SGST
                              ? true
                              : false
                          }
                        />
                        {formik.touched.SGST && formik.errors.SGST ? (
                          <FormFeedback type="invalid">
                            {formik.errors.SGST}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-4 mb-3">
                        <Label className="form-label" htmlFor="IGST">
                          IGST Percentage (%)
                        </Label>
                        <Input
                          id="IGST"
                          name="IGST"
                          type="number"
                          placeholder="Enter IGST percentage (0-100%)"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.IGST}
                          invalid={
                            formik.touched.IGST && formik.errors.IGST
                              ? true
                              : false
                          }
                        />
                        {formik.touched.IGST && formik.errors.IGST ? (
                          <FormFeedback type="invalid">
                            {formik.errors.IGST}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-4 mb-3">
                        <Label className="form-label" htmlFor="purchasePrice">
                          Purchase Price
                        </Label>
                        <Input
                          id="purchasePrice"
                          name="purchasePrice"
                          type="text"
                          placeholder="Enter purchase price"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.purchasePrice}
                          invalid={
                            formik.touched.purchasePrice &&
                            formik.errors.purchasePrice
                              ? true
                              : false
                          }
                        />
                        {formik.touched.purchasePrice &&
                        formik.errors.purchasePrice ? (
                          <FormFeedback type="invalid">
                            {formik.errors.purchasePrice}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-4 mb-3">
                        <Label className="form-label" htmlFor="loading">
                          Loading (%)
                        </Label>
                        <Input
                          id="loading"
                          name="loading"
                          type="number"
                          placeholder="Enter out of stock status"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.loading}
                          invalid={
                            formik.touched.loading && formik.errors.loading
                              ? true
                              : false
                          }
                        />
                        {formik.touched.loading && formik.errors.loading ? (
                          <FormFeedback type="invalid">
                            {formik.errors.loading}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-4 mb-3">
                        <Label className="form-label" htmlFor="margin">
                          Margin (%)
                        </Label>
                        <Input
                          id="margin"
                          name="margin"
                          type="number"
                          placeholder="Enter margin"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.margin}
                          invalid={
                            formik.touched.margin && formik.errors.margin
                              ? true
                              : false
                          }
                        />
                        {formik.touched.margin && formik.errors.margin ? (
                          <FormFeedback type="invalid">
                            {formik.errors.margin}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedFeatures?.features && (
                  <>
                    <div
                      className="card"
                      style={{ border: "1px solid #e9ebec" }}
                    >
                      <div class="card-header">
                        <div class="flex-grow-1">
                          <h5 class="card-title mb-1">Feature List</h5>
                        </div>
                      </div>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Feature Name</th>
                            <th>Add specification about the product</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedFeatures?.features?.map((feature, index) => (
                            <tr key={index}>
                              <td>{feature?.name}</td>
                              <td>
                                <Input
                                  type="text"
                                  value={feature?.value}
                                ></Input>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {/* For Add Product Description Row */}
                <div className="card" style={{ border: "1px solid #e9ebec" }}>
                  <div class="card-header">
                    <div class="flex-grow-1">
                      <h5 class="card-title mb-1">Product Short Description</h5>
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
                        style={{ height: "300px" }}
                        placeholder="Enter your content...."
                        className=""
                      />
                    </div>
                  </div>
                </div>

                {/* For Add Product Meta Data Row */}
                <div className="card" style={{ border: "1px solid #e9ebec" }}>
                  <div class="card-header">
                    <div class="flex-grow-1">
                      <h5 class="card-title mb-1">Meta Data</h5>
                    </div>
                  </div>
                  <div class="card-body">
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
                              formik.touched.metaTitle &&
                              formik.errors.metaTitle
                                ? true
                                : false
                            }
                          />
                          {formik.touched.metaTitle &&
                          formik.errors.metaTitle ? (
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
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-12">
                <div class="card" style={{ border: "1px solid #e9ebec" }}>
                  <div class="card-header">
                    <h5 class="card-title">Publish</h5>
                  </div>
                  <div class="card-body">
                    <div class="mb-3">
                      <Label className="form-label">Status</Label>
                      <Input
                        name="status"
                        type="select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status}
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

                    <div>
                      <Label className="form-label">Visibility</Label>
                      <Input
                        name="visibility"
                        type="select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.visibility}
                        invalid={
                          formik.touched.visibility && formik.errors.visibility
                            ? true
                            : false
                        }
                      >
                        <option value="">Select Visibility</option>
                        <option value="hidden">Hidden</option>
                        <option value="public">Public</option>
                      </Input>
                      {formik.touched.visibility && formik.errors.visibility ? (
                        <FormFeedback type="invalid">
                          {formik.errors.visibility}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div class="card" style={{ border: "1px solid #e9ebec" }}>
                  <div class="card-header">
                    <h5 class="card-title">Product Brand</h5>
                  </div>
                  <div class="card-body">
                    <div class="mb-3">
                      <Label className="form-label">Select Brand</Label>
                      <Input
                        name="brandName"
                        type="select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.brandName}
                        invalid={
                          formik.touched.brandName && formik.errors.brandName
                            ? true
                            : false
                        }
                      >
                        <option value="" label="Select brand" />
                        {brandData.map((data) => (
                          <option key={data.id} value={data.id}>
                            {data.brandName}
                          </option>
                        ))}
                      </Input>
                      {formik.touched.brandName && formik.errors.brandName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.brandName}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div class="card" style={{ border: "1px solid #e9ebec" }}>
                  <div class="card-header">
                    <h5 class="card-title">Feature Image</h5>
                  </div>
                  <div class="card-body">
                    <div>
                      <Input
                        name="images"
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                        invalid={
                          formik.touched.images && formik.errors.images
                            ? true
                            : false
                        }
                      />
                      <div
                        className="custom-file-button"
                        onClick={() => toggleModal("feature")}
                      >
                        <i
                          class="bx bx-cloud-upload me-2"
                          style={{ fontSize: "25px" }}
                        ></i>
                        Choose File
                      </div>
                      {formik.touched.images && formik.errors.images ? (
                        <FormFeedback type="invalid" className="d-block">
                          {formik.errors.images}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div>
                      {uploadedImages.map((image, index) => (
                        <Card
                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          key={index + "-file"}
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto mb-2">
                                <img
                                  src={image}
                                  alt="image_"
                                  className="w-100"
                                />
                              </Col>
                              <Col>
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                >
                                  placeholder.png
                                </Link>
                                <p className="mb-0">
                                  <strong>87 KB</strong>
                                </p>
                              </Col>
                              <Col className="col-auto">
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() => {
                                    const newImages = uploadedImages.filter(
                                      (_, i) => i !== index
                                    );
                                    setUploadedImages(newImages);
                                  }}
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
                </div>

                <div class="card" style={{ border: "1px solid #e9ebec" }}>
                  <div class="card-header">
                    <h5 class="card-title">Other Images (Multiple)</h5>
                  </div>
                  <div class="card-body">
                    <div className="mb-3">
                      <Input
                        name="otherImages"
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleOtherImageChange}
                        style={{ display: "none" }}
                        invalid={
                          formik.touched.otherImages &&
                          formik.errors.otherImages
                            ? true
                            : false
                        }
                      />
                      <div
                        className="custom-file-button"
                        onClick={() => toggleModal("other")}
                      >
                        <i
                          class="bx bx-cloud-upload me-2"
                          style={{ fontSize: "25px" }}
                        ></i>
                        Choose File
                      </div>
                      {formik.touched.otherImages &&
                      formik.errors.otherImages ? (
                        <FormFeedback type="invalid" className="d-block">
                          {formik.errors.otherImages}
                        </FormFeedback>
                      ) : null}
                    </div>

                    {uploadedOtherImages?.length > 0 && (
                      <>
                        <div
                          style={{
                            height: "500px",
                            overflowY: "auto",
                            overflowX: "hidden",
                          }}
                        >
                          {uploadedOtherImages.map((image, index) => (
                            <Card
                              className="mt-1 mb-3 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={index + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto mb-2">
                                    <img
                                      src={image}
                                      alt="image_"
                                      style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                      }}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      placeholder.png
                                    </Link>
                                    <p className="mb-0">
                                      <strong>87 KB</strong>
                                    </p>
                                  </Col>
                                  <Col className="col-auto">
                                    <button
                                      type="button"
                                      className="btn btn-danger btn-sm"
                                      onClick={() => {
                                        const newImages =
                                          uploadedOtherImages.filter(
                                            (_, i) => i !== index
                                          );
                                        setUploadedOtherImages(newImages);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div class="card" style={{ border: "1px solid #e9ebec" }}>
                  <div class="card-header">
                    <h5 class="card-title">Upload Datasheet</h5>
                  </div>
                  <div class="card-body">
                    <div>
                      <Input
                        name="images"
                        type="file"
                        accept="application/pdf"
                        onChange={handleDataSheetChange}
                        innerRef={fileInputRef}
                        invalid={
                          formik.touched.technicalDataSheets &&
                          formik.errors.technicalDataSheets
                            ? true
                            : false
                        }
                      />
                      {formik.touched.technicalDataSheets &&
                      formik.errors.technicalDataSheets ? (
                        <FormFeedback type="invalid" className="d-block">
                          {formik.errors.technicalDataSheets}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div>
                      {pdfPreviewUrl && (
                        <Col className="col-12">
                          <Label className="form-label">
                            Uploaded Datasheet
                          </Label>
                          <div className="mb-3">
                            <Button
                              color="primary"
                              onClick={() =>
                                window.open(pdfPreviewUrl, "_blank")
                              }
                            >
                              View
                            </Button>
                            <Button
                              color="danger"
                              onClick={handleRemovePdf}
                              className="ms-3"
                            >
                              Delete
                            </Button>
                          </div>
                        </Col>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Row>
              <Col>
                <div className="text-end mb-3">
                  <Button type="submit" color="success">
                    Add product
                  </Button>
                </div>
              </Col>
            </Row>
          </form>

          {/* Model for upload image */}
          <MediaModel
            imageModel={imageModel}
            toggleModal={toggleModal}
            handleUploadImage={handleUploadImage}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            modalType={modalType}
          />
        </Container>
      </div>
    </>
  );
};

export default withRouter(AddProduct);
