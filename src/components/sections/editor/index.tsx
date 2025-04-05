import React from 'react';
import { Pluggable } from 'unified';
import Editor, { TextareaCodeEditorProps } from './editor';
import rehypePrism from 'rehype-prism-plus';

export * from './editor';

export default React.forwardRef<HTMLTextAreaElement, TextareaCodeEditorProps>((props, ref) => {
  const { rehypePlugins = [[rehypePrism, { ignoreMissing: true }]] as Pluggable[], ...reset } = props;
  return <Editor {...reset} rehypePlugins={rehypePlugins} ref={ref} />;
});
