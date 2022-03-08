import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import mongodb from "../assest/mongodb-icon.svg";
import nodejs from "../assest/nodejs-icon.svg";
import express from "../assest/expressjs-icon.svg";
import reactjs from "../assest/reactjs-icon.svg";
const HeroBody = () => {
  const type = useRef();
  const ty = useRef();
  const message =
    "It always starts with :<br/>^1000 <a href='https://en.wikipedia.org/wiki/%22Hello,_World!%22_program' target='__blank' class = 'helloww'>>> Hello world!!</a><br/> ^500 and then you choose your way <br /> <a class='my-way' target='__blank' href='https://www.mongodb.com/mern-stack'>My way => </a> ";
  useEffect(() => {
    const options = {
      strings: [message],
      typeSpeed: 37,
    };
    ty.current = new Typed(type.current, options);
    return () => ty.current.destroy();
  }, []);
  return (
    <div className="hero-body">
      <div className="typeContainer">
        <span ref={type} className="typed-text" />
      </div>

      <div className="images-container">
        <a href="https://www.mongodb.com/" rel="noreferrer" target="_blank">
          <img src={mongodb} className="image-log" alt="mongodb" />
        </a>
        <a href="https://expressjs.com/" rel="noreferrer" target="_blank">
          <img src={express} className="image-log" alt="expressjs" />
        </a>
        <a href="https://reactjs.org/" rel="noreferrer" target="_blank">
          <img src={reactjs} className="image-log" alt="reactjs" />
        </a>
        <a href="https://nodejs.org/en/" rel="noreferrer" target="_blank">
          <img src={nodejs} className="image-log" alt="nodejs" />
        </a>
      </div>
    </div>
  );
};

export default HeroBody;
