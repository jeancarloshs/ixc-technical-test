import { Component } from "react";

interface IUserNav {
  userName?: string;
  userEmail?: string;
}

class UserNav extends Component<IUserNav> {
  render() {
    const { userName, userEmail } = this.props;
    return (
      <nav className="border-b border-[#F2F2F2]">
      <div className="max-w-screen h-[75px] flex flex-wrap items-center justify-between mx-auto">
        <div className="px-5">
          <p className="text-black font-bold">Mensagens</p>
        </div>
        <div className="pr-5">
          <p className="font-semibold">
            {userName ?? "Nome do Usuário"}
          </p>
          <p className="text-[#868B8E] text-[12px]">
            {userEmail ?? "Email do Usuário"}
          </p>
        </div>
      </div>
    </nav>
    )
  }
}

export default UserNav;