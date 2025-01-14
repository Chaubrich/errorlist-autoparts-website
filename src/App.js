import './App.css';
import {NavBar} from "./navBar/NavBar.js";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Shop} from "./pages/Shop";
import {Services} from "./pages/Services";
import { ForYourCar } from "./pages/ForYourCar";
import {Contact} from "./pages/Contact";
import {Account} from "./pages/Account";
import {Cart} from "./pages/Cart";
import {Home} from "./pages/Home";
import {Category} from "./pages/Category";
import { Item } from './pages/Item.js';
import {ServiceDetails} from './pages/ServiceDetails'
import {NewBookService} from './pages/NewBookService';
import {SearchResults} from "./pages/SearchResults";
import {ChatBot} from "./pages/ChatBot";
function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/shop"} element={<Shop />} />
                <Route path={"/services"} element={<Services />} />
                <Route path={"/for-your-car"} element={<ForYourCar />} />
                <Route path={"/chatbot"} element={<ChatBot />} />
                <Route path={"/contact-us"} element={<Contact />} />
                <Route path={"/login"} element={<Account />} />
                <Route path={"/cart"} element={<Cart />} />
                <Route path="/category/:categoryName" element={<Category />} />
                <Route path="/item/:itemId" element={<Item />} />
                <Route path="/service/:serviceId" element={<ServiceDetails />} />
                <Route path="/newbookservice" element={<NewBookService />} />
                <Route path="/search" element={<SearchResults />} />
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
