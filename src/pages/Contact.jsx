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
const Contact = () => {
    const navigate = useNavigate()
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const [params, setParams] = useState({ name: "", email: "", message: "" });
  const submitHandler = (e) => {
    e.preventDefault();
    emailjs
      .send("service_t6bglh8", "template_mrcvt5i", params, "tV7icbhXzSYjJEHxv")
      .then(
        function () {
          setParams({ name: "", email: "", message: "" });
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };
  return (
    <div className="contact">
      <Navbar />
      <div className="formContainer">
        <form onSubmit={submitHandler} className="conatctForm">
          <h1 className="contactHeader">Contact Us</h1>
          <h2 className="form_header">Name :</h2>
          <input
            className="form_input"
            value={params.name}
            placeholder="Name...."
            ref={nameRef}
            onChange={(tar) =>
              setParams((params) => ({ ...params, name: tar.target.value }))
            }
          />
          <h2 className="form_header">Email :</h2>
          <input
            className="form_input"
            value={params.email}
            placeholder="Email...."
            ref={emailRef}
            onChange={(tar) =>
              setParams((params) => ({ ...params, email: tar.target.value }))
            }
          />
          <h2 className="form_header">Message :</h2>
          <textarea
            className="form_input message"
            value={params.message}
            placeholder="message...."
            ref={messageRef}
            onChange={(tar) =>
              setParams((params) => ({ ...params, message: tar.target.value }))
            }
          />
          <button type="submit" className="sendBtn">
            Send&nbsp;
            <AiOutlineSend />
          </button>
          <div className="info infoContact">
            <BsGithub className="infoIcons" />
            <BsLinkedin className="infoIcons" />
            <BsFacebook className="infoIcons" />
            <span onClick={() => navigate('../work')} className="toWorkButton">
                My Work<BsArrowRightShort />
              </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
