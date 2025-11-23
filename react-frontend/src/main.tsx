import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
// import Header from "./components/Header.tsx";
import theme from "./components/theme.ts";
import Home from "./pages/Home.tsx";
import Videos from "./pages/Videos.tsx";
import Stretch from "./pages/Stretch.tsx";
import Test from "./pages/Test.tsx";
import Chat from "./pages/Chat.tsx";
import LiveWebFeed from "./pages/LiveWebFeed.js";
import Survey from "./pages/Survey.tsx";
import Diagram from "./pages/Diagram.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/camera" element={<LiveWebFeed />} />
            <Route path="/stretch" element={<Stretch />} />
            <Route path="/test" element={<Test />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/diagram" element={<Diagram />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
