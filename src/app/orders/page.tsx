"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  id: string;
  productId: string;
  product: { name: string }; // Assuming Product has a name field
  customerName: string;
  customerPhone: string;
  customerCPF: string;
  customerEmail: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch orders from API
    axios
      .get("/api/orders") // Replace with your actual API endpoint
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch orders");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
    
    console.log("orders",orders)

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>Vendas</h1>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #ccc",
          }}
        >
          <h2>Pedidos</h2>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                  textAlign: "left",
                }}
              >
                Produto
              </th>
              <th
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                  textAlign: "left",
                }}
              >
                Cliente
              </th>
              <th
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                  textAlign: "left",
                }}
              >
                Telefone
              </th>
              <th
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                  textAlign: "left",
                }}
              >
                CPF
              </th>
              <th
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                  textAlign: "left",
                }}
              >
                E-mail
              </th>
              <th
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                  textAlign: "left",
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                  textAlign: "left",
                }}
              >
                Método de Pagamento
              </th>
              <th
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                  textAlign: "left",
                }}
              >
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {order.name}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {order.customerName}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {order.customerPhone}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {order.customerCPF}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {order.customerEmail}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {order.status}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {order.paymentMethod}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
