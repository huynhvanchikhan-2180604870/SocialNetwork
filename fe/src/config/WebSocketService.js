import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { IP_PUBLIC } from "./ipconfig";


export const connectWebSocket = () => {
  const ip = `http://${IP_PUBLIC}:8080/ws`;
  const socket = new SockJS(ip);
  const stompClient = Stomp.over(socket);
  return stompClient;
};
