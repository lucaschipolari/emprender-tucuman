import RegisterForm from "../components/Register/RegisterForm";
import "../components/Register/Register.css";

const RegisterView = () => {
  return (
    <div className="register-form-view">
      <section className="login-card">
        <article className=" text-white py-2">
          <h2 className="text-center color-register pt-3 mt-3">
            Creá tu cuenta
          </h2>
          <p className="text-center pt-1">
            Por favor, completá el formulario.
          </p>
        </article>
        <article className="d-flex flex-column">
          <RegisterForm />
        </article>
      </section>
    </div>
  );
};
export default RegisterView;