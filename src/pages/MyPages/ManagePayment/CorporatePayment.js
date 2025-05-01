import React, { Fragment } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input } from "reactstrap";

const data = [
  {
    sr: 1,
    orderId: "O-10235-20250430",
    piId: "NA",
    invoiceId: "NA",
    description: "10% Advance against Order",
    percentage: "10%",
    days: "0 Days",
    amount: "Rs. 33,040.00",
    receivedAmount: "Rs. 14,040.00",
    dueDate: "03-Apr-2025",
  },
  {
    sr: 2,
    orderId: "O-10235-20250430",
    piId: "O-10235-20250402/001/PRO-1",
    invoiceId: "O-10235-20250430/001/INV-1",
    description: "Advance With Order Confirmation",
    percentage: "10%",
    days: "0 Days",
    amount: "Rs. 33,040.00",
    receivedAmount: "Rs. 14,040.00",
    dueDate: "03-Apr-2025",
  },
  {
    sr: 3,
    orderId: "O-10235-20250430",
    piId: "O-10235-20250402/001/PRO-1",
    invoiceId: "O-10235-20250430/001/INV-1",
    description: "Advance Against PI on Readiness",
    percentage: "40%",
    days: "10 Days",
    amount: "Rs. 1,32,160.00",
    receivedAmount: "Rs. 0.00",
    dueDate: "30-Apr-2025",
  },
  {
    sr: 4,
    orderId: "O-10235-20250430",
    piId: "O-10235-20250402/001/PRO-1",
    invoiceId: "O-10235-20250430/001/INV-1",
    description: "Against Invoice",
    percentage: "50%",
    days: "30 Days",
    amount: "Rs. 1,62,200.00",
    receivedAmount: "Rs. 0.00",
    dueDate: "03-Apr-2025",
  },
  {
    sr: 5,
    orderId: "O-10235-20250430",
    piId: "O-10235-20250402/001/PRO-2",
    invoiceId: "Yet Not Created",
    description: "Advance With Order Confirmation",
    percentage: "10%",
    days: "0 Days",
    amount: "Rs. 33,040.00",
    receivedAmount: "Rs. 0.00",
    dueDate: "03-Apr-2025",
  },
  {
    sr: 6,
    orderId: "O-10235-20250430",
    piId: "Yet Not Created",
    invoiceId: "Yet Not Created",
    description: "Advance Against PI on Readiness",
    percentage: "40%",
    days: "10 Days",
    amount: "Rs. 1,32,160.00",
    receivedAmount: "Rs. 0.00",
    dueDate: "Yet Not Created",
  },
  {
    sr: 7,
    orderId: "O-10235-20250430",
    piId: "O-10235-20250402/001/PRO-2",
    invoiceId: "Yet Not Created",
    description: "Against Invoice",
    percentage: "50%",
    days: "30 Days",
    amount: "Rs. 1,62,200.00",
    receivedAmount: "Rs. 0.00",
    dueDate: "Yet Not Created",
  },
];

const columns = [
  { Header: "Sr.", accessor: "sr" },
  { Header: "Order ID", accessor: "orderId" },
  { Header: "PI ID", accessor: "piId" },
  { Header: "Invoice ID", accessor: "invoiceId" },
  { Header: "Description", accessor: "description" },
  { Header: "In (%)", accessor: "percentage" },
  { Header: "Days", accessor: "days" },
  { Header: "Amount", accessor: "amount" },
  { Header: "Received Amount", accessor: "receivedAmount" },
  { Header: "Payment Due Date", accessor: "dueDate" },
];

const CorporatePayment = () => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 50 },
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  );

  return (
    <>
      <Row className="d-flex justify-content-between align-items-center">
        <Col lg="6">
          <h5 className="m-0">Manage Payment</h5>
        </Col>
        <Col lg="6">
          <div className="text-sm-end">
            <Button type="button" color="primary" className="btn me-2">
              <i className="mdi mdi-plus me-1" />
              Add Received Amt
            </Button>
          </div>
        </Col>
      </Row>
      <div className="table-responsive react-table mt-3">
        <Table bordered hover {...getTableProps()}>
          <thead className="table-light table-nowrap">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span style={{ marginLeft: "5px" }}>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "🔽"
                          : "🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row className="justify-content-md-end justify-content-center align-items-center mb-3">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </Col>
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button
              color="primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CorporatePayment;
