import { SERVER_END_POINT } from "../configs/configuration";
import cookie from "react-cookie";
export default function callApi (params){
    return fetch(`${SERVER_END_POINT}/${params.endPoint}`, {
        method: params.method,
        body: params.body,
        headers: {
          "Content-type": "application/json",
          token: cookie.load("loginToken")
        },
      })
}