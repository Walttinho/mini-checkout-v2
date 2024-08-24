"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import logoIcon from "../../../public/images/logo.png";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <header className="bg-white shadow-xl fixed top-0 left-1/2 transform -translate-x-1/2 w-full z-10">
        <div className="container mx-auto flex items-center p-4">
          <button
            onClick={toggleDrawer}
            className="text-gray-500 focus:outline-none"
          >
            <Menu className="w-8 h-8" />
          </button>
          <Image src={logoIcon} alt="TELMEX logo" width={150} height={50} />
        </div>
      </header>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-800 bg-opacity-50"
          onClick={toggleDrawer}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-30 h-full bg-white shadow-lg transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
        style={{ width: "240px" }}
      >
        <div className="p-4 text-center">
          <Image
            src={logoIcon}
            alt="TELMEX logo"
            width={155}
            height={50}
            className="mx-auto"
          />
          <div className="mt-8">
            <a
              href="/products"
              className="block mb-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Produtos
            </a>
            <a
              href="/vendas"
              className="block py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Vendas
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
