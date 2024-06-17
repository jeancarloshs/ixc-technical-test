import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  userID: number;
  storedToken: string;
  name: string;
  email: string;
}

export default function decodeToken() {
  const token = sessionStorage.getItem("token") as string;

  const decodeToken: DecodedToken = jwtDecode(token);

  try {
    const userInfo = {
      id: decodeToken.userID,
      userName: decodeToken.name,
      userEmail: decodeToken.email,
    };
    return userInfo;
  } catch (error) {
    console.error("ERROR: ", error);
  }
}
