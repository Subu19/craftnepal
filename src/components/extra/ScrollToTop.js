import React from "react";

const ScrollToTop = () => {
  return (
    <i
      id="scrollToTop"
      class="fa fa-arrow-up scrollToTop"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    ></i>
  );
};

export default ScrollToTop;
