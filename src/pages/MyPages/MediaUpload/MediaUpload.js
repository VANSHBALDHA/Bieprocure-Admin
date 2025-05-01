import React, { useMemo, useRef, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
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
  const [editingFile, setEditingFile] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [ImageDimensions, setImageDimensions] = useState("");
  const [imageFileSize, setImageFileSize] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");

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
      uploadedAt: new Date().toLocaleString(),
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleEditFileName = (file) => {
    setEditingFile(file);
    setAltText(file.altText || "");
    setCaption(file.caption || "");
    setTitle(file.fileName || "");
    setDescription(file.description || "");
    setFileUrl(file.file);
    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const fileSize = getFileSize(file.file);
      setImageDimensions(`${width}x${height}`);
      setImageFileSize(fileSize);
    };
    img.src = file.file;
    setEditModal(true);
  };

  const getFileSize = (fileUrl) => {
    const file = new File([fileUrl], fileUrl, { type: "image/*" });
    const sizeInBytes = file.size;
    if (sizeInBytes < 1024) return `${sizeInBytes} B`;
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);
    if (sizeInKB < 1024) return `${sizeInKB} KB`;
    const sizeInMB = (sizeInKB / 1024).toFixed(2);
    return `${sizeInMB} MB`;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result);

        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          const fileSize = getFileSize(file);
          setImageDimensions(`${width}x${height}`);
          setImageFileSize(fileSize);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveFileName = () => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === editingFile.id
          ? { ...file, altText, caption, title, description }
          : file
      )
    );
    setEditModal(false);
    toast.success("File details updated!");
  };

  const handleCopyURL = (file) => {
    navigator.clipboard.writeText(file.original.file);
    toast.success("URL copied to clipboard!");
  };

  const handleDownloadFile = (file) => {
    const link = document.createElement("a");
    link.href = file.original.file;
    link.download = file.original.fileName;
    link.click();
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
    toast.success("File deleted successfully!");
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
          <div className="d-flex media-content">
            {renderFilePreview(row.original)}
            <div className="ms-2">
              <h6 className="mb-0">{row.original.fileName}</h6>
              <p className="text-secondary my-1">{row.original.fileType}</p>
              <div className="image-editing">
                <span onClick={() => handleEditFileName(row.original)}>
                  Edit
                </span>
                <p
                  onClick={() => {
                    setFileToDelete(row.original.id);
                    setDeleteModal(true);
                  }}
                >
                  Delete Permanently
                </p>
                <span>View</span>
              </div>
              <div className="image-editing-copy">
                <span onClick={() => handleCopyURL(row)}>Copy URL</span>
                <p onClick={() => handleDownloadFile(row)}>Download file</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        Header: "Date",
        accessor: "uploadedAt",
        filterable: false,
        disableFilters: true,
        Cell: ({ row }) => (
          <div className="text-body fw-bold">{row.original.uploadedAt}</div>
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
            size="lg"
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
                  If image currently use in anywhere in the system, button would
                  you like to permanently delete from the server
                </p>

                <div className="hstack gap-2 justify-content-center mb-0">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setDeleteModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteFile}
                  >
                    Delete Now
                  </button>
                </div>
              </ModalBody>
            </div>
          </Modal>

          {/* Modal for Editing Image Details */}
          <Modal
            size="xl"
            isOpen={editModal}
            toggle={() => setEditModal(false)}
            scrollable
          >
            <ModalHeader toggle={() => setEditModal(false)} tag="h4">
              Attachment details
            </ModalHeader>
            <div className="modal-content">
              <ModalBody className="px-4 py-4">
                {editingFile && (
                  <>
                    <Row>
                      <Col lg={6} sm={12}>
                        <div className="d-grid align-items-center justify-content-center">
                          <img
                            src={editingFile.file}
                            alt={editingFile.fileName}
                            style={{
                              width: "300px",
                              height: "300px",
                              objectFit: "cover",
                            }}
                          />
                          {/* <div className="text-center">
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleImageChange}
                            />
                          </div> */}
                        </div>
                      </Col>
                      <Col lg={6} sm={12}>
                        <p className="mb-1">
                          <strong>Uploaded on: </strong>
                          {editingFile.uploadedAt}
                        </p>
                        <p className="mb-1">
                          <strong>File Name: </strong> {editingFile.fileName}
                        </p>
                        <p className="mb-1">
                          <strong>File Type: </strong> {editingFile.fileType}
                        </p>
                        <p className="mb-1">
                          <strong>File Size: </strong> {imageFileSize}
                        </p>
                        <p className="mb-4">
                          <strong>Dimensions: </strong> {ImageDimensions}
                        </p>
                        <div className="mb-3 d-flex align-items-center">
                          <Label className="mb-0" style={{ width: "120px" }}>
                            Alternative Text
                          </Label>
                          <Input
                            type="text"
                            value={altText}
                            onChange={(e) => setAltText(e.target.value)}
                            style={{ flex: 1 }}
                          />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                          <Label className="mb-0" style={{ width: "120px" }}>
                            File URL
                          </Label>
                          <Input
                            type="text"
                            value={fileUrl}
                            readOnly
                            style={{ flex: 1 }}
                          />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                          <Label className="mb-0" style={{ width: "120px" }}>
                            Caption
                          </Label>
                          <Input
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            style={{ flex: 1 }}
                          />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                          <Label className="mb-0" style={{ width: "120px" }}>
                            Title
                          </Label>
                          <Input
                            type="text"
                            value={title}
                            readOnly
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ flex: 1 }}
                          />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                          <Label className="mb-0" style={{ width: "120px" }}>
                            Description
                          </Label>
                          <Input
                            type="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ flex: 1 }}
                          />
                        </div>

                        <div className="d-flex justify-content-end">
                          <Button color="primary" onClick={handleSaveFileName}>
                            Save Changes
                          </Button>
                          <Button
                            color="secondary"
                            onClick={() => setEditModal(false)}
                            className="ms-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </>
                )}
              </ModalBody>
            </div>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default withRouter(MediaUpload);
