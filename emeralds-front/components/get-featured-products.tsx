"use client";

import { getFeaturedProducts } from "@/app/api/getFeatureProducts";

const GetProducts = () => {
    const { result, loading, error } = getFeaturedProducts();
    console.log(result);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {result.map((emerald: any) => (
        <div key={emerald.id} className="border p-4 rounded shadow">
          <img src={emerald.imageUrl} alt={emerald.name} className="w-full h-48 object-cover rounded" />
          <h2 className="text-xl font-semibold mt-2">{emerald.name}</h2>
          <p className="text-sm text-gray-600">{emerald.description}</p>
          <p className="text-green-700 font-bold mt-2">${emerald.price}</p>
        </div>
      ))}
    </div>
  );
};