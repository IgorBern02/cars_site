// streamifier.d.ts
declare module "streamifier" {
  interface Streamifier {
    createReadStream(buffer: Buffer): NodeJS.ReadableStream;
    // você pode adicionar mais métodos se precisar
  }

  const streamifier: {
    createReadStream(buffer: Buffer): NodeJS.ReadableStream;
  };

  export = streamifier;
}
