import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./AddComposerForm.scss";

class ComposerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageUrl: "",
      works: [],
      workTemp: ""
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddWork = this.handleAddWork.bind(this);
    this.onUploadImage = this.onUploadImage.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddComposer(this.state);
  }

  onUploadImage(event) {
    const files = event.target.files;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = ev => {
        this.setState({
          imageUrl: ev.target.result
        });
      };
    }
  }

  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAddWork(event) {
    this.setState({
      works: this.state.works.concat([this.state.workTemp]),
      workTemp: ""
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="AddComposerForm">
        <div className="AddComposerForm__input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onFieldChange}
          />
        </div>
        <div className="AddComposerForm__input">
          <button>
            <img src="/images/camera.svg" className="icon" alt="Subir imagen" />
          </button>

          <input
            type="file"
            name="imageUrl"
            id="file"
            className="file"
            // disabled={}
            // value={this.state.imageUrl}
            onChange={this.onUploadImage}
          />
        </div>
        <div className="AddComposerForm__input">
          <label htmlFor="workTemp">Works</label>
          {this.state.works.map(work => (
            <p key={work}>{work}</p>
          ))}{" "}
          <input
            type="text"
            name="workTemp"
            value={this.state.workTemp}
            onChange={this.onFieldChange}
          />
          <input type="button" value="+" onClick={this.handleAddWork} />
        </div>

        <input type="submit" value="Add" />
      </form>
    );
  }
}

function AddComposerForm({ match, onAddComposer }) {
  return (
    <div className="container-fluid col-10">
      <h1>Add composer</h1>
      <ComposerForm onAddComposer={onAddComposer} />
    </div>
  );
}

function mapDispatchToProps(dispatch, props) {
  return {
    onAddComposer: composer => {
      dispatch({ type: "ADD_COMPOSER", composer });
      props.history.push("/");
    }
  };
}

export default withRouter(
  connect(() => {}, mapDispatchToProps)(AddComposerForm)
);
