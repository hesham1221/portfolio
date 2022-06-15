import React from "react";
import Navbar from "../components/Navbar";
import bodyImg from "../assets/developer-team.svg";
import "../styles/home.scss";
import {
  BsGithub,
  BsLinkedin,
  BsFacebook,
  BsArrowRightShort,
} from "react-icons/bs";
import { useNavigate } from "react-router";
const Home = ({ isAdmin, setIsAdmin }) => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <Navbar homeSelected={true} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <div className="body">
        <div className="main">
          <div className="headers">
            <div className="headers_cont">
              <h1 className="body_header">
                Hello , I'm <span className="body_name">Hesham Mohamed</span>.
              </h1>
              <h1 className="body_header">I'm a full-stack developer.</h1>
            </div>
            <div className="headers_cont">
              <h1 className="body_header">
                I have serious passion for{" "}
                <span className="body_name">developing software</span>...
              </h1>
            </div>
            <div className="info">
              <a href="https://github.com/hesham1221" className="about_link" target='_blank' rel="noreferrer">
                <BsGithub className="infoIcons" />
              </a>
              <a href="https://www.linkedin.com/in/hesham-mohmed-5a0a47221/"  className="about_link" target='_blank' rel="noreferrer">
                <BsLinkedin className="infoIcons" />
              </a>
              <a href="https://www.facebook.com/hesham.sadoun1221/"  className="about_link" target='_blank' rel="noreferrer">
                <BsFacebook className="infoIcons" />
              </a>
              <span
                onClick={() => navigate("../work")}
                className="toWorkButton"
              >
                My Work
                <BsArrowRightShort />
              </span>
            </div>
          </div>
          <img src={bodyImg} className="body_img" alt="body img" />
        </div>
      </div>
    </div>
  );
};

export default Home;
