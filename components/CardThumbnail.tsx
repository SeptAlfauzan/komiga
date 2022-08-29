import Image from "next/image";
import React from "react";

interface Props {}

const CardThumbnail: React.FC = () => {
  return (
    <div className="md:w-[23%] h-[300px]">
      <div className="border-2 border-black rounded-lg p-5 w-full h-full peer hover:scale-125 duration-150 transition-all z-10 cursor-pointer">
        <div className="w-full h-full relative">
          <Image
            src={
              "https://images.unsplash.com/photo-1620336655052-b57986f5a26a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29taWN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            }
            alt="image banner"
            layout={"fill"}
            objectFit={"cover"}
          />
        </div>
      </div>
      <button className="border-black border-2 rounded-lg px-4 py-2 w-full mt-5 hover:bg-black hover:text-white peer-hover:bg-black peer-hover:text-white peer-hover:scale-125 duration-150">
        Baca Sekarang
      </button>
    </div>
  );
};

export default CardThumbnail;
