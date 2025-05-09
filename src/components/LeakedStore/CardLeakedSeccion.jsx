import React from "react";

const CardLeakedSeccion = () => {
  return (
    <div className="container my-5">
      <div className="row">
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map((i) => (
          <div key={i} className="col-12 col-sm-6 col-lg-3 mb-4">
            <div className="card h-100">
              <img
                src={`https://via.placeholder.com/300x200?text=Card+${i}`}
                className="card-img-top"
                alt={`Card ${i}`}
              />
              <div className="card-body">
                <h5 className="card-title">Título {i}</h5>
                <p className="card-text">
                  Esta es una descripción genérica para la tarjeta {i}.
                </p>
                <a href="#" className="btn btn-primary">
                  Ver más
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardLeakedSeccion;
