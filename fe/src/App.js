import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./components/Authentication/Authentication";
import HomePage from "./components/HomePage/HomePage";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import { getUserProfile } from "./store/Auth/Action";
import WebSocketService, { connectWebSocket, disconnectWebSocket } from "./config/WebSocketService";
import { addNewLike, addNewPost, addNewReply, updateLike } from "./store/Post/Action";
function App() {
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
 const [wsConnection, setWsConnection] = useState(null);
useEffect(() => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    dispatch(getUserProfile(jwt));
  }
}, [dispatch, auth?.jwt]);

const websocketCallbacks = useMemo(
  () => ({
    onNewPost: (newPost) => {
      dispatch(addNewPost(newPost));
      dispatch({ type: "UPDATE_POSTS_LIST", payload: newPost });
    },
    onNewReply: (reply) => dispatch(addNewReply(reply)),
    onNewLike: (like) => dispatch(addNewLike(like)),
  }),
  [dispatch]
);

const connectWebSocketCallback = useCallback(() => {
  if (auth.user && !wsConnection) {
    const connection = connectWebSocket(websocketCallbacks);
    setWsConnection(connection);
  }
}, [auth.user, wsConnection, websocketCallbacks]);

useEffect(() => {
  connectWebSocketCallback();

  return () => {
    if (wsConnection) {
      wsConnection.disconnect();
      setWsConnection(null);
    }
  };
}, [connectWebSocketCallback, wsConnection]);

  return (
    
    <div className="">
      <Routes>
        <Route
          path="/*"
          element={auth.user ? <HomePage /> : <Authentication />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
