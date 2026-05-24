/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "NegroSuave": "#1C1C1C",
        "NegroSuaveSuavizado": "rgba(28, 28, 28, 0.9)",
        "GrisOscuro": "#3A3A3A",
        "GrisClaro": "#D1D1D1",
        "RosadoSuave": "#F2A7D5",
        "RosadoPastel": "#F7D1E1",
        "RosadoOcobo": "#E96BA3",
        "Suavizado": "rgba(0,0,0,0.5)",
      },

      transitionProperty: {
        "Transicion1": "all 500ms ease",
      },

      keyframes: {
        "moverTren": {
          "0%": { transform: "translateX(100%)"},
          "100%": { transform: "translateX(-100%)"},
        },
      },

      animation: {
        "tren": "moverTren 20s linear infinite",
      },

      width: {
        "anchoEspecial": "35rem"
      }
    },
  },
  plugins: [],
}

