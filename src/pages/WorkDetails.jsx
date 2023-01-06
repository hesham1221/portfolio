import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/workDetails.scss";
import { BsGithub, BsGlobe } from "react-icons/bs";
import Loading from "../components/Loading";

const WorkDetails = ({ isAdmin }) => {
  const [viewedPhoto, setViewedPhoto] = useState("");
  const [work, setWork] = useState([]);
  const server = "https://portofolio-back.onrender.com/";
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetch(`${server}singlework/${id}`);
      const data = await fetchedData.json();
      if (data?.message === "Not found") {
      }
      setWork(() => data);
      setViewedPhoto(data.workPhotos.background);
      setLoading(false);
    };
    fetchData();
  }, [id]);
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "140px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      ) : (
        <div className="workDetails">
          <Navbar isAdmin={isAdmin} />
          <div className="detailsBody">
            <div className="left">
              <h1>Work title :</h1>
              <h2>{work.workTitle}</h2>
              <h1>Work Details :</h1>
              <p>{work.workDescribtion}</p>
              <h1>Work Images :</h1>
              <div className="photosContainer">
                <img
                  onClick={() => setViewedPhoto(work.workPhotos.background)}
                  src={work.workPhotos?.background}
                  alt="otherphoto"
                  className="otherPhoto"
                />
                {work.workPhotos?.otherPhotos.map((photo) => (
                  <img
                    onClick={() => setViewedPhoto(photo)}
                    src={photo}
                    alt="otherphoto"
                    className="otherPhoto"
                  />
                ))}
              </div>
            </div>
            <div className="right">
              <img
                src={viewedPhoto}
                alt="viewed_photo"
                className="viewed_photo"
              />
              {work.links && (
                <div className="links">
                  <h2>Links :</h2>
                  {work.links.github && (
                    <a
                      rel="noreferrer"
                      href={work.links.github}
                      target="_blank"
                    >
                      <BsGithub />
                    </a>
                  )}
                  {work.links.live && (
                    <a rel="noreferrer" href={work.links.live} target="_blank">
                      <BsGlobe />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkDetails;
