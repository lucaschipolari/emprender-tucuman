import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "../../stores/useSession";

import { postLoginFn } from "../../api/auth";

import Input from "../ui/input/Input";

import "./Login.css";

const LoginForm = () => {
  const { login } = useSession();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: postLogin } = useMutation({
    mutationFn: postLoginFn,
    onSuccess: (userData) => {
      toast.dismiss();
      toast.success(`Bienvenido, ${userData.unique_name}`);
      setTimeout(() => {
        toast.dismiss();
      }, 2000);

      reset();

      login(userData);
      setTimeout(() => {
          navigate("/tiendaonline");
        }, 1000);
      setTimeout(() => {
        toast.dismiss();
      }, 1500);
    },
    onError: (e) => {
      toast.dismiss();
      toast.warning(e.message);
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    },
  });

  const handleSubmit = (data) => {
    toast.loading("Cargando...");
    postLogin(data);
  };
  

  return (
    <div className="login-form-container">
    <form onSubmit={onSubmitRHF(handleSubmit)} className="login-form-container"> 
      <div className="login-form-component">
        <Input
        ClassName="mb-3"
        errors={errors.email}
        label="Correo electrónico"
        name="email"
        maxLength={50}
        options={{
          required: {
            value: true,
            message: "Este campo es requerido",
          },
          minLength: {
            value: 3,
          },
          maxLength: {
            value: 50,
          },
        }}
        labelClassName="mainContactLabel"
        inputClassName="mainContactInput"
        register={register}
      />
      <Input
        errors={errors.password}
        label="Contraseña"
        name="password"
        maxLength={100}
        options={{
          required: {
            value: true,
            message: "Este campo es requerido",
          },
          minLength: {
            value: 8,
          },
          maxLength: {
            value: 100,
          },
        }}
        labelClassName="mainContactLabel"
        inputClassName="mainContactInput"
        buttonShowPassword={true}
        register={register}
        type="password"
      />
      <div className="text-center mt-4">
        <button className="btn-custom" type="submit">
          Ingresar
        </button>
      </div>
      <p className="account-question mt-4">
        ¿Aún no tienes cuenta?{" "}
        <Link to="/register" className="register-link a-custom">
          Ingresá aquí
        </Link>
      </p>
      </div>
    </form>
    </div>
    
  )
}

export default LoginForm