import PropTypes from "prop-types";
import { useState } from "react";

const Input = (props) => {
  const {
    name,
    type = "text",
    label,
    errors,
    ClassName = "",
    register,
    options,
    maxLength,
    max,
    placeholder = "Ingrese un texto",
    buttonShowPassword = false,
    textarea = false,
    select = false,
    labelClassName = "",
    inputClassName = "",
    autocomplete = "off",
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Función para renderizar el mensaje de error
  const renderErrorMessage = () => {
    if (errors && (errors.message || errors.type)) {
      return (
        <div className="invalid-feedback d-block">
          {errors.message || "Campo inválido"}
        </div>
      );
    }
    return null;
  };

  if (textarea) {
    return (
      <div className={ClassName}>
        <fieldset className="form-floating">
          <textarea
            className={`form-control ${inputClassName} ${
              errors ? "is-invalid" : ""
            }`}
            id={`${name}-input`}
            placeholder={placeholder}
            type={type}
            maxLength={maxLength}
            autoComplete={autocomplete}
            {...register(name, options)}
          />
          <label htmlFor={`${name}-input`} className={labelClassName}>
            {label}
          </label>
        </fieldset>
        {renderErrorMessage()}
      </div>
    );
  }

  if (select) {
    return (
      <div className={ClassName}>
        <fieldset className="form-floating">
          <select
            className={`form-select ${inputClassName} ${
              errors ? "is-invalid" : ""
            }`}
            id={`${name}-input`}
            placeholder={placeholder}
            type={type}
            autoComplete={autocomplete}
            defaultValue=""
            {...register(name, options)}
          >
            <option value="" disabled>
              Seleccionar
            </option>
            <option value="comidas">Comidas</option>
            <option value="bebidas">Bebidas</option>
          </select>
          <label htmlFor={`${name}-input`} className={labelClassName}>
            {label}
          </label>
        </fieldset>
        {renderErrorMessage()}
      </div>
    );
  }

  if (buttonShowPassword) {
    return (
      <div className={ClassName}>
        <div className="d-flex">
          <fieldset className="form-floating w-100">
            <input
              className={`form-control ${inputClassName} ${
                errors ? "is-invalid" : ""
              }`}
              id={`${name}-input`}
              placeholder={placeholder}
              type={showPassword ? "text" : "password"}
              max={max}
              maxLength={maxLength}
              autoComplete={autocomplete}
              {...register(name, options)}
            />
            <label htmlFor={`${name}-input`} className={labelClassName}>
              {label}
            </label>
          </fieldset>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="btn btn-outline-secondary ms-1"
          >
            {showPassword ? (
              <i className="bi bi-eye-slash-fill"></i>
            ) : (
              <i className="bi bi-eye-fill"></i>
            )}
          </button>
        </div>
        {renderErrorMessage()}
      </div>
    );
  }

  return (
    <div className={ClassName}>
      <fieldset className="form-floating">
        <input
          className={`form-control ${inputClassName} ${
            errors ? "is-invalid" : ""
          }`}
          id={`${name}-input`}
          placeholder={placeholder}
          type={type}
          max={max}
          maxLength={maxLength}
          autoComplete={autocomplete}
          {...register(name, options)}
        />
        <label htmlFor={`${name}-input`} className={labelClassName}>
          {label}
        </label>
      </fieldset>
      {renderErrorMessage()}
    </div>
  );
};

Input.displayName = "Input";

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.shape({
      message: PropTypes.string,
    }),
    PropTypes.shape({
      type: PropTypes.string,
      message: PropTypes.string,
    }),
  ]),
  ClassName: PropTypes.string,
  register: PropTypes.func.isRequired,
  options: PropTypes.object,
  maxLength: PropTypes.number,
  max: PropTypes.number,
  placeholder: PropTypes.string,
  buttonShowPassword: PropTypes.bool,
  textarea: PropTypes.bool,
  select: PropTypes.bool,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  autocomplete: PropTypes.string,
};

export default Input;