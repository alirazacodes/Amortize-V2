import axios from 'axios';

import React, { Component, useState } from 'react';

function fileUpload() {

    state = {

        // Initially, no file is selected
        selectedFile: null
    };

    const [filestate, setfilestate] = useState({

        // Initially, no file is selected
        selectedFile: null
    });

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        setfilestate({ selectedFile: event.target.files[0] });

    };

    // On file upload (click the upload button)
    onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "profilePic",
            filestate.selectedFile,
            filestate.selectedFile.name
        );

        // Details of the uploaded file
        console.log(filestate.selectedFile);

        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", formData);
    };

    // File content to be displayed after
    // file upload is complete
    //fileData = () => {

    // 	if (this.state.selectedFile) {

    // 		return (
    // 		<div>
    // 			<h2>File Details:</h2>

    // <p>File Name: {this.state.selectedFile.name}</p>


    // <p>File Type: {this.state.selectedFile.type}</p>


    // <p>
    // 			Last Modified:{" "}
    // 			{this.state.selectedFile.lastModifiedDate.toDateString()}
    // 			</p>

    // 		</div>
    // 		);
    // 	} else {
    // 		return (
    // 		<div>
    // 			<br />
    // 			<h4>Choose before Pressing the Upload button</h4>
    // 		</div>
    // 		);
    // 	}
    //};



    // return (
    //     // <div>
    //     //     <h1>
    //     //         GeeksforGeeks
    //     //     </h1>
    //     //     <h3>
    //     //         File Upload using React!
    //     //     </h3>
    //     // <div>
    //     //<input type="file" onChange={this.onFileChange} />
    //     <Button
    //         color="primary"
    //         href="#pablo"
    //         onClick={handleSubmit}
    //         size="sm"
    //     >
    //         Submit
    //     </Button>
    //     // </div>
    //     //     {this.fileData()}
    //     // </div>
    // );

}

export default fileUpload;
