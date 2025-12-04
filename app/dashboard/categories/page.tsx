"use client"
import { getColumns } from "./features/columns"
import React, { useState, useEffect } from 'react'
import { DataTable } from "./features/data-table"
import { New } from "./features/new"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"


import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios"
import { description } from "@/components/chart-area-interactive";
import { Sheet } from "lucide-react";

const Page = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({ name: "", description: "" });
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Reset về trang đầu tiên khi thay đổi filter
    setPage(1);
  };

  const buildQuery = () => {
    const query = new URLSearchParams();

    // Pagination
    query.set("pagination[page]", String(page));
    query.set("pagination[pageSize]", String(pageSize));

    // Filters
    if (filters.name) {
      query.set("filters[name][$containsi]", filters.name);
    }

    if (filters.description) {
      query.set("filters[description][$containsi]", filters.description);
    }

    return query.toString();
  };

  const fetchData = () => {
    setLoading(true);
    axiosInstance
      .get(
        `/v1/api/categories?${buildQuery()}`)
      .then((response) => {
        const apiData = response.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          documentId: item.documentId,
        }));

        setCategories(apiData);
        setMeta(response.data.meta.pagination);
      })
      .catch((error) => {
        console.log("Failed to fetch categories:", error);
      })
      .finally(() => setLoading(false));

  }

  useEffect(() => {
    fetchData();
  }, [page, pageSize, filters]);

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setPage(1);
  };


  const columns = getColumns(filters, handleFilterChange);
  return (
    <div className="py-4 md:py-6 px-4 lg:px-6">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            <span>List of categories</span>
          </CardDescription>

          <CardAction>
            <Button onClick={() => setSheetOpen(true)} className="text-white/98">
    Thêm mới
  </Button>

 <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
  <New />
</Sheet>

          </CardAction>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className='text-muted-foreground'>Loading...</p>
          ) : (
            <DataTable columns={columns} data={categories} />
          )}


          <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
            {meta && (
              <>
                {categories.length === 0 ? (
                  "No rows"
                ) : (
                  <>
                    {`Showing ${(meta.page - 1) * meta.pageSize + 1
                      } to ${(meta.page - 1) * meta.pageSize + categories.length
                      } of ${meta.total} rows`}
                  </>
                )}
              </>
            )}

            <div className="flex items-center gap-2">


              <Select
                value={String(pageSize)}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="w-[80px] h-8">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>

                </SelectContent>
              </Select>
              <span>Rows per page</span>
            </div>

            <span className="whitespace-nowrap">
              Page {meta?.page} of {meta?.pageCount}
            </span>

            {/* test */}


            {/* Pagination buttons */}
            <div className="flex gap-1">

              {/* First page */}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setPage(1)}
                disabled={page === 1}
              >
                {"<<"}
              </Button>

              {/* Previous page */}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                {"<"}
              </Button>

              {/* Next page */}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setPage((prev) => Math.min(prev + 1, meta?.pageCount || 1))}
                disabled={page === meta?.pageCount}
              >
                {">"}
              </Button>

              {/* Last page */}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setPage(meta?.pageCount || 1)}
                disabled={page === meta?.pageCount}
              >
                {">>"}
              </Button>

            </div>




          </div>



        </CardContent>
      </Card>

    </div>
  );
}

export default Page