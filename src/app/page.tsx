"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import Container from "./components/Container/Container";
import loginService from "./api/services/login.Service";
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [stayConnected, setStayConnected] = useState<boolean>(false);

  useEffect(() => {
    const storedStayConnected = Cookies.get("stayConnected");
    if (storedStayConnected == null || storedStayConnected == undefined) {
      Cookies.set("stayConnected", false.toString());
    }
  }, []);

  const handleOnLogin = (event: React.ChangeEvent<HTMLInputElement>, key: any) => {
    event.preventDefault();
    setFormLogin({ ...formLogin, [key]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loginResponse = await loginService(
        formLogin.email,
        formLogin.password
      );

      if (loginResponse.message != 'Invalid email or password') {
        Cookies.set("token", loginResponse.objAuth.token);
        // console.log("Login clicked with:", loginResponse.objAuth.token);
        router.push("./chat");
      } else {
        setErrorMessage(loginResponse.message);
        // console.log(loginResponse.message);
      }

    } catch (error) {
      // console.log("An error occurred during the login process.")
      // setErrorMessage("An error occurred during the login process.");
      console.error("Login failed:", error);
    }
  };

  const handleStayConnected = (event: ChangeEvent<HTMLInputElement>) => {
    setStayConnected(!event.target.checked);
    Cookies.set("stayConnected", stayConnected.toString());
    console.log(stayConnected);
  };

  const handleRegisterClick = (e: any) => {
    e.preventDefault();
    router.push("./register");
  };

  return (
    <>
      <Container>
        <div className="w-[550px] h-[550px] bg-white flex flex-col justify-center items-center rounded-[20px]">
          <div className="flex flex-col mt-[40px] mr-[75px] py-5">
            <h1 className="text-3xl font-bold text-black">Acesse sua conta</h1>
            <span className="text-black mb-[20px]">
              Insira suas credenciais para fazer login
            </span>
          </div>
          <form className="flex-grow" onSubmit={handleSubmit}>
            <Input
              name="E-mail"
              onChange={(event) => handleOnLogin(event, "email")}
              type="email"
              value={formLogin.email}
            />
            <Input
              name="Senha"
              onChange={(event) => handleOnLogin(event, "password")}
              type="password"
              value={formLogin.password}
            />
            <div className="mt-[10px]">
              <input
                type="checkbox"
                value="sim"
                onChange={handleStayConnected}
                checked={!stayConnected}
                className="border-2 border-[#4044AA] checked:bg-[#4044AA] h-4 w-4 mr-2"
              />
              <span className="text-black pl-2">Continuar conectado</span>
            </div>
            <Button
              name="Acessar"
              id="acessBtn"
              type="submit"
              // onChange={handleSubmit}
              className="w-96 mt-[20px] px-4 py-2 text-black font-semibold rounded-full border-2 border-black hover:bg-gray-100"
            >
              Acessar
            </Button>
          </form>
          <div className="flex justify-end">
            <Button
              name="Cadastrar"
              id="registerBtn"
              type="submit"
              onClick={handleRegisterClick}
              className="w-[550px] px-4 py-5 text-black font-semibold rounded-b-[20px] bg-slate-100 hover:bg-slate-200"
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
