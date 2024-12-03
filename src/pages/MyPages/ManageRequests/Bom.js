import React, { useMemo, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";
import { bomData } from "../../../common/data/MyFackData";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Bom = () => {
  const [addExcelModel, setExcelModel] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const toggleModal = () => setExcelModel(!addExcelModel);

  const handleAddExcel = () => {
    setUser(null);
    setUploadedFile(null);
    setIsEdit(false);
    toggleModal();
  };

  const handleEditExcel = (excel) => {
    setUser(excel);
    setUploadedFile(excel?.yourExcelFile || null);
    setIsEdit(true);
    toggleModal();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (user && user?.id) || "",
      excel: (user && user?.yourExcel) || "",
      date: (user && user?.uploadedExcelDate) || "",
    },
    validationSchema: Yup.object({
      excel: Yup.mixed()
        .required("Please select an Excel file")
        .test("fileFormat", "Only Excel files are allowed", (value) => {
          return (
            value &&
            (value.type ===
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
              value.type === "application/vnd.ms-excel")
          );
        }),
      date: Yup.string().required("Please select date"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        console.log("Updating user:", values);
      } else {
        console.log("Adding new user:", values);
      }
      toggleModal();
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("excel", file);

    const fileUrl = URL.createObjectURL(file);
    setUploadedFile(fileUrl);
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Customer Name",
        accessor: "customerName",
        filterable: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "Request For Add",
        accessor: "requestOfAdd",
        filterable: true,
      },
      {
        Header: "Requested Date",
        accessor: "customerRequestDate",
        filterable: true,
      },
      {
        Header: "Customer Excel",
        accessor: "excelFile",
        disableFilters: true,
        Cell: ({ value }) => (
          <div className="text-body fw-bold d-flex gap-3 align-items-center">
            <span>{value}</span>
            <Link to="#" className="text-success">
              <i class="bx bxs-download font-size-18" id="downloadtooltip"></i>
              <UncontrolledTooltip placement="top" target="downloadtooltip">
                Download Excel
              </UncontrolledTooltip>
            </Link>
          </div>
        ),
      },
      {
        Header: "Your Excel",
        accessor: "yourExcel",
        disableFilters: true,
      },
      {
        Header: "Excel Date",
        accessor: "uploadedExcelDate",
        filterable: true,
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <div className="d-flex gap-3 align-items-center">
              <Link
                to="#"
                className="text-success"
                onClick={() => handleEditExcel(row.original)}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit Excel
                </UncontrolledTooltip>
              </Link>
              <Link to="#" className="text-success" onClick={handleAddExcel}>
                <i class="bx bx-folder-plus font-size-18" id="addtooltip"></i>
                {/* <i className="mdi mdi-pencil font-size-18" id="addtooltip" /> */}
                <UncontrolledTooltip placement="top" target="addtooltip">
                  Add Excel
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  document.title = "BOM (Bill of Materials) | Bieprocure";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="BOM" breadcrumbItem="BOM (Bill of Materials)" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={bomData}
                    isGlobalFilter={true}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Modal for Add/Edit Customer excel*/}
        <Modal
          isOpen={addExcelModel}
          toggle={toggleModal}
          backdrop="static"
          keyboard={false}
        >
          <ModalHeader toggle={toggleModal} tag="h4">
            {isEdit ? "Edit User Excel" : "Add New Excel"}
          </ModalHeader>
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Col className="col-12">
                  <div className="mb-3">
                    <Label className="form-label">Upload Your Excel</Label>
                    <Input
                      type="file"
                      name="excel"
                      accept=".xlsx, .xls"
                      onChange={handleFileChange}
                      onBlur={formik.handleBlur}
                      invalid={
                        formik.touched.excel && formik.errors.excel
                          ? true
                          : false
                      }
                    />
                    {formik.touched.excel && formik.errors.excel ? (
                      <FormFeedback type="invalid">
                        {formik.errors.excel}
                      </FormFeedback>
                    ) : null}
                    {formik.values.excel && (
                      <div className="mt-2">
                        <strong>Selected File :- </strong>
                        {formik.values.excel.name}
                      </div>
                    )}
                    {uploadedFile && (
                      <div className="mt-2">
                        <a
                          href={uploadedFile}
                          download={formik.values.excel.name}
                        >
                          Download Uploaded File
                        </a>
                      </div>
                    )}
                  </div>
                </Col>
                <Col className="col-12">
                  <div className="mb-3">
                    <Label className="form-label">Select Date</Label>
                    <Input
                      name="date"
                      type="date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.date || ""}
                      invalid={
                        formik.touched.date && formik.errors.date ? true : false
                      }
                    />
                    {formik.touched.date && formik.errors.date ? (
                      <FormFeedback type="invalid">
                        {formik.errors.date}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="text-end">
                    <Button type="submit" color="success">
                      {isEdit ? "Update" : "Upload"}
                    </Button>
                  </div>
                </Col>
              </Row>
            </form>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default withRouter(Bom);
