import React, { useMemo } from "react";
import TableContainer from "../../../components/Common/TableContainer";
import { Badge, Card, CardBody, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import { ordersData } from "../../../common/data/MyFackData";

const CorporateOrder = () => {
  const statusColors = {
    "Partially Delivered": "warning",
    "Fully Delivered": "success",
  };

  const columns = useMemo(
    () => [
      {
        Header: "OID",
        accessor: "orderId",
        disableFilters: true,
      },
      {
        Header: "Person Name",
        accessor: "customer.cartUser",
      },
      {
        Header: "Contact Person Mobile",
        accessor: "customer.communication.phone",
      },
      {
        Header: "Ordered Date",
        accessor: "orderDetails.orderedDate",
      },
      {
        Header: "Part Shipment",
        accessor: "orderDetails.partShipment",
      },
      {
        Header: "Status",
        accessor: "orderDetails.status",
        Cell: ({ row }) => {
          const status = row.original.orderDetails.status;
          return (
            <Badge color={statusColors[status] || "secondary"}>{status}</Badge>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        disableFilters: true,
        Cell: ({ row }) => {
          const id = row.original.orderId;
          return (
            <div className="text-center">
              <Link
                to={`/manage-customers/corporate/corporate-order-details/${id}`}
                className="text-success"
                target="_blank"
              >
                <i
                  className="mdi mdi-eye-outline font-size-18"
                  id={`viewtooltip-${id}`}
                />
                <UncontrolledTooltip
                  placement="top"
                  target={`viewtooltip-${id}`}
                >
                  View
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Card>
        <CardBody>
          <TableContainer
            columns={columns}
            data={ordersData}
            isGlobalFilter={true}
            customPageSize={10}
            className="custom-header-css"
          />
        </CardBody>
      </Card>
    </>
  );
};

export default CorporateOrder;
