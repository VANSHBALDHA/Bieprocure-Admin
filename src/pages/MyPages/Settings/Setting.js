import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import withRouter from "../../../components/Common/withRouter";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  FormFeedback,
  Label,
  Input,
} from "reactstrap";
import MediaModel from "../MediaUpload/MediaModel";

const Setting = () => {
  const imageInputRef = useRef(null);
  const [uploadedImages, setUploadedImages] = useState(null);
  const [imageModel, setImageModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      logo: "",
      address: "",
      email: "",
      customerCareNumber: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      totalProducts: "",
      newProducts: "",
      individualDuration: "",
      corporateDuration: "",
    },
    validationSchema: Yup.object({
      logo: Yup.mixed().test(
        "fileSelected",
        "Please select an image",
        () => uploadedImages && uploadedImages.length > 0
      ),
      address: Yup.string().required("Address is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      customerCareNumber: Yup.string()
        .matches(/^\d{10}$/, "Must be a valid 10-digit number")
        .required("Customer Care Number is required"),
      facebook: Yup.string().url("Invalid URL"),
      twitter: Yup.string().url("Invalid URL"),
      linkedin: Yup.string().url("Invalid URL"),
      youtube: Yup.string().url("Invalid URL"),
      instagram: Yup.string().url("Invalid URL"),
      totalProducts: Yup.number()
        .positive("Must be a positive number")
        .required("Required"),
      newProducts: Yup.number()
        .min(0, "Cannot be negative")
        .required("Required"),
      individualDuration: Yup.number()
        .positive("Must be a positive number")
        .required("Required"),
      corporateDuration: Yup.number()
        .positive("Must be a positive number")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Form Data:", values);
      alert("Settings Updated Successfully!");
    },
  });

  const toggleImageModal = () => {
    setImageModel(!imageModel);
    setSelectedImage([]);
  };

  const handleUploadImage = (image) => {
    if (image) setUploadedImages([image?.image]);
    toggleImageModal();
    setSelectedImage(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file)
      setUploadedImages([{ ...file, preview: URL.createObjectURL(file) }]);
  };

  document.title = "Admin settings | Bieprocure";

  const renderSocialMediaLinks = () =>
    ["facebook", "twitter", "linkedin", "youtube", "instagram"].map((field) => (
      <div className="mb-3" key={field}>
        <Label className="text-capitalize">{field}</Label>
        <Input
          type="text"
          name={field}
          placeholder={`Enter ${field} link`}
          {...formik.getFieldProps(field)}
          invalid={formik.touched[field] && formik.errors[field]}
        />
        {formik.touched[field] && formik.errors[field] && (
          <FormFeedback>{formik.errors[field]}</FormFeedback>
        )}
      </div>
    ));

  const renderNumberUpdates = () => (
    <>
      {["totalProducts", "newProducts"].map((field) => (
        <div className="mb-3" key={field}>
          <Label>
            {field === "totalProducts"
              ? "Total Number of Products"
              : "New Added Products"}
          </Label>
          <Input
            type="number"
            name={field}
            placeholder={`Enter ${field}`}
            {...formik.getFieldProps(field)}
            invalid={formik.touched[field] && formik.errors[field]}
          />
          {formik.touched[field] && formik.errors[field] && (
            <FormFeedback>{formik.errors[field]}</FormFeedback>
          )}
        </div>
      ))}
    </>
  );

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col className="mx-auto">
            <Card>
              <CardBody>
                <h4 className="mb-4">Admin Settings</h4>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <Label className="form-label">
                      Logo Upload (Only via Media Gallery)
                    </Label>
                    <Input
                      name="logo"
                      type="file"
                      accept="image/jpeg, image/png"
                      onChange={handleImageChange}
                      innerRef={imageInputRef}
                      style={{ display: "none" }}
                      invalid={formik.touched.logo && formik.errors.logo}
                    />
                    <div
                      className="custom-file-button"
                      onClick={toggleImageModal}
                    >
                      <i
                        className="bx bx-cloud-upload me-2"
                        style={{ fontSize: "25px" }}
                      ></i>
                      Choose File
                    </div>
                    {formik.errors.logo && formik.touched.logo && (
                      <FormFeedback type="invalid" className="d-block">
                        {formik.errors.logo}
                      </FormFeedback>
                    )}
                    {uploadedImages && (
                      <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                        <div className="p-2">
                          <Row className="d-flex justify-content-between align-items-center">
                            <Col className="col-auto">
                              <img
                                height="100"
                                width="100"
                                className="avatar-md rounded bg-light"
                                alt="uploaded"
                                src={
                                  uploadedImages[0]?.preview ||
                                  uploadedImages[0]
                                }
                              />
                            </Col>
                            <Col className="col-auto">
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => setUploadedImages(null)}
                              >
                                Delete
                              </button>
                            </Col>
                          </Row>
                        </div>
                      </Card>
                    )}
                  </div>

                  <div className="mb-3">
                    <Label>Address Line</Label>
                    <Input
                      type="text"
                      name="address"
                      placeholder="Enter Address"
                      {...formik.getFieldProps("address")}
                      invalid={formik.touched.address && formik.errors.address}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <FormFeedback>{formik.errors.address}</FormFeedback>
                    )}
                  </div>

                  <div className="mb-3">
                    <Label>Email ID</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      {...formik.getFieldProps("email")}
                      invalid={formik.touched.email && formik.errors.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <FormFeedback>{formik.errors.email}</FormFeedback>
                    )}
                  </div>

                  <div className="mb-3">
                    <Label>Customer Care Number</Label>
                    <Input
                      type="text"
                      name="customerCareNumber"
                      placeholder="Enter 10-digit number"
                      {...formik.getFieldProps("customerCareNumber")}
                      invalid={
                        formik.touched.customerCareNumber &&
                        formik.errors.customerCareNumber
                      }
                    />
                    {formik.touched.customerCareNumber &&
                      formik.errors.customerCareNumber && (
                        <FormFeedback>
                          {formik.errors.customerCareNumber}
                        </FormFeedback>
                      )}
                  </div>

                  <h5 className="mt-4">Social Media Links</h5>
                  {renderSocialMediaLinks()}

                  <h5 className="mt-4">Login Activation Duration</h5>

                  <div className="mb-3">
                    <Label>For Individual Customer (in Months)</Label>
                    <Input
                      type="number"
                      name="individualDuration"
                      placeholder="Enter duration in months"
                      {...formik.getFieldProps("individualDuration")}
                      invalid={
                        formik.touched.individualDuration &&
                        formik.errors.individualDuration
                      }
                    />
                    {formik.touched.individualDuration &&
                      formik.errors.individualDuration && (
                        <FormFeedback>
                          {formik.errors.individualDuration}
                        </FormFeedback>
                      )}
                  </div>

                  <div className="mb-3">
                    <Label>For Corporate Customer (in Months)</Label>
                    <Input
                      type="number"
                      name="corporateDuration"
                      placeholder="Enter duration in months"
                      {...formik.getFieldProps("corporateDuration")}
                      invalid={
                        formik.touched.corporateDuration &&
                        formik.errors.corporateDuration
                      }
                    />
                    {formik.touched.corporateDuration &&
                      formik.errors.corporateDuration && (
                        <FormFeedback>
                          {formik.errors.corporateDuration}
                        </FormFeedback>
                      )}
                  </div>

                  <h5 className="mt-4">Number Updates</h5>
                  {renderNumberUpdates()}

                  <div className="text-center">
                    <Button type="submit" color="success">
                      Save Settings
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>

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

export default withRouter(Setting);
