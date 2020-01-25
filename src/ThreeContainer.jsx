import React, { Component } from 'react';
import threeEntryPoint from './threejs/threeEntryPoint';
import './threeEntryPoint.css';


export default class ThreeContainer extends Component {

  componentDidMount() {
    threeEntryPoint(this.threeRootElement);
  }

  render () {
      return (
        <div className="container" ref={element => this.threeRootElement = element} />
      );
  }
}