import React, { Component } from 'react';

export class EditableCell extends Component {
  state = {
    value: this.props.value,
  };

  save = value => {
    // Save the value here
    this.props.onChange && this.props.onChange(value);
  };

  render() {
    return (
      <td
        className={this.props.className}
        contentEditable
        onBlur={e => this.save(e.target.innerText)}
        onInput={this.handleChange}
        dangerouslySetInnerHTML={{ __html: this.state.value }}
      />
    );
  }
}