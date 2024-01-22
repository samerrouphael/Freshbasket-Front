import React, { useState, useEffect } from "react";
import MenuBar from "./MenuBar";
import Footer from "../Component/Footer";
import "../Style/OrderPage.css";
import OrderedProducts from "./OrderedProducts";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNUmber, setPhoneNUmber] = useState("");
  const [country, setCountry] = useState("");
  const [cityName, setCityname] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [clientData, setClientData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const emailFromLocalStorage = localStorage.getItem("email");

    if (emailFromLocalStorage) {
      axios
        .get(
          `http://localhost:8000/client/getClientByEmail/${emailFromLocalStorage}`
        )
        .then((response) => {
          const clients = response.data;
          if (clients.length > 0) {
            const client = clients[0];
            setClientData({
              firstName: client.firstName,
              lastName: client.lastName,
              email: client.email,
              phone: client.phone,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching client data:", error);
        });
    }
  }, []);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);
 

  const fetchProductDetails = async () => {
    const productDetails = [];

    try {
      for (const item of cartItems) {
        const response = await axios.get(
          `http://localhost:8000/products/getProductById/${item.id}`
        );
        console.log(response.data)
        if (response.data.length > 0) {
          const product = {
            image: response.data[0].image,
            productName: response.data[0].name,
            price: response.data[0].price,
            quantity: item.quantity,
          };
          productDetails.push(product);
        };
      }
    } catch (error) {
      console.error(error);
    }

    return productDetails;
  };

  const [productsWithDetails, setProductsWithDetails] = useState([]);
  const emailFromLocalStorage = localStorage.getItem("email");

  useEffect(() => {
    const getProductDetails = async () => {
      const details = await fetchProductDetails();
      setProductsWithDetails(details);
    };

    getProductDetails();
  }, [cartItems]);
  
  const handleAddShipping = async () => {
    const emailFromLocalStorage = localStorage.getItem("email");

    if (!emailFromLocalStorage) {
      setIsLoggedIn(true);
      setShowModal(false);
      return; // Prevent further execution if not logged in
    } else {
      const currentDate = new Date().toISOString(); // Get current date in ISO format

      const productsIds = cartItems.map((item) => item.id); // Extracting product IDs from cartItems
      const orderDetailBody = {
        email: emailFromLocalStorage,
        producsId: productsIds,
        date: currentDate,
        totalPrice: total,
        status: "pending",
      };
      const shippingDetails = {
        firstName,
        lastName,
        email,
        phoneNUmber,
        country,
        cityName,
        postalCode,
        streetAddress,
        totalPrice,
        status: "pending",
      };

      try {
        const response = await fetch(
          "http://localhost:8000/shipping/addShipping",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(shippingDetails),
          }
        );

        if (response.ok) {
          const orderDetailResponse = await axios.post(
            "http://localhost:8000/orderDetail/addOrderDetail",
            orderDetailBody
          );

          console.log("Shipping details added:", response.data);
          console.log("Order detail added:", orderDetailResponse.data);

          setShowModal(true);
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error:", error);
        window.alert("Error adding product. Please try again later.");
      }
    }
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const product of productsWithDetails) {
      subtotal += product.price * product.quantity;
    }
    return subtotal;
  };
  const calculatetax = () => {
    let tax = 0;
     {
      tax += 0.1*subtotal;
    }
    return tax;
  };
  const subtotal = calculateSubtotal();
  const shipping = 5;
  const tax = calculatetax();
  const total = subtotal + shipping + tax;

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => item.id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  return (

    <div className="orderPage">
      <MenuBar />
      <div className="orderContainer">
        <div className="CutomerOrderContainer">
          <p className="custTitle">Your Cart Details</p>
          {productsWithDetails.map((product, index) => (
            <OrderedProducts
              key={index}
              image={product.image}
              productName={product.productName}
              price={product.price}
              quantity={product.quantity}
              removeFromCart={() => removeFromCart(product.id)}
            />
          ))}
        </div>
      </div>
      <div className="colDiv">
        <div className="orderInfoDiv">
          <p className="custTitle">Summary</p>
          <table className="summaryTable">
            <tr>
              <td className="summaryTd">SubTotal</td>
              <td className="summaryTd">{subtotal}$</td>
            </tr>
            <tr>
              <td className="summaryTd">Shipping</td>
              <td className="summaryTd"> 5$</td>
            </tr>

            <tr>
              <td className="summaryTd">Tax</td>
              <td className="summaryTd">{tax} $</td>
            </tr>
          </table>

          <div className="totalCont">
            <div className="summaryTd">Total</div>
            <div className="summaryTd">{total}$</div>
          </div>
        </div>

        <div className="orderInfoDiv">
          <p className="custTitle">Shipping Details</p>

          <div className="shippingDiv">
            <div className="infoFlex">
              <p className="orderTitle"> Contact Information</p>
              <input
                type="text"
                className="orderInfoCont wid"
                placeholder="First Name"
                value={clientData.firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                className="orderInfoCont wid"
                placeholder="Last Name"
                value={clientData.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                className="orderInfoCont"
                placeholder="Email"
                value={emailFromLocalStorage}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="orderInfoCont"
                placeholder="Phone Number"
                value={clientData.phoneNUmber}
                onChange={(e) => setPhoneNUmber(e.target.value)}
              />
            </div>
            <div className="infoFlex">
              <p className="orderTitle">Shipping Information </p>
              <select
                className=" orderInfoCont selectCountry"
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antartica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegowina">
                  Bosnia and Herzegowina
                </option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">
                  British Indian Ocean Territory
                </option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">
                  Central African Republic
                </option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo">
                  Congo, the Democratic Republic of the
                </option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                <option value="Croatia">Croatia (Hrvatska)</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="East Timor">East Timor</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands">
                  Falkland Islands (Malvinas)
                </option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="France Metropolitan">
                  France, Metropolitan
                </option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">
                  French Southern Territories
                </option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-Bissau">Guinea-Bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard and McDonald Islands">
                  Heard and Mc Donald Islands
                </option>
                <option value="Holy See">Holy See (Vatican City State)</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran (Islamic Republic of)</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Democratic People's Republic of Korea">
                  Korea, Democratic People's Republic of
                </option>
                <option value="Korea">Korea, Republic of</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao">Lao People's Democratic Republic</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon" selected>
                  Lebanon
                </option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">
                  Libyan Arab Jamahiriya
                </option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macau">Macau</option>
                <option value="Macedonia">
                  Macedonia, The Former Yugoslav Republic of
                </option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia">
                  Micronesia, Federated States of
                </option>
                <option value="Moldova">Moldova, Republic of</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">
                  Netherlands Antilles
                </option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">
                  Northern Mariana Islands
                </option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Kitts and Nevis">
                  Saint Kitts and Nevis
                </option>
                <option value="Saint LUCIA">Saint LUCIA</option>
                <option value="Saint Vincent">
                  Saint Vincent and the Grenadines
                </option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">
                  Sao Tome and Principe
                </option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia (Slovak Republic)</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia">
                  South Georgia and the South Sandwich Islands
                </option>
                <option value="Span">Spain</option>
                <option value="SriLanka">Sri Lanka</option>
                <option value="St. Helena">St. Helena</option>
                <option value="St. Pierre and Miguelon">
                  St. Pierre and Miquelon
                </option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syrian Arab Republic</option>
                <option value="Taiwan">Taiwan, Province of China</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania">Tanzania, United Republic of</option>
                <option value="Thailand">Thailand</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos">
                  Turks and Caicos Islands
                </option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">
                  United Arab Emirates
                </option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="United States Minor Outlying Islands">
                  United States Minor Outlying Islands
                </option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Viet Nam</option>
                <option value="Virgin Islands (British)">
                  Virgin Islands (British)
                </option>
                <option value="Virgin Islands (U.S)">
                  Virgin Islands (U.S.)
                </option>
                <option value="Wallis and Futana Islands">
                  Wallis and Futuna Islands
                </option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Serbia">Serbia</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
              <input
                type="text"
                className="orderInfoCont wid"
                placeholder="City Name"
                onChange={(e) => setCityname(e.target.value)}
              />
              <input
                type="text"
                className="orderInfoCont wid"
                placeholder="Postal Code"
                onChange={(e) => setPostalCode(e.target.value)}
              />

              <input
                type="text"
                className="orderInfoCont"
                placeholder="Street Address"
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <div className="buttonorder">
                <button className="placeOrderBtn" onClick={handleAddShipping}>
                  {" "}
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* Confirmation Modal */}
      {showModal && (
        <div>
          {/* Overlay */}
          <div className="overlay show" onClick={closeModal}></div>

          {/* Modal */}
          <div className="confirmation-modal show">
            <div className="cond">Ordered Placed Succesfully</div>
            <div className="Okbutton">
              <button className="OkOrder" onClick={closeModal}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoggedIn && (
        <div>
          {/* Overlay */}
          <div className="overlay show" onClick={closeModal}></div>

          {/* Modal */}
          <div className="confirmation-modal show">
            <div className="cond">
              {" "}
              Please log in before proceeding with shipping.
            </div>
            <div className="Okbutton">
              <Link to="/Login">
                <button className="OkOrder">Log In</button>
              </Link>
              <button className="OkOrder" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;