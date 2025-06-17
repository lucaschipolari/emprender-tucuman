import "./Admin.css";
import UsuarioPanel from "./UsuarioPanel";

const AdminPanel = ({selectedOption}) => {
  return (
    <div className="custom-adminpanel">
      {selectedOption === "Usuarios" && <UsuarioPanel/>}
      {selectedOption === "Emprendedores" && <div>Panel de Emprendedores</div>}
      {selectedOption === "Categorias" && <div>Panel de Categorías</div>}
      {selectedOption === "Estadisticas" && <div>Panel de Estadísticas</div>}
      {selectedOption === "Configuración" && <div>Panel de Configuración</div>}
    </div>
  )
}

export default AdminPanel