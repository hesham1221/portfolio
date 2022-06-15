import React, { useEffect, useState } from "react";
import AWork from "../components/AWork";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import "../styles/work.scss";
const Work = ({ isAdmin, setIsAdmin }) => {
  const [work, setWork] = useState([]);
  const server = "https://hportofolio.herokuapp.com/";
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getWork = async () => {
      try {
        const fetchedData = await fetch(`${server}allwork`);
        const data = await fetchedData.json();
        setWork(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getWork();
  }, []);
  return (
    <>
      {loading ? (
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
        <div className="work">
          <Navbar
            workSelected={true}
            setIsAdmin={setIsAdmin}
            isAdmin={isAdmin}
          />
          <div className="work_body">
            {work.map((awork) => (
              <AWork setWork={setWork} isAdmin={isAdmin} work={awork} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Work;
