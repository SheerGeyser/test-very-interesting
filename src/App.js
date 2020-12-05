import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import firebase from "firebase/app";

import { MainPage } from "./pages/MainPage";
import { EditPage } from "./pages/EditPage";
import { NavigationBar } from './components/NavigationBar'
import { updateAuthState } from "./store/auth"
import { fetchBooks } from './store/books';
import { Error404 } from './pages/404';


function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch]);

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          updateAuthState(
            user
              ? { username: user.email, id: user.uid }
              : null
          )
        );
      }
    });
    return () => unsub();
  }, [dispatch]);



  return (
    <>
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/edit' component={user ? EditPage : Error404} />
        </Switch>
      </Router>



    </>
  );
}

export default App;
