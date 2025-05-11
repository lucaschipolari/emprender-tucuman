import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
const rubros = [
  "Alimentos y Bebidas",
  "Ropa y Accesorios",
  "Belleza y Cosmética",
  "Hogar y Decoración",
  "Artesanías",
  "Joyería y Bijouterie",
  "Tecnología",
  "Servicios",
  "Libros y Papelería",
  "Mascotas",
];

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white fixed-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <div>
            <img
              src="/logoEmprenderTucuman.jpeg"
              alt="Logo Emprender Tucumán"
              className="img-fluid logo-navbar"
            />
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
            <>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/"
                >
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/"
                >
                  Tienda
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Rubros
                </a>
                <ul className="dropdown-menu">
                  {rubros.map((rubro, index) => (
                    <li key={index}>
                      <NavLink
                        className="dropdown-item p-2"
                        to={`/rubros/${rubro}`}
                      >
                        {rubro}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/"
                >
                  Favoritos
                </NavLink>
              </li>
            </>
          </ul>
          <form
            className="d-flex align-items-center justify-content-center"
            role="search"
          >
            <div className="search-bar-wrapper">
              <input
                className="form-control search-input"
                type="search"
                placeholder=""
                aria-label="Search"
              />
              <button
                className="btn-outline-custom search-button"
                type="submit"
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
          <>
            <li className="nav-item dropdown list-unstyled m-2 d-flex justify-content-center">
              <a
                className="nav-link icon-button"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="borde-icono">
                  <i className="bi bi-person custom-icon"></i>
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <NavLink className="dropdown-item" to="/Login">
                    Iniciar Sesión
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/Register">
                    Registrarse
                  </NavLink>
                </li>
              </ul>
            </li>
          </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
