import { Button } from "../Button";
import { Input } from "../Input";
import type { PropsForm } from "../../types/addcars/types";

export const Form = ({
  form,
  handleSubmit,
  handleInputChange,
  handleFileChange,
}: PropsForm) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-evenly gap-4 w-full h-4/5 p-4"
    >
      <section className="gap-7 flex flex-col items-center justify-center w-full">
        <Input
          type="text"
          name="marca"
          placeholderLabel="Marca"
          placeholderInput="Digite a marca aqui..."
          value={form.marca}
          onChange={handleInputChange}
        />

        <Input
          type="text"
          name="modelo"
          placeholderLabel="Modelo"
          placeholderInput="Digite o modelo aqui..."
          value={form.modelo}
          onChange={handleInputChange}
        />

        <Input
          type="number"
          name="ano"
          placeholderLabel="Ano"
          placeholderInput="Digite o ano aqui..."
          value={form.ano}
          onChange={handleInputChange}
        />
      </section>

      <Input type="file" onChange={handleFileChange} />

      <Button type="submit" text="Adicionar" />
    </form>
  );
};
