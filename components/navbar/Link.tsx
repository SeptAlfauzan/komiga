import Link from "next/link";
import React from "react";

interface Props extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  href: string;
  text: string;
}

const LinkNav: React.FC<Props> = ({ href, text, ...props }) => {
  const { className, ...restProps } = props;
  return (
    <Link href={href}>
      <span
        {...restProps}
        className={`cursor-pointer relative after:contents-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-black after:duration-100 after:height-full hover:after:border-b-2 border-black ${className}`}
      >
        {text}
      </span>
    </Link>
  );
};
export default LinkNav;
