import React from "react";

type ColumnsType = {
  header: string;
  accessor: string;
  className?: string;
};

const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: ColumnsType[];
  renderRow: (item: any) => React.ReactNode;
  data: any;
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item: any) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
