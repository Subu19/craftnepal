import { type SVGProps } from "react";

const PodiumSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={458}
    height={247}
    viewBox="0 0 458 247"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* ── 1st place (center, tallest) ───────────────────────────── */}
    <path d="M188.5 1L151 23H307L267 1H188.5Z" fill="#2A54B0" />
    <g filter="url(#shadow1st)">
      <rect x={151} y={23} width={156} height={224} fill="url(#grad1st)" />
    </g>
    {/* "1" numeral */}
    <path
      d="M240.527 116H221.99V64.718H213.998V53.063L225.32 47.069H240.527V116Z"
      fill="white"
    />

    {/* ── 2nd place (left) ──────────────────────────────────────── */}
    <rect
      width={151}
      height={157}
      transform="matrix(-1 0 0 1 151 90)"
      fill="url(#grad2nd)"
    />
    <path d="M36.298 68L0 90H151V68H36.298Z" fill="#2A54B0" />
    {/* "2" numeral */}
    <path
      d="M49.8 124.1C56.267 120.633 62.7 118.9 69.1 118.9C75.567 118.9 80.467 120.533 83.8 123.8C87.133 127.067 88.8 131.7 88.8 137.7C88.8 143.633 87.733 148.5 85.6 152.3C83.533 156.1 79.7 161.233 74.1 167.7H89V182H52.3L51.5 171.8C57.833 165.067 62.333 159.967 65 156.5C67.667 153.033 69.467 150.167 70.4 147.9C71.333 145.633 71.8 143.533 71.8 141.6C71.8 139.6 71.3 138.067 70.3 137C69.367 135.933 68.133 135.4 66.6 135.4C65.067 135.4 63.6 135.6 62.2 136C60.267 136.467 57.2 137.667 53 139.6L49.8 124.1Z"
      fill="white"
    />

    {/* ── 3rd place (right) ─────────────────────────────────────── */}
    <rect x={307} y={139} width={151} height={108} fill="url(#grad3rd)" />
    <path d="M421.702 117L458 139H307V117H421.702Z" fill="#2A54B0" />
    {/* "3" numeral */}
    <path
      d="M378.407 153.199C387.306 153.199 391.755 157.057 391.755 164.772C391.755 167.091 391.329 169.008 390.477 170.523C389.625 172.038 388.229 173.41 386.288 174.641V174.925C388.465 175.919 390.027 177.244 390.974 178.901C391.921 180.51 392.394 182.617 392.394 185.22C392.394 189.527 391.163 192.864 388.702 195.231C386.241 197.55 382.667 198.71 377.981 198.71C375.662 198.71 373.674 198.497 372.017 198.071C370.408 197.692 368.325 196.959 365.769 195.87L368.254 185.93C372.183 187.35 374.904 188.06 376.419 188.06C378.644 188.06 379.756 186.829 379.756 184.368C379.756 181.717 378.265 180.392 375.283 180.392H370.881V171.091H375.354C376.679 171.091 377.602 170.807 378.123 170.239C378.691 169.624 378.975 168.724 378.975 167.541C378.975 165.269 377.863 164.133 375.638 164.133C374.076 164.133 371.307 164.938 367.331 166.547L364.562 156.962C367.165 155.542 369.485 154.572 371.52 154.051C373.555 153.483 375.851 153.199 378.407 153.199Z"
      fill="white"
    />

    <defs>
      {/* Drop-shadow for 1st-place column */}
      <filter
        id="shadow1st"
        x={81}
        y={-47}
        width={296}
        height={364}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology radius={1} operator="dilate" in="SourceAlpha" result="effect1_dropShadow" />
        <feOffset />
        <feGaussianBlur stdDeviation={34.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>

      <linearGradient id="grad1st" x1={229} y1={23} x2={229} y2={247} gradientUnits="userSpaceOnUse">
        <stop stopColor="#80A8FE" />
        <stop offset={1} stopColor="#4470D0" />
      </linearGradient>

      <linearGradient id="grad2nd" x1={75.5} y1={0} x2={75.5} y2={157} gradientUnits="userSpaceOnUse">
        <stop stopColor="#618BE6" />
        <stop offset={1} stopColor="#2D5ABC" />
      </linearGradient>

      <linearGradient id="grad3rd" x1={382.5} y1={139} x2={382.5} y2={247} gradientUnits="userSpaceOnUse">
        <stop stopColor="#618BE6" />
        <stop offset={1} stopColor="#173E94" />
      </linearGradient>
    </defs>
  </svg>
);

export default PodiumSvg;