import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";
import { Link } from "react-router-dom";

const CorporateShipment = () => {
  const [shipments, setShipments] = useState([
    {
      id: 1,
      invoiceNumber: "O-10234-20250429/001/INV-1",
      shipmentNumber: "INV-1",
      status: "Shipped",
      date: "29-04-2025",
    },
    {
      id: 2,
      invoiceNumber: "O-10235-20250430/001/INV-1",
      shipmentNumber: "INV-1",
      status: "In Transit",
      date: "30-04-2025",
    },
  ]);

  const handleEdit = (datas) => {
    console.log(datas);
  };

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "shipped", label: "Shipped" },
    { value: "in_transit", label: "In Transit" },
    { value: "out_for_delivery", label: "Out for Delivery" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const statusColorMap = {
    Pending: "secondary",
    Shipped: "info",
    "In Transit": "primary",
    "Out for Delivery": "warning",
    Delivered: "success",
    Cancelled: "danger",
  };

  const columns = [
    { Header: "Sr.", accessor: "id", disableFilters: true },
    { Header: "Invoice Number", accessor: "invoiceNumber" },
    { Header: "Shipment Number", accessor: "shipmentNumber" },
    {
      Header: "Shipment Status",
      accessor: "status",
      disableFilters: true,
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
    {
      Header: "Action",
      accessor: "action",
      disableFilters: true,
      Cell: ({ row }) => {
        return (
          <div className="d-flex gap-3 align-items-center">
            <Link
              to="#"
              className="text-success"
              onClick={() => handleEdit(row.original)}
            >
              <i
                className="mdi mdi-pencil font-size-18"
                id={`edit-${row.original.id}`}
              />
              <UncontrolledTooltip
                placement="top"
                target={`edit-${row.original.id}`}
              >
                Edit Shipment Status
              </UncontrolledTooltip>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Row className="d-flex justify-content-between align-items-center">
        <Col lg="6" className="mb-2">
          <h5 className="m-0">Manage Shipment</h5>
        </Col>
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
      </Row>
    </>
  );
};

export default CorporateShipment;
