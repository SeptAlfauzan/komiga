import React, { ReactNode } from "react";
import { IoCloseCircle } from "react-icons/io5";

interface ModalProps {
  children?: ReactNode;
}

export interface ModalHandle {
  toggle: () => void;
}

const Modal: React.ForwardRefRenderFunction<ModalHandle, ModalProps> = (
  { children },
  ref
) => {
  const [active, setActive] = React.useState<boolean>(false);

  React.useImperativeHandle(ref, () => ({
    toggle() {
      setActive(!active);
    },
  }));

  const handleClickContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = (e.target as HTMLDivElement).id;
    if (id === "modal-container") setActive(false);
  };

  return (
    <div
      id="modal-container"
      className={`absolute top-0  z-10 left-0 w-screen h-full bg-black bg-opacity-25 ${
        active ? "block" : "hidden"
      }`}
      onClick={handleClickContainer}
    >
      <div className="w-2/3 md:w-1/2 h-1/2 bg-white border shadow-2xl mx-auto opacity-100 rounded py-10 px-8 mt-[25vh] z-30 overflow-clip relative">
        <header className="flex justify-between">
          <h3 className="text-xl font-bold">Title</h3>
          <button
            onClick={() => setActive(false)}
            className="text-zinc-400 text-xl absolute top-5 right-5"
          >
            <IoCloseCircle />
          </button>
        </header>
        <div className="overflow-y-auto h-full w-full relative">{children}</div>
      </div>
    </div>
  );
};

export default React.forwardRef(Modal);
