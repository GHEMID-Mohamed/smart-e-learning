import React from "react";
import { provideState, injectState } from "freactal";
import {
  HashRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { Container, Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";
import { Helmet } from "react-helmet";
import ChatWindow from "./chat-window";

import asyncComponent from "../libs/async-component";
import Modal from "./components/modal";

const withState = provideState({
  initialState: () => ({
    modalAction: undefined,
    modalActionArgs: [],
    notificationColor: "",
    notificationMessage: undefined
  }),
  effects: {
    clearNotificationMessage: () => state => ({
      ...state,
      notificationMessage: undefined
    }),
    closeModal: () => state => ({ ...state, modal: false }),
    /**
     * $dismiss : boolean. Dismiss the notification after x time
     * $time: On Miliseconds. Time out after the dismiss of notification
     */
    setNotificationMessage: (
      effects,
      notificationMessage,
      notificationColor,
      dismiss,
      time
    ) => state => {
      effects.updateNotificationMessage(notificationMessage, notificationColor);
      if (dismiss) setTimeout(() => effects.clearNotificationMessage(), time);
      window.scrollTo(0, 0);
    },
    updateNotificationMessage: (
      _,
      notificationMessage,
      notificationColor
    ) => state => ({ ...state, notificationMessage, notificationColor })
  }
});

const App = ({ state, effects }) => (
  <Container>
    <Helmet>
      <title>Admin</title>
    </Helmet>
    <Router>
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="#">SMART E-Learning </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" to="/contact-us">
                contact us
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    </Router>
    <ChatWindow />
  </Container>
);

export default withState(injectState(App));
