import Image from "next/image";
import React from "react";

const Spinner: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className } = props;
  return (
    <Image
      className={`animate-spin ${className}`}
      src={"/assets/images/Rolling-1s-200px.svg"}
      width={"15px"}
      height={"15px"}
      alt="loader"
    />
  );
};

export default Spinner;
