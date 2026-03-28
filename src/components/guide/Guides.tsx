import Commands from "./commands/commands";
import Rules from "./rules/Rules";
import Market from "./market/market";
import Others from "./others/Others";
import Ranks from "./ranks/Ranks";
import FAQ from "./faq/FAQ";

const Guides = () => {
  return (
    <div className="guides">
      <Rules></Rules>
      <Commands></Commands>
      <Ranks></Ranks>
      <Market></Market>
      <Others></Others>
      <FAQ></FAQ>
    </div>
  );
};

export default Guides;
