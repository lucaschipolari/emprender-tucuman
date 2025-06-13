const AdminView = ({ children }) => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Panel de Administración</h1>
      {children}
    </div>
  );
};

export default AdminView;
