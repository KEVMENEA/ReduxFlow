"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/lib/features/api/ProductApi";

const formSchema = z.object({
  title: z.string().min(3, "Product title must be at least 3 characters."),
  price: z.coerce.number().min(1, "Price must be greater than 0."),
  categoryId: z.string().min(1, "Please select a category."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(300, "Description must be at most 300 characters."),
  image: z.string().url("Please enter a valid image URL."),
});

type ProductFormValues = z.infer<typeof formSchema>;

type ProductFormProps = {
  productId?: number;
};

const categories = [
  { id: "1", name: "Clothes" },
  { id: "2", name: "Electronics" },
  { id: "3", name: "Furniture" },
  { id: "4", name: "Shoes" },
  { id: "5", name: "Others" },
];

export function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(productId);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      categoryId: "",
      description: "",
      image: "",
    },
  });

  const [addProduct, { isLoading: isCreating }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const { data: productData, isLoading: isProductLoading } =
    useGetProductByIdQuery(productId!, { skip: !productId });

  React.useEffect(() => {
    if (isEditMode && productData) {
      form.reset({
        title: productData.title ?? "",
        price: productData.price ?? 0,
        categoryId: String(
          productData.category?.id ?? productData.categoryId ?? "",
        ),
        description: productData.description ?? "",
        image: productData.images?.[0] ?? "",
      });
    }
  }, [isEditMode, productData, form]);

  async function onSubmit(values: ProductFormValues) {
    try {
      if (isEditMode) {
        await updateProduct({
          id: productId!,
          body: {
            title: values.title,
            price: Number(values.price),
            categoryId: Number(values.categoryId),
            description: values.description,
            images: [values.image],
          },
        }).unwrap();

        toast.success("Product updated successfully");

        setTimeout(() => {
          router.push("/dashboard/product");
          router.refresh();
        }, 800);
        return;
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message ||
          (isEditMode
            ? "Failed to update product"
            : "Failed to create product"),
      );
    }
  }

  async function handleDelete() {
    if (!productId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmed) return;

    try {
      await deleteProduct(productId).unwrap();
      toast.success("Product deleted successfully");
      router.push("/dashboard/product");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete product");
    }
  }

  if (isEditMode && isProductLoading) {
    return <div className="p-6">Loading product...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="mb-4 text-2xl font-bold text-black">
        {isEditMode ? "Edit Product" : "Create Product"}
      </h1>

      <Card className="w-full max-w-2xl rounded-2xl border bg-white shadow-sm">
        <CardHeader className="space-y-1 px-4 pt-5 md:px-6">
          <CardTitle className="text-xl font-semibold text-black md:text-2xl">
            {isEditMode ? "Update Product" : "Submit Product"}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {isEditMode
              ? "Update old product data."
              : "Fill in the form to create a new product."}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 pb-5 pt-3 md:px-6">
          <form
            id="product-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-base font-semibold text-black"
              >
                Product Title<span className="text-rose-500">*</span>
              </label>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <Input
                      {...field}
                      id="title"
                      placeholder="Enter product title"
                      className="h-12 rounded-xl border px-4 text-base"
                    />
                    {fieldState.error && (
                      <p className="mt-2 text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="price"
                className="text-base font-semibold text-black"
              >
                Price<span className="text-rose-500">*</span>
              </label>
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <Input
                      {...field}
                      id="price"
                      type="number"
                      placeholder="Enter product price"
                      className="h-12 rounded-xl border px-4 text-base"
                    />
                    {fieldState.error && (
                      <p className="mt-2 text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="categoryId"
                className="text-base font-semibold text-black"
              >
                Category<span className="text-rose-500">*</span>
              </label>
              <Controller
                name="categoryId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-12 w-full rounded-xl px-4 text-base">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error && (
                      <p className="mt-2 text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-base font-semibold text-black"
              >
                Description<span className="text-rose-500">*</span>
              </label>
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <Textarea
                      {...field}
                      id="description"
                      rows={5}
                      placeholder="Write product description"
                      className="min-h-[160px] rounded-xl border px-4 py-3 text-base resize-none"
                    />
                    <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                      <span>Add short details about the product.</span>
                      <span>{field.value?.length ?? 0}/300</span>
                    </div>
                    {fieldState.error && (
                      <p className="mt-2 text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="image"
                className="text-base font-semibold text-black"
              >
                Image URL<span className="text-rose-500">*</span>
              </label>
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <Input
                      {...field}
                      id="image"
                      placeholder="https://example.com/product-image.jpg"
                      className="h-12 rounded-xl border px-4 text-base"
                    />
                    {fieldState.error && (
                      <p className="mt-2 text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex gap-2 border-t bg-muted/10 px-4 py-3 md:px-6">
          {isEditMode && (
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting || isCreating || isUpdating}
            >
              {isDeleting ? "Deleting..." : "Delete Product"}
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isDeleting || isCreating || isUpdating}
          >
            Reset
          </Button>

          <Button
            type="submit"
            form="product-form"
            disabled={isDeleting || isCreating || isUpdating}
          >
            {isEditMode
              ? isUpdating
                ? "Updating..."
                : "Update Product"
              : isCreating
                ? "Creating..."
                : "Create Product"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
