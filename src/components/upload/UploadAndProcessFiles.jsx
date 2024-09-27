import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import { useAuth } from 'contexts/user/AuthContext';

const UploadAndProcessFiles = () => {
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileExtension, setFileExtension] = useState('');
  const { updateUser, user } = useAuth();

  React.useEffect(() => {
    if (fileName && fileExtension && fileContent) {
      updateUser({
        data: {
          ...user,
          RAG: {
            ...user.RAG, content: fileContent, fileName, type: fileExtension, new: true,
          },
        },
      });
    }
  }, [fileContent]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = async () => {
      const binaryStr = reader.result;
      const extension = file.name.split('.').pop().toLowerCase();
      setFileExtension(extension);
      setFileName(file.name);

      if (extension === 'txt') {
        setFileContent(binaryStr);
      } else if (extension === 'docx') {
        Mammoth.extractRawText({ arrayBuffer: binaryStr })
          .then((result) => {
            setFileContent(result.value);
          })
          .catch((err) => console.log(err));
      } else if (extension === 'pdf') {
        const pdf = await pdfjsLib.getDocument({ data: binaryStr }).promise;
        let extractedText = '';
        for (let i = 0; i < pdf.numPages; i += 1) {
          const page = pdf.getPage(i + 1);
          const textContent = page.getTextContent();
          // eslint-disable-next-line no-loop-func
          textContent.items.forEach((item) => {
            extractedText += `${item.str} `;
          });
        }
        setFileContent(extractedText);
      } else {
        try {
          setFileContent(binaryStr);
        } catch (err) {
          console.log('Unable to set file');
        }
      }
    };

    if (file.type === 'application/pdf') {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsBinaryString(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps({ className: 'dropzone' })}
        style={{
          border: '1px dashed #cccccc',
          borderRadius: '4px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        className="!border-gray-300"
      >
        <input {...getInputProps()} />
        <p className="font-poppins text-gray-300">Drag 'n' drop a document here, or click to select one</p>
      </div>
    </div>
  );
};

export default UploadAndProcessFiles;
