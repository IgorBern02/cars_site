import { Button } from "../Button";
import { Input } from "../Input";
import type { PropsForm } from "../../types/addcars/types";

export const Form = ({
  form,
  setForm,
  setImagem,
  handleSubmit,
  handleInputChange,
  handleFileChange,
  preview,
  setPreview,
}: PropsForm) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-start gap-6 w-full max-w-md p-6 bg-white/10 backdrop-blur-md rounded-lg"
    >
      <section className="gap-5 flex flex-col w-full">
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

      <Input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="text-white"
      />

      {preview && (
        <div className="flex flex-col items-center mt-2">
          <img
            src={preview} // ✅ usar a variável preview, não setPreview
            alt="Pré-visualização"
            className="w-48 h-48 object-cover rounded border border-gray-300"
          />
          {/* <button
            type="button"
            className="mt-2 text-red-500 hover:text-red-700"
            }onClick={() => {
              setImagem(null);
              setPreview(null);
              setForm({ ...form });
            }
          > */}
          <Button
            type="button"
            text="Remover imagem"
            onClick={() => {
              setImagem(null);
              setPreview(null);
              setForm({ ...form });
            }}
          />

          {/* </button> */}
        </div>
      )}

      <Button type="submit" text="Adicionar" />
    </form>
  );
};
