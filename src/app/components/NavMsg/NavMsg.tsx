import { Component } from 'react';

interface INavMsg {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  active?: boolean;
}

class NavMsg extends Component<INavMsg> {
  render() {
    const { userName, userEmail, userAvatar, active} = this.props;
    return (
      <nav>
        <div className="max-w-screen h-[75px] flex flex-wrap items-center justify-between mx-auto pl-4 z-40">
          <div className="pr-5">
            <p className="font-semibold">
              {userName ?? "Nome do Usuário"}
            </p>
            <p className="text-[#868B8E] text-[12px]">
              {active ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavMsg;