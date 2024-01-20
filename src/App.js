import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import Contact from "./Component/Contact";
import PoductsPage from "./Component/ProductsPage"
import OrderPage from "./Component/OrderPage";
import OrderedProduct from "./Component/OrderedProducts";
import ProductComponent from "./Component/ProductsComponent";
import ProductDetails from "./Component/ProductsDetails";
import VendorLogin from "./Component/VendorDashboard/VendorLogin";
import AdminLogin from "./Component/AdminDashboard/AdminLogin";
import VendorDashboard from "./Component/VendorDashboard/VendorDashboard";
import AdminVendors from "./Component/AdminDashboard/AdminVendors";
import AdminDashboard from "./Component/AdminDashboard/AdminDashboard";
import AdminAddVendor from "./Component/AdminDashboard/AdminAddVendor";
import AdminProducts from "./Component/AdminDashboard/AdminProduct";
import AdminAddProduct from "./Component/AdminDashboard/AdminAddProduct";
import AdminCategories from "./Component/AdminDashboard/AdminCategories.jsx";
import VendorOrder from "./Component/VendorDashboard/VendorOrder.jsx";
import UserProfile from "./Component/AdminDashboard/UserProfile.jsx";
import ShippingDetails from "./Component/AdminDashboard/ShippingDetails.jsx";
import AdminOrderDetails from "./Component/AdminDashboard/AdminOrderDetails.jsx";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/productspage" element={<PoductsPage />} />
          <Route path="/OrderPage" element={<OrderPage />} />
          <Route path="/OrderedProduct" element={<OrderedProduct />} />
          <Route path="/ProductComponent" element={<ProductComponent />} />
          <Route path="/ProductDetails" element={<ProductDetails />} />
          <Route path="/ProductComponent/:id" element={<ProductComponent />} />
          <Route path="/Vendor" element={<VendorLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/adminDash" element={<AdminDashboard/>}/>
          <Route path="/vendorDash" element={<VendorDashboard />} />
          {/* 
          <Route path="/vendorOrder" element={<VendorOrder />} />
          <Route path="/adminOrder" element={<AdminVendors />} />
          <Route path="/addvendor" element={<AdminAddVendor/>}/>
          <Route path="/adminProduct" element={<AdminProduct/>}/>
          <Route path="/adminAddProducts" element={<AdminAddProducts/>}/>
          <Route path="/adminCategories" element={<AdminCategories/>}/>
          <Route path="/userprofile" element={<UserProfile/>}/>
          <Route path="/shippingdetails" element={<ShippingDetails/>}/>
          <Route path="/adminorderdetails" element={<AdminOrderDetails/>}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
