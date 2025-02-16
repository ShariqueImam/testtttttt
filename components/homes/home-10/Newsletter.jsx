"use client";
import React, { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
export default function Newsletter() {
  const [isSent, setisSent] = useState(false);
  const [isClicked, setisClicked] = useState(false);
  const [Email, setEmail] = useState("");
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const tokenWithWriteAccess =
    "skayIwKXoXejt2qdOUJrWBcQw6FF4Cp4TGHseCnSTai70isKWMQe8kEdODSsmzj8A3431NKDwl35Y1eblAh43bD1E3dqIQLkL5Ei0pISb1pEKO33MxJKv026PZvoAnvLSTSMx25vQGVb3eJMsWejSsqrNx8UZSupagCYTqlnPly58ww0zIAm";
  const submitHandler = (event) => {
    event.preventDefault();

    const sendData = async () => {
      const { data } = await axios.post(
        `https://ay5s8ogi.api.sanity.io/v2021-06-07/data/mutate/production?returnIds=true`,
        {
          mutations: [
            {
              create: {
                _type: "newsletter",
                createdAt: new Date().toISOString(),
                email: Email,
              },
            },
          ],
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${tokenWithWriteAccess}`,
          },
        }
      );
      // to represent the success message
      // const flashTime = setTimeout(() => {
      //   setIsSubmit(false);
      // }, 2000);
      // return () => {
      //   clearTimeout(flashTime);
      // };
    };
    const sendEmail = (e) => {
      let dataToBeSentToEmail = {
        createdAt: new Date().toISOString(),
        email: Email,
      };
      emailjs
        .send(
          "service_umwwy54",
          "template_9dm9zlk",
          dataToBeSentToEmail,
          "6BIY51JblL2XGIZJ8"
        )
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            console.log("FAILED...", error);
          }
        );
    };
    if (Email != "") {
      // sendEmail();
      sendData();
      setEmail("");
    }
  };
  return (
    <div className="container position-relative">
      <div className="row">
        <div className="col-md-8 offset-md-2 col-lg-8 offset-lg-2 wow fadeInUp">
          <h2 className="section-title text-center mb-40">
            Looking for an 
            <span className="font-alt"> exclusive and creative</span> website?
          </h2>
          <form
            onSubmit={submitHandler}
            id="mailchimp"
            className="form newsletter-strong"
          >
            <div className="d-sm-flex justify-content-between mb-20">
              <label htmlFor="newsletter-email" className="visually-hidden">
                Your email
              </label>
              <input
                placeholder="Enter your email"
                className="newsletter-field input-lg round"
                id="newsletter-email"
                name="newsletter-email"
                type="email"
                pattern=".{5,100}"
                required
                aria-required="true"
                onChange={emailChangeHandler}
                value={Email}
              />
              <button
                type="submit"
                aria-controls="subscribe-result"
                className="submit_btn btn btn-mod btn-white btn-large btn-round btn-hover-anim align-middle"
              >
                <span>Subscribe Now</span>
              </button>
            </div>
            <div className="form-tip">
              <i className="icon-info size-16" /> By sending the form you agree
              to the <a href="/privacy">Terms &amp; Conditions</a> and{" "}
              <a href="/privacy">Privacy Policy</a>.
            </div>
            <div
              id="subscribe-result"
              role="region"
              aria-live="polite"
              aria-atomic="true"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
