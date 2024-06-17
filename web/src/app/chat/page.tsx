"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "../components/Container/Container";
import Message from "../components/Message/Message";
import { socket } from "../socket";
import Button from "../components/Button/Button";
import decodeToken from "../api/middleware/userConnected";
import { v4 as uuid } from "uuid";
import usersService from "../api/services/users.Service";
import UserNav from "../components/UserNav/UserNav";
import NavMsg from "../components/NavMsg/NavMsg";

interface IMessage {
  msgID?: string;
  userID?: number;
  name?: string;
  email?: string;
  text?: string;
  isOwner?: boolean;
}

interface IUserLists {
  userID?: string;
  name?: string;
  email?: string;
}

export default function Page() {
  // const [socketInstance, setSocketInstance] = useState(socket());
  const [socketInstance] = useState(socket());
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userLists, setUserLists] = useState<IUserLists[]>([]);
  const [token, setToken] = useState<string | null>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const userInfoToken = decodeToken();

  // const getUserLists = async () => {
  //   const userList = await usersService(token);
  //   setUserLists(userList);
  //   // return userList;
  // };

  useEffect(() => {
    const getToken = localStorage.getItem("token") as string;
    setToken(getToken);
    // getUserLists();
    if (!getToken) {
      router.push("/");
    } else {
      socketInstance.connect();
    }

    const handleMessage = (message: any) => {
      // console.log("message received", message);
      // setMessages((previous) => [...previous, message]); ENVIANDO 2 VEZES QUANDO ATIVO
    };

    socketInstance.on("message", handleMessage);

    return () => {
      socketInstance.off("message", handleMessage);
      socketInstance.disconnect();
    };
  }, [router, socketInstance]);

  useEffect(() => {
    const fetchUserLists = async () => {
      if (token) {
        try {
          const userList = await usersService(token);
          setUserLists(userList);
        } catch (error) {
          setError("An error occurred while fetching the user list");
        }
      }
    };

    fetchUserLists();
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    // event.preventDefault();

    const newMessage = {
      msgID: uuid(),
      userID: userInfoToken?.id,
      name: userInfoToken?.userName,
      email: userInfoToken?.userEmail,
      text: message,
    };

    if (message.trim() !== "") {
      socketInstance.emit("message", newMessage);
      setMessages((previous) => [
        ...previous,
        { ...newMessage, isOwner: true },
      ]);
      console.log("Message sent", newMessage);
      setMessage("");
    }
  };

  // console.log("Message sent", userList);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <Container>
        <div className="w-5/6 h-[750px] bg-white rounded-[20px]">
          <UserNav
            userName={userInfoToken?.userName}
            userEmail={userInfoToken?.userEmail}
          />
          <div className="flex">
            <aside className="z-40 w-[400px] h-[674px] rounded-bl-[17px] border-r boder-[#F2F2F2] sm:translate-x-0 bg-white flex flex-col items-center overflow-auto">
              {userLists.length > 0 ? (
                userLists.map((userList) => {
                  return (
                    <div className="bg-[#CDE6F5] w-10/12 h-[75px] rounded-[20px] mt-[20px]">
                      <div className="flex flex-col mt-[20px] ml-[20px]">
                        <p className="font-semibold">{userList.name}</p>
                        <p className="text-[#ADB9C6]">ultima msg</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-[#CDE6F5] w-10/12 h-[75px] rounded-[20px] mt-[20px]">
                  <div className="flex flex-col mt-[20px] ml-[20px]">
                    <p className="font-semibold">Nenhum Usuário encontrado</p>
                  </div>
                </div>
              )}
              <div className="bg-[#CDE6F5] w-10/12 h-[75px] rounded-[20px] mt-[20px]">
                <div className="flex flex-col mt-[20px] ml-[20px]">
                  <p className="font-semibold">Nome</p>
                  <p className="text-[#ADB9C6]">ultima msg</p>
                </div>
              </div>
              <div className="bg-[#F5F5F5] w-10/12 h-[75px] rounded-[20px] mt-[20px]">
                <div className="flex flex-col mt-[20px] ml-[20px]">
                  <p className="font-semibold">Nome</p>
                  <p className="text-[#ADB9C6]">ultima msg</p>
                </div>
              </div>
            </aside>
            <div className="w-screen">
              <NavMsg
                userName={userInfoToken?.userName}
                active={socketInstance.active}
              />
              <section className="bg-[#F5F5F5] h-[599px] rounded-br-[20px] flex flex-col justify-end">
                {messages.map((message) => (
                  <Message
                    key={message.msgID}
                    isOwner={true}
                    text={message.text}
                  ></Message>
                ))}
                <div className="relative w-full flex justify-center mb-4">
                  <textarea
                    onChange={handleChangeTextArea}
                    onKeyDown={handleKeyDown}
                    value={message}
                    className="resize-none w-11/12 h-[100px] p-2 rounded-md border border-[#E2E2E2] focus:outline-none"
                    placeholder="Digite sua mensagem aqui"
                  ></textarea>
                  <Button
                    name="Enviar"
                    id="registerBtn"
                    type="submit"
                    onClick={handleSubmit}
                    className="absolute right-[45px] bottom-3 w-[75px] h-[50px] text-black font-semibold rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
                  >
                    Enviar -&gt;
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
