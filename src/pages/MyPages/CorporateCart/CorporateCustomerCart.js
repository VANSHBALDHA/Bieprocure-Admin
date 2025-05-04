import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, UncontrolledTooltip } from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";

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
  const statusColors = {
    Expired: "danger",
    Revised: "warning",
    Cart: "info",
  };

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id", disableFilters: true },
      { Header: "Company Name", accessor: "companyName" },
      { Header: "Name", accessor: "contactPerson" },
      { Header: "Mobile", accessor: "contactMobile" },
      { Header: "Created Date", accessor: "createdDate" },
      { Header: "Updated Date", accessor: "updatedDate" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge color={statusColors[status] || "secondary"}>{status}</Badge>
          );
        },
      },
      { Header: "Amount", accessor: "amount" },
      {
        Header: "Actions",
        accessor: "actions",
        disableFilters: true,
        Cell: ({ row }) => {
          const quote = row.original;
          const isExpired = quote.status === "Expired";
          return (
            <div className="text-center">
              <Link
                to={`/manage-request/cart/corporate-customers/cart-list/${row?.id}`}
                className="text-success"
                target="_blank"
              >
                <i
                  className="mdi mdi-eye-outline font-size-18"
                  id="viewtooltip"
                ></i>
                <UncontrolledTooltip placement="top" target="viewtooltip">
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
            data={tableData}
            isGlobalFilter={true}
            customPageSize={10}
            className="custom-header-css"
          />
        </CardBody>
      </Card>
    </>
  );
};

export default CorporateCustomerCart;
