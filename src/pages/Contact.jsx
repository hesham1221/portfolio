import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { AiOutlineSend } from "react-icons/ai";
import emailjs from "emailjs-com";
import "../styles/contact.scss";
import {
  BsGithub,
  BsLinkedin,
  BsFacebook,
  BsArrowRightShort,
} from "react-icons/bs";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";
const Contact = ({isAdmin,setIsAdmin}) => {
  const [suc, setsuc] = useState(false);
  const [fai, setFai] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const [params, setParams] = useState({ name: "", email: "", message: "" });
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setsuc(false);
    setFai(false);
    emailjs
      .send("service_t6bglh8", "template_mrcvt5i", params, "tV7icbhXzSYjJEHxv")
      .then(
        () => {
          setParams({ name: "", email: "", message: "" });
          setLoading(false);
          setsuc(true);
        },
        (err) => {
          setLoading(false);
          console.log(err);
          setFai(true);
        }
      );
  };
  return (
    <div className="contact">
      <Navbar setIsAdmin={setIsAdmin} isAdmin={isAdmin}/>
      <div className="formContainer">
        <form onSubmit={submitHandler} className="conatctForm">
          <div className="head">
            <h1 className="contactHeader">Contact Us</h1>
            {(suc || fai) && (
              <h1 className={`${suc ? "suc" : "fai"}`}>
                {suc ? "Success" : "Failed"}
              </h1>
            )}
            {loading && (
              <Loading />
            )}
          </div>
          <h2 className="form_header">Name :</h2>
          <input
            className={`form_input ${suc && "success"} ${fai && "failed"}`}
            value={params.name}
            placeholder="Name...."
            ref={nameRef}
            onChange={(tar) =>
              setParams((params) => ({ ...params, name: tar.target.value }))
            }
          />
          <h2 className="form_header">Email :</h2>
          <input
            className={`form_input ${suc && "success"} ${fai && "failed"}`}
            type="email"
            value={params.email}
            placeholder="Email...."
            ref={emailRef}
            onChange={(tar) =>
              setParams((params) => ({ ...params, email: tar.target.value }))
            }
          />
          <h2 className="form_header">Message :</h2>
          <textarea
            className={`form_input message ${suc && "success"} ${
              fai && "failed"
            }`}
            value={params.message}
            placeholder="message...."
            ref={messageRef}
            onChange={(tar) =>
              setParams((params) => ({ ...params, message: tar.target.value }))
            }
          />
          <button type="submit" className={`sendBtn ${loading && 'disabled'}`}>
            Send&nbsp;
            <AiOutlineSend />
          </button>
          <div className="info infoContact">
          <a href="https://github.com/hesham1221" className="about_link" target='_blank' rel="noreferrer">
                <BsGithub className="infoIcons" />
              </a>
              <a href="https://www.linkedin.com/in/hesham-mohmed-5a0a47221/"  className="about_link" target='_blank' rel="noreferrer">
                <BsLinkedin className="infoIcons" />
              </a>
              <a href="https://www.facebook.com/hesham.sadoun1221/"  className="about_link" target='_blank' rel="noreferrer">
                <BsFacebook className="infoIcons" />
              </a>
            <span onClick={() => navigate("../work")} className="toWorkButton">
              My Work
              <BsArrowRightShort />
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
