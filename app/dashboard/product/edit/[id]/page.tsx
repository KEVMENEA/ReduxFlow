import { ProductForm } from "@/components/forms/product-form";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <ProductForm productId={Number(id)} />;
    </div>
  );
}
