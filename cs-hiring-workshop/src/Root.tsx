import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./util/ProtectedRoute";
// import { Myform } from "./Myform";

export const Root = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      {/* <Myform /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
