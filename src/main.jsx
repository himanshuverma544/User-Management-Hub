import { createRoot } from "react-dom/client";

import App from "./App";

import ContextProvider from "./global-context-API/ContextProvider";

import { Provider } from "react-redux";
import store from "./redux/store";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ContextProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </ContextProvider>
);
