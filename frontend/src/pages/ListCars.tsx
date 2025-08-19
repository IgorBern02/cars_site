import { useState, useEffect } from "react";
import { Card } from "../components/listcars/Card";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Car } from "../types/listcars/types";

export default function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/cars`)
      .then((res) => res.json())
      .then((data: Car[]) => setCars(data));
  }, []);

  const filteredCars = cars.filter((car) =>
    `${car.marca} ${car.modelo} ${car.ano}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto flex flex-col min-h-screen w-full bg-cars-gradient">
      <header className="p-4 flex items-center">
        <nav>
          <Link
            to="/"
            className="p-2 rounded cursor-pointer transition-all duration-300 shadow-lg"
          >
            <FaAngleLeft className="text-white" size={25} />
          </Link>
        </nav>
      </header>

      <main className="flex flex-col items-center flex-1 w-full">
        <section className="flex flex-col items-center justify-center w-full max-w-6xl p-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-white mt-6">
            Lista de carros
          </h1>

          <form className="w-full flex items-center justify-center">
            <input
              type="search"
              placeholder="Pesquisar carro"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 p-2 rounded-lg bg-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 w-4/5 md:w-full md:max-w-md"
            />
          </form>
        </section>

        <section
          aria-label="Lista de carros"
          className="grid grid-cols-1 md:grid-cols-2 items-center justify-center w-full max-w-6xl gap-4"
        >
          {filteredCars.length === 0 ? (
            <p className="text-white">Nenhum carro encontrado...</p>
          ) : (
            filteredCars.map((car) => <Card key={car._id} car={car} />)
          )}
        </section>
      </main>
    </div>
  );
}
