/**
 * Catches errors from the 3D parts (no WebGL, the model fails to download...)
 * and shows `fallback` instead. Without it, one failed download would leave
 * the whole page blank, because React unmounts everything on an uncaught error.
 */
import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.error(error)
    this.props.onError?.(error)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
