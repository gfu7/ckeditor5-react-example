import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { EditorConfig } from "@ckeditor/ckeditor5-core";
import { Autosave } from "@ckeditor/ckeditor5-autosave";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { testLongData } from "../../data";

const editorConfiguration: EditorConfig = {
  plugins: [Essentials, Bold, Italic, Paragraph, Autosave],
  toolbar: ["bold", "italic"],
  autosave: {
    save: (editor) => {
      const _editor = editor as ClassicEditor;
      console.log("autosave!", editor);
      return new Promise((resolve, reject) => {
        console.time("editor.getData()");
        const data = _editor.getData();
        console.timeEnd("editor.getData()");
        console.log("Data:", data);
        resolve(data);
      });
    },
  },
};

class App extends Component {
  render() {
    return (
      <div>
        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          data={testLongData}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            console.log("onChange.", { event, editor });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    );
  }
}

export default App;
