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
    <div>
      <nav className="navbar navbar-expand-lg bg-white m-2 border-radius rounded ">
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                          className="dropdown-item"
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
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success " type="submit">
                <i class="bi bi-search"></i>
              </button>
            </form>
            <>
              <li className="nav-item dropdown list-unstyled mx-2">
                <a
                  className="nav-link icon-button"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person custom-icon"></i>
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
    </div>
  );
};

export default Navbar;
