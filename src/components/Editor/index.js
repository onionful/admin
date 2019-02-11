import { fromJS, Map } from 'immutable';
import Delta from 'quill-delta';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Component, PropTypes, React, styled } from 'utils/create';

const EditorWrapper = styled.div``;

class Editor extends Component {
  shouldComponentUpdate({ value }) {
    return this.editor
      .getEditor()
      .getContents()
      .diff(new Delta(value.toJS()))
      .length();
  }

  handleChange = (text, delta, source, editor) => {
    const { onChange } = this.props;
    onChange(fromJS({ ops: editor.getContents().ops }));
  };

  render() {
    const { value } = this.props;

    return (
      <EditorWrapper>
        <ReactQuill
          ref={editor => {
            this.editor = editor;
          }}
          bounds=".css-ixpkms"
          value={(value || Map()).toJS()}
          onChange={this.handleChange}
        />
      </EditorWrapper>
    );
  }
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.map, PropTypes.string]).isRequired,
};

export default Editor;
