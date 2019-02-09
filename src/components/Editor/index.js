/* eslint-disable */
import { fromJS, isImmutable } from 'immutable';
import Delta from 'quill-delta';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Component, React, styled } from 'utils/create';

// https://github.com/jpuri/react-draft-wysiwyg
// https://github.com/sstur/react-rte/

const EditorWrapper = styled.div``;

class Editor extends Component {
  handleChange = (text, delta, source, editor) => {
    const { onChange, value } = this.props;

    console.log('value', value);
    console.log('value2', fromJS({ ops: editor.getContents().ops }));

    onChange(fromJS({ ops: editor.getContents().ops }));

    // this.setState({ text: editor.getContents() });
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const value = isImmutable(nextProps.value)
      ? new Delta(nextProps.value.toJS())
      : nextProps.value;

    return this.editor
      .getEditor()
      .getContents()
      .diff(value)
      .length();
  }

  render() {
    const { value } = this.props;

    const v = isImmutable(value) ? value.toJS() : value;

    return (
      <EditorWrapper>
        <ReactQuill
          bounds=".css-ixpkms"
          defaultValue={v}
          ref={editor => (this.editor = editor)}
          value={v}
          onChange={this.handleChange}
        />
      </EditorWrapper>
    );
  }
}

export default Editor;
