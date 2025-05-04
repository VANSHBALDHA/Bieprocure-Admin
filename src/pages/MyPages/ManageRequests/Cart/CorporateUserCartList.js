import React, { useRef, useState } from "react";
import MediaModel from "../../MediaUpload/MediaModel";
import { Link, useNavigate } from "react-router-dom";
import { cartProducts as initialCartProducts } from "../../../../common/data/MyFackData";
import { Field, Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import toast from "react-hot-toast";

const CorporateUserCartList = () => {
  const imageInputRef = useRef(null);
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [addProduct, setAddProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState(initialCartProducts);

  const [uploadedImages, setUploadedImages] = useState(null);
  const [imageModel, setImageModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleImageModal = () => {
    setImageModel(!imageModel);
    setSelectedImage([]);
  };

  const handleUploadImage = (image) => {
    if (image) {
      setUploadedImages([image[0].image]);
    }
    toggleImageModal();
    setSelectedImage(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImage = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setUploadedImages([newImage]);
    }
  };

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const DeleteProduct = (id) => {
    setDeleteProductId(id);
    setDeleteModal(true);
  };

  const toggleModal = () => setModal(!modal);

  const handleAddProduct = () => {
    setAddProduct(null);
    setIsEdit(false);
    toggleModal();
  };

  const handleEditClick = (product) => {
    setAddProduct(product);
    setIsEdit(true);
    toggleModal();
  };

  const removeCartItem = (id) => {
    console.log("id", id);
    setCartProducts(cartProducts.filter((product) => product.id !== id));
    setDeleteModal(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (addProduct && addProduct.id) || "",
      product_name: (addProduct && addProduct.product_name) || "",
      product_code: (addProduct && addProduct.product_code) || "",
      product_img: uploadedImages || "",
      price: (addProduct && addProduct.price) || "",
      quantity: (addProduct && addProduct.quantity) || "",
      total: (addProduct && addProduct.total) || "",
      discount_percentage: (addProduct && addProduct.discount_percentage) || "",
      discount_value: (addProduct && addProduct.discount_value) || "",
    },
    validationSchema: Yup.object({
      product_name: Yup.string().required("Please enter product name"),
      product_code: Yup.string().required("Please enter product code"),
      product_img: Yup.mixed().test(
        "fileSelected",
        "Please select an image",
        () => uploadedImages && uploadedImages.length > 0
      ),
      // product_img: Yup.array().min(1, "Please upload at least one image"),
      price: Yup.number()
        .required("Please enter the product price")
        .positive("Must be a positive number"),
      quantity: Yup.number()
        .required("Please enter the product quantity")
        .positive("Must be a positive number")
        .min(1, "Quantity must be at least 1"),
      total: Yup.number()
        .required("Please enter the product total")
        .positive("Must be a positive number"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        setCartProducts(
          cartProducts.map((product) =>
            product.id === values.id ? values : product
          )
        );
        console.log("Updating cart:", values);
      } else {
        setCartProducts([...cartProducts, values]);
        console.log("Adding new cart:", values);
      }
      toggleModal();
    },
  });

  const [paymentTerms, setPaymentTerms] = useState([
    {
      type: "Advance 30% - Order Confirmation",
      dueDate: "Advance – Against Performa Invoice",
      percentage: 50,
      days: 30,
      creditDays: 15,
    },
    {
      type: "50% Performa Invoice Released",
      dueDate: "Advance – Order Confirmation",
      percentage: 30,
      days: 60,
      creditDays: 30,
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState(null);

  const dueDateOptions = [
    "Advance – Order Confirmation",
    "Advance – Against Performa Invoice",
    "Day(s) after invoice date",
  ];

  const validationSchema = Yup.object({
    type: Yup.string().required("Type is required"),
    dueDate: Yup.string().required("Due Date is required"),
    percentage: Yup.number().required("Percentage is required").min(1).max(100),
    days: Yup.number().required("Days are required").min(1),
    creditDays: Yup.number().required("Credit Days are required").min(1),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    if (editingTerm) {
      const updatedTerms = paymentTerms.map((term) =>
        term === editingTerm ? values : term
      );
      setPaymentTerms(updatedTerms);
      toast.success("Payment term updated successfully!");
    } else {
      setPaymentTerms([...paymentTerms, values]);
      toast.success("Payment term added successfully!");
    }

    setSubmitting(false);
    resetForm();
    setModalOpen(false);
    setEditingTerm(null);
  };

  const handleEdit = (term) => {
    setEditingTerm(term);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTerm(null);
    setModalOpen(true);
  };

  const handleDelete = (termToDelete) => {
    const updatedTerms = paymentTerms.filter((term) => term !== termToDelete);
    setPaymentTerms(updatedTerms);
    toast.success("Payment term deleted successfully!");
  };

  const orderStatus = "Awaiting Quoted Price";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Customer Cart"
            breadcrumbItem="Corporate Customer Cart List"
          />
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div className="text-sm-end">
                      <Button
                        type="button"
                        color="primary"
                        className="btn mb-2 me-2 d-flex align-items-center"
                        onClick={() => navigate(-1)}
                      >
                        <i class="bx bx-arrow-back me-1"></i>
                        Back to Cart
                      </Button>
                    </div>
                    <div className="text-sm-end">
                      <Button
                        type="button"
                        color="success"
                        className="btn mb-2 me-2"
                        onClick={handleAddProduct}
                      >
                        <i className="mdi mdi-plus-circle-outline me-1" />
                        Add Product
                      </Button>
                    </div>
                  </div>
                  <Card className="mb-3">
                    <CardBody>
                      <CardTitle tag="h5" className="text-primary fw-bold mb-3">
                        User Personal Details
                      </CardTitle>
                      <Row>
                        <Col md="6">
                          <CardText>
                            <strong>Customer Name:</strong> ABC Corporation
                          </CardText>
                          <CardText>
                            <strong>Customer ID:</strong> #123
                          </CardText>
                          <CardText>
                            <strong>Quoted User:</strong> Animesh Soni (Sales
                            Team)
                          </CardText>
                          <CardText>
                            <strong>Cart User Name:</strong> Ankit Gandhi
                            (Purchase Team)
                          </CardText>
                          <CardText>
                            <strong>Communication:</strong> abc@xyz.com |
                            7778889994
                          </CardText>
                        </Col>

                        <Col md="6">
                          <CardText>
                            <strong>Cart ID:</strong> ORD-Q-10234-20250331{" "}
                            <small>
                              (FORMAT: ORD-CARTID-ORDERCREATED DATE)
                            </small>
                          </CardText>
                          <CardText>
                            <strong>Cart Status:</strong>&nbsp;
                            <Badge color="success">Order Confirmed</Badge>
                          </CardText>
                          <CardText>
                            <strong>Delivery Scheduled:</strong> 8–10 Weeks{" "}
                            <small>(Last Month: Jun-2025)</small>
                          </CardText>
                          <CardText>
                            <strong>Part Shipment:</strong> Allowed
                          </CardText>
                          <CardText>
                            <strong>Purchase Order (PO):</strong>
                            <br />
                            Uploaded By Customer (Ankit Gandhi) —{" "}
                            <a href="#download-po.pdf">Download PDF</a>
                            <br />
                            Uploaded On: 31-Mar-2025, 04:45 PM
                          </CardText>
                          <CardText>
                            <strong>Payment Terms:</strong>
                            <br />
                            Modified & Verified by Backend User: Rajesh Mehta
                          </CardText>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <div className="table-responsive">
                    <Table className="table align-middle mb-0 table-nowrap">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Image</th>
                          <th>Product Desc</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Discount Percentage</th>
                          <th>Discount Price</th>
                          <th colSpan="2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartProducts?.length > 0 ? (
                          <>
                            {cartProducts.map((product, index) => (
                              <tr key={index}>
                                <td>{product?.id}</td>
                                <td>
                                  <img
                                    // src={product.img}
                                    src="https://placehold.co/400x400"
                                    alt="product-img"
                                    title="product-img"
                                    className="avatar-md"
                                  />
                                </td>
                                <td>
                                  <h5 className="font-size-14 text-truncate">
                                    <Link to="#" className="text-dark">
                                      {product?.product_name}
                                    </Link>
                                  </h5>
                                  <p className="mb-0">
                                    Code :{" "}
                                    <span className="fw-medium">
                                      {product?.product_code}
                                    </span>
                                  </p>
                                </td>
                                <td>₹ {product?.price}</td>
                                <td>
                                  <div style={{ width: "120px" }}>
                                    <div className="input-group">
                                      <div className="input-group-prepend">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          disabled={
                                            orderStatus !==
                                              "Awaiting Quoted Price" &&
                                            orderStatus !== "Revised Cart"
                                          }
                                        >
                                          -
                                        </button>
                                      </div>
                                      <Input
                                        type="text"
                                        value={product?.quantity}
                                        name="demo_vertical"
                                        className="text-center fw-bold"
                                        readOnly
                                      />
                                      <div className="input-group-append">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          disabled={
                                            orderStatus !==
                                              "Awaiting Quoted Price" &&
                                            orderStatus !== "Revised Cart"
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>{product?.discount_percentage} %</td>
                                <td>₹ {product?.discount_value}</td>
                                <td>₹ {product?.total}</td>
                                <td>
                                  <div className="d-flex gap-3 align-items-center">
                                    <Link
                                      to="#"
                                      className={`action-icon ${
                                        orderStatus ===
                                          "Awaiting Quoted Price" ||
                                        orderStatus === "Revised Cart"
                                          ? "text-success"
                                          : "text-muted"
                                      }`}
                                      onClick={() =>
                                        (orderStatus ===
                                          "Awaiting Quoted Price" ||
                                          orderStatus === "Revised Cart") &&
                                        handleEditClick(product)
                                      }
                                    >
                                      <i
                                        className="mdi mdi-pencil font-size-18"
                                        id="edittooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="edittooltip"
                                      >
                                        Edit Cart
                                      </UncontrolledTooltip>
                                    </Link>
                                    <Link
                                      to="#"
                                      className={`action-icon ${
                                        orderStatus ===
                                          "Awaiting Quoted Price" ||
                                        orderStatus === "Revised Cart"
                                          ? "text-danger"
                                          : "text-muted"
                                      }`}
                                      onClick={() =>
                                        (orderStatus ===
                                          "Awaiting Quoted Price" ||
                                          orderStatus === "Revised Cart") &&
                                        DeleteProduct(product.id)
                                      }
                                    >
                                      <i
                                        className="mdi mdi-trash-can font-size-18"
                                        id="removetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="removetooltip"
                                      >
                                        Remove
                                      </UncontrolledTooltip>
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <>
                            <div className="text-center">
                              <h4>No Data Found</h4>
                            </div>
                          </>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={8}>
              <Card>
                <CardBody>
                  <CardTitle
                    className="mb-3"
                    style={{
                      color: "#2c3e50",
                      backgroundColor: "#ecf0f1",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    GST Declaration
                  </CardTitle>

                  <div className="table-responsive">
                    <Table bordered style={{ borderCollapse: "collapse" }}>
                      <thead
                        className="table-light"
                        style={{ backgroundColor: "#bdc3c7" }}
                      >
                        <tr>
                          <th
                            style={{
                              backgroundColor: "#ecf0f1",
                              color: "#2c3e50",
                            }}
                          >
                            GST%
                          </th>
                          <th
                            style={{
                              backgroundColor: "#ecf0f1",
                              color: "#2c3e50",
                            }}
                          >
                            Amount
                          </th>
                          <th
                            style={{
                              backgroundColor: "#ecf0f1",
                              color: "#2c3e50",
                            }}
                          >
                            SGST
                          </th>
                          <th
                            style={{
                              backgroundColor: "#ecf0f1",
                              color: "#2c3e50",
                            }}
                          >
                            CGST
                          </th>
                          <th
                            style={{
                              backgroundColor: "#ecf0f1",
                              color: "#2c3e50",
                            }}
                          >
                            IGST
                          </th>
                          <th
                            style={{
                              backgroundColor: "#ecf0f1",
                              color: "#2c3e50",
                            }}
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ backgroundColor: "#f9fafb" }}>
                          <td>0%</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                        </tr>
                        <tr style={{ backgroundColor: "#f9fafb" }}>
                          <td>3%</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                        </tr>
                        <tr style={{ backgroundColor: "#f9fafb" }}>
                          <td>5%</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                        </tr>
                        <tr style={{ backgroundColor: "#f9fafb" }}>
                          <td>12%</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                          <td>₹0.00</td>
                        </tr>
                        <tr
                          style={{
                            backgroundColor: "#ecf0f1",
                            color: "#2980b9",
                          }}
                        >
                          <td>18%</td>
                          <td>₹2,80,000</td>
                          <td>₹25,200</td>
                          <td>₹25,200</td>
                          <td>₹0.00</td>
                          <td>₹3,30,400</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={4}>
              <Card>
                <CardBody>
                  <CardTitle
                    className="mb-3"
                    style={{
                      color: "#2c3e50",
                      backgroundColor: "#ecf0f1",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    Order Summary
                  </CardTitle>

                  <div className="table-responsive">
                    <Table
                      className="table mb-0"
                      style={{
                        borderCollapse: "separate",
                        borderSpacing: "0 10px",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              backgroundColor: "#f9fafb",
                              fontWeight: "bold",
                            }}
                          >
                            Sub Total:
                          </td>
                          <td
                            style={{
                              backgroundColor: "#f9fafb",
                              color: "#27ae60",
                            }}
                          >
                            ₹ 2,80,000
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              backgroundColor: "#f9fafb",
                              fontWeight: "bold",
                            }}
                          >
                            GST:
                          </td>
                          <td
                            style={{
                              backgroundColor: "#f9fafb",
                              color: "#f39c12",
                            }}
                          >
                            ₹ 50,400
                          </td>
                        </tr>
                        <tr>
                          <th
                            style={{
                              backgroundColor: "#ecf0f1",
                              color: "#2980b9",
                            }}
                          >
                            Total:
                          </th>
                          <th
                            style={{
                              backgroundColor: "#ecf0f1",
                              color: "#2980b9",
                            }}
                          >
                            ₹ 3,30,400
                          </th>
                        </tr>

                        {/* Show this only if advance amount is required */}
                        <tr>
                          <td
                            style={{
                              backgroundColor: "#f9fafb",
                              fontWeight: "bold",
                            }}
                          >
                            Advance Against Order:
                          </td>
                          <td
                            style={{
                              backgroundColor: "#f9fafb",
                              color: "#e74c3c",
                            }}
                          >
                            ₹ 32,500
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              backgroundColor: "#f9fafb",
                              fontWeight: "bold",
                            }}
                          >
                            Total Qty:
                          </td>
                          <td
                            style={{
                              backgroundColor: "#f9fafb",
                              color: "#8e44ad",
                            }}
                          >
                            3,000
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={12}>
              <div
                style={{
                  border: "1px solid #ced4da",
                  borderRadius: "10px",
                }}
                className="p-3 mb-5"
              >
                <Row className="d-flex justify-content-between align-items-center mb-3">
                  <Col lg="6">
                    <h5 className="m-0" style={{ color: "#2c3e50" }}>
                      Payment Terms
                    </h5>
                  </Col>
                  <Col lg="6">
                    <div className="text-end d-flex justify-content-end align-items-center gap-2">
                      <div className="d-flex justify-content-end align-items-center gap-2">
                        <span style={{ color: "#6c757d" }}>Remaining</span>
                        <Input
                          type="text"
                          value="20%"
                          disabled
                          style={{
                            backgroundColor: "#f8f9fa",
                            borderColor: "#ced4da",
                            color: "#495057",
                          }}
                        />
                      </div>
                      <div>
                        <Button
                          type="button"
                          color="primary"
                          className="btn"
                          onClick={handleAdd}
                          style={{
                            backgroundColor: "#007bff",
                            borderColor: "#007bff",
                          }}
                        >
                          <i className="mdi mdi-plus me-1" />
                          Add Payment Term
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg="12">
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
                        style={{
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          width: "100%",
                          marginBottom: "20px",
                        }}
                      >
                        <thead
                          style={{
                            backgroundColor: "#e9ecef",
                            color: "#343a40",
                          }}
                        >
                          <tr>
                            <th>#</th>
                            <th>Description</th>
                            <th>In (%)</th>
                            <th>Days</th>
                            <th>Amount</th>
                            <th>Against</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ backgroundColor: "#f1f3f5" }}>
                            <td>1</td>
                            <td>Advance With Order Confirmation</td>
                            <td>10%</td>
                            <td>0</td>
                            <td>₹ 32,500</td>
                            <td>Order Confirmation</td>
                            <td className="text-center">
                              <div className="d-flex gap-2 align-items-center justify-content-center">
                                <Link
                                  to="#"
                                  className="text-success"
                                  onClick={() => handleEdit()}
                                >
                                  <i className="mdi mdi-pencil font-size-18" />
                                </Link>
                                <Link
                                  to="#"
                                  className="action-icon text-danger"
                                  onClick={() => handleDelete()}
                                >
                                  <i className="mdi mdi-trash-can font-size-18" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Advance Against PI on Readiness</td>
                            <td>40%</td>
                            <td>10 Days</td>
                            <td>₹ 1,62,500</td>
                            <td>Against PI</td>
                            <td className="text-center">
                              <div className="d-flex gap-2 align-items-center justify-content-center">
                                <Link
                                  to="#"
                                  className="text-success"
                                  onClick={() => handleEdit()}
                                >
                                  <i className="mdi mdi-pencil font-size-18" />
                                </Link>
                                <Link
                                  to="#"
                                  className="action-icon text-danger"
                                  onClick={() => handleDelete()}
                                >
                                  <i className="mdi mdi-trash-can font-size-18" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr style={{ backgroundColor: "#f1f3f5" }}>
                            <td>3</td>
                            <td>Mile Stone # 1</td>
                            <td>10%</td>
                            <td>30 Days</td>
                            <td>₹ 32,500</td>
                            <td>After Invoice</td>
                            <td className="text-center">
                              <div className="d-flex gap-2 align-items-center justify-content-center">
                                <Link
                                  to="#"
                                  className="text-success"
                                  onClick={() => handleEdit()}
                                >
                                  <i className="mdi mdi-pencil font-size-18" />
                                </Link>
                                <Link
                                  to="#"
                                  className="action-icon text-danger"
                                  onClick={() => handleDelete()}
                                >
                                  <i className="mdi mdi-trash-can font-size-18" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Mile Stone # 2</td>
                            <td>40%</td>
                            <td>45 Days</td>
                            <td>₹ 1,62,500</td>
                            <td>After Invoice</td>
                            <td className="text-center">
                              <div className="d-flex gap-2 align-items-center justify-content-center">
                                <Link
                                  to="#"
                                  className="text-success"
                                  onClick={() => handleEdit()}
                                >
                                  <i className="mdi mdi-pencil font-size-18" />
                                </Link>
                                <Link
                                  to="#"
                                  className="action-icon text-danger"
                                  onClick={() => handleDelete()}
                                >
                                  <i className="mdi mdi-trash-can font-size-18" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg="6">
                    <h5 className="m-0" style={{ color: "#2c3e50" }}>
                      Other Terms
                    </h5>
                  </Col>
                  <Col lg="12" className="py-3">
                    <textarea
                      name="metaDescription"
                      placeholder="Add the Other Details by Admin"
                      className="form-control"
                      rows="5"
                      style={{
                        borderColor: "#ced4da",
                        borderRadius: "5px",
                        backgroundColor: "#f8f9fa",
                        color: "#495057",
                      }}
                    />
                  </Col>
                  <div className="text-end">
                    <Button
                      type="button"
                      color="secondary"
                      className="btn"
                      style={{
                        backgroundColor: "#6c757d",
                        borderColor: "#6c757d",
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </Row>
              </div>
            </Col>
          </Row>

          {/* Modal for Add/Edit Cart Product Details*/}
          <Modal
            isOpen={modal}
            toggle={toggleModal}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <ModalHeader toggle={toggleModal} tag="h4">
              {isEdit ? "Edit Cart Product" : "Add Product Cart"}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Product Code</Label>
                      <Input
                        name="product_code"
                        type="text"
                        placeholder="Insert Product Code"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.product_code}
                        invalid={
                          formik.touched.product_code &&
                          formik.errors.product_code
                            ? true
                            : false
                        }
                      />
                      {formik.touched.product_code &&
                      formik.errors.product_code ? (
                        <FormFeedback type="invalid">
                          {formik.errors.product_code}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Product Name</Label>
                      <Input
                        name="product_name"
                        type="text"
                        placeholder="Insert Product Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.product_name}
                        invalid={
                          formik.touched.product_name &&
                          formik.errors.product_name
                            ? true
                            : false
                        }
                      />
                      {formik.touched.product_name &&
                      formik.errors.product_name ? (
                        <FormFeedback type="invalid">
                          {formik.errors.product_name}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Product Quantity</Label>
                      <Input
                        name="quantity"
                        type="number"
                        inputMode="numeric"
                        min="1"
                        placeholder="Insert Product Quantity"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.quantity}
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
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Product Price</Label>
                      <Input
                        name="price"
                        type="number"
                        min="1"
                        inputMode="numeric"
                        placeholder="Insert Product Price"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
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
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Product Total</Label>
                      <Input
                        name="total"
                        type="number"
                        min="1"
                        inputMode="numeric"
                        placeholder="Insert Product Total"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.total}
                        invalid={
                          formik.touched.total && formik.errors.total
                            ? true
                            : false
                        }
                      />
                      {formik.touched.total && formik.errors.total ? (
                        <FormFeedback type="invalid">
                          {formik.errors.total}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">
                        Discount Percentage (%)
                      </Label>
                      <Input
                        name="discount_percentage"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Insert Discount Percentage"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.discount_percentage}
                      />
                    </div>
                  </Col>
                  <Col className="col-4">
                    <div className="mb-3">
                      <Label className="form-label">Discount Value</Label>
                      <Input
                        name="discount_value"
                        type="number"
                        min="0"
                        placeholder="Insert Discount Value"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.discount_value}
                      />
                    </div>
                  </Col>
                  <Col className="col-8">
                    <div className="mb-3">
                      <Label className="form-label">Upload Product Image</Label>
                      {/* <Input
                        name="product_img"
                        type="file"
                        onChange={handleImageChange}
                        accept="image/jpeg, image/png"
                        innerRef={fileInputRef}
                        invalid={
                          formik.touched.product_img &&
                          formik.errors.product_img
                            ? true
                            : false
                        }
                      />
                      {formik.touched.product_img &&
                      formik.errors.product_img ? (
                        <FormFeedback type="invalid" className="d-block">
                          {formik.errors.product_img}
                        </FormFeedback>
                      ) : null} */}
                      <Input
                        name="product_img"
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleImageChange}
                        innerRef={imageInputRef}
                        style={{ display: "none" }}
                        invalid={
                          formik.touched.product_img &&
                          formik.errors.product_img
                            ? true
                            : false
                        }
                      />
                      <div
                        className="custom-file-button"
                        onClick={toggleImageModal}
                      >
                        <i
                          class="bx bx-cloud-upload me-2"
                          style={{ fontSize: "25px" }}
                        ></i>
                        Choose File
                      </div>
                      {formik.errors.product_img &&
                      formik.touched.product_img ? (
                        <FormFeedback type="invalid" className="d-block">
                          {formik.errors.product_img}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  {/* {uploadedImages?.length > 0 && (
                    <Col className="col-12">
                      <div className="mb-3">
                        <Label className="form-label">Uploaded Images</Label>
                        <div className="image-preview-container">
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
                  )} */}
                  {uploadedImages && (
                    <Card className="mt-1 mb-3 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                      <div className="p-2">
                        <Row className="d-flex justify-content-between align-items-center">
                          <Col className="col-auto">
                            <img
                              data-dz-thumbnail=""
                              height="100"
                              width="100"
                              className="avatar-md rounded bg-light"
                              alt="images"
                              src={uploadedImages}
                            />
                          </Col>
                          <Col className="col-auto">
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                setUploadedImages(null);
                              }}
                            >
                              Delete
                            </button>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  )}
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button type="submit" color="success">
                        {isEdit ? "Update Cart" : "Save"}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
            </ModalBody>
          </Modal>

          {/* Model For Delete Product From Cart */}
          <Modal
            size="sm"
            isOpen={deleteModal}
            toggle={() => setDeleteModal(false)}
            centered={true}
          >
            <div className="modal-content">
              <ModalBody className="px-4 py-5 text-center">
                <button
                  type="button"
                  onClick={() => setDeleteModal(false)}
                  className="btn-close position-absolute end-0 top-0 m-3"
                ></button>
                <div className="avatar-sm mb-4 mx-auto">
                  <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-20 rounded-3">
                    <i className="mdi mdi-trash-can-outline"></i>
                  </div>
                </div>
                <p className="text-muted font-size-16 mb-4">
                  Are you sure you want to permanently remove product
                </p>

                <div className="hstack gap-2 justify-content-center mb-0">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeCartItem(deleteProductId)}
                  >
                    Delete Now
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setDeleteModal(false)}
                  >
                    Close
                  </button>
                </div>
              </ModalBody>
            </div>
          </Modal>

          {/* Modal for Add/Edit Payment Term */}
          <Modal
            isOpen={modalOpen}
            toggle={() => setModalOpen(!modalOpen)}
            backdrop="static"
            scrollable={true}
          >
            <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
              {editingTerm ? "Edit Payment Term" : "Add Payment Term"}
            </ModalHeader>
            <ModalBody>
              <Formik
                initialValues={{
                  type: editingTerm ? editingTerm.type : "",
                  dueDate: editingTerm ? editingTerm.dueDate : "",
                  percentage: editingTerm ? editingTerm.percentage : "",
                  days: editingTerm ? editingTerm.days : "",
                  creditDays: editingTerm ? editingTerm.creditDays : "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  errors,
                  touched,
                }) => {
                  const isAdvanceOrderConfirmation =
                    values.dueDate === "Advance – Order Confirmation";
                  return (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <Label for="type">Type Selection</Label>
                            <Field
                              name="type"
                              type="text"
                              className={`form-control ${
                                errors.type && touched.type ? "is-invalid" : ""
                              }`}
                              placeholder="Types..."
                            />
                            {errors.type && touched.type && (
                              <div className="invalid-feedback">
                                {errors.type}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col lg="12">
                          <FormGroup>
                            <Label for="dueDate">Due Date</Label>
                            <Field
                              name="dueDate"
                              as="select"
                              className={`form-control ${
                                errors.dueDate && touched.dueDate
                                  ? "is-invalid"
                                  : ""
                              }`}
                            >
                              <option value="">Select Due Date</option>
                              {dueDateOptions.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </Field>
                            {errors.dueDate && touched.dueDate && (
                              <div className="invalid-feedback">
                                {errors.dueDate}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col lg="12">
                          <FormGroup>
                            <Label for="percentage">In Percentage</Label>
                            <Field
                              type="number"
                              name="percentage"
                              className={`form-control ${
                                errors.percentage && touched.percentage
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Percentage"
                            />
                            {errors.percentage && touched.percentage && (
                              <div className="invalid-feedback">
                                {errors.percentage}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col lg="12">
                          <FormGroup>
                            <Label for="days">Days</Label>
                            <Field
                              type="number"
                              name="days"
                              className={`form-control ${
                                errors.days && touched.days ? "is-invalid" : ""
                              }`}
                              placeholder="Days"
                              disabled={isAdvanceOrderConfirmation}
                            />
                            {errors.days && touched.days && (
                              <div className="invalid-feedback">
                                {errors.days}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col lg="12">
                          <FormGroup>
                            <Label for="creditDays">Credit Days</Label>
                            <Field
                              type="number"
                              name="creditDays"
                              className={`form-control ${
                                errors.creditDays && touched.creditDays
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Credit Days"
                              disabled={isAdvanceOrderConfirmation}
                            />
                            {errors.creditDays && touched.creditDays && (
                              <div className="invalid-feedback">
                                {errors.creditDays}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col lg="12" className="text-end">
                          <Button
                            type="submit"
                            color="primary"
                            disabled={false}
                          >
                            {editingTerm ? "Save Changes" : "Add Payment Term"}
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </ModalBody>
          </Modal>

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
    </>
  );
};

export default CorporateUserCartList;
