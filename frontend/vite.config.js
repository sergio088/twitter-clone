import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".", // raiz do projeto (onde está o vite.config.js)
  publicDir: "public", // onde ficam os assets públicos tipo imagens, etc
  build: {
    rollupOptions: {
      input: {
        homepage: resolve(__dirname, "src/views/index.html"),
        criarConta: resolve(__dirname, "src/views/cadastro.html"),
        entrar: resolve(__dirname, "src/views/logar.html"),
        X: resolve(__dirname, "src/views/X.ejs"),
        // pode adicionar mais páginas aqui se quiser
      },
    },
    outDir: "dist", // onde os arquivos vão depois do build
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: "homepage", // abre essa página ao rodar npm run dev
  },
});
