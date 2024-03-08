import React, { useState } from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  Column,
  usePagination,
  useSortBy,
  useTable,
  TableOptions,
} from "react-table";

function TableHOC<T extends object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string,
  showPagination: boolean = false,
) {
  return function HOC() {
    const [pageSize, setPageSize] = useState<number>(10);

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      nextPage,
      pageCount,
      state: { pageIndex },
      previousPage,
      canNextPage,
      canPreviousPage,
      setPageSize: setTablePageSize,
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: pageSize },
      },
      useSortBy,
      usePagination
    );

    const handlePageSizeChange = (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const newSize = parseInt(e.target.value);
      setPageSize(newSize);
      setTablePageSize(newSize);
    };

    return (
      <div className={containerClassname}>
        <h2 className="heading">{heading}</h2>
        {showPagination && (
          <div className="page-size-selector">
            <label htmlFor="page-size">Show : </label>
            <select
              id="page-size"
              value={pageSize}
              onChange={handlePageSizeChange}
              style={{background:'#fff',color:'#000',width:'max-content',margin:"0 0 0 2rem",padding:'1rem'}}
            >
              {[5, 10, 20, 30].map((size) => (
                <option key={size} value={size} style={{background:'#fff',color:'#000'}}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted && (
                      <span>
                        {" "}
                        {column.isSortedDesc ? (
                          <AiOutlineSortDescending />
                        ) : (
                          <AiOutlineSortAscending />
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {showPagination && (
          <div className="table-pagination">
            <button disabled={!canPreviousPage} onClick={previousPage}>
              Prev
            </button>
            <span>{`${pageIndex + 1} of ${pageCount}`}</span>
            <button disabled={!canNextPage} onClick={nextPage}>
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;
