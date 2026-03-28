const ScrollToTop = () => {
  return (
    <i
      id="scrollToTop"
      className="fa fa-arrow-up scrollToTop"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    ></i>
  );
};

export default ScrollToTop;
