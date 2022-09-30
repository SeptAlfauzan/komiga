import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { TableColumn } from "react-data-table-component";
import Table from "../../../feature/datatable/components/Table";
import { IoAddCircleSharp, IoCloseCircle, IoPulseSharp } from "react-icons/io5";
import Modal, { ModalHandle } from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { Genre, PrismaClient } from "@prisma/client";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import { useRouter } from "next/router";
import { useRefetch } from "../../../hooks/useRefetch";
import { prisma } from "../../../prisma/prisma";

const columns: TableColumn<Genre>[] = [
  {
    name: "Nama",
    selector: (row: Genre) => row.name,
    sortable: true,
  },
  {
    name: "Action",
    button: true,
    cell: (row: Genre) => (
      <div className="flex flex-col gap-2 py-2">
        {/* <button className="bg-violet-600 rounded-full px-4 text-white hover:scale-105 transition-all duration-150">
          edit
        </button>
        <button className="bg-pink-600 rounded-full px-4 text-white hover:scale-105 transition-all duration-150">
          delete
        </button> */}
      </div>
    ),
  },
];

export const getServerSideProps = async () => {
  const genres: Genre[] = (await prisma.genre.findMany()) || [];
  return {
    props: {
      genres,
    },
  };
};

function GenreDashboard({
  genres,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const modal = React.useRef<ModalHandle | null>(null);
  const router = useRouter();
  const [data] = useRefetch(genres, "/api/genres");

  return (
    <DashboardLayout>
      <div className="w-full h-fit flex flex-wrap gap-10">
        <Table
          title="Genre"
          data={data}
          columns={columns}
          pagination
          subHeader
          subheaderChildren={
            <button
              className="bg-black text-white px-4 flex items-center py-1 rounded justify-between md:mr-auto mr-0 w-fit"
              onClick={() => modal.current?.toggle()}
            >
              Tambah Genre <IoAddCircleSharp size={29} />
            </button>
          }
        />
      </div>
      <Modal title="Tambah Genre Komik" ref={modal}>
        <FormNewGenre
          onCancel={() => modal.current?.toggle()}
          refresh={() => router.replace(router.asPath)}
        />
      </Modal>
    </DashboardLayout>
  );
}

interface FormProps {
  onCancel?: () => void;
  refresh?: () => void;
  previousData?: Genre;
}
const FormNewGenre: React.FC<FormProps> = ({ onCancel, refresh }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Genre>();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/genres", data);
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
        <label className="text-zinc-400" htmlFor="name">
          Nama
        </label>
        <input
          {...register("name", {
            required: { message: "Perlu diisi", value: true },
          })}
          className="border rounded-xl px-5"
          placeholder="Nama genre"
        />
        {errors?.name && (
          <p className="text-red-300 text-sm">{errors.name.message}</p>
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
          {loading ? <Spinner className="text-white" /> : "Tambah"}
        </button>
      </div>
    </form>
  );
};

export default GenreDashboard;
