import React, { useState, Component } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

class Container extends Component<ContainerProps> {
  render() {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen h-full">
            {this.props.children}
        </div>
      </>
    );
  }
}

export default Container;
