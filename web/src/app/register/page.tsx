"use client";
import React, { useState, Component } from "react";
import { useRouter } from "next/navigation";
import Container from "../components/Container/Container";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { NextRouter } from "next/router";
import registerService from "../api/services/register.Service";

export default function Page() {
  const router = useRouter();

  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = (event: any, key: any) => {
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

  const handlePostRegister = async (event: any) => {
    event.preventDefault();
    if (formRegister.password != formRegister.confirmPassword) {
      alert("senhas não são iguais");
    } else {
      const postRegister = await registerService(
        formRegister.name,
        formRegister.email,
        formRegister.password
      );
      if (JSON.stringify(postRegister).includes("already exists")) {
        return alert(postRegister.message);
      }
      console.log(postRegister);
      alert("sucesso");
      setInterval(() => {
        router.push("/");
      }, 1000);
    }
  };

  return (
    <>
      <Container>
        <div className="w-[550px] h-[550px] bg-white flex flex-col justify-center items-center rounded-[20px]">
          <div className="flex flex-col mr-[75px] py-5">
            <h1 className="text-3xl font-bold text-black">
              Registre sua conta
            </h1>
            <span className="text-black mb-[10px]">
              Insira suas credenciais para se Registrar
            </span>
          </div>
          <form className="flex-grow">
            <Input
              name="Nome"
              onChange={(event) => handleRegister(event, "name")}
              type="nome"
              value={formRegister.name}
            />
            <Input
              name="E-mail"
              onChange={(event) => handleRegister(event, "email")}
              type="email"
              value={formRegister.email}
            />
            <Input
              name="Senha"
              onChange={(event) => handleRegister(event, "password")}
              type="password"
              value={formRegister.password}
            />
            <Input
              name="Confirme a Senha"
              onChange={(event) => handleRegister(event, "confirmPassword")}
              type="password"
              value={formRegister.confirmPassword}
            />
            <Button
              name="Acessar"
              id="acessBtn"
              type="submit"
              onClick={handlePostRegister}
              className="w-96 mt-[40px] px-4 py-2 text-black font-semibold rounded-full border-2 border-black hover:bg-gray-100"
            >
              Registrar
            </Button>
          </form>
          <div className="flex justify-end">
            <Button
              name="Cadastrar"
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
