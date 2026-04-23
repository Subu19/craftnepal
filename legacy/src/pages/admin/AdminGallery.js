import React from "react";
import { Helmet } from "react-helmet";
import Coffee from "../../components/extra/Coffee/Coffee";
import Nav from "../../components/Nav/Nav";
import AdminGalleryComponent from "../../components/admin/AdminGalleryComponent";
const AdminGallery = () => {
  return (
    <div className="adminPage" id="adminPage">
      <Helmet>
        <title>Feed-CraftNepal</title>
        <meta property="og:title" content="Feed-CraftNepal" />
        <meta
          name="description"
          content="Post your most memorial photo from in-game and share it with your friends."
        />
      </Helmet>
      <AdminGalleryComponent></AdminGalleryComponent>
    </div>
  );
};

export default AdminGallery;
