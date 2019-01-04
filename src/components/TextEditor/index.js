import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from 'react-bootstrap';

import './styles.css';

class TextEditor extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      editorHtml: props.initialValue || '',
    }
    
    this.formats = [
      'header', 'font', 'size', 'bold', 'italic', 'underline',
      'strike', 'blockquote','list', 'bullet', 'indent', 'code'
    ]
    
    this.modules = {
      toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
        [
          {'list': 'ordered'}, {'list': 'bullet'},
          {'indent': '-1'}, {'indent': '+1'}
        ],
        ['clean']
      ],
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.quillNode = React.createRef();
  }

  componentDidMount() {
    if (!this.props.focusOnEditor) {
      this.quillNode.current.focus();
    }
  }
  
  handleChange(html) {
    this.setState({
      editorHtml: html,
    })
  }
  
  handleSubmitClick = (editorHtml) => {
    this.setState({
      editorHtml: '',
    })
    
    this.props.handleSubmit(editorHtml);
  }
  
  render() {
    
    const {
      placeholder,
      usage,
      onBlur,
      loading,
    } = this.props;
    
    let submitButtonWord = "Submit"
    switch (usage) {
      case "create":
        submitButtonWord = "Post"
        break;
      case "update":
        submitButtonWord = "Edit"
        break;
      default:
        break;
    }
    
    return (
      <Fragment>
        <ReactQuill
          value={this.state.editorHtml}
          onChange={this.handleChange}
          placeholder={placeholder || 'What are your thoughts?'}
          modules={this.modules}
          formats={this.formats}
          ref={this.quillNode}
          onBlur={onBlur}
        />
        <Button
          onClick={() => this.handleSubmitClick(this.state.editorHtml)}
          className='comment-submit-button'
        >
          {submitButtonWord}
        </Button>
      </Fragment>
    )
  }
}

TextEditor.propTypes = {
  usage: PropTypes.string,
  rootComment: PropTypes.bool,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  onBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
}

export default TextEditor;
