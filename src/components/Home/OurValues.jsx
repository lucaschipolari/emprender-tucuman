import React from "react";
import "./OurValues.css";
const OurValues = () => {
  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        <h1 className="d-flex text-center m-3 mb-4">Nuestros valores</h1>
        <div className="row">
          <div className="col-12 col-sm-4">
            <div className="d-flex w-100 justify-content-center align-items-center gap-3">
              <i class="bi bi-bag-check icono-valores"></i>
              <h2 className="m-0">Comercio local</h2>
            </div>
            <p className="justify-text">
              Creemos en el potencial de nuestros emprendedores y trabajamos
              para visibilizarlo. Nos enorgullece impulsar productos y servicios
              que nacen en nuestra tierra, con nuestras raíces y cultura.
            </p>
          </div>
          <div className="col-12 col-sm-4">
            <div className="d-flex w-100 justify-content-center align-items-center gap-3">
              <i class="bi bi-people-fill icono-valores"></i>
              <h2 className="m-0">Comunidad</h2>
            </div>
            <p className="justify-text">
              Conectamos personas con talento y personas con ganas de apoyar lo
              local. Creamos una comunidad donde el comercio no es solo
              intercambio, sino reconocimiento, colaboración y crecimiento
              compartido.
            </p>
          </div>
          <div className="col-12 col-sm-4">
            <div className="d-flex justify-content-center">
              <div className="d-flex w-100 justify-content-center align-items-center gap-3">
                <i class="bi bi-shuffle icono-valores"></i>
                <h2 className="m-0">Conectar</h2>
              </div>
            </div>
            <p className="justify-text">
              Promovemos relaciones claras y confiables entre emprendedores y
              compradores. Todos los emprendedores tienen las mismas
              oportunidades de visibilidad, y los usuarios pueden calificar
              honestamente para fomentar la calidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurValues;
