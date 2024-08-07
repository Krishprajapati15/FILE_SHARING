import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './services/api';
import { SocialIcon } from 'react-social-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard'; 
import { FaCopy, FaShareAlt } from 'react-icons/fa'; 

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef();

  const url = 'https://i.pinimg.com/736x/54/e6/2c/54e62c827ecda9a8d95bc778c8bfbcb7.jpg';
  const myurl ='https://www.facebook.com/profile.php?id=100081786155608&mibextid=ZbWKwL';
  const myurl2 ='https://twitter.com/krishPr88603152?t=Tc3ShlqaWgoRHkQYE7LviA&s=09';
  const myurl3 ='https://instagram.com/krish._prajapati?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D';
  const myurl4 ='https://www.linkedin.com/in/krish-prajapati-37417226a';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'File Sharing Link',
        url: result
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);
    } else {
      alert('Share feature is not supported in this browser.');
    }
  }

  return (
    <div className='container'>
      <img src={url} alt='File Sharing' className='img'/>
      
      <div className='wrapper'>
        <h1>MY FILE SHARING!</h1>
        
        <p>Our website specializes in securing your important documents by converting them 
          into unique, link-based formats. Upload any file or document, and we'll generate 
          a secure link for it. Once you have the link, you can safely delete the file from
          your device. The document remains accessible only through this link, which you can
          share with others while maintaining complete privacy no one else can see what you
          share. To download the document, simply paste the link into any web browser,
          and the file will download automatically. This service ensures your documents
          are both secure and easily accessible, without cluttering your local storage.</p>
        
        <button onClick={onUploadClick} className='btn'>UPLOAD</button>

        <div className='social-media'>
          <a href={myurl} target="_blank" rel="noopener noreferrer">
            <SocialIcon url={myurl} />
          </a>
          <a href={myurl2} target="_blank" rel="noopener noreferrer">
            <SocialIcon url={myurl2} />
          </a>
          <a href={myurl3} target="_blank" rel="noopener noreferrer">
            <SocialIcon url={myurl3} />
          </a>
          <a href={myurl4} target="_blank" rel="noopener noreferrer">
            <SocialIcon url={myurl4} />
          </a>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {result && (
          <div className="link-container">
            <input 
              type="text" 
              value={result} 
              readOnly 
              className="link-box" 
            />
            <CopyToClipboard text={result} onCopy={handleCopy}>
              <button className="copy-btn">
                <FaCopy /> 
              </button>
            </CopyToClipboard>
            <button className="share-btn" onClick={handleShare}>
              <FaShareAlt /> 
            </button>
          </div>
        )}

        {copied && (
          <div className="alert">Link copied to clipboard!</div>
        )}

        <h6 className='kp'>Copyright © 2024 - All rights reserved by Krish Prajapati</h6>
      </div>
    </div>
  );
}

export default App;
