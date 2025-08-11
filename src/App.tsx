import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { AuthProvider } from "./components/AuthProvider";
import { GlobalStyles } from "./styles/global";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;