import Card from "@/component/card";
import ProductCard from "@/component/Product-Card";


export default function Page() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}