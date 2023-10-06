import { Button } from "./components/ui/button";
import { Routes, Route } from "react-router-dom";

import { ModeToggle } from "./components/theme-provider/mode-toggle";
import { RegisterForm } from "./components/register-form/register-form";

function App() {
  return (
    // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <>
      <Button>DotknijMnie</Button>
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
