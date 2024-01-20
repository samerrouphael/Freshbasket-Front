import '../../Style/Dashboard.css';
import { useState } from "react";
import AdminVendors from './AdminVendors';
import AdminAddVendor from './AdminAddVendor';
import AdminProduct from './AdminProduct';
import AdminCategories from './AdminCategories';
import AdminInfo from './AdminAddVendor';
import AdminAddProducts from './AdminAddProduct';
import AdminClient from './AdminClients';
import logOut from '../../images/log-out.svg'
import AdminOrderDetails from './AdminOrderDetails';
import ShippingDetails from './ShippingDetails';
const AdminDashboard = () => {
  const handleLogout=()=>{
    sessionStorage.removeItem('adminEmail');
    window.location.href='/admin';
  }
    const [activeSection, setActiveSection] = useState(null);
    const handleClick = (section) => {
        switch(section) {
          case "addProduct":
            setActiveSection("addProduct");
            break;
          case "displayProduct":
            setActiveSection("displayProduct");
            break;
          case "adminProduct":
            setActiveSection("adminProduct");
            break;
          case "addVendor":
            setActiveSection("addVendor");
            break;
          case "categories":
            setActiveSection("categories");
            break; 
            case "clients":
            setActiveSection("clients");
            break;
            case "shippings":
              setActiveSection("shippings");
              break;
              case "orderDetails":
                setActiveSection("orderDetails");
                break;
          default:
            setActiveSection(null);
        }
      };
  return (
    <div className="dashboard-container">
    <div className="side-menu">
        <p className='dash-title'> Dashboard </p>
        <ul className='dash-menu-ul'>
          <li className='dash-menu-li'onClick={() => handleClick("displayProduct")}>See Vendors On The Website</li>
          <li className='dash-menu-li' onClick={() => handleClick("addProduct")}>Add Product</li>
          <li className='dash-menu-li' onClick={() => handleClick("adminProduct")}>Products On Website</li>
          <li className='dash-menu-li'onClick={() => handleClick("addVendor")}>Add Vendor To The Website</li>
          <li className='dash-menu-li'onClick={() => handleClick("categories")}>Categories </li>
          <li className='dash-menu-li'onClick={() => handleClick("clients")}>Clients </li>
          <li className='dash-menu-li'onClick={() => handleClick("shippings")}>Shipping Details </li>
          <li className='dash-menu-li'onClick={() => handleClick("orderDetails")}>Order Details </li>
          <li className='dash-menu-li'onClick={handleLogout}><img src={logOut} className='logOut'/> </li>
        </ul>
      </div>
          <hr/>
      <div className='dash-content'>
      <div id="displayProduct" style={{ display: activeSection === "displayProduct" ? "block" : "none" }}>
      <AdminVendors/>
      </div>
      <div id="addProduct" style={{ display: activeSection === "addProduct" ? "block" : "none" }}>
      <AdminAddProducts/>
      </div>
      <div id="adminProduct" style={{ display: activeSection === "adminProduct" ? "block" : "none" }}>
     <AdminProduct/>
      </div>
      <div id="addVendor" style={{ display: activeSection === "addVendor" ? "block" : "none" }}>
      <AdminAddVendor/>
      </div>
      <div id="categories" style={{ display: activeSection === "categories" ? "block" : "none" }}>
      <AdminCategories/>
      </div>
      <div id="clients" style={{ display: activeSection === "clients" ? "block" : "none" }}>
      <AdminClient/>
      </div>
      <div id="orderDetails" style={{ display: activeSection === "orderDetails" ? "block" : "none" }}>
      <AdminOrderDetails/>
      </div>
      <div id="shippings" style={{ display: activeSection === "shippings" ? "block" : "none" }}>
      <ShippingDetails/>
      </div>
    </div>
      </div>
  )
}

export default AdminDashboard