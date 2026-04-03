import { ProductForm } from "@/components/forms/product-form";
import ProductListClient from "@/components/product-list";
import ProdcutListClient from "@/components/product-list";


export default function ProductPage() {
    return(
        <div>
            <h1>Hello Product Page</h1>
            <ProductListClient />
            {/* <ProductForm /> */}
        </div>
    )
}