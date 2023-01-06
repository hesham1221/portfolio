import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/uploadwork.scss";
import { FiUpload } from "react-icons/fi";
import { AiFillGithub } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Modal from "../components/Modal";
const UploadWork = ({ isAdmin, setIsAdmin }) => {
  const [togalModal, setTogalModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const serverUrl = "https://portofolio-back.onrender.com/";
  const [work, setWork] = useState({});
  const [imgs, setImgs] = useState([]);
  const [nameImg, setNameImg] = useState("");
  const [imgDetails, setImgDetails] = useState([
    {
      url: "https://designshack.net/wp-content/uploads/placeholder-image.png",
      background: false,
    },
  ]);
  const [inputValue, setInputValue] = useState([]);
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [othersUrl, setOthersUrl] = useState([]);
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
    setInputValue([]);
  }
  const setAsBackground = (url) => {
    const nImgs = imgs;
    if (nImgs[nImgs.findIndex((imag) => imag[0].background === true)]) {
      nImgs[
        nImgs.findIndex((imag) => imag[0].background === true)
      ][0].background = false;
    }
    nImgs[nImgs.findIndex((imag) => imag[0].url === url)][0].background = true;
    const selectedImg = nImgs[nImgs.findIndex((imag) => imag[0].url === url)];
    setImgDetails(selectedImg);
    setImgs(nImgs);
  };
  const deleteImage = (url) => {
    const oldImgs = imgs;
    const filteredIndex = oldImgs.findIndex((img) => img[0].url === url);
    oldImgs.splice(filteredIndex, 1);
    if (filteredIndex === 0) {
      if (imgs.length === 0) {
        setImgDetails([
          {
            url: "https://designshack.net/wp-content/uploads/placeholder-image.png",
            background: false,
          },
        ]);
      } else if (imgs.length > 0) {
        setImgDetails(imgs[0]);
      }
    } else {
      setImgDetails(imgs[filteredIndex - 1]);
    }
    setImgs(oldImgs);
  };
  const restUploadWork = async (background,others) => {
      try {
        const upWork = {
          workTitle: work.title,
          workPhotos: {
            background: background,
            otherPhotos: others,
          },
          links: {
            github: work.github,
            live: work.live,
          },
          workDescribtion: work.details,
        };
        console.log(backgroundUrl, othersUrl);
        const sendWork = await fetch(`${serverUrl}newwork`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(upWork),
        });
        await sendWork.json();
        setTogalModal(false);
        navigate("../work");
      } catch (err) {
        console.log(err);
      }
      
  };
  const uploadWork = async (e) => {
    e.preventDefault();
    const backgroundImgFile = imgs.filter(
      (img) => img[0].background === true
    )[0][0].file;
    const otherImgs = imgs
      .filter((img) => img[0].background !== true)
      .map((img) => img[0].file);

    //append formdata for the server
    // const backgroundFormData = new FormData();
    // const otherFormData = new FormData();
    // backgroundFormData.append("photo", backgroundImgFile);
    // otherImgs.forEach((img) => {
    //   otherFormData.append("photo", img);
    // });
    try {
      // upload to the server

      // const sentData = await fetch(`${serverUrl}imageupload`,{
      //   method :'POST',
      //   body:backgroundFormData
      // })
      // const data = await sentData.json()
      // console.log(data)
      // const sentData2 = await fetch(`${serverUrl}imageupload`,{
      //   method :'POST',
      //   body:otherFormData
      // })
      // const data2 = await sentData2.json()
      // console.log(data2)
      // const otherUrl = data2.map(other => `${serverUrl}images/${other.filename}`)

      // upload to firebase store

      const backgroundStorageInfo = [
        {
          img: backgroundImgFile,
          ref: ref(
            storage,
            `/background/${work.title}/${backgroundImgFile.name}-${Date.now()}`
          ),
        },
      ];
      const otherImgsStorageInfo = otherImgs.map((img) => ({
        img: img,
        ref: ref(
          storage,
          `/otherPhotos/${work.title}/${img.name}-${Date.now()}`
        ),
      }));
      const uploadsArray = [...backgroundStorageInfo, ...otherImgsStorageInfo];
      setTogalModal(true);
      const otherUploads = [];
      uploadsArray.forEach((anUpload) => {
        const upload = uploadBytesResumable(anUpload.ref, anUpload.img);

        upload.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
            setNameImg(anUpload.img.name);
          },
          (err) => console.log(err)
        );
        upload.then(() => {
          getDownloadURL(anUpload.ref).then((url) => {
            if (backgroundStorageInfo[0].img.name === anUpload.img.name) {
              setBackgroundUrl(url);
              restUploadWork(url ,otherUploads )
            } else {
              setOthersUrl((others) => [...others, url]);
              otherUploads.push(url)
            }
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div className="uploadWork">
      <Navbar uploadSelected={true} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      {togalModal && (
        <Modal
          title={"Uploading data ..."}
          completed={progress}
          name={nameImg}
        />
      )}
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <AiFillGithub style={{ fontSize: "30px", marginRight: "6px" }} />{" "}
              <input
                className={`form_input`}
                value={work.github}
                placeholder="Github Link..."
                style={{ width: "63.5%" }}
                onChange={(tar) =>
                  setWork((work) => ({ ...work, github: tar.target.value }))
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "9px",
                alignItems: "center",
              }}
            >
              <BsGlobe style={{ fontSize: "30px", marginRight: "6px" }} />{" "}
              <input
                className={`form_input`}
                value={work.live}
                placeholder="Live Link..."
                style={{ width: "63.5%" }}
                onChange={(tar) =>
                  setWork((work) => ({ ...work, live: tar.target.value }))
                }
              />
            </div>
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
            <button onClick={uploadWork} type="submit" className={`sendBtn`}>
              Upload
            </button>
          </form>
        </div>
        <div className="right">
          <div className="photoContainer">
            {imgDetails.map((img) => (
              <div>
                <img className="backgroundimg" src={img.url} alt="" />
                {img.file && img.url && (
                  <div className="controls">
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
                    <button
                      onClick={() => deleteImage(img.url)}
                      className="sendBtn"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadWork;
