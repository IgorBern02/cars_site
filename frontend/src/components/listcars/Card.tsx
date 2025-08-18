type PropsCar = {
  car: {
    _id: string;
    marca: string;
    modelo: string;
    ano: number;
    imagem: string;
  };
};

export const Card = ({ car }: PropsCar) => {
  return (
    <div key={car._id} className="flex flex-col items-center">
      <h2>
        {car.marca} {car.modelo} ({car.ano})
      </h2>
      <img
        src={`http://localhost:3001${car.imagem}`}
        alt={car.modelo}
        width={300}
      />
    </div>
  );
};
