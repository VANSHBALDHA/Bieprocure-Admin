import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productsData } from "../../../common/data/MyFackData";
import withRouter from "../../../components/Common/withRouter";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ViewProduct = () => {
  const { id } = useParams();
  document.title = `View product - ${id} | Bieprocure`;

  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "https://media.istockphoto.com/id/1302742624/photo/aerial-view-of-lake-tahoe-shoreline-with-mountains-and-turquoise-blue-waters.jpg?b=1&s=170667a&w=0&k=20&c=AiB8q6RRezpfRWizgJh1aLrzP9012ZNywdzzxMcG3SE=",
    "https://images.unsplash.com/photo-1506057213367-028a17ec52e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1475776408506-9a5371e7a068?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://media.istockphoto.com/id/1388623445/photo/bear-skin-state-trail-bridge.jpg?b=1&s=170667a&w=0&k=20&c=guB8b7svJuFkYd0L9SecXafAHn5eI2dZSBolrZlaA4s=",
  ];

  const handleThumbnailClick = (index) => {
    setCurrentSlide(index);
  };

  const [viewDatas, setViewDatas] = useState(null);

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    thumbnails: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    thumbnail: {
      width: "80px",
      height: "60px",
      objectFit: "cover",
      cursor: "pointer",
      borderRadius: "4px",
      border: "2px solid transparent",
      transition: "border-color 0.3s",
    },
    carouselWrapper: {
      flex: 1,
      maxWidth: "700px",
    },
    carouselImage: {
      width: "100%",
      height: "350px",
      objectFit: "cover",
      borderRadius: "8px",
    },
  };

  const viewData = productsData?.find((product) => product?.productCode === id);

  useEffect(() => {
    if (viewData) {
      setViewDatas(viewData);
    }
  }, [viewData]);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Product"
            breadcrumbItem={`View product - ${id}`}
          />
          <Card>
            <CardBody>
              <CardTitle className="h4 mb-3">Meta Data</CardTitle>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Meta Title</Label>
                    <Input
                      type="text"
                      value="Sample Meta Title"
                      readOnly
                      className="form-control-plaintext"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Meta Keywords</Label>
                    <Input
                      type="text"
                      value="blog, SEO, content, marketing"
                      readOnly
                      className="form-control-plaintext"
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label>Meta Description</Label>
                    <textarea
                      value="This is a sample meta description for the blog post."
                      className="form-control-plaintext"
                      rows="5"
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <div className="row">
            <div className="col-md-4 col-12">
              <div style={styles.container}>
                <div style={styles.thumbnails}>
                  {images.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Thumbnail ${index}`}
                      style={{
                        ...styles.thumbnail,
                        borderColor:
                          currentSlide === index ? "#007BFF" : "transparent",
                      }}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  ))}
                </div>

                <div style={styles.carouselWrapper}>
                  <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    selectedItem={currentSlide}
                    onChange={(index) => setCurrentSlide(index)}
                  >
                    {images.map((src, index) => (
                      <div key={index}>
                        <img
                          src={src}
                          alt={`Slide ${index}`}
                          style={styles.carouselImage}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>

            <div className="col-md-8 col-12">
              <div className="row">
                <div className="flex-grow-1">
                  <h4 className="fw-bold">Interactive Cat Toy - {id}</h4>
                  <div className="hstack gap-3 flex-wrap">
                    <div>
                      <a href="#" className="text-primary d-block">
                        Honeywell
                      </a>
                    </div>
                    <div className="vr"></div>
                    <div className="text-muted">
                      Published :
                      <span className="text-body fw-medium">
                        {" "}
                        03 December, 2024
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 g-3">
                  <div className="p-2 border border-dashed rounded text-center">
                    <p className="mb-2 text-uppercase text-muted fs-13">
                      Selling Price (Per Item) :
                    </p>
                    <h5 className="mb-0">₹120.40</h5>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 g-3">
                  <div className="p-2 border border-dashed rounded text-center">
                    <p className="mb-2 text-uppercase text-muted fs-13">
                      Minimum Purchase :
                    </p>
                    <h5 className="mb-0">10</h5>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 g-3">
                  <div className="p-2 border border-dashed rounded text-center">
                    <p className="mb-2 text-uppercase text-muted fs-13">
                      Minimum Stock :
                    </p>
                    <h5 className="mb-0">15</h5>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 g-3">
                  <div className="p-2 border border-dashed rounded text-center">
                    <p className="mb-2 text-uppercase text-muted fs-13">
                      MRP (Per Item) :
                    </p>
                    <h5 className="mb-0">₹15.00</h5>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-muted">
                <h5 className="fs-15 fw-bold">Short Description :</h5>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </div>

              <div className="mt-4 text-muted">
                <h5 className="fs-15 fw-bold">Long Description :</h5>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>

              <h5 className="mt-4 fw-bold">Product Details:</h5>
              <div className="table-responsive">
                <table className="table table-sm table-borderless align-middle description-table">
                  <tbody>
                    <tr>
                      <th>Display Name</th>
                      <td>Power Distribution Module</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td>Utility Module</td>
                    </tr>
                    <tr>
                      <th>Sub-Category</th>
                      <td>Utility Module</td>
                    </tr>
                    <tr>
                      <th>Sub-sub Category</th>
                      <td>Utility Module</td>
                    </tr>
                    <tr>
                      <th>Manufacturer Part No.</th>
                      <td>mku120347y81</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default withRouter(ViewProduct);
