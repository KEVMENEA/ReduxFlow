import { ProductForm } from "@/components/forms/product-form";
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
         Build Your Application  Data Fetching
      </div>
      <h1 className="text-2xl font-bold">Product Listing</h1>
      
      {/* Container to match the white card in your image */}
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6">
           {/* <ProductListClient /> */}
           <ProductForm />
        </div>
      </div>
    </div>
  )
}