import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/index.css";
import AddCars from "./pages/AddCars";
import ListCars from "./pages/ListCars";

export default function App() {
  return (
    <BrowserRouter>
      {/* <nav>
        <Link to="/">Home</Link> | <Link to="/addcars">Sobre</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addcars" element={<AddCars />} />
        <Route path="/listcars" element={<ListCars />} />
      </Routes>
    </BrowserRouter>
  );
}
