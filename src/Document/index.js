import React, { useEffect, useState } from "react";

import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

import { observer, inject } from "mobx-react";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML ,convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const MyDocument = ({ store }) => {
    const [dataSource, setDataSource] = useState([]);
    const [clickedRowName, setClickedRowName] = useState("");
    const [editorContent, setEditorContent] = useState(EditorState.createEmpty());
    const [updateCount, setUpdateCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [sortInfo, setSortInfo] = useState({
        columnKey: "createdAt",
        order: "asc",
    });
    useEffect(() => {
        const saveData = async () => {
            const response = await store.api.post("/document/get_all", {});
            const sortedData = response.data.sort(
                (a, b) => -(new Date(a.createdAt) - new Date(b.createdAt))
            );
            setDataSource(sortedData);
        };
        saveData();
    }, [updateCount]);
    const handleEditClick = (record) => {
        setClickedRowName(record.name);
        if (record.content) {
            const blocksFromHTML = convertFromHTML(record.content);
            const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
            const editorState = EditorState.createWithContent(contentState);
            setEditorContent(editorState);
        } else {
            setEditorContent(EditorState.createEmpty);
        }

        setShowModal(true);
    };
    const handleTrashClick = async (record) => {
        const id = record._id;
        const response = await store.api.post("/document/delete", {
            id: id,
        });
        setUpdateCount(updateCount + 1);
    };
    const handleClose = () => setShowModal(false);
    const handleSaveChange = async (e) => {
        const content = editorContent.getCurrentContent();
        const htmlContent = draftToHtml(convertToRaw(content));
        const name = clickedRowName;
        const response = await store.api.post("/document/update", {
            name: name,
            content: htmlContent,
        });
        setShowModal(false);
        setUpdateCount(updateCount + 1);
    };
    const extractTextFromHtml = (htmlString) => {
        const div = document.createElement("div");
        div.innerHTML = htmlString;
        return div.textContent || div.innerText || "";
    };

    return (
        <div style={{width:"100%"}}>
            <Helmet>
                <title>My Document</title>
            </Helmet>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                                Document
                            </th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                                Content
                            </th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {dataSource.map((record) => (
                            <tr key={record._id} className="hover:bg-gray-50">
                                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                    <div className="text-sm">
                                        <div className="font-medium text-gray-700">{record.name}</div>
                                        <div className="text-gray-400">{record.createdAt}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {extractTextFromHtml(record.content).substring(0, 50)}{" "}
                                    {extractTextFromHtml(record.content).length > 50 ? "..." : ""}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-12">
                                        <button onClick={() => handleTrashClick(record)}>
                                            <i className="fas fa-trash-alt fa-lg"></i>
                                        </button>
                                        <button onClick={() => handleEditClick(record)}>
                                            <i className="fas fa-pencil fa-lg"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50" style={{backgroundColor:"rgba(0,0,0,0.1)"}}>
                        <div className="relative w-auto my-6 mx-auto max-w-6xl" >
                            {/*content*/}
                            <div className="border-3 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none" style={{ borderWidth: "3px", borderColor: "rgba(116,16,162,0.5)", borderStyle: "solid" }}>
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">{clickedRowName}</h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto max-h-96 overflow-y-auto">
                                    <Editor
                                        editorState={editorContent}
                                        onEditorStateChange={setEditorContent}
                                    ></Editor>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleSaveChange}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default withRouter(observer(inject("store")(MyDocument)));
