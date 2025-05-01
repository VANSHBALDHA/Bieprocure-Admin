import React, { useState } from "react";
import { Container, Table, Button, Input } from "reactstrap";

const CorporateShipment = () => {
  const [shipments, setShipments] = useState([
    {
      id: 2,
      invoiceNumber: "O-10235-20250430/001/INV-1",
      shipmentNumber: "INV-1",
      status: "Modified Shipment",
      date: "30-04-2025",
    },
    {
      id: 1,
      invoiceNumber: "O-10234-20250429/001/INV-1",
      shipmentNumber: "INV-1",
      status: "Delivered",
      date: "29-04-2025",
    },
  ]);

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "modified", label: "Modified Shipment" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const handleSelectChange = (e, index) => {
    const updatedShipments = [...shipments];
    updatedShipments[index].status = e.target.value;
    setShipments(updatedShipments);
  };

  return (
    <>
      <div className="table-responsive mt-3">
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
              <th>Sr.</th>
              <th>Invoice Number</th>
              <th>Shipment Number</th>
              <th>Shipment Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment, index) => (
              <tr key={shipment.id}>
                <td>{shipment.id}</td>
                <td>{shipment.invoiceNumber}</td>
                <td>{shipment.shipmentNumber}</td>
                <td>
                  <Input
                    type="select"
                    name="shipment_status"
                    value={shipment.status}
                    onChange={(e) => handleSelectChange(e, index)}
                    className="form-control"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.label}>
                        {opt.label}
                      </option>
                    ))}
                  </Input>
                </td>
                <td>{shipment.date}</td>
                <td>
                  <Button color="primary" size="sm">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CorporateShipment;
