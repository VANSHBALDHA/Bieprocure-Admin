import React, { useMemo, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  categoryData,
  combineSubCategorydData,
} from "../../../common/data/MyFackData";
import { subCategoryData } from "../../../common/data/MyFackData";
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

const SubCategories = () => {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentSubCategories, setCurrentSubCategories] = useState(null);

  const toggleModal = () => setModal(!modal);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (currentSubCategories && currentSubCategories.id) || "",
      subCategoryName:
        (currentSubCategories && currentSubCategories.subCategoryName) || "",
      categoryName:
        (currentSubCategories && currentSubCategories.categoryName) || "",
      status: (currentSubCategories && currentSubCategories.status) || "active",
    },
    validationSchema: Yup.object({
      subCategoryName: Yup.string().required(
        "Please enter the sub category name"
      ),
      categoryName: Yup.string().required("Please select the category"),
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
        Header: "Sub Category Name",
        accessor: "subCategoryName",
        filterable: true,
      },
      {
        Header: "Category Name",
        accessor: "categoryName",
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

  const handleEditClick = (subcategory) => {
    setCurrentSubCategories(subcategory);
    setIsEdit(true);
    toggleModal();
  };

  const handleAddSubCategory = () => {
    setCurrentSubCategories(null);
    setIsEdit(false);
    toggleModal();
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Sub Categories"
            breadcrumbItem="Manage Sub-Categories"
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={combineSubCategorydData}
                    isGlobalFilter={true}
                    customPageSize={10}
                    isAddSubCategory={true}
                    handleAddSubCategory={handleAddSubCategory}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Modal for Add/Edit Sub Categories */}
          <Modal
            isOpen={modal}
            toggle={toggleModal}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader toggle={toggleModal} tag="h4">
              {isEdit ? "Edit Sub Category" : "Add Sub Category"}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Sub Category Name</Label>
                      <Input
                        name="subCategoryName"
                        type="text"
                        placeholder="Insert Sub Categories Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.subCategoryName || ""}
                        invalid={
                          formik.touched.subCategoryName &&
                          formik.errors.subCategoryName
                            ? true
                            : false
                        }
                      />
                      {formik.touched.subCategoryName &&
                      formik.errors.subCategoryName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.subCategoryName}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Select Category</Label>
                      <Input
                        name="categoryName"
                        type="select"
                        className="form-select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.categoryName || "aaa"}
                      >
                        {/* <option value="">Select Category</option> */}
                        {categoryData?.map((data) => (
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

export default withRouter(SubCategories);
