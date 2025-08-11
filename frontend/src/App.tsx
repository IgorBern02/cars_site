import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface Car {
  _id: string;
  marca: string;
  modelo: string;
  ano: number;
  imagem: string;
}

interface Form {
  marca: string;
  modelo: string;
  ano: string;
}

export default function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [form, setForm] = useState<Form>({ marca: "", modelo: "", ano: "" });
  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/cars")
      .then((res) => res.json())
      .then((data: Car[]) => setCars(data));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("marca", form.marca);
    formData.append("modelo", form.modelo);
    formData.append("ano", form.ano);
    if (imagem) {
      formData.append("imagem", imagem);
    }

    await fetch("http://localhost:3001/api/cars", {
      method: "POST",
      body: formData,
    });

    console.log("Car adicionado com sucesso!");

    // window.location.reload();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Carros</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={form.marca}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={form.modelo}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="ano"
          placeholder="Ano"
          value={form.ano}
          onChange={handleInputChange}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Adicionar</button>
      </form>

      <div>
        {cars.map((car) => (
          <div key={car._id}>
            <h2>
              {car.marca} {car.modelo} ({car.ano})
            </h2>
            <img src={car.imagem} alt={car.modelo} width={300} />
          </div>
        ))}
      </div>
    </div>
  );
}
