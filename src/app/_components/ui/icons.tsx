type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  google: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  ),
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  brand: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 126 126"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <g>
        <line
          transform="rotate(90 62.5 35.3464)"
          stroke="rgb(220,212,97)"
          id="svg_1"
          y2="97.42981"
          x2="62.5"
          y1="-26.73681"
          x1="62.5"
          strokeWidth="10"
          fill="none"
        />
        <line
          transform="rotate(90 62.5 89.0833)"
          stroke="rgb(220,212,97)"
          id="svg_85"
          y2="151.16663"
          x2="62.41667"
          y1="27.00001"
          x1="62.58332"
          strokeWidth="10"
          fill="none"
        />
        <line
          transform="rotate(90 62.5 62.0833)"
          stroke="rgb(220,212,97)"
          id="svg_86"
          y2="124.16665"
          x2="62.5"
          y1="0.00003"
          x1="62.5"
          strokeWidth="10"
          fill="none"
        />
        <line
          stroke="rgb(220,212,97)"
          id="svg_74"
          y2="124.58331"
          x2="35.63158"
          y1="0.41669"
          x1="35.63158"
          strokeWidth="10"
          fill="none"
        />
        <line
          stroke="rgb(220,212,97)"
          id="svg_79"
          y2="124.58331"
          x2="88.74561"
          y1="0.41669"
          x1="89.10526"
          strokeWidth="10"
          fill="none"
        />
        <line
          stroke="rgb(220,212,97)"
          id="svg_80"
          y2="124.58331"
          x2="62.5"
          y1="0.41669"
          x1="62.5"
          strokeWidth="10"
          fill="none"
        />
        <rect
          stroke="rgb(220,212,97)"
          rx="3"
          strokeWidth="12"
          id="svg_5"
          height="76"
          width="76"
          y="24.5"
          x="24.5"
          fill="#000000"
        ></rect>
        <polygon
          fill="rgb(220,212,97)"
          points="65 42 45 66 63 66 61 82 81 58 63 58 65 42"
          id="svg_3"
        />
      </g>
    </svg>
  ),
};
