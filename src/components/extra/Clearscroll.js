export function clearScrollHistory() {
  window.scrollTo({
    top: 0,
    behavior: "auto",
  });
}
