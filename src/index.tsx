import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as _ from "lodash";

import "./styles.css";

let contentTest = {
  home: `This is a simple note taking app.

Prepend any world with @ to create a new page, like @this.

The entire page is editable, apart from the Home link at the top.`,
  this: `Isn't this easy?`
};

const App = () => (
  <div className={"App"}>
    <Router>
      <div style={{ paddingBottom: "1rem" }}>
        <Link to="/">Home</Link>
      </div>
      <Route exact={true} path="/" component={Home} />
      <Route path="/p/:pageId" component={Page} />
    </Router>
  </div>
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
