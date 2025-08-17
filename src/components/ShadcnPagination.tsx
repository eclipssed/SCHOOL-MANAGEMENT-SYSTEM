import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ShadcnPagination = ({ page, count }: { page: number; count: number }) => {
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <Pagination>
        <PaginationContent className=" w-full flex justify-between items-center">
          <PaginationItem>
            <PaginationPrevious
              className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              href="#"
            />
          </PaginationItem>
          <div className="flex items-center text-sm justify-center">
            <PaginationItem>
              <PaginationLink className="px-2 rounded-sm bg-lamaSky" href="#">
                1
              </PaginationLink>
            </PaginationItem>
          </div>
          <PaginationItem>
            <PaginationNext
              className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ShadcnPagination;
