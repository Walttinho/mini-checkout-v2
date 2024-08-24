"use client";

import { useState, useEffect } from "react";

import ProductModal from "./ProductModal";

import axios from "axios";

import { FilePlus2 } from "lucide-react";

import ProductCard from "./ProductCard";

interface Product {
  id: string;

  name: string;

  description: string;

  image: string;

  price: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");

        setProducts(data);

        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Failed to fetch products:", error);

        setIsLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/products?id=${id}`);

      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        // Display a loading spinner while products are being fetched

        <div className="flex justify-center mt-20">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold">Produtos</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-4 bg-green-500 text-white rounded-xl flex items-center space-x-2"
            >
              <FilePlus2 />

              <span>New Product</span>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                picture={product.image}
                description={product.description}
                name={product.name}
                price={product.price}
                link={`/products/${product.id}`}
                onDelete={() => handleDelete(product.id)}
                onEdit={() => {
                  setSelectedProduct(product);

                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        </>
      )}

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);

          setSelectedProduct(null);
        }}
        onSubmit={() => {
          setIsModalOpen(false);

          setSelectedProduct(null);

          // Re-fetch products after submit

          const fetchProducts = async () => {
            const { data } = await axios.get("/api/products");

            setProducts(data);
          };

          fetchProducts();
        }}
      />
    </div>
  );
}
