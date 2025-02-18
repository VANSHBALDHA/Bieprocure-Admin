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

const Reserved = () => {
  const [modal, setModal] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [add, setAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentQun, setCurrentQun] = useState(null);
  const [currentStock, setCurrentStock] = useState(null);

  const toggleModal = () => setModal(!modal);
  const toggleTransferModal = () => setTransfer(!transfer);
  const toggleAddModal = () => setAdd(!add);

  // For edit reserved product model
  const handleEditClick = (product) => {
    setCurrentProduct(product);
    toggleModal();
  };

  // For transfer reserved quantity model
  const handleTransferClick = (product) => {
    setCurrentProduct(product);
    toggleTransferModal();
    setCurrentQun(null);
  };

  // For add stock reserved quantity model
  const handleAddClick = (product) => {
    console.log("product", product);
    setCurrentStock(product);
    toggleAddModal();
  };

  // For add new reserved product model
  const handleAddReservedProduct = () => {
    setCurrentProduct(null);
    setIsEdit(false);
    toggleModal();
  };

  // For add/edit reserved product model validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (currentProduct && currentProduct.id) || "",
      productName: (currentProduct && currentProduct.productName) || "",
      quantity: (currentProduct && currentProduct.quantity) || "",
      price: (currentProduct && currentProduct.price) || "",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Please enter the Product name"),
      quantity: Yup.string().required("Please add quantity"),
      price: Yup.string().required("Please add price"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        console.log("Updating Reserved Product:", values);
      } else {
        console.log("Adding new Reserved Product:", values);
      }
      toggleModal();
    },
  });

  const transferValidationSchema = Yup.object({
    currentQun: Yup.number()
      .required("Please enter a transfer quantity")
      .min(1, "Quantity must be at least 1")
      .max(
        currentProduct?.quantity || 0,
        "Cannot transfer more than available quantity"
      ),
  });

  // For transfer reserved product model validation
  const transferFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (currentProduct && currentProduct.id) || "",
      currentQun: (currentQun && currentQun) || "",
    },
    validationSchema: transferValidationSchema,
    onSubmit: (values) => {
      console.log("Updating Reserved Product:", values);
      toggleTransferModal();
    },
  });

  // For add stock product model validation
  const stockFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (currentStock && currentStock.id) || "",
      productName: (currentStock && currentStock.productName) || "",
      quantity: (currentStock && currentStock.quantity) || "",
      addQuantity: "",
      purchasePrice: "",
      selectedDate: "",
    },
    validationSchema: Yup.object({
      addQuantity: Yup.number()
        .required("Please enter a quantity")
        .min(1, "Quantity must be at least 1")
        .max(100, "Quantity cannot exceed 100"),
      purchasePrice: Yup.number()
        .required("Please enter a purchase price")
        .min(0.01, "Price must be at least 0.01"),
      selectedDate: Yup.date().required("Please select a date").nullable(),
    }),
    onSubmit: (values) => {
      console.log("Updating New Stock", values);
      toggleAddModal();
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
        Header: "Transfer to display",
        Cell: ({ row }) => {
          return (
            <Button
              type="button"
              color="success"
              className="btn-rounded mb-2 me-2"
              style={{ width: "200px" }}
              onClick={() => handleTransferClick(row.original)}
            >
              <i class="bx bx-transfer me-1"></i>
              Transfer Quantity
            </Button>
          );
        },
      },
      {
        Header: "Add Stock",
        Cell: ({ row }) => {
          return (
            <Button
              type="button"
              color="success"
              className="btn-rounded mb-2 me-2"
              style={{ width: "150px" }}
              onClick={() => handleAddClick(row.original)}
            >
              <i className="mdi mdi-plus me-1" />
              Add Stock
            </Button>
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
          <Breadcrumbs title="Manage Inventory" breadcrumbItem="Reserved" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={inventoryItems}
                    isGlobalFilter={true}
                    customPageSize={10}
                    isAddReservedProduct={true}
                    handleAddReservedProduct={handleAddReservedProduct}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Modal for Add/Edit Reserved Products */}
          <Modal
            isOpen={modal}
            toggle={toggleModal}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader toggle={toggleModal} tag="h4">
              {isEdit ? "Edit Product" : "Add Product"}
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

          {/* Modal for Transfer Reserved Products */}
          <Modal
            isOpen={transfer}
            toggle={toggleTransferModal}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader toggle={toggleTransferModal} tag="h4">
              Transfer Quantity
            </ModalHeader>
            <ModalBody>
              <form onSubmit={transferFormik.handleSubmit}>
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Display Quantity</Label>
                      <Input type="text" value="5" disabled />
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Available Quantity</Label>
                      <Input type="number" value="15" disabled />
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Transfer Quantity</Label>
                      <Input
                        name="currentQun"
                        type="number"
                        placeholder="Insert Transfer Quantity"
                        onChange={transferFormik.handleChange}
                        onBlur={transferFormik.handleBlur}
                        value={transferFormik.values.currentQun || ""}
                        invalid={
                          transferFormik.touched.currentQun &&
                          transferFormik.errors.currentQun
                            ? true
                            : false
                        }
                      />
                      {transferFormik.touched.currentQun &&
                      transferFormik.errors.currentQun ? (
                        <FormFeedback type="invalid">
                          {transferFormik.errors.currentQun}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button type="submit" color="success">
                        Transfer
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
            </ModalBody>
          </Modal>

          {/* Modal for Add Stock quantity */}
          <Modal
            isOpen={add}
            toggle={toggleAddModal}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <ModalHeader toggle={toggleAddModal} tag="h4">
              Add Stock
            </ModalHeader>
            <ModalBody>
              <form onSubmit={stockFormik.handleSubmit}>
                <Row>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Product Name</Label>
                      <Input
                        type="text"
                        value={stockFormik?.values?.productName}
                        disabled
                      />
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">
                        Reserved Product Quantity
                      </Label>
                      <Input type="number" value="15" disabled />
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">
                        Display Available Quantity
                      </Label>
                      <Input
                        type="number"
                        value={stockFormik?.values?.quantity}
                        disabled
                      />
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Add Quantity</Label>
                      <Input
                        name="addQuantity"
                        type="number"
                        placeholder="Insert Quantity"
                        onChange={stockFormik.handleChange}
                        onBlur={stockFormik.handleBlur}
                        value={stockFormik.values.addQuantity || ""}
                        invalid={
                          stockFormik.touched.addQuantity &&
                          stockFormik.errors.addQuantity
                            ? true
                            : false
                        }
                      />
                      {stockFormik.touched.addQuantity &&
                      stockFormik.errors.addQuantity ? (
                        <FormFeedback type="invalid">
                          {stockFormik.errors.addQuantity}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Purchase Price</Label>
                      <Input
                        name="purchasePrice"
                        type="number"
                        placeholder="Insert Purchase Price"
                        onChange={stockFormik.handleChange}
                        onBlur={stockFormik.handleBlur}
                        value={stockFormik.values.purchasePrice || ""}
                        invalid={
                          stockFormik.touched.purchasePrice &&
                          stockFormik.errors.purchasePrice
                            ? true
                            : false
                        }
                      />
                      {stockFormik.touched.purchasePrice &&
                      stockFormik.errors.purchasePrice ? (
                        <FormFeedback type="invalid">
                          {stockFormik.errors.purchasePrice}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Select Date</Label>
                      <Input
                        name="selectedDate"
                        type="date"
                        onChange={stockFormik.handleChange}
                        onBlur={stockFormik.handleBlur}
                        value={stockFormik.values.selectedDate || ""}
                        invalid={
                          stockFormik.touched.selectedDate &&
                          stockFormik.errors.selectedDate
                            ? true
                            : false
                        }
                      />
                      {stockFormik.touched.selectedDate &&
                      stockFormik.errors.selectedDate ? (
                        <FormFeedback type="invalid">
                          {stockFormik.errors.selectedDate}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button type="submit" color="success">
                        Add
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

export default withRouter(Reserved);
