import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const connectWebSocket = () => {
  const socket = new SockJS("http://192.168.1.5:8080/ws");
  const stompClient = Stomp.over(socket);
  return stompClient;
};
