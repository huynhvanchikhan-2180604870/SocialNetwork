import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { IP_PUBLIC } from "./ipconfig";

export const connectWebSocket = () => {
  const ip = `https://${IP_PUBLIC}:8443/ws`;
  const socket = new SockJS(ip);
  const stompClient = Stomp.over(socket);
  return stompClient;
};
