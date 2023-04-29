import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import CreeperLoading from "../extra/CreeperLoading";
import imagePng from "../../assets/images/icons/image.png";
import "./main.css";
import "./mobile.css";

import config from "../../config.json";
import Post, { Posts } from "./Post";
import axios from "axios";
import Supporters from "./Supporters";
import ScrollToTop from "../extra/ScrollToTop";
const FeedContainner = () => {
  const fileref = useRef();
  const previewRef = useRef();
  const captionRef = useRef();
  const [user, loading] = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [posting, setPosting] = useState(false);

  const checkImage = (e) => {
    const imgfiles = e.target.files;
    if (imgfiles.length > 0) {
      const src = URL.createObjectURL(imgfiles[0]);
      previewRef.current.src = src;
      previewRef.current.classList.add("showImage");
      setSelectedFile(imgfiles[0]);
    }
  };

  const handleSubmit = (e) => {
    setPosting(true);
    e.preventDefault();
    const fd = new FormData(document.getElementById("postForm"));
    axios
      .post(config.baseUrl + config.api + "post", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        fileref.current.value = null;
        previewRef.current.src = null;
        previewRef.current.classList.remove("showImage");
        captionRef.current.value = "";
        setPosting(false);
      })
      .catch((err) => {
        alert("Posting failed.. Please try again!");
        setPosting(false);
      });
  };

  return (
    <>
      <ScrollToTop></ScrollToTop>
      {loading ? (
        <div className="loadingContainner">
          <CreeperLoading></CreeperLoading>
        </div>
      ) : user.err ? (
        <div className="contentTitle whitetext">
          User needs to be logged in!
        </div>
      ) : user == null ? (
        ""
      ) : (
        <div className="feedMainContainner">
          <div className="leftFeedSection"></div>
          <div className="midFeedSection">
            <form
              id="postForm"
              className="createPost"
              onSubmit={(e) => handleSubmit(e)}
            >
              <img
                className="userImage"
                src={config.avatar + user.id + "/" + user.avatar}
              ></img>
              <input
                className="caption"
                name="caption"
                ref={captionRef}
                required="true"
                placeholder="Say something.."
              ></input>
              <img
                className="imgSelector"
                src={imagePng}
                onClick={() => fileref.current.click()}
              ></img>
              <input
                ref={fileref}
                className="file"
                type="file"
                onChange={(e) => checkImage(e)}
                accept="image/*"
                name="image"
                id="imageSelector"
                required="true"
              ></input>
              {posting ? (
                <i class="fa fa-circle-o-notch fa-spin loadingCircle"></i>
              ) : (
                <button className="postButton" type="submit">
                  Post
                </button>
              )}

              <div className="previewContainner">
                <img className="imagePreview" src="" ref={previewRef}></img>
              </div>
            </form>
            <hr></hr>
            <div className="postContainner">
              <Posts posting={posting} setPosting={setPosting}></Posts>
            </div>
          </div>

          <Supporters></Supporters>
        </div>
      )}
    </>
  );
};

export default FeedContainner;
