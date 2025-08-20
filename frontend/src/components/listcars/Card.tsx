import type { PropsCar } from "../../types/listcars/types";

export const Card = ({ car }: PropsCar) => {
  return (
    <div
      key={car._id}
      className="flex flex-col items-center justify-center mt-10 p-4 rounded-lg shadow-md m-4 bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105"
    >
      <h2 className="text-xl text-white font-semibold mb-2 text-center">
        {car.marca} {car.modelo} ({car.ano})
      </h2>
      <img
        src={car.imagem}
        alt={`${car.marca} ${car.modelo}`}
        className="w-[300px] h-[200px] object-cover rounded-md"
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/300x200?text=Imagem+Não+Disponível";
        }}
      />
    </div>
  );
};
