import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MyThemeProvider from "./components/settings/Theme/ProviderTheme.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store.jsx";
import App from "./App.jsx";




ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <MyThemeProvider>
         <App />
      </MyThemeProvider>
    </BrowserRouter>
  </Provider>
);
