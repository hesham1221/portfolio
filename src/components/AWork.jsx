import React from "react";
import { MdDelete } from "react-icons/md";
import { CgMoreAlt } from "react-icons/cg";
import "../styles/aWork.scss";
const AWork = ({ work, isAdmin , setWork }) => {
  const server = 'http://localhost:5000/'
  console.log(work);
  async function deleteWork(id){
    console.log(id)
    try {
      const fData = await fetch(`${server}singlework/${id}`,{
        method : 'DELETE'
      })
      const data = fData.json()
      console.log(data)
      setWork((prev) => prev.filter(work => work.id !== id))
    } catch (err) {
      console.log(err)
    }

  }
  return (
    <div
      style={{
        backgroundImage: `url(${work.workPhotos.background})`,
      }}
      className="awork"
    >
      <h2 className="workTitle">{work.workTitle}</h2>
      <div className="options">
        {isAdmin && (
          <button onClick={() => deleteWork(work._id)} className="options_btn dl">
            <MdDelete />
          </button>
        )}
        <button className="options_btn">
          <CgMoreAlt />
        </button>
      </div>
    </div>
  );
};

export default AWork;
