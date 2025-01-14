import React, { useContext, useEffect, useState } from "react";
import "./guide.css";
import { UserContext } from "../../../providers/UserProvider";
import { Link } from "react-router-dom";
import logo from "../../../assets/svg/CN.svg";
import axios from "axios";
import config from "../../../config.json";
import RawFormat from "./RawFormat";
import DropDowns from "../../extra/dropdown/DropDown";
const Guide = () => {
    const [user, loading] = useContext(UserContext);
    const [selection, setSelection] = useState(null);
    const [selected, setSelected] = useState(null);
    const [data, setData] = useState(null);
    const [newData, setNewData] = useState(null);
    useEffect(() => {
        axios
            .get(config.baseUrl + "api/guide")
            .then((res) => {
                setSelection(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        if (selected) {
            setData(null);
            axios
                .get(config.baseUrl + "api/guide/" + selected)
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [selected]);

    return (
        <>
            {loading ? (
                ""
            ) : user.isAdmin ? (
                <div className="a-Containner GuideCMS">
                    <div className="a-Selection">
                        <Link to={"/"} className="adminheader">
                            <img src={logo} className="adminLogo"></img>
                            GuideCMS
                        </Link>

                        <div className="a-selectionContainner">
                            {selection
                                ? selection.map((guide) => {
                                      return (
                                          <div className="a-selection" onClick={() => setSelected(guide.id)}>
                                              {guide.id}
                                          </div>
                                      );
                                  })
                                : ""}
                        </div>
                    </div>

                    <div className="a-Collection">
                        <div className="a-guideRaw">{data ? <RawFormat data={data} setNewData={setNewData}></RawFormat> : ""}</div>
                        <div className="a-guidePreview">
                            {newData ? (
                                <>
                                    <p className="normaltext guideText">{newData.header}</p>
                                    <DropDowns data={newData.data}></DropDowns>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                "You are not admin"
            )}
        </>
    );
};

export default Guide;
