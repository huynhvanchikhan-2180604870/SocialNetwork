import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const connectWebSocket = (callbacks) => {
  const socket = new SockJS("http://localhost:8080/ws");
  const stompClient = Stomp.over(socket);

  stompClient.connect({}, (frame) => {
    console.log("Connected: " + frame);

    if (callbacks.onNewPost) {
      stompClient.subscribe("/topic/messages", (message) => {
        const messageBody = JSON.parse(message.body);
        callbacks.onNewPost(messageBody);
      });
    }

    if (callbacks.onNewReply) {
      stompClient.subscribe("/topic/replies", (message) => {
        const replyBody = JSON.parse(message.body);
        callbacks.onNewReply(replyBody);
      });
    }

    if (callbacks.onNewLike) {
      stompClient.subscribe("/topic/likes", (message) => {
        const likeBody = JSON.parse(message.body);
        callbacks.onNewLike(likeBody);
      });
    }
  });

  return {
    disconnect: () => {
      if (stompClient !== null) {
        stompClient.disconnect();
        console.log("Disconnected");
      }
    },
  };
};
