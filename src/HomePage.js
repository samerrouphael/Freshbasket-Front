import Header from "./Component/Header";
import CustomerReview from "./Component/CustomerReview";
import Footer from "./Component/Footer";
import LatestProducts from "./Component/LatestProducts";
function HomePage() {
  return (
    <div className="HomePage">
     <Header/>
     {<LatestProducts/> }
     <CustomerReview/>
     <Footer/> 
    </div>
  );
}

export default HomePage;
