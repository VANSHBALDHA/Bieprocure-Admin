import React from "react";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";

const tableData = [
  {
    id: 1,
    companyName: "ABC Corp",
    contactPerson: "John Doe",
    contactMobile: "9876543210",
    createdDate: "2024-02-20",
    updatedDate: "2024-02-22",
    status: "Expired",
    amount: "₹5000",
  },
  {
    id: 2,
    companyName: "XYZ Ltd",
    contactPerson: "Jane Smith",
    contactMobile: "9123456789",
    createdDate: "2024-02-18",
    updatedDate: "2024-02-21",
    status: "Order Confirmed",
    amount: "₹3000",
  },
];

const CorporateCustomerCart = () => {
  return (
    <>
      <div className="table-responsive mt-2">
        <table
          className="table table-bordered"
          style={{
            backgroundColor: "#f8f9fa",
            border: "1px solid #ddd",
            borderRadius: "8px",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Company Name</th>
              <th>Contact Person Name</th>
              <th>Contact Person Mobile</th>
              <th>Created Date</th>
              <th>Updated Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.companyName}</td>
                <td>{item.contactPerson}</td>
                <td>{item.contactMobile}</td>
                <td>{item.createdDate}</td>
                <td>{item.updatedDate}</td>
                <td>{item.status}</td>
                <td>{item.amount}</td>
                <td>
                  <div className="text-center">
                    <Link to={`/manage-request/cart/corporate-customers/cart-list/${item?.id}`} className="text-success" target="_blank">
                      <i
                        className="mdi mdi-eye-outline font-size-18"
                        id="viewtooltip"
                      ></i>
                      <UncontrolledTooltip placement="top" target="viewtooltip">
                        View
                      </UncontrolledTooltip>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CorporateCustomerCart;
