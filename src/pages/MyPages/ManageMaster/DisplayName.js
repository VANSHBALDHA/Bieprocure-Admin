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
import { displayData } from "../../../common/data/MyFackData";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const DisplayName = () => {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({ id: "", name: "", status: "" });

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
      status: editData.status || "active",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter a display name"),
      status: Yup.string().required("Please select a status"),
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Input>
                {validation.touched.status && validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null}
              </div>
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
