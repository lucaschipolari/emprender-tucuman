const AcordeonPreguntasFrecuentes = () => {
  return (
    <div class="accordion accordion-flush" id="acordeonPF">
        <div class="accordion-item">
            <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                ¿Cómo hago para comprar?
            </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#acordeonPF">
            <div class="accordion-body">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate numquam dolorem architecto odit maxime perspiciatis. Eos, accusamus voluptatum soluta possimus tempora necessitatibus ad, laboriosam voluptas adipisci, molestias consectetur vero quis.</div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                ¿Cómo hago para comprar?
            </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#acordeonPF">
            <div class="accordion-body">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate numquam dolorem architecto odit maxime perspiciatis. Eos, accusamus voluptatum soluta possimus tempora necessitatibus ad, laboriosam voluptas adipisci, molestias consectetur vero quis.</div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                ¿Cómo hago para comprar?
            </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#acordeonPF">
            <div class="accordion-body">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate numquam dolorem architecto odit maxime perspiciatis. Eos, accusamus voluptatum soluta possimus tempora necessitatibus ad, laboriosam voluptas adipisci, molestias consectetur vero quis.</div>
            </div>
        </div>
    </div>
  )
}

export default AcordeonPreguntasFrecuentes