import CarouselOfertas from "../components/TiendaOnlineView/CarouselOfertas";
import CarouselEmprendimientos from "../components/TiendaOnlineView/CarouselEmprendimientos";
import AcordeonPreguntasFrecuentes from "../components/TiendaOnlineView/AcordeonPreguntasFrecuentes";
import '../components/TiendaOnlineView/TiendaOnline.css';

const TiendaOnlineView = () => {
  return (
    <>
    <div className="bg-verde-suave p-4">
      <div className="padding-tiendaonline">
        <section className="rounded-3 bg-blanco mb-4 p-3">
          <h3 >Ofertas</h3>
          <CarouselOfertas/>
        </section>
        <section className="rounded-3 bg-blanco mb-4 p-3">
            <h3 >Productos destacados</h3>
            <CarouselOfertas/>
        </section>
        <section className="rounded-3 bg-blanco mb-4 p-3">
            <h3 >Rubros</h3>
        </section>
        <section className="rounded-3 bg-blanco mb-4 p-3">
            <h3 >Descubrí los emprendimientos</h3>
            <CarouselEmprendimientos/>
            <div className="d-flex justify-content-center align-items-center">
              <div className="bg-verde-fuerte text-center mt-3 rounded-3 p-2"> 
                <a href="#" className="text-decoration-none text-blanco">
                  Emprendimientos
                </a>
              </div>
            </div>
        </section>
        <section className="rounded-3 bg-blanco mb-4 row">
            <div className="d-none d-sm-block col-6 p-3">
              <p className="text-start">Preguntas frecuentes</p>
              <div className="">
                <AcordeonPreguntasFrecuentes/>
                <div className="text-decoration-none text-center mt-3">
                  <a href="#" className="text-decoration-none text-verde-fuerte">Ver más preguntas frecuentes</a>
                </div>
              </div>
            </div>
            <div className="d-none d-sm-block col-6 bg-image-preguntas-frecuentes d-flex flex-column p-4">
              <h5 className="text-center">
                Disfruta encontrando lo que queres y descubriendo nuevos emprendimientos
              </h5>
              <div className="flex-grow-1 d-flex flex-column justify-content-end">
                <p className="text-center">
                  ¿Quieres ser parte de la comunidad de emprendedores?
                </p>
                <div className="d-flex justify-content-center align-items-center m-2">
                  <div className="bg-verde-fuerte text-center mt-3 rounded-3 p-2"> 
                    <a href="#" className="text-decoration-none text-blanco">
                      Quiero ser emprendedor
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-block d-sm-none col-12 p-3">
              <p className="text-start">Preguntas frecuentes</p>
              <div className="">
                <AcordeonPreguntasFrecuentes/>
                <div className="text-decoration-none text-center mt-3">
                  <a href="#" className="text-decoration-none text-verde-fuerte">Ver más preguntas frecuentes</a>
                </div>
              </div>
            </div>
            <div className="d-block d-sm-none col-12 bg-image-preguntas-frecuentes d-flex flex-column p-4">
              <h5 className="text-center">
                Disfruta encontrando lo que queres y descubriendo nuevos emprendimientos
              </h5>
              <div className="flex-grow-1 d-flex flex-column justify-content-end">
                <p className="text-center">
                  ¿Quieres ser parte de la comunidad de emprendedores?
                </p>
                <div className="d-flex justify-content-center align-items-center m-2">
                  <div className="bg-verde-fuerte text-center mt-3 rounded-3 p-2"> 
                    <a href="#" className="text-decoration-none text-blanco">
                      Quiero ser emprendedor
                    </a>
                  </div>
                </div>
              </div>
            </div>
        </section>
      </div>
      
    </div>
      
    </>
  );
};

export default TiendaOnlineView;
