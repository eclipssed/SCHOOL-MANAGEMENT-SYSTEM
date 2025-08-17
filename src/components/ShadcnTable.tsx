import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type ColumnsType = {
  header: string;
  accessor: string;
  className?: string;
};

const ShadcnTable = ({
  columns,
  renderRow,
  data,
}: {
  columns: ColumnsType[];
  renderRow: (item: any) => React.ReactNode;
  data: any;
}) => {
  return (
    <Table className="w-full mt-4">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <TableHead key={col.accessor} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* render row in the parent component so that only render the required columns */}
        {data.map((item: any) => (
          <TableRow
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
          >
            <TableCell className="flex items-center gap-4 p-4">
              {item.title}
            </TableCell>
            <TableCell>{item.class}</TableCell>
            <TableCell className="hidden md:table-cell">{item.date}</TableCell>
            <TableCell className="hidden md:table-cell">
              {item.startTime}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {item.endTime}
            </TableCell>
            <TableCell className="text-right">
              {" "}
              <div className="flex items-center gap-2">
                <Link href={`/list/teachers/${item.id}`}>
                  <button className="w-7 h-7 flex justify-center items-center rounded-full bg-lamaSky">
                    <Image
                      src={"/edit.png"}
                      alt="view icon"
                      width={16}
                      height={16}
                    />
                  </button>
                </Link>
                {role === "admin" && (
                  <button className="w-7 h-7 flex justify-center items-center rounded-full bg-lamaPurple">
                    <Image
                      src={"/delete.png"}
                      alt="view icon"
                      width={16}
                      height={16}
                    />
                  </button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
        {/* <td className="flex items-center gap-4 p-4">{item.title}</td>
        <td>{item.class}</td>
        <td className="hidden md:table-cell">{item.date}</td>
        <td className="hidden md:table-cell">{item.startTime}</td>
        <td className="hidden md:table-cell">{item.endTime}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/list/teachers/${item.id}`}>
              <button className="w-7 h-7 flex justify-center items-center rounded-full bg-lamaSky">
                <Image
                  src={"/edit.png"}
                  alt="view icon"
                  width={16}
                  height={16}
                />
              </button>
            </Link>
            {role === "admin" && (
              <button className="w-7 h-7 flex justify-center items-center rounded-full bg-lamaPurple">
                <Image
                  src={"/delete.png"}
                  alt="view icon"
                  width={16}
                  height={16}
                />
              </button>
            )}
          </div>
        </td> */}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};

export default ShadcnTable;
