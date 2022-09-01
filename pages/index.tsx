import type { NextPage } from "next";
import MainLayout from "../components/layouts/MainLayout";
import Image from "next/image";
import CardThumbnail from "../components/CardThumbnail";
import NavBar from "../components/navbar";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <NavBar />
      <section className="h-screen flex w-full pt-[100px] md:pt-[170px] px-[50px] md:px-[169px]">
        <div className="w-full md:w-1/2 h-full flex flex-col gap-[30px]">
          <h3 className="text-3xl md:text-4xl font-semibold leading-relaxed">
            KOMIGA, media pembelajaran pengenalan bencana
          </h3>
          <p className="text-lg font-light">
            Belajar bisa dibuat dengan menyenangkan.
          </p>
          <button className="text-white px-8 py-2 rounded-full w-fit bg-blue-500">
            Mulai Baca
          </button>
        </div>
        <div className="w-0 md:w-1/2 h-full">
          <Banner />
        </div>
      </section>
      <section className="h-screen flex flex-col w-full  bg-yellow-300 px-[50px] md:px-[169px] py-[100px]">
        <h3 className="text-4xl mb-10">Daftar Komik</h3>
        <div className="flex w-full flex-wrap justify-between">
          {new Array(4).fill(null).map((data, i) => (
            <CardThumbnail key={i} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

const Banner: React.FC = () => {
  return (
    <div className="relative w-full h-full hidden md:block">
      <div className="h-[333px] w-[333px] rounded-full bg-blue-500 absolute top-0 left-0" />
      <div className="h-[333px] w-[333px] rounded-full bg-yellow-300 absolute bottom-10 right-10" />
      <div className="absolute translate-x-[50%] translate-y-[50%] w-[200px] h-[200px]">
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
  );
};

export default Home;
