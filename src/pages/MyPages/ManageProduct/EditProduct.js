import React, { useEffect, useRef, useState } from "react";
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
  productsData,
} from "../../../common/data/MyFackData";
import Select from "react-select";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MediaModel from "../MediaUpload/MediaModel";

const EditProduct = () => {
  const { id } = useParams();
  document.title = `Edit product - ${id} | Bieprocure`;
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const [shortContent, setShortContent] = useState("");
  const [longContent, setLongContent] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageModel, setImageModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [uploadedDataSheet, setUploadedDataSheet] = useState([]);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [editData, setEditData] = useState(null);

  const viewData = productsData?.find((product) => product.productCode === id);

  useEffect(() => {
    if (viewData) {
      setEditData(viewData);
      setShortContent(viewData?.shortDescription);
      setLongContent(viewData?.longDescription);
    }
  }, [viewData]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productCode: id,
      productName: editData?.productName,
      displayName: editData?.productName,
      categoryName: editData?.productName,
      subCategoryName: editData?.productName,
      subSubCategoryName: editData?.subSubCategoryName,
      brandName: editData?.productName,
      manufacturePartNumber: editData?.manufacturePartNumber,
      minimumPurchasedQuantity: editData?.minimumPurchasedQuantity,
      minimumStockQuantityWarning: editData?.minimumStockQuantityWarning,
      sellingPrice: editData?.sellingPrice,
      mrp: editData?.sellingPrice,
      displayQuantity: editData?.displayQuantity,
      CGST: editData?.CGST,
      SGST: editData?.SGST,
      IGST: editData?.IGST,
      status: editData?.status,
      visibility: editData?.status,
      technicalDataSheets: uploadedDataSheet,
      images: uploadedImages,
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
      minimumPurchasedQuantity: Yup.number()
        .required("Please enter the minimum purchase quantity")
        .positive("Must be a positive number"),
      minimumStockQuantityWarning: Yup.number()
        .required("Please enter the minimum stock quantity warning")
        .positive("Must be a positive number"),
      sellingPrice: Yup.number()
        .required("Please enter the selling price")
        .positive("Must be a positive number"),
      mrp: Yup.number()
        .required("Please enter the MRP")
        .positive("Must be a positive number"),
      displayQuantity: Yup.number()
        .required("Please enter the display quantity")
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
      visibility: Yup.string().required("Please select the visibility"),
      status: Yup.string().required("Please select the status"),
      images: Yup.array()
        .min(1, "Please upload at least one image")
        .max(3, "You can only upload a maximum of 3 images"),
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

  const handleSubSubCategoryChange = (event) => {
    const selectedId = event.target.value;
    formik.setFieldValue("subSubCategoryName", selectedId);
    setSelectedFeatures(categoryData[selectedId] || []);
  };

  const handleShortContentChange = (newContent) => {
    setShortContent(newContent);
    // console.log("setShortContent", newContent);
  };

  const handleLongContentChange = (newContent) => {
    setLongContent(newContent);
    // console.log("setLongContent", newContent);
  };

  const options = certificateData?.map((data) => ({
    value: data?.certificateName,
    label: data?.certificateName,
  }));

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (uploadedImages?.length < 3) {
        const newImage = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setUploadedImages([...uploadedImages, newImage]);
      } else {
        alert("You can only upload a maximum of 3 images.");
      }
    }
  };

  const toggleModal = () => {
    setImageModel(!imageModel);
    setSelectedImage([]);
  };

  const handleUploadImage = (image) => {
    setUploadedImages([...uploadedImages, image?.image]);
    toggleModal();
    setSelectedImage([]);
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
          <Breadcrumbs
            title="Product"
            breadcrumbItem={`Edit product - ${id}`}
          />
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
                      {selectedFeatures?.features && (
                        <>
                          <div className="mt-1">
                            <h5>Feature List</h5>
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>Feature Name</th>
                                  <th>Add specification about the product</th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedFeatures?.features?.map(
                                  (feature, index) => (
                                    <tr key={index}>
                                      <td>{feature?.name}</td>
                                      <td>
                                        <Input
                                          type="text"
                                          value={feature?.value}
                                        ></Input>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
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
                          Minimum Purchase Quantity
                        </Label>
                        <Input
                          name="minimumPurchasedQuantity"
                          type="number"
                          placeholder="Insert Purchase Quantity"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.minimumPurchasedQuantity}
                          invalid={
                            formik.touched.minimumPurchasedQuantity &&
                            formik.errors.minimumPurchasedQuantity
                              ? true
                              : false
                          }
                        />
                        {formik.touched.minimumPurchasedQuantity &&
                        formik.errors.minimumPurchasedQuantity ? (
                          <FormFeedback type="invalid">
                            {formik.errors.minimumPurchasedQuantity}
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
                        <Label className="form-label">
                          Selling Price (Per Item)
                        </Label>
                        <Input
                          name="sellingPrice"
                          type="number"
                          placeholder="Insert Selling Price"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.sellingPrice}
                          invalid={
                            formik.touched.sellingPrice &&
                            formik.errors.sellingPrice
                              ? true
                              : false
                          }
                        />
                        {formik.touched.sellingPrice &&
                        formik.errors.sellingPrice ? (
                          <FormFeedback type="invalid">
                            {formik.errors.sellingPrice}
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
                        <Label className="form-label">Display Quantity</Label>
                        <Input
                          name="displayQuantity"
                          type="number"
                          placeholder="Insert Display Quantity"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.displayQuantity}
                          invalid={
                            formik.touched.displayQuantity &&
                            formik.errors.displayQuantity
                              ? true
                              : false
                          }
                        />
                        {formik.touched.displayQuantity &&
                        formik.errors.displayQuantity ? (
                          <FormFeedback type="invalid">
                            {formik.errors.displayQuantity}
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
                    </div>
                  </div>
                </div>

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
                        innerRef={imageInputRef}
                        style={{ display: "none" }}
                        invalid={
                          formik.touched.images && formik.errors.images
                            ? true
                            : false
                        }
                      />
                      <div className="custom-file-button" onClick={toggleModal}>
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
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt="img"
                                  src={image}
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
                    Update
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
          />
        </Container>
      </div>
    </>
  );
};

export default withRouter(EditProduct);
