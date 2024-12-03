import React, { useMemo, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { combinedData } from "../../../common/data/MyFackData";
import { displayData } from "../../../common/data/MyFackData";
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

const Categories = () => {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCategories, setCurrentCategories] = useState(null);

  const toggleModal = () => setModal(!modal);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (currentCategories && currentCategories.id) || "",
      categoryName: (currentCategories && currentCategories.categoryName) || "",
      name: (currentCategories && currentCategories.name) || "",
      status: (currentCategories && currentCategories.status) || "active",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Please enter the category name"),
      name: Yup.string().required("Please select the display name"),
      status: Yup.string().required("Please select the status"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        console.log("Updating categories:", values);
      } else {
        console.log("Adding new categories:", values);
      }
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
        Header: "Category Name",
        accessor: "categoryName",
        filterable: true,
      },
      {
        Header: "Display Name",
        accessor: "name",
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

  const handleEditClick = (category) => {
    setCurrentCategories(category);
    setIsEdit(true);
    toggleModal();
  };

  const handleAddCategory = () => {
    setCurrentCategories(null);
    setIsEdit(false);
    toggleModal();
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Categories" breadcrumbItem="Manage Categories" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={combinedData}
                    isGlobalFilter={true}
                    customPageSize={10}
                    isAddCategory={true}
                    handleAddCategory={handleAddCategory}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Modal for Add/Edit Categories */}
          <Modal
            isOpen={modal}
            toggle={toggleModal}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader toggle={toggleModal} tag="h4">
              {isEdit ? "Edit Category" : "Add Category"}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Category Name</Label>
                      <Input
                        name="categoryName"
                        type="text"
                        placeholder="Insert Categories Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.categoryName || ""}
                        invalid={
                          formik.touched.categoryName &&
                          formik.errors.categoryName
                            ? true
                            : false
                        }
                      />
                      {formik.touched.categoryName &&
                      formik.errors.categoryName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.categoryName}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Select Display Name</Label>
                      <Input
                        name="name"
                        type="select"
                        className="form-select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name || "aaa"}
                      >
                        {/* <option value="">Select Display Name</option> */}
                        {displayData?.map((data) => (
                          <option key={data.id} value={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </Input>
                      {formik.touched.name && formik.errors.name ? (
                        <FormFeedback type="invalid">
                          {formik.errors.name}
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

export default withRouter(Categories);
