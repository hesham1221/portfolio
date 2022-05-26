import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/uploadwork.scss";
import { FiUpload } from "react-icons/fi";
const UploadWork = ({ isAdmin, setIsAdmin }) => {
  const [work, setWork] = useState({});
  const [imgs, setImgs] = useState([]);
  const [imgDetails, setImgDetails] = useState([
    {
      url: "https://designshack.net/wp-content/uploads/placeholder-image.png",
      background: false,
    },
  ]);
  const [inputValue, setInputValue] = useState([]);
  function getImgs(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      let ilength = imgs.length;
      setImgs((image) => [
        ...image,
        [
          {
            file: event.target.files[i],
            url: URL.createObjectURL(event.target.files[i]),
            background: ilength === 0 ? true : false,
          },
        ],
      ]);
      ilength++;
    }
    console.log(imgs);
    setInputValue([]);
  }
  const setAsBackground = (url) => {
    const nImgs = imgs;
    console.log(nImgs);
    
    if(nImgs[nImgs.findIndex((imag) => imag[0].background === true)]){
      nImgs[nImgs.findIndex((imag) => imag[0].background === true)][0].background = false;
    }
    nImgs[nImgs.findIndex((imag) => imag[0].url === url)][0].background = true;
    setImgDetails(nImgs[nImgs.findIndex((imag) => imag[0].url === url)]);
    setImgs(nImgs);
  };
  const deleteImage =(url)=>{
    const oldImgs = imgs
    const filteredIndex = oldImgs.findIndex(img => img[0].url ===url)
    oldImgs.splice(filteredIndex,1)
    console.log( filteredIndex , oldImgs)
    // setImgDetails(imgs[filteredIndex - 1])
    setImgs(oldImgs)
  }
  return (
    <div className="uploadWork">
      <Navbar uploadSelected={true} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <div className="workUpload_body">
        <div className="left">
          <form action="">
            <h2 className="form_header">Work Title :</h2>
            <input
              className={`form_input`}
              value={work.title}
              placeholder="Title..."
              onChange={(tar) =>
                setWork((work) => ({ ...work, title: tar.target.value }))
              }
            />

            <h2 className="form_header">Details :</h2>
            <textarea
              className={`form_input message`}
              value={work.message}
              placeholder="Details...."
              onChange={(tar) =>
                setWork((work) => ({ ...work, details: tar.target.value }))
              }
            />
            <h2>Images :</h2>
            <label className="uploadLabel" htmlFor="upload">
              <FiUpload className="uploadIcon" />
              upload photos
            </label>
            <input
              name="uploadmany"
              id="upload"
              type="file"
              multiple
              className="fileUpload"
              onChange={getImgs}
              value={inputValue}
            />
            <div className="otherimgs">
              {imgs.map((imag) => (
                <img
                  onClick={() => setImgDetails(imag)}
                  src={imag[0].url}
                  className="otherImage"
                  alt="otherImage"
                />
              ))}
            </div>
            <button type="submit" className={`sendBtn`}>
              Upload
            </button>
          </form>
        </div>
        <div className="right">
          <div className="photoContainer">
            {imgDetails.map((img) => (
              <div>
                <img className="backgroundimg" src={img.url} alt="" />
                {(img.file && img.url) &&<div className="controls">
                  {img.background ? (
                    <h3 className="form_header">Main</h3>
                  ) : (
                    <button
                      onClick={() => {
                        setAsBackground(img.url);
                        console.log(img.url, imgs);
                      }}
                      className="sendBtn"
                    >
                      Set as main
                    </button>
                  )}
                  <button onClick={() => deleteImage(img.url)} className="sendBtn">Delete</button>
                </div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadWork;
