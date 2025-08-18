import { useState, useEffect } from "react";
import { Card } from "../components/listcars/Card";

interface Car {
  _id: string;
  marca: string;
  modelo: string;
  ano: number;
  imagem: string;
}

export default function App() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/cars")
      .then((res) => res.json())
      .then((data: Car[]) => setCars(data));
  }, []);

  return (
    <div className="mx-auto bg-red-600 flex flex-row items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center bg-blue-500 h-full w-full">
        <h3>Lista de carros</h3>
        {cars.length === 0 ? (
          <p>Carregando carros...</p>
        ) : (
          cars.map((car) => <Card key={car._id} car={car} />)
        )}
      </div>
    </div>
  );
}
