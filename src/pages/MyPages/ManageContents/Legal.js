import React, { useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
  Badge,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import { legalContentPages } from "../../../common/data/MyFackData";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import toast from "react-hot-toast";

const Legal = () => {
  const [editPage, setEditPage] = useState(false);
  const [pageData, setPageData] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (pageData && pageData.id) || "",
      pageName: (pageData && pageData?.pageName) || "",
      slug: (pageData && pageData?.slug) || "",
      content: (pageData && pageData?.content) || "",
      status: (pageData && pageData?.status) || "active",
    },
    validationSchema: Yup.object({
      pageName: Yup.string().required("Please enter the page name"),
      slug: Yup.string().required("Please enter slug"),
      content: Yup.string().required("Please enter some content"),
      status: Yup.string().required("Please select the status"),
    }),
    onSubmit: (values) => {
      console.log("Updated page", values);
      toast.success("Page updated!");
      setEditPage(false);
    },
  });

  const handleEditClick = (data) => {
    setPageData({
      ...data,
      status: data.status?.toLowerCase(),
    });
    setEditPage(true);
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "video",
    "font",
    "size",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  document.title = "Legal Page Section | Bieprocure";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Legal" breadcrumbItem="Legal Pages" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Page Name</th>
                          <th>Slug</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {legalContentPages?.map((data, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <th scope="row">{data?.id}</th>
                                <td className="fw-bold">
                                  {data?.pageName}
                                </td>
                                <td className="text-primary">
                                  {data?.slug}
                                </td>
                                <td>
                                  <Badge
                                    color={
                                      data?.status === "Active"
                                        ? "success"
                                        : "danger"
                                    }
                                  >
                                    {data?.status.charAt(0).toUpperCase() +
                                      data?.status.slice(1)}
                                  </Badge>
                                </td>
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
                            </>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Modal for Edit Legal Pages*/}
          <Modal
            isOpen={editPage}
            toggle={handleEditClick}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <ModalHeader toggle={() => setEditPage(false)} tag="h4">
              Edit Page
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="col-md-4 col-12">
                    <div className="mb-3">
                      <Label className="form-label">Enter Page Name</Label>
                      <Input
                        name="pageName"
                        type="text"
                        placeholder="Enter page name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.pageName || ""}
                        invalid={
                          formik.touched.pageName && formik.errors.pageName
                            ? true
                            : false
                        }
                      />
                      {formik.touched.pageName && formik.errors.pageName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.pageName}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-md-4 col-12">
                    <div className="mb-3">
                      <Label className="form-label">Enter Slug</Label>
                      <Input
                        name="slug"
                        type="text"
                        placeholder="Enter slug"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.slug || ""}
                        invalid={
                          formik.touched.slug && formik.errors.slug
                            ? true
                            : false
                        }
                      />
                      {formik.touched.slug && formik.errors.slug ? (
                        <FormFeedback type="invalid">
                          {formik.errors.slug}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="col-md-4 col-12">
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
                  <Col className="col-12">
                    <div className="mb-5">
                      <Label className="form-label">Page Discription</Label>
                      <ReactQuill
                        value={formik.values.content}
                        theme="snow"
                        onChange={(value) =>
                          formik.setFieldValue("content", value)
                        }
                        modules={quillModules}
                        formats={quillFormats}
                        style={{ height: "300px" }}
                        placeholder="Enter your content...."
                        className=""
                      />
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

export default withRouter(Legal);
