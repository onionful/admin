import { EditorState, RichUtils } from 'draft-js';

import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import { stateFromMarkdown } from 'draft-js-import-markdown';
import EditorX from 'draft-js-plugins-editor';
import { Component, React } from 'utils/create';

const options = {
  breakoutBlockType: 'unordered-list-item',
  breakoutBlocks: ['header-one', 'header-two'],
};
const blockBreakoutPlugin = createBlockBreakoutPlugin(options);

const markdown = `
  Slate is flexible enough to add **decorators** that can format text based on its content.
  For example, this editor has **Markdown** preview decorators on it, to make it _dead_ simple to
  make an editor with built-in Markdown previewing.
  ## Try it out!
  Try it out for yourself!
`;

class Editor extends Component {
  state = {
    editorState: EditorState.createWithContent(stateFromMarkdown(markdown)),
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  onChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const { editorState } = this.state;

    return (
      <EditorX
        editorState={editorState}
        handleKeyCommand={this.handleKeyCommand}
        plugins={[blockBreakoutPlugin]}
        onChange={this.onChange}
      />
    );
  }
}

export default Editor;
