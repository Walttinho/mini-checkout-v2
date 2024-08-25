"use client";

import React, { useState } from "react";
import PixModal from "./PixModal";
import Image from "next/image";
import lock from "../../../../public/images/lock.png";
import shield from "../../../../public/images/shield.png";
import pix from "../../../../public/images/pix.png";
import axios from "axios";

export default function CheckoutPage({
  params,
}: {
  params: { productId: string };
}) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCPF, setCustomerCPF] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [paymentId, setPaymentId] = useState("");
 

  const handleCheckout = async () => {
    
    const response = await axios.post("/api/checkout", {
      productId: params.productId,
      customerName,
      customerPhone,
      customerCPF,
      customerEmail,
    });    

    const payment = response.data.payment.point_of_interaction.transaction_data;

    const qrcodeString = payment.qr_code_base64;

    setQrcode(qrcodeString); // Set the QR code state

    setPaymentLink(payment.qr_code);

    setIsPixModalOpen(true); // Open the modal

    setOrderId(response.data.orderId);
    setPaymentId(response.data.payment.id);

    
  };
  
  return (
    <div className="flex justify-between">
      <div className="w-1/2">
        <div className="border rounded-lg p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full text-white font-bold text-lg px-3 py-2 mr-4">
              1
            </div>

            <div>
              <h2 className="text-gray-700 font-bold text-lg">
                Dados cadastrais
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Complete os dados de cadastro
              </p>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome completo
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Seu nome completo"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Seu e-mail valido"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="cpf"
              className="block text-sm font-medium text-gray-700"
            >
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="00 0000 0000"
              value={customerCPF}
              onChange={(e) => setCustomerCPF(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Telefone
            </label>
            <input
              type="text"
              id="phone"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="00 0000 0000"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="border rounded-lg p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full text-white font-bold text-lg px-3 py-2 mr-4">
              2
            </div>
            <div>
              <h2 className="text-gray-700 font-bold text-lg">
                Dados de pagamento
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Complete os dados de pagamento
              </p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">Preço</h3>
            <p className="text-gray-700 text-2xl">R$ 19,90</p>
          </div>
          <div className="mb-4 flex items-center">
            <Image
              src={pix}
              alt="Compra segura"
              width={25}
              height={25}
              className="mr-2"
            />
            <span className="text-gray-600 text-sm">Pix</span>
          </div>
          <div className="mb-4">
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCheckout}
            >
              Comprar agora
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Ambiente criptografado e 100% seguro.
          </p>
          <div className="flex items-center">
            <Image
              src={lock}
              alt="Compra segura"
              width={147}
              height={64}
              className="mr-2"
            />
          </div>
          <div className="flex items-center mt-2">
            <Image
              src={shield}
              alt="Dados pessoais protegidos"
              width={147}
              height={64}
              className="mr-2"
            />
          </div>
        </div>
      </div>

      <PixModal
        isOpen={isPixModalOpen}
        onClose={() => setIsPixModalOpen(false)}
        qrcode={qrcode} // Use the qrcode state here
        paymentLink={paymentLink}        
        productId={params.productId}
        orderId={orderId}
        paymentId={paymentId}
      />
    </div>
  );
}
