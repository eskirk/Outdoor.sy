import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Popover, OverlayTrigger } from 'react-bootstrap';

const Uploader = () => {
  const [file, setFile] = useState({ preview: '', data: '' });
  const [status, setStatus] = useState('Ready for file submission');
  const [uploadStatus, setUploadStatus] = useState(false);
  const uploadRef = useRef();

  useEffect(() => {
    document.title = 'File Uploader';
  });

  /**
   * Handle the file submission passed in through the input element
   *
   * @param {*} e - submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/uploadFile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: file.name,
        data: file.data
      })
    });

    if (response.ok) {
      const result = await response.json();

      resetUploader('Customers added - ready for new submission');
    } else {
      resetUploader('Something went wrong with your upload, please try again');
    }
  }

  /**
   * Read the uploaded file as string and throw an error if this is not a supported file type
   * TODO - ADD ERROR ON UNSUPPORTED FILE TYPE
   *
   * @param {*} e - file change event
   */
  const handleFileChange = async (e) => {
    const content = await readFile(e.target.files[0]);

    const upload = {
      name: e.target.files[0].name,
      data: content
    };

    if (validateInput(content)) {
      setFile(upload);
      setStatus(`${upload.name} ready for upload`);
      setUploadStatus(true);
    } else {
      setStatus('Something went wrong, please try again');
      setUploadStatus(false)
    }
  }

  /**
   * Validate the file input to ensure it matches the required format
   *
   * @param {string} file - the stringified content to validate
   */
  const validateInput = (file) => {
    const rows = file.split('\n');
    return rows.every((row) => row.includes('|') ? row.split('|').length === 6 : row.split(',').length === 6);
  }

  /**
   * Asynchronously read the file's content as string and return a promise containing the results
   *
   * @param {*} file - the file resulting from the file input submission event
   * @returns - Promise containing the text content of the submitted file
   */
  const readFile = async (file) => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => {
        res(reader.result);
      };
      reader.onerror = () => {
        rej(reader.error);
      }

      reader.readAsText(file);
    });
  }

  /**
   * Reset the status of the uploader so the user knows when the component is ready for use
   *
   * @param {string} statusMessage - status message to display in the uploader component
   */
  const resetUploader = (statusMessage) => {
    setFile({ preview: '', data: '' });
    uploadRef.current.value = '';
    setStatus(statusMessage);
  }

  const formatPopover = (
    <Popover id="file-format-popover">
      <Popover.Header as="h3">Files should be formatted as such:</Popover.Header>
      <Popover.Body>
        <code>firstName|lastName|email|vehicleType|vehicleName|vehicleLength</code>
        <br/>or<br />
        <code>firstName,lastName,email,vehicleType,vehicleName,vehicleLength</code>
        <br/><br/>example:<br/>
        <code>Moby,Dick,whiteWhale@sea.com,whaling vessel,Paquod,200</code><br/>
        <code>James,Kirk,captain@kirk.com,starship,Enterprise,947</code>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className='uploader'>
      <h4>Upload list to server</h4>
      <hr />
      <Form ref={uploadRef} controlId="file" className="mb-3 col-md-6" onSubmit={handleSubmit}>
          <Form.Label>Upload a text file containing your new clients</Form.Label>
          <div style={{ display: 'flex' }}>
            <Form.Control type="file" onChange={handleFileChange} />
            <Button type='submit' disabled={!uploadStatus}>Upload</Button>
            <OverlayTrigger trigger="click" placement="right" overlay={formatPopover}>
              <Button variant="secondary">Info</Button>
            </OverlayTrigger>
          </div>
        </Form>
      {status && <h4>{status}</h4>}
    </div>
  );
}

export default Uploader;