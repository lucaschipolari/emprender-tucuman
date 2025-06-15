import LoginForm from "../components/Login/LoginForm";
import "../components/Login/Login.css";

const LoginView = () => {
  return (
    <div className="login-form-view">
      <section>
        <article className=" text-white py-2">
          <h2 className="text-center color-register pt-3 mt-3">
            ¡Bienvenido otra vez!
          </h2>
          <p className="text-center pt-1">
            Inicia sesión
          </p>
        </article>
        <article className="d-flex flex-column">
          <LoginForm/>
        </article>
      </section>
      
    </div>
  )
}

export default LoginView