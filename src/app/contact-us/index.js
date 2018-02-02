import React from "react"
import { provideState, injectState } from "freactal"
import { Button } from "reactstrap"

const withState = provideState({
  initialState: () => ({}),
  effects: {}
})

const ContactUS = ({ state, effects }) => (
  <Button color="warning">Contact us page</Button>
)

export default withState(injectState(ContactUS))
