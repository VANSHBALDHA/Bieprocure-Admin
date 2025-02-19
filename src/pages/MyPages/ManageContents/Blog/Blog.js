import React, { useMemo } from "react";
import withRouter from "../../../../components/Common/withRouter";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import TableContainer from "../../../../components/Common/TableContainer";
import { Link, useNavigate } from "react-router-dom";
import { BlogData } from "../../../../common/data/MyFackData";
import { useFormik } from "formik";
import * as Yup from "yup";

const Blog = () => {
  const navigate = useNavigate();

  const handleaddBlog = () => {
    navigate("/manage-contents/blogs/add-blog");
  };

  const seoValidation = useFormik({
    initialValues: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
    validationSchema: Yup.object({
      metaTitle: Yup.string().required("Meta title is required"),
      metaDescription: Yup.string()
        .required("Meta description is required")
        .max(180, "Meta description cannot exceed 180 characters"),
      metaKeywords: Yup.string().required("Meta keywords are required"),
    }),
    onSubmit: (values) => {
      console.log("SEO Metadata Submitted:", values);
    },
  });

  const InputField = ({
    id,
    name,
    type,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
  }) => (
    <div className="mb-3">
      <Label htmlFor={id}>{placeholder}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        invalid={error ? true : false}
      />
      {error && <FormFeedback>{error}</FormFeedback>}
    </div>
  );

  const TextareaField = ({
    id,
    name,
    value,
    onChange,
    onBlur,
    error,
    charCount,
  }) => (
    <div className="mb-3">
      <Label htmlFor={id}>Meta Description</Label>
      <textarea
        className="form-control"
        id={id}
        name={name}
        rows="5"
        placeholder="Meta Description"
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        invalid={error ? true : false}
      />
      <div className="small text-muted">{charCount}/180 characters</div>
      {error && <div className="text-danger">{error}</div>}
    </div>
  );

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        disableFilters: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Blog Title",
        accessor: "title",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Slug",
        accessor: "slug",
        filterable: true,
      },
      {
        Header: "	Category",
        accessor: "category",
        filterable: true,
      },
      {
        Header: "	Image",
        accessor: "image",
        disableFilters: true,
        Cell: ({ value }) => (
          <img className="rounded-circle avatar-md" src={value} alt="" />
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: ({ row }) => (
          <div className="d-flex gap-3">
            <Link
              to={`/manage-contents/blogs/view-blog/${row.original.id}`}
              className="text-success"
            >
              <i
                className="mdi mdi-eye-outline font-size-18"
                id="viewtooltip"
              ></i>
              <UncontrolledTooltip placement="top" target="viewtooltip">
                View
              </UncontrolledTooltip>
            </Link>
            <Link
              to={`/manage-contents/blogs/edit-blog/${row.original.id}`}
              className="text-success"
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

  document.title = "Blog Section | Bieprocure";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Blogs" breadcrumbItem="Blogs List" />
          <Row className="mb-2">
            <Card>
              <CardBody>
                <CardTitle>Meta Data</CardTitle>
                <p className="card-title-desc">Fill all information below</p>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    seoValidation.handleSubmit();
                  }}
                >
                  <Row>
                    <Col sm={6}>
                      <InputField
                        id="metatitle"
                        name="metaTitle"
                        type="text"
                        placeholder="Meta title"
                        value={seoValidation.values.metaTitle}
                        onChange={seoValidation.handleChange}
                        onBlur={seoValidation.handleBlur}
                        error={
                          seoValidation.touched.metaTitle &&
                          seoValidation.errors.metaTitle
                        }
                      />
                      <InputField
                        id="metakeywords"
                        name="metaKeywords"
                        type="text"
                        placeholder="Meta Keywords"
                        value={seoValidation.values.metaKeywords}
                        onChange={seoValidation.handleChange}
                        onBlur={seoValidation.handleBlur}
                        error={
                          seoValidation.touched.metaKeywords &&
                          seoValidation.errors.metaKeywords
                        }
                      />
                    </Col>
                    <Col sm={6}>
                      <TextareaField
                        id="metadescription"
                        name="metaDescription"
                        value={seoValidation.values.metaDescription}
                        onChange={seoValidation.handleChange}
                        onBlur={seoValidation.handleBlur}
                        error={
                          seoValidation.touched.metaDescription &&
                          seoValidation.errors.metaDescription
                        }
                        charCount={seoValidation.values.metaDescription.length}
                      />
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button
                      type="submit"
                      className="btn btn-primary waves-effect waves-light"
                    >
                      Save Changes
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Row>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={BlogData}
                    isGlobalFilter={true}
                    isAddBlog={true}
                    customPageSize={10}
                    handleaddBlog={handleaddBlog}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default withRouter(Blog);
