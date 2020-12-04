import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import firebase from "firebase/app";

import { MainPage } from "./pages/MainPage";
import { EditPage } from "./pages/EditPage";
import { NavigationBar } from './components/NavigationBar'
import { updateAuthState } from "./store/auth"


function App() {

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      dispatch(
        updateAuthState(
          user
            ? { username: user.email, id: user.uid }
            : null
        )
      );
    });
    return () => unsub();
  }, [dispatch]);

  return (
    <>
      <Router>
        <NavigationBar user={user} />
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/edit' component={EditPage} />
        </Switch>
      </Router>



    </>
  );
}

export default App;
