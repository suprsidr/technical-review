import React, {Component} from 'react';
import {PROFILE_IMAGE_URL} from '../config/globals';

export default class Student extends Component {
  constructor (props) {
    super(props);
    this.state = {
      students: [],
      baseQuery: {},
      editing: false
    };
    this.fields = {
      _id: -1
    };
  }
  componentDidMount() {
    this.makeQuery(this.props.params.id);
  }
  componentWillReceiveProps(nextProps) {
    this.makeQuery(nextProps.params.id);
  }
  convertDate(timestamp, multiplier = 1) {
    return new Date(timestamp * multiplier);
  }
  handleEditClick(e) {
    e.preventDefault();
    this.toggleEditing();
  }
  handleSaveClick(e) {
    e.preventDefault();
  }
  handleDeleteClick(e) {
    e.preventDefault();
  }
  toggleEditing() {
    this.setState({editing: !this.state.editing}, () => {
      this.state.editing && this.refs.content.classList.add('slide-left');
      !this.state.editing && this.refs.content.classList.remove('slide-left');
    });
  }
  makeQuery(id) {
    let query = {
      "sid": id
    };
    this.setState({baseQuery: query}, () => this.query(query, {
      limit: 0,
      sort: {},
      fields: this.fields
    }));
    
  }
  query(q, p) {
    this.props.db.students.find(q, p).fetch((data) => {
      this.setState({students: data});
    });
  }
  render() {
    return (
      <div className="row">
        <div className="small-12 columns text-center">
          {this.state.students && this.state.students.map((student, i) => ( <div key={student.sid} className="card">
            <div className="top text-center">
              <img className="student-image-large" src={`${PROFILE_IMAGE_URL }${student.picture.large}`} alt={`${student.name.last} ${student.name.first}`}/>
              <h2 className="text-center">{`${student.name.first} ${student.name.last}`}</h2>
            </div>
            <div ref="content" className="content">
              <div className="slide">
                <div>
                  <p>DOB: {`${new Date(student.dob * 500).toLocaleDateString()}`}</p>
                  <p>{student.location.street}<br />{student.location.city}, {student.location.state} {student.location.postcode}</p>
                  <p>Phone: {student.phone} &nbsp; Cell: {student.cell}</p>
                  <p>Email: {student.email}</p>
                  <p>Major: {student.major}</p>
                  <p>GPA: {student.gpa}</p>
                  <p>{`Registered: ${new Date(student.registered * 1000).toLocaleDateString()}`}</p>
                  <p>&nbsp;</p>
                  <p>Last updated: <span className="grey-text">{new Date(student.modified).toUTCString()}</span></p>
                  <p>Modified by: <span className="grey-text">{student.modifiedby}</span></p>
                  <p>ID: <span className="grey-text">{student.sid}</span></p>
                </div>
                <div className="small-12 columns text-left">
                  <form>
                    <div className="row">
                      <div className="small-12 columns medium-10 large-8 medium-centered">
                        <div className="row">
                          <div className="small-12 medium-6 columns">
                            <label>First Name: <input type="text" value={student.name.first}/></label>
                          </div>
                          <div className="small-12 medium-6 columns">
                            <label>Last Name: <input type="text" value={student.name.last}/></label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="small-12 medium-6 columns">
                            <label>Street: <input type="text" value={student.location.street}/></label>
                          </div>
                          <div className="small-12 medium-6 columns">
                            <label>City: <input type="text" value={student.location.city}/></label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="small-12 medium-6 columns">
                            <label>State: <input type="text" value={student.location.state}/></label>
                          </div>
                          <div className="small-12 medium-6 columns">
                            <label>Postal Code: <input type="text" value={student.location.postcode}/></label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="small-6 columns">
                            <label>Phone: <input type="text" value={student.phone}/></label></div>
                          <div className="small-6 columns">
                            <label>Cell: <input type="text" value={student.cell}/></label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="small-12 columns">
                            <label>Email: <input type="text" value={student.email}/></label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="small-12 medium-6 columns">
                            <label>Major: <input type="text" value={student.major}/></label>
                          </div>
                          <div className="small-12 medium-6 columns">
                            <label>GPA: <input type="text" value={student.gpa}/></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="action">
              <a className="button primary" href="Edit" onClick={(e) => this.handleEditClick(e)}>Edit</a>&nbsp;
              {this.state.editing ?
                <a className="button success" href="Save" onClick={(e) => this.handleSaveClick(e)}>Save</a> :
                <a className="button alert" href="Delete" onClick={(e) => this.handleDeleteClick(e)}>Delete</a>}
            </div>
          </div>)
          )}
        </div>
      </div>
    )
  }
}
