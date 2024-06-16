"use client";
import React, { useState, Component } from "react";
import { useRouter } from "next/navigation";
import Container from "../components/Container/Container";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import registerService from "../api/services/register.Service";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "Você precisa inserir pelo menos 3 caracteres."),
  email: yup.string().required("Campo obrigatório"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(8, "Você precisa inserir pelo menos 8 caracteres."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Senhas não são iguais")
    .required("Campo obrigatório")
    .min(8, "Você precisa inserir pelo menos 8 caracteres."),
});

export default function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegister>({
    resolver: yupResolver(schema),
  });

  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: any
  ) => {
    event.preventDefault();
    setFormRegister({
      ...formRegister,
      [key]: event.target.value,
    });
  };

  const handleLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.replace("/");
  };

  const handlePostRegister = async (data: any) => {
    console.log("data", data);
    const postRegister = await registerService(
      data.name,
      data.email,
      data.password
    );
    if (JSON.stringify(postRegister).includes("already exists")) {
      return alert(postRegister.message);
    }
    console.log(postRegister);
    alert("sucesso");
    setInterval(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <>
      <Container>
        <div className="w-[550px] h-[650px] bg-white flex flex-col justify-center items-center rounded-[20px]">
          <div className="flex flex-col mr-[75px] py-5">
            <h1 className="text-3xl font-bold text-black">
              Registre sua conta
            </h1>
            <span className="text-black mb-[10px]">
              Insira suas credenciais para se Registrar
            </span>
          </div>
          <form
            className="flex-grow"
            onSubmit={handleSubmit(handlePostRegister)}
          >
            <div>
              <label
                htmlFor="Nome"
                className="block text-sm font-medium leading-6 text-gray-900 mt-[10px]"
              >
                Nome
              </label>
              <input
                className="block w-96 rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("name")}
                type="text"
              />
              <p className="text-[12px] text-red-600">
                {errors?.name?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="E-mail"
                className="block text-sm font-medium leading-6 text-gray-900 mt-[10px]"
              >
                E-mail
              </label>
              <input
                className="block w-96 rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("email")}
                type="email"
              />
              <p className="text-[12px] text-red-600">
                {errors?.email?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="Senha"
                className="block text-sm font-medium leading-6 text-gray-900 mt-[10px]"
              >
                Senha
              </label>
              <input
                className="block w-96 rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("password")}
                type="password"
              />
              <p className="text-[12px] text-red-600">
                {errors?.password?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="Confirme a Senha"
                className="block text-sm font-medium leading-6 text-gray-900 mt-[10px]"
              >
                Confirme a Senha
              </label>
              <input
                className="block w-96 rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("confirmPassword")}
                type="password"
              />
              <p className="text-[12px] text-red-600">
                {errors?.confirmPassword?.message}
              </p>
            </div>
            <Button
              name="Acessar"
              id="acessBtn"
              type="submit"
              //   onClick={handlePostRegister}
              className="w-96 mt-[40px] px-4 py-2 text-black font-semibold rounded-full border-2 border-black hover:bg-gray-100"
            >
              Registrar
            </Button>
          </form>
          <div className="flex justify-end">
            <Button
              name="Já possui conta? Efetue o Login"
              id="registerBtn"
              type="submit"
              onClick={handleLoginClick}
              className="w-[550px] px-4 py-5 text-black font-semibold rounded-b-[20px] bg-slate-100 hover:bg-slate-200"
            >
              Já possui conta? Efetue o Login
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
