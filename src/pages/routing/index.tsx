import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavList from "./nav";
import ContentList from "./content";
import Home from "../home";
import Posts from "../posts";
import Contacts from "../contacts";

import { TPageItem } from "./index.d";

const items: readonly Readonly<TPageItem>[] = Object.freeze([
  Object.freeze({
    url: "/",
    title: "Home",
    content: Home,
  }),
  Object.freeze({
    url: "/posts",
    title: "Posts",
    content: Posts,
  }),
  Object.freeze({
    url: "/contacts",
    title: "Contacts",
    content: Contacts,
  }),
]);

function Routing() {
  return (
    <div>
      <Router>
        <div className="nav">
          <NavList items={items} />
        </div>
        <div className="body">
          <ContentList items={items} />
        </div>
      </Router>
    </div>
  );
}

export default Routing;
