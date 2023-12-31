import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <ReactQueryDevtools initialIsOpen={true} />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
