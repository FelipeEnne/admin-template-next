import cn from "@/lib/cn";

export interface Column<T> {
  key: keyof T & string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  rowKey?: (row: T, index: number) => string | number;
  className?: string;
}

export default function Table<T>({
  columns,
  data,
  emptyMessage = "No records found",
  rowKey,
  className,
}: TableProps<T>) {
  return (
    <table
      className={cn(
        "w-full overflow-hidden rounded-xl text-left",
        "bg-surface-raised text-foreground",
        className,
      )}
    >
      <thead className="bg-surface-sunken">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className="px-5 py-3 font-semibold"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="px-5 py-6 text-center">
              {emptyMessage}
            </td>
          </tr>
        ) : (
          data.map((row, index) => (
            <tr
              key={rowKey?.(row, index) ?? index}
              className="border-t border-border"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-5 py-3">
                  {column.render
                    ? column.render(row)
                    : String(row[column.key] ?? "")}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
