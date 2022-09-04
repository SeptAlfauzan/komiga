import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React, { FormEvent } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import Modal, { ModalHandle } from "../../../components/Modal";
import { Panel, PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import DragAndDropFile from "../../../components/DragAndDropFile";
import { FileWithPath } from "file-selector";
import axios from "axios";
import ImageKit from "imagekit";
import { prisma } from "../../../prisma/prisma";
import Image from "next/image";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (Array.isArray(context.query.slug) && context.query.slug.length > 2) {
    return {
      notFound: true,
    };
  }
  const panels: Panel[] = await prisma.panel.findMany();
  return {
    props: {
      panels,
    },
  };
};

function PanelComicEpisode({
  panels,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [files, setFiles] = React.useState<
    { episodeId: string; image: File }[]
  >([]);
  const [imgbase64, setImgbase64] = React.useState<string>();
  const [data, setData] = React.useState<Panel[]>(panels);
  const modal = React.useRef<ModalHandle | null>(null);

  const getImageFile = async (file: FileWithPath): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();

        reader.readAsArrayBuffer(file);

        reader.onload = () => {
          if (!!reader.result) {
            resolve(reader.result as string);
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  };

  const getBase64string = async (file: FileWithPath): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Use a regex to remove data url
        try {
          const base64String = reader.result
            ?.toString()
            .replace("data:", "")
            .replace(/^.+,/, "");

          return resolve(base64String!);
        } catch (error) {
          return reject(error);
        }
        // Logs wL2dvYWwgbW9yZ...
      };
      reader.readAsDataURL(file);
    });
  };

  const onFileInput = async (file: File[]) => {
    const episodeId = router.query.slug![1];
    const image = await getBase64string(file[0]);
    const responsetoken = await axios.get("/api/imagekitAuth");
    const { signature, expire, token } = responsetoken.data;
    try {
      const body = {
        file: image,
        publicKey: process.env.NEXT_PUBLIC_publicKey,
        fileName: "lorem ipsum",
        signature,
        expire,
        token,
      };
      const response = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        body,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const { url } = response.data;
      const newPanel = await axios.post("/api/panels", {
        imageURL: url,
        episodeId: episodeId,
      });
      console.log(newPanel.data);
    } catch (error) {}
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (files.length == 0) return alert("No file inputed");
    // const newData: Panel[] = files;
    try {
      const panels = await axios.post("/api/panels", files);
      console.log(panels);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen flex flex-wrap gap-10">
        {/* <button
          className="bg-black px-5 mt-5 py-1 rounded-lg text-white h-fit"
          onClick={() => modal.current?.toggle()}
        >
          Tambah file
        </button> */}
        <DragAndDropFile
          options={{
            accept: { "image/png": [".png", ".jpeg", ".gif", ".jpg"] },
            multiple: false,
            // maxSize: 2024,
            onDrop: (files) => onFileInput(files),
          }}
        />

        <div className="flex flex-wrap w-full">
          <h3 className="w-full text-xl font-bold">Daftar panel gambar</h3>
          {data.map((d, i) => (
            <div key={i}>
              <div
                className="w-40 h-40 relative border rounded"
                onClick={() => alert()}
              >
                <Image
                  src={d.imageURL}
                  layout="fill"
                  objectFit="cover"
                  alt="_"
                />
              </div>
              <small>{d.episodeId}</small>
            </div>
          ))}
        </div>
      </div>
      <Modal title="Upload file komik" ref={modal}>
        <form onSubmit={onSubmit} className="w-full flex flex-col">
          {/* <input
            type="file"
            name=""
            id=""
            onChange={(e) => console.log(e.target.files[0])}
          /> */}
          <DragAndDropFile
            options={{
              accept: { "image/png": [".png", ".jpeg", ".gif", ".jpg"] },
              multiple: false,
              // maxSize: 2024,
              onDrop: (files) => onFileInput(files),
            }}
          />
          <div className="ml-auto">
            <button
              type="reset"
              className="bg-zinc-300 px-4 py-1 mt-3 rounded-lg ml-auto"
              onClick={() => modal.current?.toggle()}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-1 mt-3 rounded-lg ml-2"
            >
              Upload
            </button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

export default PanelComicEpisode;
