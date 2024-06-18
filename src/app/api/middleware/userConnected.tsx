import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export interface DecodedToken {
  userID: number;
  storedToken: string;
  name: string;
  email: string;
}

export default function decodeToken() {
  try {
    const token = Cookies.get("token");

    if (!token || typeof token !== "string") {
      console.error("Token inválido ou ausente");
      return null; 
    }

    const decodeToken: DecodedToken = jwtDecode(token);

    const userInfo = {
      id: decodeToken.userID,
      userName: decodeToken.name,
      userEmail: decodeToken.email,
    };

    return userInfo;
  } catch (error) {
    console.error("Erro ao decodificar o token: ", error);
    return null; 
  }
}
