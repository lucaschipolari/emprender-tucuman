import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Columna 1: Descripción */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">EmprenderTucuman</h5>
            <p className="text-muted">
              Apoyamos a emprendedores con tecnología y visibilidad. Conectamos
              productos locales con clientes que valoran lo hecho con pasión.
            </p>
          </div>

          {/* Columna 2: Enlaces útiles */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Páginas</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/tiendaonline"
                  className="text-white text-decoration-none"
                >
                  Tienda
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre-nosotros"
                  className="text-white text-decoration-none"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="text-white text-decoration-none"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes sociales */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Síguenos</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-white fs-4">
                <FaFacebook />
              </a>
              <a href="#" className="text-white fs-4">
                <FaTwitter />
              </a>
              <a href="#" className="text-white fs-4">
                <FaInstagram />
              </a>
              <a href="#" className="text-white fs-4">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-top border-secondary" />

        {/* Pie inferior */}
        <div className="text-center mt-3">
          <small className="text-muted">
            &copy; {new Date().getFullYear()} EmprenderTucuman. Todos los
            derechos reservados.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
