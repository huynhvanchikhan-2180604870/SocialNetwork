import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./components/Authentication/Authentication";
import HomePage from "./components/HomePage/HomePage";
import { connectWebSocket } from "./config/WebSocketService";
import { getUserProfile } from "./store/Auth/Action";
import { addNewLike, addNewPost, addNewReply, addNewRepost } from "./store/Post/Action";
import { WebSocketContext } from "./config/WebSocketContext";
function App() {
  const jwt = localStorage.getItem("jwt");
  const { auth, post } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [wsConnection, setWsConnection] = useState(null);

  // Lấy thông tin người dùng khi có JWT
  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
    }
  }, [dispatch, jwt]);

  // Set up WebSocket connection
  useEffect(() => {
    if (auth.user && !wsConnection) {
      const stompClient = connectWebSocket();

      stompClient.connect(
        {},
        () => {
          console.log("WebSocket connected");

          // Subscribe to topics
          stompClient.subscribe("/topic/newPosts", (message) => {
            const messageBody = JSON.parse(message.body);
            dispatch(addNewPost(messageBody));
          });

          stompClient.subscribe("/topic/likes", (message) => {
            const likeDto = JSON.parse(message.body);
            if (likeDto.user.id !== auth.user.id) {
              dispatch(addNewLike(likeDto));
            }
          });

          // Trong useEffect thiết lập WebSocket
          stompClient.subscribe("/topic/reposts", (message) => {
            const postDto = JSON.parse(message.body);
            dispatch(addNewRepost(postDto));
          });
          stompClient.subscribe("/topic/replies", (message) => {
            const replyBody = JSON.parse(message.body);
            dispatch(addNewReply(replyBody));
          });

          setWsConnection(stompClient);
        },
        (error) => {
          console.error("WebSocket connection error:", error);
        }
      );
    }

    return () => {
      if (wsConnection) {
        wsConnection.disconnect(() => {
          console.log("WebSocket disconnected");
        });
      }
    };
  }, [auth.user, wsConnection, dispatch]);

  return (
    <WebSocketContext.Provider value={wsConnection}>
      <div className="">
        <Routes>
          <Route
            path="/*"
            element={auth.user ? <HomePage /> : <Authentication />}
          ></Route>
        </Routes>
      </div>
    </WebSocketContext.Provider>
  );
}

export default App;
