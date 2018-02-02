import React from "react"
import { provideState, injectState } from "freactal"
import {
  HashRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch
} from "react-router-dom"
import { Container, Nav, Navbar, NavbarBrand, NavItem } from "reactstrap"
import { Helmet } from "react-helmet"

import asyncComponent from "../libs/async-component"
import Modal from './components/modal'

const AsyncContactUs = asyncComponent(() => import("./contact-us"))

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
      effects.updateNotificationMessage(notificationMessage, notificationColor)
      if (dismiss) setTimeout(() => effects.clearNotificationMessage(), time)
      window.scrollTo(0, 0)
    },
    updateNotificationMessage: (
      _,
      notificationMessage,
      notificationColor
    ) => state => ({ ...state, notificationMessage, notificationColor })
  }
})

const App = ({ state, effects }) => (
  <Container>
    <Helmet>
      <title>Admin</title>
    </Helmet>
    <Router>
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="#">Bloodz</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" to="/contact-us">
                contact us
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        <Switch>
          <Route path="/contact-us" component={AsyncContactUs} />
        </Switch>
      </div>
    </Router>
    <Modal
      action={state.modalAction}
      args={state.modalActionArgs}
      close={effects.closeModal}
      message="Are you sure you want to continue ?"
      modalState={state.modal}
    />
  </Container>
)

export default withState(injectState(App))
