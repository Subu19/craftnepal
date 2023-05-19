import React, { useContext, useRef, useState } from "react";
import "./admin.css";
import logo from "../../assets/svg/CN.svg";
import { useGetGallery } from "../../hooks/useGetGallery";
import { UserContext } from "../../providers/UserProvider";
import CreeperLoading from "../extra/CreeperLoading";
import config from "../../config.json";
import { PhotoProvider, PhotoView } from "react-photo-view";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminGalleryComponent = () => {
  const [posting, setPosting] = useState(false);
  const { gloading, gallery } = useGetGallery(posting);
  const [user, loading] = useContext(UserContext);
  const [showGallery, setShowGallery] = useState(null);
  const addPhotoref = useRef(null);
  const submitButton = useRef(null);

  const deleteImage = (season, image) => {
    setPosting(true);
    axios
      .post(
        config.baseUrl + config.api + "delete/gallery/" + season + "/" + image
      )
      .then((res) => {
        setPosting(false);
      })
      .catch(() => setPosting(false));
  };
  const handleSubmit = (e) => {
    setPosting(true);
    e.preventDefault();
    const fd = new FormData(document.getElementById("galleryForm"));
    axios
      .post(
        config.baseUrl +
          config.api +
          "add/gallery/" +
          gallery[showGallery].title,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setPosting(false);
      })
      .catch((err) => {
        alert("Posting failed.. Please try again!");
        setPosting(false);
      });
  };
  return (
    <>
      {loading ? (
        ""
      ) : user.isAdmin ? (
        <div className="a-galleryContainner">
          <div className="a-gallerySelection">
            <Link to={"/"} className="adminheader">
              <img src={logo} className="adminLogo"></img>
              Admin-Gallery
            </Link>

            <div className="a-selectionContainner">
              {gloading || gallery == null ? (
                <CreeperLoading></CreeperLoading>
              ) : gallery.length > 0 ? (
                gallery.map((season, i) => {
                  return (
                    <div
                      className={
                        showGallery == i ? "gselected season" : "season"
                      }
                      onClick={() => setShowGallery(i)}
                    >
                      {season.title}
                    </div>
                  );
                })
              ) : (
                "Error"
              )}
            </div>
          </div>

          <div className="a-galleryCollection">
            {showGallery != null && gallery != null ? (
              gallery[showGallery].photos.map((photo) => {
                return (
                  <div className="gPhotoBox">
                    <PhotoProvider>
                      <PhotoView
                        src={
                          config.baseUrl +
                          "Gallery/" +
                          gallery[showGallery].title +
                          "/" +
                          photo
                        }
                      >
                        <img
                          className="seasonPhoto"
                          src={
                            config.baseUrl +
                            "Gallery/" +
                            gallery[showGallery].title +
                            "/" +
                            photo
                          }
                        ></img>
                      </PhotoView>
                    </PhotoProvider>
                    <i
                      class="material-icons deleteIcon"
                      onClick={() =>
                        deleteImage(gallery[showGallery].title, photo)
                      }
                    >
                      delete_forever
                    </i>
                  </div>
                );
              })
            ) : (
              <div className="contentTitle whitetext centertext">
                Welcome to Gallery management
              </div>
            )}
            {showGallery != null ? (
              <div className="gPhotoBox">
                {posting ? (
                  <CreeperLoading></CreeperLoading>
                ) : (
                  <div
                    className="fakephoto"
                    onClick={() => addPhotoref.current.click()}
                  >
                    <i class="material-icons addPhotoIcon">add_a_photo</i>
                    <form
                      id="galleryForm"
                      onSubmit={(e) => handleSubmit(e)}
                      onChange={() => submitButton.current.click()}
                    >
                      <input
                        type="file"
                        name="photos"
                        className="addGallery"
                        ref={addPhotoref}
                        multiple
                      ></input>
                      <button
                        ref={submitButton}
                        type="submit"
                        style={{ display: "none" }}
                      ></button>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        "You are not admin"
      )}
    </>
  );
};

export default AdminGalleryComponent;
