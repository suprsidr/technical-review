import React, {Component} from 'react';
import Student from './Student';
import {fetchData} from '../config/utils';


export default class Search extends Component {
  constructor (props) {
    super(props);
    this.state = {
      students: []
    };
  }
  render() {
    return (
      <div className="row">
        <p>stuff</p>
      </div>
    )
  }
}
