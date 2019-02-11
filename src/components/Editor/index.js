import { fromJS, Map } from 'immutable';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
import { Editor as SlateEditor } from 'slate-react';
import { Component, PropTypes, React, styled } from 'utils/create';

const initialValue = Plain.deserialize('');

const EditorWrapper = styled.div``;

class Editor extends Component {
  state = { value: null };

  static getDerivedStateFromProps({ value: propValue }, { value: stateValue }) {
    return { value: stateValue || (!propValue.isEmpty() && Value.fromJS(propValue.toJS())) };
  }

  handleChange = ({ value }) => {
    const { onChange } = this.props;
    onChange(fromJS(value.toJS()));
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <EditorWrapper>
        <SlateEditor value={value || initialValue} onChange={this.handleChange} />
      </EditorWrapper>
    );
  }
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.map,
};

Editor.defaultProps = {
  value: Map(),
};

export default Editor;
