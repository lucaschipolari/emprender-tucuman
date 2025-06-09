import React from "react";
import "./Options.css";

const Options = ({ onCrearClick }) => {
  return (
    <div className="row justify-content-end my-4 mx-2 g-3">
      <div className="col-md-6 order-1 order-md-2">
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input type="text" className="form-control" placeholder="Buscar..." />
        </div>
      </div>

      <div className="col-md-6 order-2 order-md-1">
        <div className="d-flex justify-content-md-end justify-content-center">
          <button className="btn btn-success" onClick={onCrearClick}>
            Crear nueva publicación
          </button>
        </div>
      </div>
    </div>
  );
};

export default Options;
