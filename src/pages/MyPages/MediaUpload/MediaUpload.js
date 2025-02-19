import React, { useMemo, useRef, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import {
  Button,
  Card,
  CardBody,
  Container,
  Input,
  Modal,
  ModalBody,
  UncontrolledTooltip,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from "../../../components/Common/TableContainer";
import "./MediaUpload.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MediaUpload = () => {
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleAddMedia = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const newFiles = selectedFiles.map((file, index) => ({
      id: files.length + index + 1,
      file: URL.createObjectURL(file),
      fileName: file.name,
      fileType: file.type,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const renderFilePreview = (file) => {
    if (file.fileType.startsWith("image/")) {
      return (
        <img
          src={file.file}
          alt={file.fileName}
          style={{ width: "70px", height: "70px", objectFit: "cover" }}
        />
      );
    } else if (file.fileType === "application/pdf") {
      return <i className="mdi mdi-file-pdf" style={{ fontSize: "24px" }} />;
    } else if (
      file.fileType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return <i className="mdi mdi-file-excel" style={{ fontSize: "24px" }} />;
    } else {
      return <span>{file.fileName}</span>;
    }
  };

  const handleDeleteFile = () => {
    setFiles(files.filter((file) => file.id !== fileToDelete));
    toast.success("Delete Successfully!");
    setDeleteModal(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        filterable: false,
        disableFilters: true,
        Cell: ({ value }) => <div className="text-body fw-bold">{value}</div>,
      },
      {
        Header: "File",
        accessor: "file",
        filterable: false,
        disableFilters: true,
        Cell: ({ value, row }) => (
          <div className="d-flex align-items-center">
            {renderFilePreview(row.original)}
            <div className="ms-2">
              <h6 className="mb-0">{row.original.fileName}</h6>
              <span className="text-secondary">{row.original.fileType}</span>
            </div>
          </div>
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
              className="text-danger"
              onClick={() => {
                setFileToDelete(row.original.id);
                setDeleteModal(true);
              }}
            >
              <i className="bx bx-trash-alt font-size-20" id="edittooltip"></i>
              <UncontrolledTooltip placement="top" target="edittooltip">
                Delete
              </UncontrolledTooltip>
            </Link>
          </div>
        ),
      },
    ],
    [files]
  );

  document.title = "Media Gallery | Bieprocure";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Media" breadcrumbItem="Media Gallery" />
          <Card>
            <CardBody>
              {files?.length === 0 ? (
                <div className="text-center my-4">
                  <h5>No media selected</h5>
                  <Button
                    color="primary"
                    className="mt-2 me-2"
                    onClick={handleButtonClick}
                  >
                    <i className="mdi mdi-plus me-1" />
                    Upload Media
                  </Button>
                  <Input
                    type="file"
                    innerRef={fileInputRef}
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf,.xlsx,.xls"
                    className="d-none"
                    onChange={handleAddMedia}
                  />
                </div>
              ) : (
                <TableContainer
                  columns={columns}
                  data={files}
                  isAddMedia={true}
                  isGlobalFilter={true}
                  isAddOptions={false}
                  customPageSize={10}
                  className="custom-header-css"
                  handleButtonClick={handleButtonClick}
                  handleAddMedia={handleAddMedia}
                  fileInputRef={fileInputRef}
                />
              )}
            </CardBody>
          </Card>

          {/* Modal for Delete Image */}
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
                  Are you sure you want to permanently delete this file?
                </p>

                <div className="hstack gap-2 justify-content-center mb-0">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteFile}
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
        </Container>
      </div>
    </>
  );
};

export default withRouter(MediaUpload);
