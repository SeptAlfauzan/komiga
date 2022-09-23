import React, { ReactNode } from "react";
import HTMLFlipBook from "react-pageflip";

interface Props {
  children: ReactNode;
  isFirstEp: boolean;
  isLastEp: boolean;
  imagesUrl: string[];
}
const FlipBookWrapper: React.FC<Props> = ({ imagesUrl, children }) => {
  const bookRef = React.useRef(null);
  return (
    <HTMLFlipBook
      ref={bookRef}
      width={300}
      height={500}
      className={
        "relative cursor-pointer overflow-x-hidden overflow-y-hidden rounded-lg overflow-clip"
      }
      style={{}}
      startPage={0}
      size={"fixed"}
      minWidth={0}
      maxWidth={0}
      minHeight={0}
      maxHeight={0}
      drawShadow={true}
      flippingTime={1000}
      usePortrait={true}
      startZIndex={0}
      autoSize={true}
      maxShadowOpacity={1}
      showCover={false}
      mobileScrollSupport={true}
      clickEventForward={true}
      useMouseEvents={true}
      swipeDistance={10}
      showPageCorners={true}
      disableFlipByClick={false}
    >
      {imagesUrl.map((url, i) => (
        <div key={i} className=" border bg-slate-300 relative overflow-clip">
          <img
            src={url}
            // height="100%"
            // width="100%"
            // layout="fill"
            // objectFit="contain"
            alt="_"
          />
        </div>
      ))}
      <div className="demoPage border bg-white">{children}</div>
    </HTMLFlipBook>
  );
};

export default FlipBookWrapper;
