import "../../Style/AdminInfo.css";
import back from "../../images/back.svg";
import { Link } from "react-router-dom";
import user from '../../images/user.svg'
import lastname from '../../images/lastname.svg'
import email from '../../images/email.svg'
import phone from '../../images/phone.svg'
import password from '../../images/password.svg'



const UserProfile = () => {
    return (

        <div>

            <div className="back">
                <Link to="/"><img src={back} className="back-img" /></Link>

            </div>

            <p className='order-title'>
                User Profile
            </p>

            <div className="user1">

                <img src={user} className="login-img" />

                <div className=" text">
                    <input type="text" id="username" placeholder="First Name" className="login-input" />
                </div>
                <img src={lastname} className="login-img" />

                <div className=" text">
                    <input type="text" id="username" placeholder="Last Name" className="login-input" />
                </div>
            </div>
            <div className="user1">

                <img src={phone} className="login-img" />

                <div className=" text">
                    <input type="text" id="username" placeholder="Phone" className="login-input" />
                </div>
            </div>
            <div className="user1">

                <img src={email} className="login-img" />

                <div className=" text">
                    <input type="email" id="email" placeholder="Email" className="login-input" />
                </div>
            </div>
            <div className="user1">

                <img src={password} className="login-img" />

                <div className=" text">
                    <input type="password" id="username" placeholder="Password" className="login-input" />
                </div>
            </div>
            <div className="button-containor">
                <button type="button" className="submitbt">
                    Update Account
                </button>


                <button type="button" className="btn-delete">
                    Delete account
                </button>
            </div>

            <table className="samer">
                <tr>
                    <td>Order</td>
                    <td>Item</td>
                    <td>Description</td>
                    <td>Phone Number</td>
                    <td>Company</td>
                    <td>Password</td>
                    <td>Actions</td>
                </tr>
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td></td>
                </tr>
            </table>
        </div>

    );
};
export default UserProfile;
