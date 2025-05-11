const CardEmprendimientos = () => {
  return (
    <div className="card rounded-4">
        <div className="row">
            <div className="col-6">
                <div className="img-contenedor">
                    <img src="https://www.katiaribeiro.com.br/wp-content/uploads/2023/09/image-3657.png.webp" alt="" className="img-size-card-producto w-100"/>
                </div>
            </div>
            <div className="col-6 d-flex justify-content-center align-items-center">
                <h3 className="mt-3 ">Tejiendo</h3>
            </div>
        </div>
        <p className="mx-3 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ipsum reprehenderit labore dicta, totam quaerat quae. Nostrum iusto minima suscipit qui nisi, expedita mollitia fugiat dignissimos numquam nobis maxime vel!</p>
    </div>
  );
};

export default CardEmprendimientos;