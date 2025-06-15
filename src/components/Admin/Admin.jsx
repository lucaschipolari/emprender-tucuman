import "./Admin.css";

const Admin = ({ children }) => {
  return (
    <div className="contenedor-panel">
      <div className="container ">
        <h1 className="mb-4">Panel de Administración Usuarios</h1>
        {children}
      </div>
    </div>
  );
};

export default Admin;
