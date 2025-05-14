import { Link } from "react-router-dom";
import "./Error404.css";
const Error404 = () => {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column text-center centrado">
      <h1>Error 404</h1>
      <p>La página que estás buscando no existe.</p>
      <Link to="/">Volver al principio</Link>
    </div>
  );
};

export default Error404;
