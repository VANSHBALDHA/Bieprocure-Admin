import React from "react";
import "./MediaUpload.css";
import {
  Button,
  Card,
  CardImg,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

const MediaModel = ({
  imageModel,
  toggleModal,
  handleUploadImage,
  selectedImage,
  setSelectedImage,
  modalType,
}) => {
  const dummyImages = [
    {
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl7Oyp-7SY6UnpABxdhGShRSwD_ud-q7H2g&s",
    },
    {
      id: 2,
      image:
        "https://martfury02.magebig.com/media/webps/jpg/media/catalog/product/cache/6b71b208d69c1b4f2b5e9e787cb531fa/1/4/14b.webp",
    },
    {
      id: 3,
      image:
        "https://martfury02.magebig.com/media/webps/jpg/media/catalog/product/cache/6b71b208d69c1b4f2b5e9e787cb531fa/5/1/51a.webp",
    },
    {
      id: 4,
      image:
        "https://martfury02.magebig.com/media/webps/jpg/media/catalog/product/cache/6b71b208d69c1b4f2b5e9e787cb531fa/5/2/52a.webp",
    },
    {
      id: 5,
      image:
        "https://martfury02.magebig.com/media/webps/jpg/media/catalog/product/cache/6b71b208d69c1b4f2b5e9e787cb531fa/4/1/41b.webp",
    },
    {
      id: 6,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd56VCudljPHJdDTd--q83PHn7HIPfsUefg&s",
    },
    {
      id: 7,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd56VCudljPHJdDTd--q83PHn7HIPfsUefg&s",
    },
    {
      id: 8,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd56VCudljPHJdDTd--q83PHn7HIPfsUefg&s",
    },
    {
      id: 9,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd56VCudljPHJdDTd--q83PHn7HIPfsUefg&s",
    },
    {
      id: 10,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd56VCudljPHJdDTd--q83PHn7HIPfsUefg&s",
    },
    {
      id: 11,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd56VCudljPHJdDTd--q83PHn7HIPfsUefg&s",
    },
    {
      id: 12,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd56VCudljPHJdDTd--q83PHn7HIPfsUefg&s",
    },
    {
      id: 13,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd56VCudljPHJdDTd--q83PHn7HIPfsUefg&s",
    },
    {
      id: 14,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd56VCudljPHJdDTd--q83PHn7HIPfsUefg&s",
    },
  ];

  const isSelected = (img) =>
    modalType === "other"
      ? selectedImage?.some((i) => i.id === img.id)
      : selectedImage?.[0]?.id === img.id;

  const handleSelectImage = (img) => {
    if (modalType === "other") {
      const exists = selectedImage?.find((i) => i.id === img.id);
      if (exists) {
        setSelectedImage(selectedImage.filter((i) => i.id !== img.id));
      } else {
        if ((selectedImage?.length || 0) < 5) {
          setSelectedImage([...(selectedImage || []), img]);
        } else {
          alert("You can select up to 5 images only.");
        }
      }
    } else {
      setSelectedImage([img]);
    }
  };

  return (
    <>
      <Modal
        isOpen={imageModel}
        toggle={toggleModal}
        backdrop="static"
        keyboard={false}
        size="xl"
        scrollable={true}
        centered={true}
        style={{ maxHeight: "100vh", maxWidth: "90%" }}
      >
        <ModalHeader toggle={toggleModal} tag="h4">
          Select image{modalType === "other" ? "s" : ""}
        </ModalHeader>
        <ModalBody style={{ height: "calc(100vh - 80px)", overflowY: "auto" }}>
          <Row>
            <Col lg={9}>
              <div className="media-box">
                {dummyImages?.map((img) => {
                  return (
                    <>
                      <Card
                        key={img.id}
                        style={{
                          position: "relative",
                          border: isSelected(img)
                            ? "2px solid #74788d"
                            : "1px solid #e9ebec",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSelectImage(img)}
                        className="mb-0"
                      >
                        <div className="img-media">
                          <CardImg src={img?.image} alt={img.id} />
                          {isSelected(img) && (
                            <i
                              className="bx bx-check"
                              style={{
                                position: "absolute",
                                top: "-10px",
                                color: "#fff",
                                right: "-10px",
                                fontSize: "24px",
                                zIndex: 10,
                                backgroundColor: "#74788d",
                                borderRadius: "50%",
                              }}
                            ></i>
                          )}
                        </div>
                      </Card>
                    </>
                  );
                })}
              </div>
            </Col>
            <Col lg={3}>
              {selectedImage?.length > 0 && (
                <div
                  className="selected-image-details"
                  style={{
                    padding: "10px",
                    border: "1px solid #e9ebec",
                    borderRadius: "5px",
                    background: "#f9f9f9",
                    width: "100%",
                    height: "550px",
                    overflow: "auto",
                  }}
                >
                  <h6 className="text-center mb-2">ATTACHMENT DETAILS</h6>
                  {selectedImage?.map((img) => (
                    <>
                      <div
                        className="mb-3"
                        style={{ border: "1px solid rgb(233, 235, 236)", padding: "8px" }}
                      >
                        <img
                          key={img.id}
                          src={img.image}
                          alt="Selected"
                          className="mb-3"
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "5px",
                            objectFit: "cover",
                          }}
                        />
                        <p className="mb-1">
                          <strong>Uploaded on: </strong>
                          5/1/2025, 11:11:11 AM
                        </p>
                        <p className="mb-1">
                          <strong>File Name: </strong> placeholder.png
                        </p>
                        <p className="mb-1">
                          <strong>File Type: </strong> image/png
                        </p>
                        <p className="mb-1">
                          <strong>File Size: </strong> 87 KB
                        </p>
                        <p className="mb-1">
                          <strong>Dimensions: </strong> 275 x 275
                        </p>
                        <p className="mb-0">
                          <strong>File URL: </strong>
                          <a
                            href="https://via.placeholder.com/275"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            https://via.placeholder.com/275
                          </a>
                        </p>
                      </div>
                    </>
                  ))}
                </div>
              )}
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              if (selectedImage?.length > 0) {
                handleUploadImage(selectedImage);
              }
            }}
          >
            Upload
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default MediaModel;
