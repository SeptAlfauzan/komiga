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
import { getBase64string } from "../../../utils/base64";
import { useRefetch } from "../../../hooks/useRefetch";
import { ReactSortable } from "react-sortablejs";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (Array.isArray(context.query.slug) && context.query.slug.length > 2) {
    return {
      notFound: true,
    };
  }
  const [comicId, episodeId] = Array.from(context.query.slug!);
  const panels: Panel[] = await prisma.panel.findMany({
    where: { episode: { id: episodeId, comicId } },
  });
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
  const [comicId, episodeId] = Array.from(router.query.slug!);
  console.log(comicId, episodeId);
  const [data] = useRefetch(
    panels,
    `/api/panels/${comicId}?episodeId=${episodeId}`
  );
  // const [data, setData] = React.useState<Panel[]>(panels);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const modal = React.useRef<ModalHandle | null>(null);

  const onFileInput = async (file: File[]) => {
    const episodeId = router.query.slug![1];
    const image = await getBase64string(file[0]);
    const responsetoken = await axios.get("/api/imagekitAuth");
    const { signature, expire, token } = responsetoken.data;
    setIsFetching(true);
    try {
      const body = {
        file: image,
        publicKey: process.env.NEXT_PUBLIC_publicKey,
        fileName: "lorem ipsum",
        signature,
        expire,
        token,
      };
      console.log("test", body);
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
      setIsFetching(false);
      router.replace(router.asPath); //reload new data by replace current router
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const sortedData = data.map((data: Panel, i, number) => {
      // data.order = i;
      return data;
    });
    const sortedId = data.map((data: Panel, i, number) => ({ id: data.id }));

    const updateBody = { data: sortedData, where: sortedId };
    const testUpdate = async () => {
      console.log(
        "test",
        await (
          await axios.put("/api/panels", updateBody)
        ).data
      );
    };
    console.log(sortedData);
  }, [data]);

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

  const deletePanel = async (id: string) => {
    try {
      const response = await axios.delete(`/api/panels?id=${id}`);
      router.replace(router.asPath);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full">
          <h3 className="text-2xl mb-3 font-bold">Upload berkas</h3>
          {isFetching ? (
            "Uploading new file into server"
          ) : (
            <DragAndDropFile
              options={{
                accept: { "image/png": [".png", ".jpeg", ".gif", ".jpg"] },
                multiple: false,
                // maxSize: 2024,
                onDrop: (files) => onFileInput(files),
              }}
            />
          )}
        </div>
        <button onClick={() => modal.current?.toggle()}>Preview</button>
        <div className="flex flex-wrap w-full mt-0 gap-3">
          <h3 className="w-full text-xl font-bold">Daftar panel gambar</h3>
          {/* <ReactSortable
            list={data}
            setList={setData}
            className="flex flex-wrap"
          > */}
          <div className="flex flex-wrap">
            {data.map((d: Panel, i) => (
              <div
                key={i}
                className="w-40 h-40 relative border rounded mb-10"
                onClick={() => {
                  const answer = confirm("Klik yes untuk menghapus");
                  if (answer) deletePanel(d.id);
                }}
              >
                <Image
                  src={d.imageURL}
                  layout="fill"
                  objectFit="cover"
                  alt="_"
                />
                <small className="absolute -bottom-10 text-zinc-400">
                  {d.id}
                </small>
              </div>
            ))}
          </div>
          {/* </ReactSortable> */}
        </div>
      </div>
      <Modal title="Preview Episode komik" ref={modal}>
        <div className="flex flex-col pb-10">
          {data.map((d, i) => (
            <div
              key={i}
              // style={{ width: "100%", height: "100%", position: "relative" }}
              className="w-[100%] h-[50vh] relative"
            >
              <Image
                src={d.imageURL}
                layout="fill"
                // objectFit="contain"
                alt="_"
              />
            </div>
          ))}
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default PanelComicEpisode;
