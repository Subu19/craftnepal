import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import config from "../../../config.json";
import imagePng from "../../../assets/images/icons/image.png";

const RawFormat = ({ data, setNewData }) => {
  const [dropdowns, setDropdowns] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileref = useRef();
  useEffect(() => {
    setDropdowns(data.data);
  }, [data]);

  const addMore = () => {
    setDropdowns([...dropdowns, { title: "", text: "" }]);
  };
  const deleteOne = (index) => {
    let newDropDown = [];
    dropdowns.map((dropdown, i) => {
      if (i != index) newDropDown.push(dropdown);
      if (i == dropdowns.length - 1) setDropdowns(newDropDown);
    });
  };
  const preview = () => {
    updateData().then((res) => {
      setNewData(res);
    });
  };
  const update = () => {
    updateData().then((res) => {
      setNewData(res);
      setUploading(true);
      axios
        .post(config.baseUrl + "api/guide/" + data.id, res)
        .then((res) => {
          setUploading(false);
        })
        .catch((err) => {
          setUploading(false);
          alert("Failed uploading...");
        });
    });
  };
  const updateData = () => {
    return new Promise((resolve, reject) => {
      let updatedData = { header: "", data: [] };
      let dropdownList = document.getElementsByClassName("rawDropDown");
      let header = document.getElementById("a-header").value;
      updatedData.header = header;

      for (let i = 0; i < dropdownList.length; i++) {
        const dropdown = dropdownList[i];
        let title =
          dropdown.getElementsByClassName("rawDropDownTitle")[0].value;
        let text = dropdown.getElementsByClassName("textarea")[0].value;
        updatedData.data.push({ title: title, text: text });
        if (i == dropdowns.length - 1) resolve(updatedData);
      }
    });
  };
  return (
    <div className="rawFormatContainner" id="rawFormatContainner">
      <div className="a-guideUpdate">
        <button className="btn preview" onClick={() => preview()}>
          Preview
        </button>
        {uploading ? (
          <button className="btn" onClick={() => update()}>
            loading...
          </button>
        ) : (
          <button className="btn" onClick={() => update()}>
            Update
          </button>
        )}
      </div>
      <hr></hr>
      <div className="rawFormatTitle normaltext whitetext">Header</div>
      <div className="rawFormatHeaderContainner">
        <textarea
          className="textarea"
          placeholder="This is the header of the guide. The main paragraph."
          id="a-header"
          defaultValue={data.header}
        ></textarea>
      </div>
      <hr></hr>
      <div className="rawFormatTitle normaltext whitetext">DropDowns</div>
      <div className="rawDropDownContainner">
        {dropdowns.map((dropdown, i) => {
          return (
            <div className="rawDropDown">
              <input
                className="rawDropDownTitle"
                placeholder="dropdown title"
                defaultValue={dropdown.title}
              ></input>
              <textarea
                className="textarea"
                defaultValue={dropdown.text}
              ></textarea>
              <button className="dropdowndelete" onClick={() => deleteOne(i)}>
                {" "}
                Delete
              </button>
            </div>
          );
        })}
        <center>
          <button className="addDropdown" onClick={() => addMore()}>
            +
          </button>
        </center>
      </div>
      <hr></hr>

      <div className="rawFormatTitle normaltext whitetext">Image</div>
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
      <center>
        <img
          className="imgSelector"
          src={imagePng}
          onClick={() => fileref.current.click()}
        ></img>
      </center>
    </div>
  );
};

export default RawFormat;
