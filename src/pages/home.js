import React from "react";
import Nav from "../components/Nav/Nav";
import "../App.css";
import HomeComponent from "../components/home";
import Coffee from "../components/extra/Coffee/Coffee";
import Footer from "../components/extra/footer/Footer";
import { Helmet } from "react-helmet-async";

export const Home = () => {
  return (
    <div className="main" id="main">
      <Helmet>
        <title>CraftNepal-Ultimate Nepalese Minecraft Server</title>
        <meta property="og:title" content="CraftNepal" />
        <meta
          name="description"
          content="Welcome to CraftNepal, our Minecraft server that has been serving the Minecraft community for over six years with a friendly and welcoming community. With vanilla tweaking plugins, we strive to provide a fun and engaging gaming experience for all players, whether they're Minecraft veterans or new to the game. We're proud to say that over 2000 players have joined our server, and we're excited to welcome even more to explore the vast world of Minecraft, build amazing structures, and make new friends along the way. If you're looking for a well-established and enjoyable Minecraft server, look no further than CraftNepal."
        />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/1101600766533308496/1102489437268627456/CN.png"
        />
      </Helmet>
      <Coffee></Coffee>
      <Nav focused={false} selected="home"></Nav>
      <HomeComponent></HomeComponent>
      <Footer></Footer>
    </div>
  );
};
