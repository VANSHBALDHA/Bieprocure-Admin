import React, { useRef, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
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
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { cartProducts as initialCartProducts } from "../../../common/data/MyFackData";
import { useFormik } from "formik";
import * as Yup from "yup";
import MediaModel from "../MediaUpload/MediaModel";

const UserCartList = () => {
  const fileInputRef = useRef(null);
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
      setUploadedImages([image?.image]);
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

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Customer Cart"
            breadcrumbItem="Customer Cart List"
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
                        onClick={() => navigate("/manage-request/cart")}
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
                            <strong>User ID:</strong> #123
                          </CardText>
                          <CardText>
                            <strong>User Name:</strong> Testing purpose
                          </CardText>
                          <CardText className="mb-3">
                            <strong>Mobile Number:</strong> 7778889994
                          </CardText>
                        </Col>
                        <Col md="6">
                          <CardText>
                            <strong>Email:</strong> testing123@gmail.com
                          </CardText>
                          <CardText>
                            <strong>Cart ID:</strong> #SKU123
                          </CardText>
                          <CardText>
                            <strong>Order Status:</strong>{" "}
                            <Badge>Pending</Badge>
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
                                          // onClick={() => {
                                          //   countUP(product.id, product.data_attr);
                                          // }}
                                        >
                                          +
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
                                          // onClick={() => {
                                          //   countDown(
                                          //     product.id,
                                          //     product.data_attr
                                          //   );
                                          // }}
                                        >
                                          -
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
                                      className="action-icon text-success"
                                      onClick={() => handleEditClick(product)}
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
                                      // onClick={() => removeCartItem(product.id)}
                                      onClick={() => DeleteProduct(product.id)}
                                      className="action-icon text-danger"
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
            <Col xl={8}></Col>
            <Col xl={4}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">Order Summary</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <tbody>
                        <tr>
                          <td>Grand Total :</td>
                          <td>₹ 1,857</td>
                        </tr>
                        <tr>
                          <td>Discount : </td>
                          <td>- ₹ 157</td>
                        </tr>
                        <tr>
                          <td>Shipping Charge :</td>
                          <td>₹ 25</td>
                        </tr>
                        <tr>
                          <td>Estimated Tax : </td>
                          <td>₹ 19.22</td>
                        </tr>
                        <tr>
                          <th>Total :</th>
                          <th>₹ 1744.22</th>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
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

export default withRouter(UserCartList);
