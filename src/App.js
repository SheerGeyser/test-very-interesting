import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAuthState } from "./store/auth"

import firebase from "firebase/app";

import { MainPage } from "./pages/MainPage";
import { fetchBooks } from "./store/book";

function App() {
  const dispatch = useDispatch();

  console.log("App render");

  useEffect(() => {
    console.log("Start effect")
    const unsub = () => console.log("KEK OK")
    // const unsub = firebase.auth().onAuthStateChanged((user) => {
    //   console.log("Auth state changed")
    //   dispatch(
    //     updateAuthState(
    //       user
    //         ? { username: user.email, id: user.uid }
    //         : null
    //     )
    //   );
    // });
    return () => {
      unsub(); console.log("Unsubscribe")
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch]);

  return (
    <>
      <h2>Its a test detka</h2>
      {/* <MainPage /> */}
    </>
  );
}

export default App;
