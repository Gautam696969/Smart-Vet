import React from 'react'

// World-class 404 Not Found component
const NotFoundPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--ebony-clay)] px-4">
    {/* SVG Illustration */}
    <svg
      width="220"
      height="180"
      viewBox="0 0 220 180"
      fill="none"
      className="mb-8"
      aria-hidden="true"
    >
      {/* <rect x="60" y="40" width="100" height="20" rx="10" fill="var(--flamingo)" opacity="0.2"/> */}
      <text
        x="110"
        y="100"
        textAnchor="middle"
        fontSize="48"
        fontWeight="bold"
        fill="var(--flamingo)"
        style={{ fontFamily: 'monospace' }}
      >
        404
      </text>
    </svg>
    {/* Headline */}
    <h1 className="text-5xl font-extrabold text-[var(--flamingo)] mb-2 tracking-tight drop-shadow-lg text-center">
      Lost in Space
    </h1>
    {/* Subtext */}
    <p className="text-lg text-[var(--silver)] mb-8 text-center max-w-xl">
      The page you’re looking for doesn’t exist or has been moved.
      <br />
      Don’t worry, let’s get you back on track!
    </p>
    {/* CTA Button */}
    <a
      href="/"
      className="px-8 py-3 rounded-full bg-[var(--flamingo)] text-[var(--silver)] font-bold text-lg shadow-lg hover:bg-[var(--silver)] hover:text-[var(--flamingo)] transition-all duration-300"
    >
      Go Home
    </a>
    <style>
      {`
        :root {
          --flamingo: #e65100;
          --ebony-clay: #111827;
          --silver: #cdc6c6;
          --raven: #727885;
          --mid-gray: #5c5c6c;
          --regent-gray: #8c949c;
          --manatee: #8c94a4;
          --trout: #4b5362;
          --shuttle-gray: #545c6c;
          --gun-powder: #444454;
        }
      `}
    </style>
  </div>
)

export default NotFoundPage
