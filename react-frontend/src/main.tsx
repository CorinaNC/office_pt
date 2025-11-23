import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header.tsx";
import theme from "./components/theme.ts";
import Home from "./pages/Home.tsx";
import Videos from "./pages/Videos.tsx";
import Camera from "./pages/Camera.tsx";
import Stretch from "./pages/Stretch.tsx";
import Test from "./pages/Test.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/stretch" element={<Stretch />} />
            <Route path="/test" element={<Test />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
