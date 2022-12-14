import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
  NextPageContext,
} from "next";
import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { TableColumn } from "react-data-table-component";
import Table from "../../../feature/datatable/components/Table";
import { IoAddCircleSharp, IoCloseCircle, IoPulseSharp } from "react-icons/io5";
import Modal, { ModalHandle } from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { Comic, Episode, Genre, PrismaClient } from "@prisma/client";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import { useRouter } from "next/router";
import Link from "next/link";
import { prisma } from "../../../prisma/prisma";

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
  // const comic: ComicData | null = await prisma.comic.findFirst({
  //   where: { id: context.params!.id!.toString() },
  //   include: { episodes: true, genre: true },
  // });
  const comic: Episode[] | null = await prisma.episode.findMany({
    where: {
      comicId: context.params!.id!.toString(),
      NOT: { created: "1000-10-10T00:00:00.000Z" },
    },
    include: { comic: true },
    orderBy: {
      created: "asc",
    },
  });
  const comicName = await prisma.comic.findFirst({
    where: { id: context.params!.id!.toString() },
    select: { name: true },
  });

  return {
    props: {
      comic: JSON.parse(JSON.stringify(comic)),
      comicName: comicName?.name,
    },
  };
};

function ComicEpisode({
  comic,
  comicName,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const modal = React.useRef<ModalHandle | null>(null);
  const [data, setData] = React.useState<Episode[] | []>(comic || []);
  const router = useRouter();
  if (!comic) router.back();
  console.log(comic);
  React.useEffect(() => {
    const refecth = async () => {
      try {
        const response: Episode[] = await (
          await axios.get(`/api/comics/${router.query.id}`)
        ).data;
        const dataWithNumber = response.map(
          (episode: EpisodeWithOrder, i: number) => {
            episode.order = i + 1;
            return episode;
          }
        );
        setData(dataWithNumber);
      } catch (error) {
        alert(`refetch ${error}`);
      }
    };
    refecth();
  }, [comic, router.query.id]);
  return (
    <DashboardLayout>
      <div className="w-full h-fit flex flex-wrap gap-10">
        <Table
          title={comicName || "Episode"}
          data={data}
          columns={columns}
          pagination
          subHeader
          subheaderChildren={
            <button
              className="bg-black text-white px-4 flex items-center py-1 rounded justify-between md:mr-auto mr-0 w-fit"
              onClick={() => modal.current?.toggle()}
            >
              Tambah Episode <IoAddCircleSharp size={29} />
            </button>
          }
        />
      </div>
      <Modal title="Tambah Episode Komik" ref={modal}>
        <FormNewComic
          comic={comic}
          comicId={router.query.id?.toString()}
          comicName={comicName}
          onCancel={() => modal.current?.toggle()}
          refresh={() => router.replace(router.asPath)}
        />
      </Modal>
    </DashboardLayout>
  );
}

interface FormProps {
  onCancel?: () => void;
  comic?: Episode[] | [];
  comicId?: string;
  comicName?: string;
  refresh?: () => void;
}
const FormNewComic: React.FC<FormProps> = ({
  onCancel,
  comic,
  refresh,
  comicId,
  comicName,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  console.log(comicId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Episode>();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/comics/${comicId}`, data);
      if (response.status == 200 && onCancel) {
        onCancel();
        refresh && refresh(); //reload page to update ui
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col h-full pb-10">
      <div className="mt-4 flex flex-col">
        <label className="text-zinc-400 mb-2" htmlFor="name">
          Nama Komik: {comicName}
        </label>
        <label className="text-zinc-400" htmlFor="name">
          Id Komik: {comicId}
        </label>
        <input
          {...register("comicId", {
            required: { message: "Perlu diisi", value: true },
          })}
          className="border rounded-xl px-5"
          hidden
          value={comicId}
        />
      </div>
      <div className="flex gap-3 mt-auto ml-auto">
        <button
          className="bg-zinc-400 px-5 mt-5 py-1 rounded-lg text-white"
          type="reset"
          onClick={onCancel}
        >
          Batal
        </button>
        <button
          className="bg-black px-5 mt-5 py-1 rounded-lg text-white"
          type="submit"
        >
          {loading ? (
            <Spinner className="text-white" />
          ) : (
            `Tambah episode ke-${comic!.length + 1}`
          )}
        </button>
      </div>
    </form>
  );
};

export default ComicEpisode;

const columns: TableColumn<EpisodeWithOrder>[] = [
  {
    name: "Episode",
    selector: (row: EpisodeWithOrder) => row.order || 0,
    sortable: true,
  },
  {
    name: "Created",
    selector: (row: Episode) => row.created.toString(),
    sortable: true,
  },
  {
    name: "Action",
    button: true,
    cell: (row: Episode) => {
      const alertDelete = async (arg: string) => {
        const answer = confirm("Delete this episode?");
        if (!answer) return;
        console.log(arg);
        await axios.delete(`/api/episodes/${arg}`);
        window.location.reload();
      };
      return (
        <div className="flex flex-col gap-2 py-2">
          <button className="bg-yellow-300 rounded-full px-4 text-black hover:scale-105 transition-all duration-150 py-0.5">
            <Link href={`/admin/komik/${row.comicId}/${row.id}`}>
              see image panels
            </Link>
          </button>
          <button
            className="bg-pink-600 rounded-full px-4 text-white hover:scale-105 transition-all duration-150 py-0.5"
            onClick={() => alertDelete(row.id)}
          >
            delete
          </button>
        </div>
      );
    },
  },
];
