"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
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
    <div className="bg-white rounded-md shadow-xl p-4">
      <Image
        src={picture}
        alt={description}
        width={500}
        height={500}
        className="w-full h-48 rounded-t-lg object-cover border"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mt-4">{name}</h2>
        <p className="text-gray-600">{description}</p>
        <div className="flex justify-between mt-4">
          <div className="flex flex-col items-center p-1 bg-orange-500 hover:bg-orange-700 text-white rounded">
            <Link href={link} legacyBehavior>
              <a className=" font-bold py-2 px-2 rounded">Purchase</a>
            </Link>
            <span className="text-lg font-bold">${price}</span>
          </div>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 mt-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600"
              onClick={onEdit}
            >
              <FilePenLine size={16} className="mr-2" />
              Edit
            </button>
            <button
              className="px-4 py-2 mt-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              onClick={onDelete}
            >
              <Trash2 size={16} className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
