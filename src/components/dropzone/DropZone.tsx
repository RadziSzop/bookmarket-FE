import { Plus } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

interface Props {
  setSubmitedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}
export const DropZone = ({ setSubmitedFile }: Props) => {
  const onDrop = useCallback(
    (acceptedFile: File[]) => {
      setSubmitedFile(acceptedFile[0]);
    },
    [setSubmitedFile]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    onDropRejected: () => {
      toast.error("Może dać tylko 1 plik jpg lub png");
    },
    accept: {
      "image/jpeg": [".jpeg", "jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps({ isDragAccept, isDragReject })}
      className={`cursor-pointer flex-[1] flex flex-col items-center justify-center transition-colors p-2 mt-4 mb-2 text-center m-auto w-full h-28 border-2 "bg-zinc-900" rounded-md border-dashed outline-none ${
        isDragReject
          ? "border-red-700"
          : isDragAccept
          ? "border-blue-700"
          : "border-zinc-500"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive && isDragAccept && <p>Przeciągnij plik tutaj...</p>}
      {isDragActive && isDragReject && <p>Tylko 1 plik jpg i png...</p>}
      {!isDragActive && <Plus />}
    </div>
  );
};
