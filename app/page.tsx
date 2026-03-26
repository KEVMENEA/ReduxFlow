
import { ProductForm } from "@/components/forms/product-form";
import ProdcutListClient from "../components/product-list";


export default function Page() {
  return (
    <div className="p-6 space-y-6">
      <ProductForm />
      <div className="rounded-xl border p-4">
        <h2 className="text-lg font-semibold mb-4">Product List</h2>
        <ProdcutListClient />
      </div>
    </div>
  )
}