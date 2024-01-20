import "../../Style/VendorInfo.css";
import back from "../../images/back.svg";
import { Link } from "react-router-dom";

const VendorOrder = () => {
    return (
        <div>
            <div className="back">

                <Link to="/"><img src={back} className="back-img" /></Link>

            </div>
            <div className="vendor-order">

                <div className="vendor-table">
                    <p className="order-title"> Vendor Order</p>
                    <div className="table1">
                        <table className='tableDes'>
                            <tr>
                                <th>Name</th>
                                <th>Last-Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>City Name</th>
                                <th>Postal Code</th>
                                <th>Sreet Address</th>
                                <th>Total Price</th>
                                <th> Action </th>


                            </tr>
                            <tr>

                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td> <div className="button-containor">
                                    <button type="button" className="submitbt">
                                        Update Order
                                    </button>


                                    <button type="button" className="productbtn-delete">
                                        Cancel Order
                                    </button>
                                </div></td>

                            </tr>

                        </table>
                    </div>




                </div>
            </div>
        </div>
    );
};

export default VendorOrder;
