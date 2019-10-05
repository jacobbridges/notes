import { Provider } from 'react-redux'
import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import configureStore from './config/configure-store'
import history from './utils/history'
import firebase from 'firebase';
import * as _ from "lodash";
import { Login } from "./auth/Login";
import { setUser } from './auth/actions'
import ForceAuth from './auth/ForceAuth'
import UserBar from './user-bar/user-bar'
import {ThemeProvider} from 'styled-components'
import * as theme from './config/theme'
import "normalize.css";
import "./styles.css";

const store = configureStore({}, history)

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCn5nqB4w-zjYUEXnh3JuTV4ogkHkiZKRQ",
  authDomain: "notesapp-ec179.firebaseapp.com",
  databaseURL: "https://notesapp-ec179.firebaseio.com",
  projectId: "notesapp-ec179",
  storageBucket: "",
  messagingSenderId: "795682020834",
  appId: "1:795682020834:web:9aff90c0dc116ceca4edbb",
  measurementId: "G-CW0PVM7GRW"
};
firebase.initializeApp(config);
firebase.analytics();
firebase.auth().onAuthStateChanged( user => store.dispatch(setUser(user)))

// @ts-ignore
window.fire = firebase


function Success(props: any){
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    const unmountAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => setUser(user)
    )
    return () => unmountAuthObserver()
  }, [])
  return (
    <div>
      <p>Welcome {user && user.displayName}! You are now signed-in!</p>
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
    </div>
  )
}


let contentTest = {
  home: `This is a simple note taking app.

Prepend any world with @ to create a new page, like @this.

The entire page is editable, apart from the Home link at the top.`,
  this: `Isn't this easy?`
};

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <div className={"App"}>
        <ForceAuth>
          <UserBar/>
          <ConnectedRouter history={history}>
            <div style={{ paddingBottom: "1rem" }}>
              <Link to="/">Home</Link>
            </div>
            <Route exact={true} path="/signedIn" component={Success}/>
            <Route exact={true} path="/" component={Home} />
            <Route path="/p/:pageId" component={Page} />
          </ConnectedRouter>
        </ForceAuth>
      </div>
    </Provider>
  </ThemeProvider>
);

const Home = ({ match }) => EditableDiv("home");

const Page = ({ match }) => EditableDiv(match.params.pageId);

const simpleRender = (text: string): any[] => {
  const components = _.map(text.split(/(@\w+)/), (a: string) =>
    a.startsWith("@") ? (
      // @ts-ignore
      <Link
        contenteditable="false"
        to={"/p/" + a.slice(1)}
        onFocus={e => e.stopPropagation()}
      >
        {a}
      </Link>
    ) : (
      a
    )
  );
  return components;
};


const EditableDiv = (name?: string) => {
  const id = _.snakeCase(name || Date.now().toString());
  const initialContent = _.get(contentTest, name, "Type @here...");
  const [content, setContent] = useState(initialContent);
  const [editing, setEditing] = useState(false);
  const editableDiv = useRef(null);

  const handleBlur = e => {
    setEditing(false);
    setContent(editableDiv.current.innerText);
    _.set(contentTest, name, editableDiv.current.innerText);
  };

  return (
    <div
      id={id}
      ref={editableDiv}
      contentEditable
      style={{
        fontFamily: "inherit",
        outline: "none",
        maxWidth: "100%",
        width: "100%",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        caretColor: "rgba(0, 0, 0, 0.9)",
        padding: "3px 2px",
        minHeight: "1em",
        color: "rgba(0, 0, 0, 0.9)"
      }}
      onFocus={e => setEditing(true)}
      onBlur={handleBlur}
    >
      {editing
        ? _.get(contentTest, name, "Type @here...")
        : simpleRender(_.get(contentTest, name, "Type @here..."))}
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
