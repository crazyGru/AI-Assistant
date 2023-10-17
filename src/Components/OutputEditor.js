import React, { useState, useEffect, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Input from "@uiw/react-input";
// import Button from '@uiw/react-button';
import html2pdf from 'html2pdf.js';
import draftToHtml from 'draftjs-to-html';
import { saveAs } from 'file-saver';
import {Packer} from 'docx';

const OutputEditor = ({ store, output }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [documentName, setDocumentName] = useState('');
    const [stateMsg, setStateMsg] = useState('');
    const [msgVisible, setMsgVisible] = useState('false');

    const editorRef = useRef(null);
    const handleChange = (newEditorState) => {
        setEditorState(newEditorState);
    };
    useEffect(() => {
        // Set value in editor on mount
        const value = output;
        const contentState = ContentState.createFromText(value);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
        setMsgVisible(false);
        // Clean up function
        return () => {
            // Perform any cleanup needed here
        };
    }, [output]);

    const handleStateMsgChange = (newValue) => {
        setStateMsg(newValue);
        setMsgVisible(true);
        setTimeout(() => setMsgVisible(false), 1000);
    }

    const handleExportPDF = () => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const html = draftToHtml(rawContentState);
        console.log(html);

        html2pdf().set({ margin: [20, 10, 20, 0] }).from(html).save();
        handleStateMsgChange("Text saved as a pdf file");
    };

    const handleExportWord = () => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        // create a new Packer instance
        const packer = new Packer();
        // set up the document
        const doc = packer.create();
        const styles = packer.getStyleSet();
        const body = doc.createParagraph();
        // create a new run with the plain text content of the editor
        const text = rawContentState.blocks.map(block => block.text).join('\n');
        const run = body.createRun(text);
        // generate the document and save it
        packer.toBlob(doc).then(blob => {
            saveAs(blob, 'document.docx');
        });
        handleStateMsgChange("Text saved as a Word file");
    }

    const handleExportTXT = () => {
        const value = editorState.getCurrentContent().getPlainText();
        const blob = new Blob([value], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'document.txt';
        a.click();

        handleStateMsgChange("Text saved as a text file");
    }

    const handleExportClipboard = () => {
        const value = editorState.getCurrentContent().getPlainText();
        navigator.clipboard.writeText(value)
            .then(() => {
                console.log('Text copied to clipboard');
                handleStateMsgChange("Text copied to clipboard");
            })
            .catch((error) => {
                console.error('Error copying text: ', error);
                handleStateMsgChange('Error copying text: ', error);
            });
    }

    const handleSave = async (e) => {
        const contentState = editorState.getCurrentContent();
        const htmlContent = draftToHtml(convertToRaw(contentState));
        const response = await store.api.post("/document/save", {
            name: documentName,
            content: htmlContent
        });
        handleStateMsgChange("Document saved on your database");
    }

    return (
        <div>
            <div className="m_input_widget flex items-center">
                <Input placeholder="Untitled Document" style={{ margin: "10px" }} value={documentName} onChange={(e) => setDocumentName(e.target.value)} />
                <div className="mx-1" style={{ display: "inline-block", height: "35px", width: "35px", background: "rgba(116,16,162,0.2)", textAlign: "center", lineHeight: "35px", fontSize: "14px", color: "rgba(116,16,162,1)", cursor: "pointer" }} onClick={handleExportPDF}>
                    <i className="fas fa-file-word"></i>
                </div>
                <div className="mx-1" style={{ display: "inline-block", height: "35px", width: "35px", background: "rgba(116,16,162,0.2)", textAlign: "center", lineHeight: "35px", fontSize: "14px", color: "rgba(116,16,162,1)", cursor: "pointer" }} onClick={handleExportTXT}>
                    <i className="fas fa-file-alt"></i>
                </div>
                <div className="mx-1" style={{ display: "inline-block", height: "35px", width: "35px", background: "rgba(116,16,162,0.2)", textAlign: "center", lineHeight: "35px", fontSize: "14px", color: "rgba(116,16,162,1)", cursor: "pointer" }} onClick={handleSave}>
                    <i className="fas fa-save"></i>
                </div>
                <div className="mx-1" style={{ display: "inline-block", height: "35px", width: "35px", background: "rgba(116,16,162,0.2)", textAlign: "center", lineHeight: "35px", fontSize: "14px", color: "rgba(116,16,162,1)", cursor: "pointer" }} onClick={handleExportClipboard}>
                    <i className="fas fa-copy"></i>
                </div>
            </div>
            <Editor
                editorState={editorState}
                onEditorStateChange={handleChange}
                ref={editorRef}
            />
            {msgVisible && (
                <div className="bg-white px-5 py-3.5 rounded-lg shadow max-w-sm mx-auto transform transition duration-100 ease-linear" style={{ textAlign: "center", border: "1px solid rgb(116,16,162,1)", color: "rgba(116,16,162,1)", position: "fixed", top: "10px", right: "20px" }}>
                    {stateMsg}
                </div>
            )}

        </div>
    );
};

export default OutputEditor;