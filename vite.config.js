import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// const path = require("path");

const resolvePath = (str) => path.resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // 防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制
    cssTarget: 'chrome61',
    build: {
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "react",
                    "react-dom": "react-dom",
                },
            },
        },
        lib: {
            entry: resolvePath("src/index.js"),
            name: "mal-react-components",
            fileName: format => `mal-react-components.${format}.js`,
        },
    }
})
