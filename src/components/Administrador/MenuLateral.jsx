import "./Admin.css";

const MenuLateral = ({ onOptionSelect, selected }) => {
  const menuOptions = [
    { label: "Usuarios", emoji: "👥" },
    { label: "Emprendedores", emoji: "💼" },
    { label: "Categorias", emoji: "🗂️" },
    { label: "Estadisticas", emoji: "📊" },
    { label: "Configuración", emoji: "⚙️" }
  ];

  return (
    <div className="custom-menulateral">
      <ul className="menu-list">
        {menuOptions.map((option, index) => (
          <li
            key={index}
            className={`menu-item ${selected === option.label ? "active" : ""}`}
            onClick={() => onOptionSelect(option.label)}
          >
            <a href="#" className="menu-link">
              <span className="emoji">{option.emoji}</span> {option.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuLateral;
