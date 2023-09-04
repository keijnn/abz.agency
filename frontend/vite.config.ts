import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {'REACT_APP_URL':"https://abzagency-95690ec74347.herokuapp.com"}
  },
  plugins: [react()
],
})
