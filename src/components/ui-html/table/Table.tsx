import { Fragment, useEffect, useState } from "react";
import type { FC } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnFiltersState, FilterFn } from "@tanstack/react-table";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import { sort_icons } from "@/assets";

type TableProps = {
  data: any[];
  columns: any[];
  show_filters: boolean;
};

const Table: FC<TableProps> = ({ data, columns, show_filters }) => {
  /**
   * Component States
   */

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { SortIcon, SortDownIcon, SortUpIcon } = sort_icons;
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
    }, [value]);

    return (
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }

  return (
    <section className="pb-2">
      {show_filters && (
        <section className={`flex flex-col justify-start gap-3  px-2`}>
          {/* the global search section */}
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="font-lg border-block border p-2 shadow"
            placeholder="Search all columns..."
          />

          {/* the filter by role section */}
          {/* <div
            className={`flex w-fit  flex-col items-center gap-1 duration-300 lg:flex-row ${
              isSidebarOpen
                ? `${headerGroups.length >= 2 ? "sm:flex-col" : "sm:flex-row "}`
                : "sm:flex-row md:flex-row"
            }`}
          >
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column) =>
                column.Filter ? (
                  <div key={column.id}>{column.render("Filter")}</div>
                ) : null
              )
            )}
          </div> */}
        </section>
      )}

      {/* tabel */}
      <section
        className={`mt-4 flex w-auto flex-col overflow-y-hidden scrollbar-hide`}
      >
        <div className="w-full overflow-auto  rounded-[2rem] border border-gray scrollbar-hide">
          <table className="mx-auto w-full min-w-full  max-w-4xl divide-y divide-gray/50 overflow-hidden whitespace-nowrap  rounded-lg bg-white">
            {/* the table head */}
            <thead className="">
              {table.getHeaderGroups() &&
                table.getHeaderGroups()?.map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers &&
                      headerGroup.headers?.map((header) => (
                        <th
                          key={header.id}
                          scope="col"
                          className="group px-6 py-3 text-left text-xs font-medium uppercase tracking-wider  "
                        >
                          <div className="flex items-center justify-between text-lg font-bold text-dark">
                            {header.isPlaceholder ? null : (
                              <>
                                <div
                                  {...{
                                    className: header.column.getCanSort()
                                      ? "cursor-pointer select-none flex items-center text-dark/50 font-bold text-sm "
                                      : "",
                                    onClick:
                                      header.column.getToggleSortingHandler(),
                                  }}
                                >
                                  {header.column.columnDef.header &&
                                    flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                                  {/* {{
                                    asc: (
                                      <SortUpIcon class_name="text-gray h-5 w-5" />
                                    ),
                                    desc: (
                                      <SortDownIcon class_name="text-gray h-5 w-5" />
                                    ),
                                  }[header.column.getIsSorted() as string] ?? (
                                    <SortIcon class_name="text-gray h-5  w-5 opacity-0 group-hover:opacity-100" />
                                  )} */}
                                </div>
                              </>
                            )}
                          </div>
                        </th>
                      ))}
                  </tr>
                ))}
            </thead>

            {/* the table body */}
            <tbody className="divide-y divide-gray bg-white duration-300">
              {table.getRowModel() &&
                table.getRowModel().rows.map((row, row_index) => {
                  return (
                    <Fragment key={row_index}>
                      <tr>
                        {row.getVisibleCells() &&
                          row.getVisibleCells()?.map((cell) => {
                            return (
                              <td
                                key={cell.id}
                                className="w-[325px] max-w-[325px] truncate whitespace-nowrap px-6 py-2 text-sm font-semibold text-dark/80 first-letter:capitalize hover:break-words "
                                role="cell"
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            );
                          })}
                      </tr>

                      {/* {row.isExpanded ? (
                      <tr>
                        <td colSpan={visibleColumns.length}>
                          {renderRowSubComponent({ row })}
                        </td>
                      </tr>
                    ) : null} */}
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
