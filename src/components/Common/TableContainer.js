import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import JobListGlobalFilter from "../../components/Common/GlobalSearchFilter";
import { useNavigate } from "react-router-dom";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isJobListGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <React.Fragment>
      <Col md={4}>
        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
          <div className="position-relative">
            <label htmlFor="search-bar-0" className="search-label">
              <span id="search-bar-0-label" className="sr-only">
                Search this table
              </span>
              <input
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                id="search-bar-0"
                type="text"
                className="form-control"
                placeholder={`${count} records...`}
                value={value || ""}
              />
            </label>
            <i className="bx bx-search-alt search-icon"></i>
          </div>
        </div>
      </Col>
      {isJobListGlobalFilter && <JobListGlobalFilter />}
    </React.Fragment>
  );
}

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isJobListGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  className,
  customPageSizeOptions,
  isAddCertificate,
  handleAddCertificate,
  isAddBrand,
  handleAddBrand,
  isAddCategory,
  handleAddCategory,
  isAddSubCategory,
  handleAddSubCategory,
  isAddSubSubCategory,
  handleAddSubSubCategory,
  isAddFeatures,
  handleAddFeatures,
  isAddReservedProduct,
  handleAddReservedProduct,
  isAddMedia,
  fileInputRef,
  handleButtonClick,
  handleAddMedia,
  isAddProduct,
  isAddBlog,
  handleaddBlog,
  isAddAdminUser,
  handleAddAdminUser,
  handleAddReceivedaAmount,
}) => {
  const navigate = useNavigate();
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
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: false,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };
  return (
    <Fragment>
      <Row className="mb-2">
        <Col md={customPageSizeOptions ? 2 : 1} className="col-md-2">
          <select
            className="form-select"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Col>
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            isJobListGlobalFilter={isJobListGlobalFilter}
          />
        )}
        {isAddOptions && (
          <Col sm="6">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded  mb-2 me-2"
                onClick={handleOrderClicks}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Order
              </Button>
            </div>
          </Col>
        )}
        {isAddUserList && (
          <Col sm="6">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleUserClick}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New User
              </Button>
            </div>
          </Col>
        )}
        {isAddCustList && (
          <Col sm="6">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded mb-2 me-2"
                onClick={handleCustomerClick}
              >
                <i className="mdi mdi-plus me-1" />
                New Customers
              </Button>
            </div>
          </Col>
        )}
        {isAddCertificate && (
          <Col sm="6">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleAddCertificate}
              >
                <i className="mdi mdi-plus me-1" />
                Add Certificate
              </Button>
            </div>
          </Col>
        )}
        {isAddBrand && (
          <Col sm="6">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleAddBrand}
              >
                <i className="mdi mdi-plus me-1" />
                Add Brand
              </Button>
            </div>
          </Col>
        )}
        {isAddCategory && (
          <Col sm="6">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleAddCategory}
              >
                <i className="mdi mdi-plus me-1" />
                Add Category
              </Button>
            </div>
          </Col>
        )}
        {isAddSubCategory && (
          <Col sm="6">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleAddSubCategory}
              >
                <i className="mdi mdi-plus me-1" />
                Add Sub Category
              </Button>
            </div>
          </Col>
        )}
        {isAddSubSubCategory && (
          <Col sm="6">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleAddSubSubCategory}
              >
                <i className="mdi mdi-plus me-1" />
                Add Sub-Sub Category
              </Button>
            </div>
          </Col>
        )}
        {isAddFeatures && (
          <Col sm="6">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleAddFeatures}
              >
                <i className="mdi mdi-plus me-1" />
                Add Feature
              </Button>
            </div>
          </Col>
        )}
        {isAddReservedProduct && (
          <Col sm="6">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleAddReservedProduct}
              >
                <i className="mdi mdi-plus me-1" />
                Add Inventory
              </Button>
            </div>
          </Col>
        )}

        {isAddMedia && (
          <Col sm="6">
            <div className="text-sm-end">
              <Button
                color="primary"
                className="mb-2 me-2"
                onClick={handleButtonClick}
              >
                <i className="mdi mdi-plus me-1" />
                Upload Media
              </Button>
              <Input
                type="file"
                innerRef={fileInputRef}
                multiple
                accept=".jpg,.jpeg,.png,.pdf,.xlsx,.xls"
                className="d-none"
                onChange={handleAddMedia}
              />
            </div>
          </Col>
        )}

        {isAddProduct && (
          <Col sm="6">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={() => navigate("/manage-products/add-product")}
              >
                <i className="mdi mdi-plus me-1" />
                Add Product
              </Button>
            </div>
          </Col>
        )}

        {isAddBlog && (
          <Col sm="6">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleaddBlog}
              >
                <i className="mdi mdi-plus me-1" />
                Add Blog
              </Button>
            </div>
          </Col>
        )}
        {isAddAdminUser && (
          <Col sm="6">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleAddAdminUser}
              >
                <i className="mdi mdi-plus me-1" />
                Add User
              </Button>
            </div>
          </Col>
        )}

        {handleAddReceivedaAmount && (
          <Col sm="6">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleAddReceivedaAmount}
              >
                <i className="mdi mdi-plus me-1" />
                Add Received Amt
              </Button>
            </div>
          </Col>
        )}
      </Row>

      <div className="table-responsive react-table">
        <Table bordered hover {...getTableProps()} className={className}>
          <thead className="table-light table-nowrap">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id}>
                    <div className="mb-2" {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row className="justify-content-md-end justify-content-center align-items-center">
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
            onChange={onChangeInInput}
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
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
