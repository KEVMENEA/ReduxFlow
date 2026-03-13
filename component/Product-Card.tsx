"use client";

import { useAddProductMutation, useGetProductByIdQuery } from "@/lib/features/api/ProductApi";

export default function ProductCard() {
  // const{data, isLoading} =  useGetProductByIdQuery(2);
  const [addProduct, { data, isLoading, error, isSuccess }] =
    useAddProductMutation();

  const handleAddProduct = async () => {
    try {
      const result = await addProduct({
        title: "New Product",
        price: 100,
        description: "Test product New",
      }).unwrap();

      console.log(result);
    } catch (err) {
      // console.error(err);
    }
  };
console.log(handleAddProduct);
  return (
    <div>
      <button onClick={handleAddProduct} disabled={isLoading}>
        {isLoading ? "Creating..." : "Add Product"}
      </button>/

      {isSuccess && <p>Product created successfully</p>}
      {error && <p>Failed to create product</p>}
      {data && <p>{data.title}</p>}
    </div>
  );
}