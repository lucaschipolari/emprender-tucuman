import React from "react";
import "./FilterModal.css";
import FilterSelector from "./FilterSelector";
const FilterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Filtros</h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="d-flex justify-content-center">
            <FilterSelector />
          </div>

          {/* <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
            <button className="btn btn-primary">Aplicar</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default FilterModal;
