import { useState } from "react";
import MenuLateral from "../components/Administrador/MenuLateral.jsx";
import AdminPanel from "../components/Administrador/AdminPanel.jsx";

export const AdminView = () => {
  const [selectedOption, setSelectedOption] = useState("Usuarios"); 

  return (
    <div className="row g-0">
      <div className="col-2">
        <MenuLateral onOptionSelect={setSelectedOption} selected={selectedOption} />
      </div>
      <div className="col-10">
        <AdminPanel selectedOption={selectedOption} />
      </div>
    </div>
  );
};

export default AdminView;
