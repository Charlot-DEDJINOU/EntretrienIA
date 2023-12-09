import React, { useState } from 'react';
import axios from 'axios';
import { Button , Container} from 'react-bootstrap';

const PdfUploader = ({formData}) => {

  const [nameDoc, setName] = useState('Aucun fichier');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(file)

    if (file) {
      setName(file.name)
      const data = new FormData();
      data.append('pdfFile', file);

      try {
        const response = await axios.post('http://localhost:3001/upload', data);
        formData.cv = response.data.extractedText
      } catch (error) {
        console.error('Erreur lors de l\'envoi du fichier PDF :', error);
      }
    }
  };

  const declancheClick = (e) => {
    e.preventDefault()
    const input_file = document.getElementById('file1')
    input_file.click()
  }

  return (
      <Container className="mb-3 d-flex flex-wrap justify-content-between align-items-center" style={{width : "100%"}}>
          <Button className="button" onClick={declancheClick}>
            Cliquez puis selectionner votre CV
          </Button>
          <i className='d-inline-block'>{ nameDoc }</i>
          <input type="file" accept=".pdf" onChange={handleFileChange} id="file1" hidden/>
      </Container>
  );
};

export default PdfUploader;