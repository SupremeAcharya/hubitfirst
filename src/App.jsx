import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Service from "./pages/Service";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
// import FormikContact from "./components/FormikContact";
import Login from "./components/Login";
import Register from "./components/Register";
import Forgot from "./components/Forgot";
import Reset from "./components/Reset";
// import Dashboard from "./components/Dashboard";
import AuthProvider from "./context/AuthContext";
import Users from "./components/Users";
import Services from "./components/Services";
import Contacts from "./components/Contacts";
import Layout from "./components/Layout";
import Edit from "./components/EditService";
import AddService from "./components/AddService";
import Profile from "./components/Profile";
import Details from "./components/Details";
import Layout2 from "./components/Layout2";
import EditProfile from "./components/EditProfile";
import CustomInput from "./components/CustomInput";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<CustomInput />} />
            <Route path="/service" element={<Service />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/contact" element={<FormikContact />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/dashboard" element={<Layout />}>
              <Route path="users" element={<Users />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="services" element={<Services />} />
              <Route path="services/:id/edit" element={<Edit />} />
              <Route path="services/add" element={<AddService />} />
            </Route>
            <Route path="/profile" element={<Layout />}>
              <Route path="details" element={<Details />} />
              <Route path="edit" element={<EditProfile />} />
              {/* <Route path="change" element={<Details />} /> */}
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
