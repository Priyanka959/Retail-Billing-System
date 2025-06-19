import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/InvoicePage.css";

const InvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("customer"));
    const selectedProducts = JSON.parse(localStorage.getItem("selectedProducts"));

    const subtotal = Object.values(selectedProducts).reduce((sum, item) => sum + item.total, 0);
    const gstAmount = (subtotal * 0.18).toFixed(2);
    const totalWithGST = (subtotal + parseFloat(gstAmount)).toFixed(2);

    const invoiceRequest = {
      customer,
      gstNumber: "29ABCDE1234F2Z5",
      date: new Date().toISOString().slice(0, 10),
      items: Object.keys(selectedProducts).map(productId => ({
        product: { id: productId },
        quantity: selectedProducts[productId].quantity,
        pricePerUnit: selectedProducts[productId].price,
        totalPrice: selectedProducts[productId].total
      })),
      subtotal,
      gstAmount,
      totalPrice: totalWithGST
    };

    axios.post("http://localhost:8080/invoices", invoiceRequest)
      .then(response => setInvoiceData(response.data))
      .catch(error => console.error("Error creating invoice:", error));
  }, []);

  return invoiceData ? (
    <div className="invoice-container">
      <h1>Retail Shop Invoice</h1>
      
      <div className="customer-info">
        <p><strong>Customer:</strong> {invoiceData.customer.name}</p>
        <p><strong>Phone Number:</strong> {invoiceData.customer.phoneNumber}</p>
        <p><strong>GST Number:</strong> {invoiceData.gstNumber}</p>
        <p><strong>Date:</strong> {invoiceData.date}</p>
      </div>

      <h3>Product Details</h3>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.product.productName}</td>
              <td>{item.quantity}</td>
              <td>₹{item.pricePerUnit}</td>
              <td>₹{item.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

    
      <h3 className="total-amount">Total Amount: ₹{invoiceData.totalPrice}</h3><p className="gst-info">
  (The total amount includes **18% GST**, which is applied to the subtotal of your purchased items.)
</p>

      <div className="qr-section">
        <h4>Scan to Pay</h4>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=upi://pay?pa=retailshop@upi&pn=Retail%20Shop&mc=1234&tid=invoice12345" alt="QR Code for Payment" />
      </div>

      <p className="thank-you">Thank You for Shopping!</p>
    </div>
  ) : (
    <p className="loading-message">Generating invoice...</p>
  );
};

export default InvoicePage;
