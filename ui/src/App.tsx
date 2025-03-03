import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./Auth/AuthProvider";
import Login from "./Login/Login";
import PrivateRoute from "./Auth/PrivateRoute";
import Register from "./Register/Register";
import Images from "./Images/Images";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/images"
            element={
              <PrivateRoute>
                <Images />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
