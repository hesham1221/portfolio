import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/workDetails.scss";
const WorkDetails = ({ isAdmin }) => {
    const [viewedPhoto,setViewedPhoto] = useState('')
    const [work, setWork] = useState([]);
    const server = "http://localhost:5000/";
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await fetch(`${server}singlework/${id}`);
            const data = await fetchedData.json();
            console.log(data);
            setWork(() => data);
            setViewedPhoto(data.workPhotos.background)
        };
        fetchData();
    }, [id]);
  return (
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
          <img onClick={() => setViewedPhoto(work.workPhotos.background)} src={work.workPhotos?.background} alt='otherphoto' className="otherPhoto" />
              {work.workPhotos?.otherPhotos.map(photo => <img onClick={() => setViewedPhoto(photo)} src={photo} alt='otherphoto' className="otherPhoto" />)}
          </div>
        </div>
        <div className="right">
            <img src={viewedPhoto} alt='viewed_photo' className="viewed_photo" />
        </div>
      </div>
    </div>
  );
};

export default WorkDetails;
