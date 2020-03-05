import React from "react";
import "./AddComposerForm.css";

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
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddComposer(this.state);
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
      <form onSubmit={this.handleSubmit}>
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
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.onFieldChange}
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

export default AddComposerForm;
