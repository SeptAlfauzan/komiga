import React, { useCallback } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";

interface DragAndDropFileProps {
  options?: DropzoneOptions | undefined;
  title?: string;
  register?: () => void;
}
const DragAndDropFile: React.FC<DragAndDropFileProps> = ({
  options,
  title,
}) => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone(options);
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className="border w-full h-40 bg-blue-50 rounded-lg flex items-center justify-center px-10">
          <p className="text-xl text-zinc-500">
            {title
              ? title
              : "Drag n drop some files here, or click to select files"}{" "}
          </p>
        </div>
      )}
    </div>
  );
};
export default DragAndDropFile;
