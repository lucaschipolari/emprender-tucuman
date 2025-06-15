import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../../stores/useSession";

import { postRegisterFn } from "../../api/auth";

import Input from "../ui/input/Input";

import "./Register.css";

const RegisterForm = () => {
  const { login } = useSession();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  // Observar el valor de la contraseña para comparar
  const password = watch("password");

  const { mutate: postRegister } = useMutation({
    mutationFn: postRegisterFn,
    onSuccess: (userData) => {
      console.log(userData);
      toast.dismiss();
      toast.success(`Registrado. Bienvenido, ${userData.nombre}`);

      reset();
      login(userData);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
    const transformedData = {
      nombre: data.nombreUsuario,
      email: data.email,
      password: data.password,
    };

    toast.loading("Guardando nuevo usuario");
    postRegister(transformedData);
  };

  return (
    <div className="register-form-container">
      <form
        className="register-form-component"
        onSubmit={onSubmitRHF(handleSubmit)}
      >
        <Input
          ClassName="mb-2"
          errors={errors.nombreUsuario}
          label="Nombre"
          name="nombreUsuario"
          maxLength={30}
          options={{
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            minLength: {
              value: 3,
              message: "El campo no puede tener menos de 3 caracteres",
            },
            maxLength: {
              value: 30,
              message: "El campo no puede tener más de 30 caracteres",
            },
            pattern: {
              value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/,
              message: "El campo solo permite letras y espacios",
            },
          }}
          register={register}
          labelClassName="mainContactLabel"
          inputClassName="mainContactInput"
        />

        <Input
          ClassName="mb-2"
          errors={errors.email}
          label="Correo electrónico"
          name="email"
          type="email"
          maxLength={50}
          options={{
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            minLength: {
              value: 3,
              message: "El campo no puede tener menos de 3 caracteres",
            },
            maxLength: {
              value: 50,
              message: "El campo no puede tener más de 50 caracteres",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "El formato del correo electrónico no es válido",
            },
          }}
          register={register}
          labelClassName="mainContactLabel"
          inputClassName="mainContactInput"
        />

        <Input
          ClassName="mb-2"
          errors={errors.password}
          label="Contraseña"
          name="password"
          type="password"
          maxLength={100}
          options={{
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,100}$/,
              message:
                "La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula y un caracter especial ($ @ ! % * ? &)",
            },
          }}
          register={register}
          labelClassName="mainContactLabel"
          inputClassName="mainContactInput"
        />

        <Input
          ClassName="mb-2"
          errors={errors.repeatPassword}
          label="Repetir contraseña"
          name="repeatPassword"
          type="password"
          maxLength={100}
          options={{
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            validate: (value) => {
              if (value !== password) {
                return "Las contraseñas no coinciden";
              }
              return true;
            },
          }}
          register={register}
          labelClassName="mainContactLabel"
          inputClassName="mainContactInput"
        />

        <div className="text-center mt-2">
          <button className="btn-custom" type="submit">
            Registrar
          </button>
          <p className="account-question mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="register-link a-custom">
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;