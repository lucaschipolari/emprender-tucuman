import {
  FaTshirt,
  FaHeadphones,
  FaHammer,
  FaFutbol,
  FaBicycle,
} from "react-icons/fa";
import "./Categorias.css";
import { Link } from "react-router-dom";
const categorias = [
  { icon: <FaTshirt size={30} />, label: "" },
  { icon: <FaHeadphones size={30} />, label: "" },
  { icon: <FaHammer size={30} />, label: "" },
  { icon: <FaFutbol size={30} />, label: "" },
  { icon: <FaBicycle size={30} />, label: "" },
];

const Categorias = () => {
  return (
    <div className="text-center my-5">
      <h5 className="mb-4">Explorá los rubros</h5>
      <div className="d-flex justify-content-center flex-wrap gap-4">
        {categorias.map((item, idx) => (
          <Link
            key={idx}
            className="rounded-circle bg-white shadow-sm d-flex flex-column align-items-center justify-content-center categoria-selector"
            to={"/error"}
          >
            {item.icon}
            <small className="text-muted">{item.label}</small>
          </Link>
        ))}
      </div>
      <button className="btn btn-success mt-4">ver más</button>
    </div>
  );
};

export default Categorias;
