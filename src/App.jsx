import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AllToys from "./pages/AllToys";
import AddToys from "./pages/AddToy";
import EditToy from "./pages/EditToy";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<AllToys />} />
        <Route path="/add" element={<AddToys />} />
        <Route path="/edit-toy/:id" element={<EditToy />}></Route>
      </Routes>
    </div>
  );
};

export default App;
