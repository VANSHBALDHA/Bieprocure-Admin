import React from "react";
import "./MediaUpload.css";
import {
  Button,
  Card,
  CardImg,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const MediaModel = ({
  imageModel,
  toggleModal,
  handleUploadImage,
  selectedImage,
  setSelectedImage,
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
          Select image
        </ModalHeader>
        <ModalBody style={{ height: "calc(100vh - 80px)", overflowY: "auto" }}>
          <div className="media-box">
            {dummyImages?.map((img) => {
              return (
                <>
                  <Card
                    key={img.id}
                    style={{
                      position: "relative",
                      border:
                        selectedImage?.id === img.id
                          ? "2px solid #74788d"
                          : "1px solid #e9ebec",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedImage(img)}
                    className="mb-0"
                  >
                    <div className="img-media">
                      <CardImg src={img?.image} alt={img.id} />
                      {selectedImage?.id === img.id && (
                        <i
                          class="bx bx-check"
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
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              if (selectedImage) {
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
