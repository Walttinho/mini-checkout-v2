"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2, FilePenLine } from "lucide-react";

interface ItemProps {
  picture: string;
  description: string;
  name: string;
  link: string;
  price: number;
  onDelete: () => void;
  onEdit: () => void;
}

export default function ProductCard({
  picture,
  description,
  name,
  link,
  price,
  onDelete,
  onEdit,
}: ItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <Image
        src={picture}
        alt={description}
        width={500}
        height={500}
        className="w-full h-48 rounded-t-lg object-cover border"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <Link href={link} legacyBehavior>
            <a className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
              Purchase
              <span className="text-lg">${price}</span>
            </a>
          </Link>
          <div className="flex space-x-2">
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
              onClick={onEdit}
            >
              <FilePenLine size={16} /> Edit
            </button>
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              onClick={onDelete}
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
