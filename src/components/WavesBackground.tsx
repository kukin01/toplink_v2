
export default function WavesBackground() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 760"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      fill="none"
    >
      <defs>
        <linearGradient id="topFoldOne" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0D2238" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#061321" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#030912" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="topFoldTwo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1B354D" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#0D2238" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#061321" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="bottomWave" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D2238" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#061321" stopOpacity="0.05" />
        </linearGradient>

        <linearGradient id="goldEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E5AD00" stopOpacity="0" />
          <stop offset="35%" stopColor="#E5AD00" stopOpacity="0.2" />
          <stop offset="70%" stopColor="#E5AD00" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#E5AD00" stopOpacity="0.9" />
        </linearGradient>

        <filter id="goldGlow" x="-20%" y="-150%" width="150%" height="400%">
          <feGaussianBlur stdDeviation="8" />
        </filter>

        <filter id="blueGlow" x="-20%" y="-100%" width="140%" height="300%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>

      <path
        d="M-100 -80
          H760
          C650 30 570 130 430 190
          C300 245 180 250 70 330
          C-10 390 -80 420 -130 430
          Z"
        fill="url(#topFoldOne)"
      />

      <path
        d="M350 -100
          H1080
          C940 5 850 100 730 165
          C610 230 500 250 390 330
          C510 205 565 95 600 -100
          Z"
        fill="url(#topFoldTwo)"
        opacity="0.8"
      />

      <path
        d="M760 -100
          H1300
          C1160 35 1050 120 900 190
          C790 245 680 285 590 365
          C700 240 770 105 760 -100
          Z"
        fill="#061321"
        fillOpacity="0.65"
      />

      <path
        d="M-80 350 C120 260 240 260 390 190 C520 130 610 40 700 -30"
        stroke="#1B354D"
        strokeWidth="2"
        opacity="0.65"
      />

      <path
        d="M370 325 C500 215 610 210 750 145 C870 85 960 0 1040 -55"
        stroke="#1B354D"
        strokeWidth="2"
        opacity="0.5"
      />

      <path
        d="M600 365 C730 245 850 225 980 155 C1100 90 1190 10 1260 -50"
        stroke="#1B354D"
        strokeWidth="2"
        opacity="0.4"
      />

      <g transform="translate(0 90)">
        <path
          d="M-100 620
            C120 500 260 510 410 565
            C570 625 680 705 850 700
            C1050 695 1180 585 1320 520
            C1430 470 1530 450 1700 440
            V800 H-100 Z"
          fill="url(#bottomWave)"
        />

        <path
          d="M-100 620
            C120 500 260 510 410 565
            C570 625 680 705 850 700
            C1050 695 1180 585 1320 520
            C1430 470 1530 450 1700 440"
          stroke="#1B354D"
          strokeWidth="26"
          opacity="0.5"
          filter="url(#blueGlow)"
        />

        <path
          d="M-100 620
            C120 500 260 510 410 565
            C570 625 680 705 850 700"
          stroke="#1B354D"
          strokeWidth="2"
          opacity="0.9"
        />

        <path
          d="M850 700
            C1050 695 1180 585 1320 520
            C1430 470 1530 450 1700 440"
          stroke="#E5AD00"
          strokeWidth="12"
          opacity="0.55"
          filter="url(#goldGlow)"
        />


        {/* <path
          d="M850 700
            C1050 695 1180 585 1320 520
            C1430 470 1530 450 1700 440"
          pathLength="1000"
          stroke="#FFC400"
          strokeWidth="16"
          strokeLinecap="round"
          opacity="0.9"
          filter="url(#goldGlow)"
          strokeDasharray="100 900"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="1000"
            to="0"
            dur="4.5s"
            repeatCount="indefinite"
          />
        </path> */}
        
        {/* <path
          d="M850 700
            C1050 695 1180 585 1320 520
            C1430 470 1530 450 1700 440"
          pathLength="1000"
          stroke="#FFD84D"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="1"
          strokeDasharray="65 935"
        >
        <animate
          attributeName="stroke-dashoffset"
          from="1000"
          to="0"
          dur="4.5s"
          repeatCount="indefinite"
        />
        </path> */}


        <path
          d="M850 700
            C1050 695 1180 585 1320 520
            C1430 470 1530 450 1700 440"
          stroke="url(#goldEdge)"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
