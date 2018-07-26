import CodeMirror from 'codemirror';
import 'codemirror/addon/merge/merge';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/merge/merge.css';

import '../css/codemirror_theme.css';

function resize(diffView, height) {
  const mergeView = diffView;
  if (mergeView.leftOriginal()) {
    mergeView.leftOriginal().setSize(null, height);
  }
  mergeView.editor().setSize(null, height);
  if (mergeView.rightOriginal()) {
    mergeView.rightOriginal().setSize(null, height);
  }

  mergeView.wrap.style.height = `${height}px`;
}

export default function () {
  const exampleSnakeCase = '\nthis.example_code = function(model){ \n' +
  '  this.model = model; \n' +
  '  this.modelTemplate = new ExampleTemplate(\'example\'); \n' +
  '  return this.bind_listeners(); \n' +
  '};';

  const exampleCamelCase = '\nthis.exampleCode = function(model){ \n' +
  '  this.model = model; \n' +
  '  this.modelTemplate = new ExampleTemplate(\'example\'); \n' +
  '  return this.bindListeners(); \n' +
  '};';

  const theme = '3024-day';

  const options = {
    mode: 'javascript',
    theme,
    value: exampleSnakeCase,
    origLeft: null,
    orig: exampleCamelCase,
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    lineWrapping: true,
    highlightDifferences: true,
    connect: 'align',
    collapseIdentical: false,
    merge: true,
    allowEditingOriginals: true,
  };

  const codeMirrorElement = document.getElementById('codemirror-formatted');
  codeMirrorElement.innerHTML = '';
  const diffView = CodeMirror.MergeView(codeMirrorElement, options);

  resize(diffView, 900);

  return diffView;
}
