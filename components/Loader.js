import React from "react";

function Loader({ company }) {
  return (
    <div className="fixed flex justify-center opacity-50 items-center bg-slate-50 z-50 w-screen h-screen top-0 left-0">
      <svg
        className="loader"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="loader-circle"
          cx="24"
          cy="24"
          r="20"
          stroke={company.settings?.default_template?.main_color ?? "#FF9900"}
          strokeWidth="4"
        />
      </svg>
    </div>
  );
}

export default Loader;
