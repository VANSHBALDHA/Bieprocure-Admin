import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productsData } from "../../../common/data/MyFackData";
import withRouter from "../../../components/Common/withRouter";
import { Container } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const ViewProduct = () => {
  const { id } = useParams();
  document.title = `View product - ${id} | Bieprocure`;

  const [viewDatas, setViewDatas] = useState(null);

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
          <div className="row">
            <div className="col-md-4 col-12">
              <div className="p-2 border border-dashed rounded text-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKgdm33MwqIz0Zyq-BptQv-NDsKpBmucHS1Q&s"
                  alt="Product"
                  className="img-fluid"
                />
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
