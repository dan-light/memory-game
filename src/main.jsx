import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";
import App from "./App.jsx";

const theme = createTheme({
  primaryColor: "blue",
  colorScheme: "dark",
  fontFamily: "Raleway, sans-serif",
  headings: {
    fontFamily: "Bricolage Grotesque, sans-serif",
    sizes: {
      h1: { fontSize: "2.5rem" },
      h2: { fontSize: "2rem" },
      h3: { fontSize: "1.5rem" },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>,
);
