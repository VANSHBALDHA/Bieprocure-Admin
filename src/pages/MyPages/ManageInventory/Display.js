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
} from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";
import { inventoryItems } from "../../../common/data/MyFackData";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Display = () => {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const toggleModal = () => setModal(!modal);

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setIsEdit(true);
    toggleModal();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (currentProduct && currentProduct.id) || "",
      productName: (currentProduct && currentProduct.productName) || "",
      quantity: (currentProduct && currentProduct.quantity) || "",
      price: (currentProduct && currentProduct.price) || "",
      status: (currentProduct && currentProduct.status) || "active",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Please enter the Product name"),
      quantity: Yup.string().required("Please add quantity"),
      price: Yup.string().required("Please add price"),
      status: Yup.string().required("Please select the status"),
    }),
    onSubmit: (values) => {
      console.log("Updating product:", values);
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
        Header: "Product Name",
        accessor: "productName",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        filterable: true,
        Cell: ({ value }) => {
          if (value === 0) {
            return <div className="text-danger fw-bold">Out of Stock</div>;
          } else if (value < 10) {
            return <div className="text-danger fw-bold">{value}</div>;
          } else {
            return <div>{value}</div>;
          }
        },
      },
      {
        Header: "Purchase Price (Per item)",
        accessor: "price",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">₹ {value}</div>,
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
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Manage Inventory" breadcrumbItem="Display" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={inventoryItems}
                    isGlobalFilter={true}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Modal for Edit Display Products */}
          <Modal
            isOpen={modal}
            toggle={toggleModal}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader toggle={toggleModal} tag="h4">
              Edit Product
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Product Name</Label>
                      <Input
                        name="productName"
                        type="text"
                        placeholder="Insert Product Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.productName || ""}
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
                    <div className="mb-3">
                      <Label className="form-label">Product Quantity</Label>
                      <Input
                        name="quantity"
                        type="number"
                        placeholder="Insert Product Quantity"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.quantity || ""}
                        invalid={
                          formik.touched.quantity && formik.errors.quantity
                            ? true
                            : false
                        }
                      />
                      {formik.touched.quantity && formik.errors.quantity ? (
                        <FormFeedback type="invalid">
                          {formik.errors.quantity}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Product Price</Label>
                      <Input
                        name="price"
                        type="number"
                        placeholder="Insert Product Price"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price || ""}
                        invalid={
                          formik.touched.price && formik.errors.price
                            ? true
                            : false
                        }
                      />
                      {formik.touched.price && formik.errors.price ? (
                        <FormFeedback type="invalid">
                          {formik.errors.price}
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

export default withRouter(Display);
