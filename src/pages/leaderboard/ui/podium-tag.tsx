const PodiumTag = ({ ...props }) => (
  <svg
    width={212}
    height={43}
    viewBox="0 0 212 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M105.655 1C72 1 59.5 43 0 43H211.31C151 43 139.31 1 105.655 1Z"
      fill="#0A0E19"
    />
    <circle cx={105} cy={10} r={4} fill="#4F7AD9" />
    <path
      d="M0 42.5001C59.5 42.5001 72 0.5 105.5 0.5C140 0.5 150.5 42.5 211.5 42.5"
      stroke="white"
    />
  </svg>
);
export default PodiumTag;
