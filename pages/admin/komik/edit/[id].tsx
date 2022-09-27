import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import Modal, { ModalHandle } from "../../../../components/Modal";
import { useForm } from "react-hook-form";
import { Comic, Episode, Genre, PrismaClient } from "@prisma/client";
import axios from "axios";
import Spinner from "../../../../components/Spinner";
import { useRouter } from "next/router";
import { prisma } from "../../../../prisma/prisma";
import DragAndDropFile from "../../../../components/DragAndDropFile";
import { FileWithPath } from "file-selector";
import Link from "next/link";
import { getBase64string, getImageUrl } from "../../../../utils/base64";
import Image from "next/image";
import { uploadImageKit } from "../../../../libs/imageKitUpload";

interface ComicData extends Comic {
  episodes: Episode[];
  genre: Genre;
  url?: string;
}

interface EpisodeWithOrder extends Episode {
  order?: number;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const comic: ComicData | null = await prisma.comic.findFirst({
    where: { id: context.params!.id!.toString() },
    include: { episodes: true, genre: true },
  });

  return {
    props: {
      comic: JSON.parse(JSON.stringify(comic)),
    },
  };
};

function ComicEpisode({
  comic,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Comic>();

  const modal = React.useRef<ModalHandle | null>(null);
  const [comicData, setComicData] = React.useState<Comic>(comic);
  const [imagePreview, setImagePreview] = React.useState<string>(
    comic?.bannerImage
  );
  const [imageBase64, setImageBase64] = React.useState<string>("");
  const [data, setData] = React.useState<Episode[] | []>(comic?.episodes || []);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [uploadImg, setUploadImd] = React.useState<boolean>(false);

  const router = useRouter();
  if (!comic) router.back();

  const onFileInput = async (file: FileWithPath) => {
    const image = await getImageUrl(file);

    setUploadImd(true);
    const imageBase64String = await getBase64string(file);
    const imageData = await getImageUrl(file);
    setImagePreview(imageData);
    setImageBase64(imageBase64String);
    setValue("bannerImage", image);
    setUploadImd(false);
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      console.log(data);
      const id = router.query.id;

      const responseImage = await uploadImageKit(imageBase64, "updated_data");

      if (responseImage) data.bannerImage = responseImage;

      const updateResponse = await axios.put(`/api/comics/${id}`, data);
      console.log("updated", updateResponse.data);
      alert("update sukses");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  });

  return (
    <DashboardLayout>
      <div className="w-full h-fit flex flex-col gap-10 bg-white px-8 py-2">
        <div className="flex w-full justify-between">
          <Link href={"/admin/komik"}>
            <span className="text-blue-500 cursor-pointer">Kembali</span>
          </Link>
          <h3 className="text-xl">Edit Komik</h3>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-zinc-400 text-sm">
              Nama Komik
            </label>
            <input
              {...register("name")}
              className="border px-3 py-1 rounded focus:bg-blue-50 focus:outline-none"
              type={"text"}
              defaultValue={comicData.name}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-zinc-400 text-sm">
              Deskripsi Komik
            </label>
            <textarea
              {...register("description")}
              className="border px-3 py-1 rounded focus:bg-blue-50 focus:outline-none"
              defaultValue={comicData.description}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-zinc-400 text-sm">
              Link Evaluasi Quiziz
            </label>
            <input
              type={"text"}
              {...register("quizizLink")}
              className="border px-3 py-1 rounded focus:bg-blue-50 focus:outline-none"
              defaultValue={comicData.quizizLink}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-zinc-400 text-sm">
              Banner Komik
            </label>
            <div className="flex w-full gap-3">
              <input
                type="hidden"
                {...register("bannerImage")}
                defaultValue={
                  imagePreview ||
                  "https://images.unsplash.com/photo-1661961110218-35af7210f803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                }
              />
              <DragAndDropFile
                title={
                  uploadImg ? "Mengunggah file gambar" : "Pilih file gambar"
                }
                options={{
                  disabled: uploadImg,
                  accept: { "image/png": [".png", ".jpeg", ".gif", ".jpg"] },
                  multiple: false,
                  // maxSize: 2024,
                  onDrop: (files: FileWithPath[]) => onFileInput(files[0]),
                }}
              />
              <div className="w-1/2 rounded overflow-clip h-40 relative border">
                <Image
                  alt="image preview"
                  layout="fill"
                  objectFit="contain"
                  src={
                    imagePreview ||
                    "https://images.unsplash.com/photo-1661961110218-35af7210f803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  }
                />
                <button className="absolute z-10 bottom-0 right-0 bg-zinc-100 border px-3 rounded-tl-lg hover:bg-red-500 hover:text-white">
                  delete
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="bg-zinc-300 text-black w-fit px-4 rounded"
              type="reset"
              onClick={() => setImagePreview(comic.bannerImage)}
            >
              Reset
            </button>
            <button
              className="bg-yellow-300 text-black w-fit px-4 rounded"
              type="submit"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
      <Modal ref={modal}></Modal>
    </DashboardLayout>
  );
}

export default ComicEpisode;
