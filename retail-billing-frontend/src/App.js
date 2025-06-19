import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

import CustomerForm from "./pages/CustomerForm";
import ProductSelection from "./pages/ProductSelection";
import InvoicePage from "./pages/InvoicePage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/customer" element={<CustomerForm />} />
        <Route path="/product" element={<ProductSelection />} />
        <Route path="/invoice" element={<InvoicePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
