import React from "react";

const ProgressBar = ({ done }: { done: number }) => {
  return (
    <section
      className="h-[0.3rem] rounded-full bg-yellow"
      style={{
        opacity: 1,
        width: `${done >= 100 ? "100%" : `${done}px`}`,
      }}
    ></section>
  );
};

export default ProgressBar;
