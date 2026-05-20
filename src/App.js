import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/Products";
import SuccessPage from "./pages/Success";
import CartPage from "./pages/Cart";
import SupplierAdmin from "./pages/SupplierAdmin";
import Shop from "./pages/Shop";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/shop" element={<ProductPage />} /> */}
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cart" element={<CartPage />} />
         <Route path="/" element={<SupplierAdmin />} />
         <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
}

export default App;