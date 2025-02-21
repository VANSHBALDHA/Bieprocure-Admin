import React, { useMemo, useState } from "react";
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
import { displayData } from "../../../common/data/MyFackData";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const DisplayName = () => {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    icon: "",
    status: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const toggleModal = () => setModal(!modal);

  const handleEditClick = (rowData) => {
    setEditData(rowData);
    setIsEdit(true);
    toggleModal();
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: editData.name || "",
      icon: editData?.icon || "",
      status: editData.status || "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter a display name"),
      icon: Yup.mixed().required("Please select an icon"),
      status: Yup.string().required("Please select a status"),
      metaTitle: Yup.string().required("Meta title is required"),
      metaDescription: Yup.string()
        .required("Meta description is required")
        .max(180, "Meta description cannot exceed 180 characters"),
      metaKeywords: Yup.string().required("Meta keywords are required"),
    }),
    onSubmit: (values) => {
      const updatedData = displayData.map((item) =>
        item.id === editData.id ? { ...item, ...values } : item
      );

      console.log("Updated Data:", updatedData);
      toggleModal();
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
        Header: "Name",
        accessor: "name",
        filterable: true,
      },
      {
        Header: "Icon",
        accessor: "icon",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => (
          <img className="rounded-circle avatar-xs" src={value} alt="" />
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: ({ value }) => {
          return (
            <Badge color={value === "active" ? "success" : "danger"}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Badge>
          );
        },
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: ({ row }) => {
          return (
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
          );
        },
      },
    ],
    []
  );

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          title="Display Name"
          breadcrumbItem="Manage Display Name"
        />

        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <TableContainer
                  columns={columns}
                  data={displayData}
                  isGlobalFilter={true}
                  customPageSize={10}
                  className="custom-header-css"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Modal for Edit Display Name */}
        <Modal
          isOpen={modal}
          toggle={toggleModal}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <ModalHeader toggle={toggleModal} tag="h4">
            Edit
          </ModalHeader>
          <ModalBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <Row>
                <Col className="col-4">
                  <div className="mb-3">
                    <Label className="form-label">Display Name</Label>
                    <Input
                      name="name"
                      type="text"
                      placeholder="Enter Display Name"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.name || ""}
                      invalid={
                        validation.touched.name && validation.errors.name
                          ? true
                          : false
                      }
                    />
                    {validation.touched.name && validation.errors.name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-4">
                  <div className="mb-3">
                    <Label className="form-label">Select Icon</Label>
                    <Input
                      name="icon"
                      type="select"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.icon || ""}
                      invalid={
                        validation.touched.icon && validation.errors.icon
                          ? true
                          : false
                      }
                    >
                      <option value="">Select Icon</option>
                      <option value=""></option>
                    </Input>
                    {validation.touched.icon && validation.errors.icon ? (
                      <FormFeedback type="invalid">
                        {validation.errors.icon}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-4">
                  <div className="mb-3">
                    <Label className="form-label">Status</Label>
                    <Input
                      name="status"
                      type="select"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.status || ""}
                      invalid={
                        validation.touched.status && validation.errors.status
                          ? true
                          : false
                      }
                    >
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Input>
                    {validation.touched.status && validation.errors.status ? (
                      <FormFeedback type="invalid">
                        {validation.errors.status}
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
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.metaTitle || ""}
                      invalid={
                        validation.touched.metaTitle &&
                        validation.errors.metaTitle
                          ? true
                          : false
                      }
                    />
                    {validation.touched.metaTitle &&
                    validation.errors.metaTitle ? (
                      <FormFeedback type="invalid">
                        {validation.errors.metaTitle}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">Meta Keywords</Label>
                    <Input
                      name="metaKeywords"
                      type="text"
                      placeholder="Meta Keywords"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.metaKeywords || ""}
                      invalid={
                        validation.touched.metaKeywords &&
                        validation.errors.metaKeywords
                          ? true
                          : false
                      }
                    />
                    {validation.touched.metaKeywords &&
                    validation.errors.metaKeywords ? (
                      <FormFeedback type="invalid">
                        {validation.errors.metaKeywords}
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
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.metaDescription}
                  />
                  <div className="small text-muted">
                    {validation.values.metaDescription.length}/180 characters
                  </div>
                  {validation.touched.metaDescription &&
                  validation.errors.metaDescription ? (
                    <div className="text-danger">
                      {validation.errors.metaDescription}
                    </div>
                  ) : null}
                </Col>
              </Row>

              <div className="text-end">
                <Button type="submit" color="success">
                  Save
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Container>
    </div>
  );
};

export default withRouter(DisplayName);
