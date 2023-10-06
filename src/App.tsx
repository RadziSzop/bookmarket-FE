import { Button } from "./components/ui/button";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Login } from "./pages/Login/Login";
import { ModeToggle } from "./components/theme-provider/mode-toggle";
import { RegisterForm } from "./components/register-form/register-form";

function App() {
  return (
    <>
      <Navbar />
      <ModeToggle />
      {
        <Routes>
          <Route path="/books" element={<RegisterForm />} />
        </Routes>
      }

    </>
  );
}

export default App;
