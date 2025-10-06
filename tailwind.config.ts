/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ["var(--font-sikta)", "Poppins", "sans-serif"],
            },
            keyframes: {
                borderMove: {
                    "0%": { backgroundPosition: "0% 50%" },
                    "100%": { backgroundPosition: "100% 50%" },
                },
            },
            animation: {
                borderMove: "borderMove 3s linear infinite",
            },
        },
    },
    plugins: [],
};