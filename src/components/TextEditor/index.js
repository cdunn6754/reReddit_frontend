import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { LoadingButton } from "../Buttons";
import "./styles.css";

class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorHtml: props.initialValue || ""
    };

    this.formats = [
      "header",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "code"
    ];

    this.modules = {
      toolbar: [
        [{ header: "1" }, { header: "2" }],
        ["bold", "italic", "underline", "strike", "blockquote", "code"],
        [{ list: "ordered" }],
        ["clean"]
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.quillNode = React.createRef();
  }

  componentDidMount() {
    if (!this.props.dontFocusOnEditor) {
      this.quillNode.current.focus();
    }
  }

  handleChange(html) {
    this.setState({
      editorHtml: html
    });
  }

  handleSubmitClick = editorHtml => {
    this.setState({
      editorHtml: ""
    });

    return this.props.handleSubmit(editorHtml);
  };

  render() {
    const { placeholder, usage, onBlur, loading } = this.props;

    let submitButtonWord = "Submit";
    switch (usage) {
      case "create":
        submitButtonWord = "Post";
        break;
      case "update":
        submitButtonWord = "Edit";
        break;
      default:
        break;
    }

    return (
      <div className="text-editor-content">
        <ReactQuill
          value={this.state.editorHtml}
          onChange={this.handleChange}
          placeholder={placeholder || ""}
          modules={this.modules}
          formats={this.formats}
          ref={this.quillNode}
          onBlur={onBlur}
        />
        <div className="text-editor-loading-button-container">
          <LoadingButton
            onClick={() => this.handleSubmitClick(this.state.editorHtml)}
            className="submit-button"
            loading={loading}
          >
            {submitButtonWord}
          </LoadingButton>
        </div>
      </div>
    );
  }
}

TextEditor.propTypes = {
  usage: PropTypes.string,
  rootComment: PropTypes.bool,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  onBlur: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default TextEditor;
