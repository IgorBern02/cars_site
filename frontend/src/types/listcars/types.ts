export type PropsCar = {
  car: {
    _id: string;
    marca: string;
    modelo: string;
    ano: number;
    imagem: string;
  };
};

export interface Car {
  _id: string;
  marca: string;
  modelo: string;
  ano: number;
  imagem: string;
}
