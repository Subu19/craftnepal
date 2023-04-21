import React from "react";
import Markdown from "markdown-to-jsx";
import rank from "../../assets/images/icons/rank.png";
import autorank from "../../assets/images/autorank.png";
import market from "../../assets/images/icons/market.png";

const rawText = {
  text: `Finally we have completed the implementation of the market in Minecraft Server. Use /market to teleport to market and use return place to return back to the last position. Players can buy/sell their items by making their own market stalls. Current market has about 30 plots and the first plot claim is free for everyone. Single plot is 16x16 and y level 10-80 which is good enough to make a shop. Feel free to make underground shops. If anyone really wants to increase their plot, they will have to buy a new plot from the server. Price hasn't been fixed yet. But you will be able to buy them soon. 
#Currency 
Currency is virtual **$** 
#How to earn money?
To get started, there are 2 ways to earn money. 1. Sell your diamonds to the server. We have decided to make diamonds the main currency. We couldn’t directly make physical items a currency so we had to exchange player’s diamonds with virtual money. 2. Vote for the Server using /vote everyday. Each vote provides 100$ which is worth half a diamond. Well, it isn’t much but it helps new players. *(note: You can turn your virtual money into diamonds too)* Diamond admin shop is located at market spawn. 
#How to create a shop? 
First, claim your plot if you haven’t already. Use Wooden Shovel to claim your land. After claiming a plot, place a chest on ground and left click chest with an item on hand which you want to sell. A message in chat should popup. Enter the price you want to set for that item in chat and it should automatically create a shop for you. If you don’t know the price of the item you want to sell, use /worth while holding that item on hand and you should get the default price of the item. It’s on you to decide at what price you wanna sell it. To restock items, open your shop chest and put the items inside. It will update the shop. 
#How to buy in the market?
Left click the chest shop and enter the amount you wanna buy in chat. If you have enough balance you should be able to buy it.`,
};

const Guides = () => {
  return (
    <div className="guides">
      <div className="guide">
        <div className="guideHeader">
          <img src={rank} className="guideHeaderImage"></img>
          <div className="whitetext contentTitle" id="ranks">
            Ranks
          </div>
        </div>

        <div className="guideContent">
          <p className="normaltext guideText">
            A player has to complete all the requirements of each rank to get
            them in game. When they complete the requirements, Server will
            promote them to their respective Rank In-game according to the
            fulfilled requirements. CraftNepal-BOT will change your Role in
            discord when you rank up In-game.
            <br />
            <br /> Rank list and their requirements are listed below:
          </p>

          <img src={autorank} className="guideContentImg"></img>
        </div>
      </div>

      <div className="guide">
        <div className="guideHeader">
          <img src={market} className="guideHeaderImage"></img>
          <div className="whitetext contentTitle" id="market">
            Market
          </div>
        </div>

        <div className="guideContent">
          <p className="guideText normaltext">
            <CustomMarkDown content={rawText.text}></CustomMarkDown>
          </p>
        </div>
      </div>
    </div>
  );
};

const MyBold = ({ children, ...props }) => <div {...props}>{children}</div>;

const CustomMarkDown = (props) => {
  return (
    <Markdown
      options={{
        overrides: {
          h1: {
            component: MyBold,
            props: {
              className: "normaltext guideHighlight",
            },
          },
        },
      }}
    >
      {props.content}
    </Markdown>
  );
};
export default Guides;
