"use client";

import { useAddProductMutation } from "@/lib/features/api/ProductApi";

export default function ProductCard() {
  const [addProduct, { data, isLoading, error, isSuccess }] =
    useAddProductMutation();

  const handleAddProduct = async () => {
    try {
      await addProduct({
        title: `Product-${Math.random().toString(36).substring(2, 8)}`,
        price: 100,
        description: "Test product New",
        categoryId: 1,
        images: ["https://placeimg.com/640/480/any"],
      }).unwrap();

     console.log(addProduct);
    } catch (err) {
      console.error("CREATE ERROR:", err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between h-full">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Product Creator</h2>
        <p className="text-sm text-gray-500">
          Click below to create a product
        </p>
      </div>

      <button
        onClick={handleAddProduct}
        disabled={isLoading}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
      >
        {isLoading ? "Creating..." : "Add Product"}
      </button>

      <div className="mt-4 text-sm">
        {isSuccess && <p className="text-green-600">Product created</p>}

        {error && (
          <pre className="text-red-500 text-xs">
            {JSON.stringify(error, null, 2)}
          </pre>
        )}

        {data && <p className="text-gray-700"> {data.title} </p>}
      </div>
    </div>
  );
}