"use client";
import Image from "next/image";
import okIcon from "../../../public/images/ok.png";

export default function SuccessPage() {
  
  return (
    <div className="flex items-center justify-center ">
      <Image src={okIcon} alt="ok" layout="fixed" width={300} height={300} />
    </div>
  );
}