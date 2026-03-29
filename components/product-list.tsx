"use client";

import { useRouter } from "next/navigation";
import { Eye, MoreHorizontalIcon, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/lib/features/api/ProductApi";

type ProductResponse = {
  id: string | number;
  title: string;
  price: number;
  category?: {
    name?: string;
  };
};
export default function ProductListClient() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) return <div className="p-4">Loading products...</div>;
  if (isError) return <div className="p-4 text-red-500">Failed to load products.</div>;
  if (!data?.length) return <div className="p-4">No products found.</div>;

  return (
    <div className="rounded-2xl border bg-white">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold">Product Listing</h2>
          <p className="text-sm text-slate-500">Manage your products here.</p>
        </div>

        <Button onClick={() => router.push("/dashboard")}>Create Product</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>${Number(product.price ?? 0).toFixed(2)}</TableCell>
              <TableCell>{product.category?.name ?? "Uncategorized"}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => router.push(`/dashboard/product/${product.id}`)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => router.push(`/dashboard/product/edit/${product.id}`)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-500 focus:text-red-500"
                      onClick={async () => {
                        const confirmed = window.confirm(
                          "Are you sure you want to delete this product?"
                        );
                        if (!confirmed) return;

                        try {
                          await deleteProduct(Number(product.id)).unwrap();
                          toast.success("Product deleted successfully");
                        } catch (error) {
                          toast.error("Delete failed");
                          console.error(error);
                        }
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}