import React, { Fragment } from "react";
import {
  useExpanded,
  useFilters,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { GlobalFilter } from "@/components";
import { sort_icons } from "@/assets";

const Table = ({
  columns,
  data,
  // renderRowSubComponent,
  show_filters,
  table_height,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      autoResetSortBy: false,
      autoResetPage: false,
      autoResetExpanded: false,
      pagination: false,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    useRowSelect
  );
  const { SortIcon, SortDownIcon, SortUpIcon } = sort_icons;

  return (
    <section>
      {show_filters && (
        <section className={`flex flex-col justify-start gap-3  px-2`}>
          {/* the global search section */}
          <GlobalFilter
            pre_global_filtered_rows={preGlobalFilteredRows}
            global_filter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />

          {/* the filter by role section */}
          <div
            className={`flex w-fit  flex-col items-center gap-1 duration-300 lg:flex-row`}
          >
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column) =>
                column.Filter ? (
                  <div key={column.id}>{column.render("Filter")}</div>
                ) : null
              )
            )}
          </div>
        </section>
      )}

      {/* tabel */}
      <section
        className={`mt-4 flex w-auto flex-col overflow-y-hidden scrollbar-hide  ${
          show_filters ? table_height : "h-fit"
        }`}
      >
        <div className="w-full overflow-auto rounded-lg border scrollbar-hide">
          <table
            {...getTableProps()}
            className="divide-gray-200 mx-auto w-full  min-w-full max-w-4xl divide-y overflow-hidden whitespace-nowrap  rounded-lg bg-white"
          >
            {/* the table head */}
            <thead className="bg-gray-50">
              {headerGroups.map((header_group, header_group_index) => (
                <tr
                  key={header_group_index}
                  {...header_group.getHeaderGroupProps()}
                >
                  {header_group.headers.map((column, column_index) => (
                    <th
                      key={column_index}
                      scope="col"
                      className="text-gray-500 group px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div className="flex items-center justify-between">
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <SortDownIcon className="text-c_gray h-5 w-5" />
                            ) : (
                              <SortUpIcon className="text-c_gray h-5 w-5" />
                            )
                          ) : (
                            <SortIcon className="text-c_gray h-5  w-5 opacity-0 group-hover:opacity-100" />
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {/* the table body */}
            <tbody
              {...getTableBodyProps()}
              className="divide-gray-200 divide-y bg-white duration-300"
            >
              {rows.map((row, i) => {
                // new
                prepareRow(row);
                return (
                  <Fragment key={i}>
                    <tr
                      {...row.getRowProps()}
                      className={`${
                        row.depth === 0 ? "bg-white" : "bg-c_green_light/10 "
                      }`}
                    >
                      {row.cells.map((cell, cell_index) => {
                        return (
                          <td
                            key={cell_index}
                            {...cell.getCellProps()}
                            className="w-[325px] max-w-[325px] truncate whitespace-nowrap px-6 py-2 text-sm first-letter:capitalize hover:break-words"
                            role="cell"
                          >
                            {cell.column.Cell.name === "defaultRenderer" ? (
                              <p className="text-gray-500 text-sm ">
                                {cell.render("Cell")}
                              </p>
                            ) : (
                              cell.render("Cell")
                            )}
                          </td>
                        );
                      })}
                    </tr>

                    {row.isExpanded ? (
                      <tr>
                        <td colSpan={visibleColumns.length}>
                          {renderRowSubComponent({ row })}
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default Table;
