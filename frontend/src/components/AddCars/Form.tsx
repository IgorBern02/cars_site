import { Button } from "../globals/Button";
import { Input } from "./Input";
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
  fileName,
  setFileName,
}: PropsForm) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-6 w-full h-full md:h-auto max-w-md p-6 md:bg-white/10 md:backdrop-blur-md rounded-lg"
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
        fileName={fileName}
        setFileName={setFileName}
      />

      {preview && (
        <div className="flex flex-col items-center mt-2">
          <img
            src={preview}
            alt="Pré-visualização"
            className="w-full h-48 object-cover rounded-t-lg border border-gray-300"
          />

          <Button
            type="button"
            text="Remover imagem"
            onClick={() => {
              setImagem(null);
              setPreview(null);
              setFileName("");
              setForm({ ...form });
            }}
          />
        </div>
      )}

      <Button
        type="submit"
        text="Adicionar"
        btnColor="bg-car-red"
        btnHoverColor="hover:bg-car-blue"
        btnGlowColor="rgba(230, 57, 70, 0.7)"
      />
    </form>
  );
};
