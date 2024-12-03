import React, { useMemo, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { brandData } from "../../../common/data/MyFackData";
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

const Brand = () => {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const toggleModal = () => setModal(!modal);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (currentBrand && currentBrand.id) || "",
      brandName: (currentBrand && currentBrand.brandName) || "",
      brandFullName: (currentBrand && currentBrand.brandFullName) || "",
      status: (currentBrand && currentBrand.status) || "active",
      brandLogo: (currentBrand && currentBrand.brandLogo) || "",
    },
    validationSchema: Yup.object({
      brandName: Yup.string().required("Please enter the brand short name"),
      brandFullName: Yup.string().required("Please enter the brand full name"),
      status: Yup.string().required("Please select the status"),
      brandLogo: Yup.string().when("id", {
        is: "",
        then: Yup.string().required("Please provide the image URL"),
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        formik.setFieldValue("brandLogo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Brand Short Name",
        accessor: "brandName",
        filterable: true,
      },
      {
        Header: "Brand Full Name",
        accessor: "brandFullName",
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
        Header: "Brand Logo",
        accessor: "brandLogo",
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

  const handleEditClick = (brand) => {
    console.log("brand", brand);
    setCurrentBrand(brand);
    setIsEdit(true);
    setImagePreview(brand.brandLogo || "");
    toggleModal();
  };

  const handleAddBrand = () => {
    setCurrentBrand(null);
    setIsEdit(false);
    toggleModal();
    setImagePreview("");
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Brand" breadcrumbItem="Manage Brand" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={brandData}
                    isGlobalFilter={true}
                    customPageSize={10}
                    isAddBrand={true}
                    handleAddBrand={handleAddBrand}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Modal for Add/Edit Brand */}
          <Modal
            isOpen={modal}
            toggle={toggleModal}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader toggle={toggleModal} tag="h4">
              {isEdit ? "Edit Brand" : "Add Brand"}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Brand Short Name</Label>
                      <Input
                        name="brandName"
                        type="text"
                        placeholder="Insert Brand Short Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.brandName || ""}
                        invalid={
                          formik.touched.brandName && formik.errors.brandName
                            ? true
                            : false
                        }
                      />
                      {formik.touched.brandName && formik.errors.brandName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.brandName}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Brand Full Name</Label>
                      <Input
                        name="brandFullName"
                        type="text"
                        placeholder="Insert Brand Full Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.brandFullName || ""}
                        invalid={
                          formik.touched.brandFullName &&
                          formik.errors.brandFullName
                            ? true
                            : false
                        }
                      />
                      {formik.touched.brandFullName &&
                      formik.errors.brandFullName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.brandFullName}
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
                      <Label className="form-label">Brand Image</Label>
                      <Input
                        name="brandLogo"
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleFileChange}
                        invalid={
                          formik.touched.brandLogo && formik.errors.brandLogo
                            ? true
                            : false
                        }
                      />
                      {imagePreview && (
                        <div className="mt-3">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="img-fluid rounded"
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                          />
                        </div>
                      )}
                      {formik.touched.brandLogo && formik.errors.brandLogo ? (
                        <FormFeedback type="invalid">
                          {formik.errors.brandLogo}
                        </FormFeedback>
                      ) : null}
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
        </Container>
      </div>
    </>
  );
};

export default withRouter(Brand);
