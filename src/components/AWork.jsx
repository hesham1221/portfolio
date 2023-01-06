import React from "react";
import { MdDelete } from "react-icons/md";
import { CgMoreAlt } from "react-icons/cg";
import "../styles/aWork.scss";
import { useNavigate } from "react-router-dom";
const AWork = ({ work, isAdmin , setWork }) => {
  const navigate = useNavigate()
  const server = 'https://portofolio-back.onrender.com/'
  console.log(work);
  async function deleteWork(id){
    try {
      await fetch(`${server}singlework/${id}`,{
        method : 'DELETE'
      })
      setWork((prev) => prev.filter(work => work.id !== id))
    } catch (err) {
      console.log(err)
    }

  }
  const goToWork = () =>{
    navigate(`${work._id}`)
  }
  return (
    <div
      className="awork"
    >
      <img onClick={goToWork} src={work.workPhotos.background} alt="work background" className="workImg" />
      <div className="underPhoto">
      <h2 className="workTitle">{work.workTitle}</h2>
      <div className="options">
        {isAdmin && (
          <button onClick={() => deleteWork(work._id)} className="options_btn dl">
            <MdDelete />
          </button>
        )}
        <button onClick={goToWork} className="options_btn">
          <CgMoreAlt />
        </button>
      </div>
      </div>
    </div>
  );
};

export default AWork;
