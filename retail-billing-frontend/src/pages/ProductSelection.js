import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/ProductSelection.css";

const ProductSelection = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        setError("Failed to load products. Please refresh or try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (id, quantity, price) => {
    const qty = parseInt(quantity, 10);
    if (qty < 0 || isNaN(qty)) return;
    
    setSelectedProducts(prev => ({
      ...prev,
      [id]: { 
        quantity: qty, 
        price, 
        total: qty * price,
        productName: products.find(p => p.id === id)?.productName || '' 
      }
    }));
  };

  const handleNext = () => {
    if (Object.keys(selectedProducts).length === 0) {
      setError("Please select at least one product to continue.");
      return;
    }
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    navigate("/invoice");
  };

  return (
    <div className="product-selection-page">
      <div className="product-selection-container">
        <h1 className="page-title">Select Products</h1>

        {loading && <p className="loading-message">Loading products...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="product-selection-content">
            <table className="product-selection-list">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price (₹)</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <td style={{ width: "50%" }}>{product.productName}</td>
                    <td style={{ width: "25%" }}>₹{product.price.toFixed(2)}</td>
                    <td style={{ width: "25%" }}>
                      <input
                        type="number"
                        className="quantity-input"
                        placeholder="0"
                        min="0"
                        onChange={e => handleQuantityChange(
                          product.id, 
                          e.target.value, 
                          product.price
                        )}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button 
              onClick={handleNext} 
              className="continue-button" 
              disabled={Object.keys(selectedProducts).length === 0}
            >
              Generate Invoice
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSelection;
