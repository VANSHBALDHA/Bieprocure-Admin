import React, { useRef, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
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
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import {
  mainBannerData,
  detailPageBannerData,
} from "../../../common/data/MyFackData";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Banner = () => {
  const fileInputRef = useRef(null);
  const [isEditMain, setEditMain] = useState(false);
  const [heroBannerData, setHeroBannerData] = useState(null);

  const [isEditSide, setEditSide] = useState(false);

  const [mainImage, setMainImage] = useState([]);

  const handleEditClick = (banner) => {
    setHeroBannerData(banner);
    setEditMain(true);
  };

  const handleMainClick = (banner) => {
    setHeroBannerData(banner);
    setEditSide(true);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (heroBannerData && heroBannerData.mainBannerid) || "",
      mainBannerLink: (heroBannerData && heroBannerData.mainBannerLink) || "",
      image: mainImage,
      status: (heroBannerData && heroBannerData.status) || "active",
    },
    validationSchema: Yup.object({
      mainBannerLink: Yup.string().required("Please enter the link"),
      image: Yup.array().min(1, "Please upload at least one image"),
      status: Yup.string().required("Please select the status"),
    }),
    onSubmit: (values) => {
      console.log("Updated Banner", values);
      setEditMain(false);
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImage = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setMainImage([newImage]);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = mainImage.filter((_, i) => i !== index);
    setMainImage(newImages);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  document.title = "Banner Section | Bieprocure";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Banner" breadcrumbItem="Banner Section" />

          {/* Hero Main Full Banner */}
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-3">Main Banner</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Banner Image</th>
                          <th>Banner Link</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mainBannerData?.map((data, index) => (
                          <tr key={index}>
                            <th scope="row">{data?.mainBannerid}</th>
                            <td>
                              <img
                                className="rounded"
                                alt="150x150"
                                width="150"
                                src={data?.mainBannerimage}
                                data-holder-rendered="true"
                              />
                            </td>
                            <td className="text-primary">
                              {data?.mainBannerLink}
                            </td>
                            <td>{data?.status}</td>
                            <td>
                              <div className="d-flex gap-3">
                                <Link
                                  to="#"
                                  className="text-success"
                                  onClick={() => handleEditClick(data)}
                                >
                                  <i
                                    className="mdi mdi-pencil font-size-18"
                                    id="edittooltip"
                                  />
                                  <UncontrolledTooltip
                                    placement="top"
                                    target="edittooltip"
                                  >
                                    Edit
                                  </UncontrolledTooltip>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Side Hero Mini Banner */}
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-3">
                    Main Side Mini Banner
                  </CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Banner Image</th>
                          <th>Banner Link</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mainBannerData?.map((data, index) => (
                          <tr className="index">
                            <th scope="row">{data?.mainBannerid}</th>
                            <td>
                              <img
                                className="rounded"
                                alt="150x150"
                                width="150"
                                src={data?.mainBannerimage}
                                data-holder-rendered="true"
                              />
                            </td>
                            <td className="text-primary">
                              {data?.mainBannerLink}
                            </td>
                            <td>{data?.status}</td>
                            <td>
                              <div className="d-flex gap-3">
                                <Link
                                  to="#"
                                  className="text-success"
                                  onClick={() => handleMainClick(data)}
                                >
                                  <i
                                    className="mdi mdi-pencil font-size-18"
                                    id="edittooltip"
                                  />
                                  <UncontrolledTooltip
                                    placement="top"
                                    target="edittooltip"
                                  >
                                    Edit
                                  </UncontrolledTooltip>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Detail Page Banner */}
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-3">
                    Product Detail Page Banner
                  </CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Banner Image</th>
                          <th>Banner Link</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailPageBannerData?.map((data, index) => (
                          <tr className="index">
                            <th scope="row">{data?.id}</th>
                            <td>
                              <img
                                className="rounded"
                                alt="150x150"
                                width="150"
                                src={data?.image}
                                data-holder-rendered="true"
                              />
                            </td>
                            <td className="text-primary">{data?.Link}</td>
                            <td>{data?.status}</td>
                            <td>
                              <div className="d-flex gap-3">
                                <Link
                                  to="#"
                                  className="text-success"
                                  onClick={() => handleEditClick(data)}
                                >
                                  <i
                                    className="mdi mdi-pencil font-size-18"
                                    id="edittooltip"
                                  />
                                  <UncontrolledTooltip
                                    placement="top"
                                    target="edittooltip"
                                  >
                                    Edit
                                  </UncontrolledTooltip>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Modal for Edit Main Banner*/}
          <Modal
            isOpen={isEditMain}
            toggle={handleEditClick}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader toggle={() => setEditMain(false)} tag="h4">
              Edit Main Banner
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Banner Link</Label>
                      <Input
                        name="mainBannerLink"
                        type="text"
                        placeholder="Insert Banner Link"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mainBannerLink || ""}
                        invalid={
                          formik.touched.mainBannerLink &&
                          formik.errors.mainBannerLink
                            ? true
                            : false
                        }
                      />
                      {formik.touched.mainBannerLink &&
                      formik.errors.mainBannerLink ? (
                        <FormFeedback type="invalid">
                          {formik.errors.mainBannerLink}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Banner Image</Label>
                      <Input
                        name="image"
                        type="file"
                        onChange={handleImageChange}
                        innerRef={fileInputRef}
                        invalid={
                          formik.touched.image && formik.errors.image
                            ? true
                            : false
                        }
                      />
                      {formik.touched.image && formik.errors.image ? (
                        <FormFeedback type="invalid">
                          {formik.errors.image}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  {mainImage?.length > 0 && (
                    <Col className="col-12">
                      <div className="mb-3">
                        <Label className="form-label">Uploaded Images</Label>
                        <div className="image-preview-container">
                          {mainImage.map((image, index) => (
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
                  <Col className="col-12">
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
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button type="submit" color="success">
                        Update
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
            </ModalBody>
          </Modal>

          {/* Modal for Edit Main Side Banner*/}
          <Modal
            isOpen={isEditSide}
            toggle={handleMainClick}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader toggle={() => setEditSide(false)} tag="h4">
              Edit Main Side Mini Banner
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Banner Link</Label>
                      <Input
                        name="mainBannerLink"
                        type="text"
                        placeholder="Insert Banner Link"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mainBannerLink || ""}
                        invalid={
                          formik.touched.mainBannerLink &&
                          formik.errors.mainBannerLink
                            ? true
                            : false
                        }
                      />
                      {formik.touched.mainBannerLink &&
                      formik.errors.mainBannerLink ? (
                        <FormFeedback type="invalid">
                          {formik.errors.mainBannerLink}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Banner Image</Label>
                      <Input
                        name="image"
                        type="file"
                        onChange={handleImageChange}
                        innerRef={fileInputRef}
                        invalid={
                          formik.touched.image && formik.errors.image
                            ? true
                            : false
                        }
                      />
                      {formik.touched.image && formik.errors.image ? (
                        <FormFeedback type="invalid">
                          {formik.errors.image}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  {mainImage?.length > 0 && (
                    <Col className="col-12">
                      <div className="mb-3">
                        <Label className="form-label">Uploaded Images</Label>
                        <div className="image-preview-container">
                          {mainImage.map((image, index) => (
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
                  <Col className="col-12">
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
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button type="submit" color="success">
                        Update
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default withRouter(Banner);
