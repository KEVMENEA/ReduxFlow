"use client";

import * as React from "react";
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/lib/features/api/ProductApi";
import { Textarea } from "../ui/textarea";

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
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [submittedProduct, setSubmittedProduct] = React.useState("");

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

  const [addProduct, { isLoading }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  async function onSubmit(values: ProductFormValues) {
    setIsSuccess(false);

    const payload = {
      title: values.title,
      price: Number(values.price),
      categoryId: values.categoryId,
      description: values.description,
      images: [values.image],
    };
    try {
      if (productId) {
        const res = await updateProduct({
          id: productId,
          body: payload,
        }).unwrap();

        console.log("update success", res);
        setIsSuccess(true);
        setSubmittedProduct(values.title);

        toast.success(`Product "${values.title}" updated successfully!`);
      } else {
        const res = await addProduct(payload).unwrap();

        console.log("insert success", res);
        setIsSuccess(true);
        setSubmittedProduct(values.title);

        toast.success(`Product "${values.title}" inserted successfully!`);

        form.reset({
          title: "",
          price: 0,
          categoryId: "",
          description: "",
          image: "",
        });
      }
    } catch (err) {
      console.log("error", err);
      setIsSuccess(false);

      toast.error(
        productId ? "Failed to update product" : "Failed to insert product",
      );
    }
    async function handleDelete() {
      if (!productId) return;

      try {
        const res = await deleteProduct(productId).unwrap();
        console.log("delete success", res);

        toast.success("Product deleted successfully");
      } catch (err) {
        console.log("delete error", err);
        toast.error("Failed to delete product");
      }
    }
  }
  async function handleDelete() {
    if (!productId) return;

    try {
      const res = await deleteProduct(productId).unwrap();
      console.log("delete success", res);

      toast.success("Product deleted successfully");
      setIsSuccess(true);
      setSubmittedProduct("");
      form.reset();
    } catch (err) {
      console.log("delete error", err);
      toast.error("Failed to delete product");
    }
  }

  return (
    <div className="p-4 md:p-2">
      <h1 className="mb-4 text-2xl font-bold text-black">Dashboard Page </h1>

      <Card className="w-full max-w-2xl rounded-2xl border bg-white shadow-sm">
        <CardHeader className="space-y-1 px-4 pt-5 md:px-6">
          <CardTitle className="text-1xl font-semibold text-black md:text-2xl">
            Submit Product
          </CardTitle>

          <CardDescription className="text-lg text-muted-foreground">
            {isSuccess
              ? `Product: "${submittedProduct}" inserted!`
              : "Fill in the form to submit a new product."}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 pb-5 pt-3 md:px-6">
          <form
            id="product-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
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
                      disabled={isLoading}
                      className="h-14 rounded-xl border px-4 text-base"
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
                      disabled={isLoading}
                      className="h-14 rounded-xl border px-4 text-base"
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="h-14 w-full rounded-xl px-4 text-base">
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
                Description<span className="text-rose-300">*</span>
              </label>

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="Write product description"
                      disabled={isLoading}
                      rows={4}
                      className="min-h-[180px] rounded-xl border px-4 py-3 text-base resize-none"
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
                      disabled={isLoading}
                      className="h-14 rounded-xl border px-4 text-base"
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
          {productId && (
            <Button
              type="button"
              variant="destructive"
              className="h-9 rounded-lg px-4 text-sm"
              onClick={handleDelete}
              disabled={isDeleting || isLoading || isUpdating}
            >
              {isDeleting ? "Deleting..." : "Delete Product"}
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            className="h-9 rounded-lg px-4 text-sm"
            onClick={() => {
              form.reset();
              setIsSuccess(false);
              setSubmittedProduct("");
            }}
            disabled={isLoading || isUpdating || isDeleting}
          >
            Reset
          </Button>

          <Button
            type="submit"
            form="product-form"
            className="rounded-xl px-6"
            disabled={isLoading || isUpdating || isDeleting}
          >
            {productId
              ? isUpdating
                ? "Updating..."
                : "Update Product"
              : isLoading
                ? "Creating..."
                : "Create Product"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
