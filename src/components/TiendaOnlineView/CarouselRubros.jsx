
const categorias = [
  {
    nombre: "Herramientas",
    imagen: "https://i.pinimg.com/736x/a6/49/42/a649427c5ce76b9a224d7f9c8a98439d.jpg",
    miniaturas: [
      "https://i.pinimg.com/736x/24/91/06/249106becd42b608d4a4b57c4f3d1d99.jpg",
      "https://i.pinimg.com/736x/20/90/42/209042e2ff7841656c98f45225b41bd0.jpg"
    ]
  },
  {
    nombre: "Ropa",
    imagen: "https://i.pinimg.com/736x/c8/39/af/c839afffc3d7a9daefdc4934563a98af.jpg",
    miniaturas: [
      "https://i.pinimg.com/736x/1d/9c/5d/1d9c5d8865719d5573906fad5c8d62ab.jpg",
      "https://i.pinimg.com/736x/9d/e8/76/9de8760c4f98eccab39d31472020a2df.jpg"
    ]
  },
  {
    nombre: "Maquillaje",
    imagen: "https://i.pinimg.com/736x/9e/97/b1/9e97b10b08852b19a74e630d28c5fd2d.jpg",
    miniaturas: [
      "https://i.pinimg.com/736x/84/1b/5f/841b5f57a2878985b9bd4c8e386e82bc.jpg",
      "https://i.pinimg.com/736x/a0/c5/52/a0c552041ec6c24228b6fa84d45a6cfa.jpg"
    ]
  }
];

const SeccionCategorias = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center gap-3">
        {categorias.map((cat, index) => (
          <div
            key={index}
            className="col-12 col-md-3 d-flex flex-column align-items-center bg-white shadow rounded p-3"
            style={{ minWidth: '250px' }}
          >
            <img
              src={cat.imagen}
              alt={cat.nombre}
              className="img-fluid rounded mb-3"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <h5>{cat.nombre}</h5>
            <div className="d-flex gap-2 mt-2">
              {cat.miniaturas.map((mini, idx) => (
                <img
                  key={idx}
                  src={mini}
                  alt={`Mini ${idx}`}
                  width="50"
                  height="50"
                  className="rounded shadow-sm"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeccionCategorias;
