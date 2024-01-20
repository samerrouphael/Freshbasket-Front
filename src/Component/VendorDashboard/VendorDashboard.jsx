import '../../Style/Dashboard.css';
import VendorDisplayProduct from './VendorDisplayProduct';
import VendorAddProducts from './VendorAddProduct';
import { useState } from "react";
import VendorInfo from './VendorInfo';
import logOut from '../../images/log-out.svg'
const VendorDashboard = () => {
    const [activeSection, setActiveSection] = useState(null);
    const handleClick = (section) => {
        switch (section) {
            case "addProduct":
                setActiveSection("addProduct");
                break;
            case "displayProduct":
                setActiveSection("displayProduct");
                break;
            case "vendorInfo":
                setActiveSection("vendorInfo");
                break;
            case "vendorOrder":
                setActiveSection("vendorOrder");
                break;
            default:
                setActiveSection(null);
        }
    };
    const handleLogout = () => {
        sessionStorage.removeItem('adminEmail');
        window.location.href = '/vendor';
    }
    return (
        <div className="dashboard-container">
            <div className="side-menu">
                <p className='dash-title'> Dashboard</p>
                <ul className='dash-menu-ul'>
                    <li className='dash-menu-li' onClick={() => handleClick("addProduct")}>Add Product</li>
                    <li className='dash-menu-li' onClick={() => handleClick("displayProduct")}>Display Products</li>
                    <li className='dash-menu-li' onClick={() => handleClick("vendorInfo")}>Your Personal Information</li>
                    <li className='dash-menu-li' onClick={handleLogout}><img src={logOut} className='logOut' /> </li>
                </ul>
            </div>
            <hr />
            <div className='dash-content'>
                <div id="displayProduct" style={{ display: activeSection === "displayProduct" ? "block" : "none" }}>
                    <VendorDisplayProduct />
                </div>
                <div id="addProduct" style={{ display: activeSection === "addProduct" ? "block" : "none" }}>
                    <VendorAddProducts />
                </div>
                <div id="vendorInfo" style={{ display: activeSection === "vendorInfo" ? "block" : "none" }}>
                    <VendorInfo />
                </div>
                {/* <div id="vendorOrder" style={{ display: activeSection === "vendorOrder" ? "block" : "none" }}>
        <VendorOrder />
      </div> */}
            </div>
        </div>
    )
}

export default VendorDashboard