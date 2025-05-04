import React, { useState } from "react";
import { Badge, Button, Card, CardBody, Input, Row } from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";

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

  const statusColorMap = {
    Pending: "warning",
    Shipped: "info",
    Delivered: "success",
    "Modified Shipment": "primary",
    Cancelled: "danger",
  };

  const columns = [
    { Header: "Sr.", accessor: "id", disableFilters: true },
    { Header: "Invoice Number", accessor: "invoiceNumber" },
    { Header: "Shipment Number", accessor: "shipmentNumber" },
    {
      Header: "Shipment Status",
      accessor: "status",
      Cell: ({ value }) => {
        const status = statusOptions.find((opt) => opt.label === value);
        const label = status ? status.label : value;
        const color = statusColorMap[label] || "secondary";
        return (
          <Badge color={color} className="p-1" style={{ fontSize: "12px" }}>
            {label}
          </Badge>
        );
      },
    },
    { Header: "Date", accessor: "date" },
    { Header: "Action", accessor: "action", disableFilters: true },
  ];

  return (
    <>
      <Card>
        <CardBody>
          <TableContainer
            columns={columns}
            data={shipments}
            isGlobalFilter={true}
            customPageSize={10}
            className="custom-header-css"
          />
        </CardBody>
      </Card>
    </>
  );
};

export default CorporateShipment;
