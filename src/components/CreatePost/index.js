import React , {Component} from 'react';
import { Button } from 'react-bootstrap';

import TextEditor from '../TextEditor';
import FieldGroup from '../FieldGroup';
import './styles.css';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: '',
      title:'',
    }
    
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }
  
  handleEditorChange (html) {
    this.setState({editorHtml: html});
  }
  
  handleTitleChange= (e) => this.setState({title: e.target.value});
  
  render () {
    return (
    <form>
      <FieldGroup
        id="create-post-title"
        placeholder='Title'
        type='text'
        value={this.state.title}
        onChange={this.handleTitleChange}
        name='username'
      />
      <TextEditor
          handleChange={this.handleEditorChange}
          placeHolder="Text (Optional)"
          editorHtml={this.state.editorHtml}
       />
     <Button
       type="submit"
       onClick={() => this.handleSubmit}
     >
      Submit
     </Button>
    </form>
  )
  }
}

export default CreatePost;