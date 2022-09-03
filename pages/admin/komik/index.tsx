import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { TableColumn } from "react-data-table-component";
import { DataRow } from "../../../constants/interface";
import Table from "../../../feature/datatable/components/Table";
import { IoAddCircleSharp, IoCloseCircle, IoPulseSharp } from "react-icons/io5";
import Modal, { ModalHandle } from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { Comic, Genre, PrismaClient } from "@prisma/client";
import { useFilter } from "../../../feature/datatable/hooks/useFilter";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import { useRouter } from "next/router";
import Link from "next/link";

const prisma = new PrismaClient();

const columns: TableColumn<Comic>[] = [
  {
    name: "Nama",
    selector: (row: Comic) => row.name,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row: Comic) => row.description,
  },
  {
    name: "Genre",
    selector: (row: Comic) => row.genreId,
    sortable: true,
  },
  {
    name: "Action",
    button: true,
    cell: (row: Comic) => (
      <div className="flex flex-col gap-2 py-2">
        <button className="bg-violet-600 rounded-full px-4 text-white hover:scale-105 transition-all duration-150">
          <Link href={`/admin/komik/${row.id}`}>edit</Link>
        </button>
        <button className="bg-pink-600 rounded-full px-4 text-white hover:scale-105 transition-all duration-150">
          delete
        </button>
      </div>
    ),
  },
];

export const getServerSideProps = async () => {
  const rawData: DataRow[] = [
    {
      key: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      key: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      key: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];
  const comics: Comic[] = (await prisma.comic.findMany()) || [];
  const genres: Genre[] = (await prisma.genre.findMany()) || [];
  return {
    props: {
      genres,
      comics,
    },
  };
};

function Comic({
  genres,
  comics,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const modal = React.useRef<ModalHandle | null>(null);
  const [data, setData] = React.useState<Comic[]>(comics);
  const router = useRouter();

  React.useEffect(() => {
    const refecth = async () => {
      try {
        setData(await (await axios.get("/api/comics")).data);
      } catch (error) {
        alert(error);
      }
    };
    refecth();
  }, [comics]);

  return (
    <DashboardLayout>
      <div className="w-full h-fit flex flex-wrap gap-10">
        <Table
          title="Komik"
          data={data}
          columns={columns}
          pagination
          subHeader
          subheaderChildren={
            <button
              className="bg-black text-white px-4 flex items-center py-1 rounded justify-between md:mr-auto mr-0 w-fit"
              onClick={() => modal.current?.toggle()}
            >
              Tambah komik <IoAddCircleSharp size={29} />
            </button>
          }
        />
      </div>
      <Modal ref={modal}>
        <FormNewComic
          genre={genres}
          onCancel={() => modal.current?.toggle()}
          refresh={() => router.replace(router.asPath)}
        />
      </Modal>
    </DashboardLayout>
  );
}

interface FormProps {
  onCancel?: () => void;
  genre?: Genre[];
  refresh?: () => void;
}
const FormNewComic: React.FC<FormProps> = ({ onCancel, genre, refresh }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Comic>();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/comics", data);
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
    <form onSubmit={onSubmit} className="flex flex-col h-full">
      <div className="mt-4 flex flex-col">
        <label className="text-zinc-400" htmlFor="name">
          Nama
        </label>
        <input
          {...register("name", {
            required: { message: "Perlu diisi", value: true },
          })}
          className="border rounded-xl px-5"
          placeholder="Nama komik"
        />
        {errors?.name && (
          <p className="text-red-300 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <label className="text-zinc-400" htmlFor="description">
          Deskripsi komik
        </label>
        <textarea
          {...register("description", {
            required: { message: "Perlu diisi", value: true },
          })}
          className="border rounded-xl px-5"
          placeholder="Deskripsi komik"
        />
        {errors?.description && (
          <p className="text-red-300 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <label className="text-zinc-400" htmlFor="description">
          Genre komik
        </label>
        <select {...register("genreId")} className="border py-1 px-5">
          {genre?.map((item, key: number) => (
            <option className="text-black" key={key} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors?.genreId && (
          <p className="text-red-300 text-sm">{errors.genreId.message}</p>
        )}
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
          {loading ? <Spinner className="text-white" /> : "Upload"}
        </button>
      </div>
    </form>
  );
};

export default Comic;
