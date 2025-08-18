import { Card } from "../components/home/Card";
import "../styles/globals.css";

export default function Home() {
  return (
    <section
      className="w-full h-auto md:h-screen flex flex-col md:flex-row items-center justify-center gap-8 
  bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] 
  text-gray-100 p-6"
    >
      <Card
        text="Adicionar Carros"
        textLink="Adicionar"
        link="/addcars"
        img="add-cars.svg"
        btnColor="bg-car-red"
        btnHoverColor="hover:bg-car-blue"
        btnGlowColor="rgba(230, 57, 70, 0.7)"
        widthCard="w-40"
        heightCard="h-40"
      />
      <Card
        text="Listar Carros"
        textLink="Listar"
        link="/listcars"
        img="list-cars.svg"
        btnColor="bg-car-blue"
        btnHoverColor="hover:bg-car-blue"
        btnGlowColor="rgba(30, 144, 255, 0.7)"
        widthCard="w-46"
        heightCard="h-46"
      />
    </section>
  );
}
