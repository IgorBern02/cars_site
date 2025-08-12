import { Button } from "./Button";
import { Input } from "./Input";
import type { PropsForm } from "../types/types";

export const Form = ({
  form,
  handleSubmit,
  handleInputChange,
  handleFileChange,
}: PropsForm) => {
  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="marca"
        placeholder="Marca"
        value={form.marca}
        onChange={handleInputChange}
      />

      <Input
        type="text"
        name="modelo"
        placeholder="Modelo"
        value={form.modelo}
        onChange={handleInputChange}
      />

      <Input
        type="number"
        name="ano"
        placeholder="Ano"
        value={form.ano}
        onChange={handleInputChange}
      />

      <Input type="file" onChange={handleFileChange} />

      <Button type="submit" text="Adicionar" />
    </form>
  );
};
