import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  url: string;
}

const CardThumbnail: React.FC<Props> = ({ url }) => {
  return (
    <Link href={url}>
      <div className="w-[48%] md:w-[23%] h-[200px] md:h-[300px] relative mb-10">
        <div className="border-2 border-black rounded-lg rounded-tl-3xl p-2 md:p-5 w-full h-[85%] peer hover:scale-125 duration-150 transition-all z-10 cursor-pointer">
          <div className="w-full h-full relative rounded-tl-3xl overflow-clip">
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
        <button className="border-black border-2 rounded-lg px-2 md:px-4 py-2 w-full mt-2 md:mt-5 hover:bg-black hover:text-white peer-hover:bg-black peer-hover:text-white peer-hover:scale-125 duration-150 h-fit">
          Baca Sekarang
        </button>
      </div>
    </Link>
  );
};

export default CardThumbnail;
