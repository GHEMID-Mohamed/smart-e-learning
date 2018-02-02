import React, { Component } from "react"

// https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    componentDidMount() {
      importComponent().then(module => {
        this.setState({ Component: module.default })
      })
    }

    render() {
      const { Component } = this.state
      return Component !== undefined ? <Component {...this.props} /> : null
    }
  }
  return AsyncComponent
}
