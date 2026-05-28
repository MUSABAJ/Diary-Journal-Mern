import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      '/api':{
        target: 'http://localhost:5000',
        changeOrigin:true,
      }
    }
  }
})
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// const API_PROXY_TARGET = import.meta.env.MODE === "development" ? 'http://localhost:5000' : '';
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: API_PROXY_TARGET,
//         changeOrigin: true,
//       }
//     }
//   }
// })
      