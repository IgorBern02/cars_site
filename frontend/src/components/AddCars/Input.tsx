import type { PropsInput } from "../../types/addcars/types";
import { useState } from "react";

// Input
export const Input = ({
  type,
  name,
  placeholderLabel,
  placeholderInput,
  value,
  onChange,
  accept,
  fileName,
  setFileName,
}: PropsInput) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  // const [fileName, setFileName] = useState<string>("");

  if (type === "file") {
    return (
      <div className="w-full flex flex-col">
        <label className="mb-1 text-gray-200 text-sm">
          {placeholderLabel ?? "Upload de arquivo"}
        </label>

        <label
          htmlFor={`file-${name}`}
          className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg transition"
        >
          Escolher Foto
        </label>

        <input
          id={`file-${name}`}
          type="file"
          name={name}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFileName?.(e.target.files[0].name);
            } else {
              setFileName?.("");
            }
            onChange?.(e);
          }}
          className="hidden"
        />

        <p className="mt-2 text-gray-300 text-sm">
          {fileName || "Nenhum arquivo selecionado"}
        </p>
      </div>
    );
  }

  return (
    <section className="flex flex-col relative w-full gap-1 justify-center items-center">
      <label
        className={`
          absolute left-2 transition-all duration-200
          ${
            isFocused || value
              ? "-top-2 text-sm text-blue-400 bg-gray-900 px-1 rounded"
              : "top-2 text-gray-400"
          }
        `}
      >
        {placeholderLabel}
      </label>
      <input
        placeholder={isFocused ? placeholderInput : ""}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        accept={accept}
        className="w-full border h-12 bg-gray-200 text-gray-900 p-2 rounded outline-none appearance-none focus:border-blue-400"
      />
    </section>
  );
};
