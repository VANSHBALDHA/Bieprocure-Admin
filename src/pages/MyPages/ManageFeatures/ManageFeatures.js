import React, { useMemo, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { mobile_features } from "../../../common/data/MyFackData";
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
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const ManageFeatures = () => {
  const params = useParams();

  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [addFeatures, setAddFeatures] = useState(null);

  const toggleModal = () => setModal(!modal);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (addFeatures && addFeatures.id) || "",
      feature: (addFeatures && addFeatures.feature) || "",
      isEnable: (addFeatures && addFeatures.isEnable) || "No",
      status: (addFeatures && addFeatures.status) || "",
    },
    validationSchema: Yup.object({
      feature: Yup.string().required("Please enter the features name"),
      isEnable: Yup.string().required("Please select enable status"),
      status: Yup.string().required("Please select the status"),
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
        Header: "Feature Name",
        accessor: "feature",
        filterable: true,
      },

      {
        Header: "isEnable ?",
        accessor: "isEnable",
        filterable: true,
        Cell: ({ value }) => (
          <div>
            <Badge color={value === "active" ? "success" : "danger"}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Badge>
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

  const handleEditClick = (features) => {
    setAddFeatures(features);
    setIsEdit(true);
    toggleModal();
  };

  const handleAddFeatures = () => {
    setAddFeatures(null);
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
            breadcrumbItem={`Add Features - ${params?.id}`}
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={mobile_features}
                    isGlobalFilter={true}
                    customPageSize={10}
                    isAddFeatures={true}
                    handleAddFeatures={handleAddFeatures}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Modal for Add/Edit Sub Sub-Categories Features*/}
          <Modal
            isOpen={modal}
            toggle={toggleModal}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader toggle={toggleModal} tag="h4">
              {isEdit ? "Edit Features" : "Add Features"}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Features Name</Label>
                      <Input
                        name="feature"
                        type="text"
                        placeholder="Insert Features Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.feature || ""}
                        invalid={
                          formik.touched.feature && formik.errors.feature
                            ? true
                            : false
                        }
                      />
                      {formik.touched.feature && formik.errors.feature ? (
                        <FormFeedback type="invalid">
                          {formik.errors.feature}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">isEnable ?</Label>
                      <Input
                        name="isEnable"
                        type="select"
                        className="form-select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.isEnable || ""}
                        invalid={
                          formik.touched.isEnable && formik.errors.isEnable
                            ? true
                            : false
                        }
                      >
                        <option value="">Select Enable Status</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Input>
                      {formik.touched.isEnable && formik.errors.isEnable ? (
                        <FormFeedback type="invalid">
                          {formik.errors.isEnable}
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

export default withRouter(ManageFeatures);
