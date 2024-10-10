import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./components/Authentication/Authentication";
import HomePage from "./components/HomePage/HomePage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import { getUserProfile } from "./store/Auth/Action";
function App() {
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(store => store)
  const { post } = useSelector((store) => store);
  const dispatch = useDispatch()
  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
    }
  }, [auth.jwt, post.like, post.repost, post.post]);
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
