"use client";
import { useRouter } from "next/navigation";
import Container from "../components/Container/Container";

export default function Page() {
  const getToken = localStorage.getItem("token");
  const router = useRouter();

  if (!getToken) {
		router.push("/");
  }

  return (
    <>
      <Container>
        <div className="w-5/6 h-[750px] bg-white rounded-[20px]">
          <nav className="border-b border-[#F2F2F2]">
            <div className="max-w-screen h-[75px] flex flex-wrap items-center justify-between mx-auto">
              <div className="px-5">
                <p className="text-black font-bold">Mensagens</p>
              </div>
              <div className="pr-5">
                <p className="font-semibold">nome Usuario</p>
                <p className="text-[#868B8E]">email Usuario</p>
              </div>
            </div>
          </nav>
          <div className="flex">
            <aside className="z-40 w-[400px] h-[674px] rounded-bl-[17px] border-r boder-[#F2F2F2] sm:translate-x-0 bg-white flex flex-col items-center">
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
              <nav>
                <div className="max-w-screen h-[75px] flex flex-wrap items-center justify-between mx-auto pl-4">
                  <div className="pr-5">
                    <p className="font-semibold">nome Usuario</p>
                    <p className="text-[#868B8E]">Online</p>
                  </div>
                </div>
              </nav>
              <section className="bg-[#F5F5F5] h-[599px] rounded-br-[20px] flex flex-col justify-end">
                <div className="w-full flex justify-center mb-4">
                  <textarea
                    className="resize-none w-11/12 h-[100px] p-2 rounded-md border border-[#E2E2E2] focus:outline-none"
                    placeholder="Digite sua mensagem aqui"
                  ></textarea>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
