import { Plus } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

interface Props {
  setSubmitedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  submitedFile: File | undefined;
}
export const DropZone = ({ setSubmitedFile, submitedFile }: Props) => {
  const onDrop = useCallback(
    (acceptedFile: File[]) => {
      if (acceptedFile[0] && acceptedFile[0].name.match(/\.(jpg|jpeg|png)$/)) {
        setSubmitedFile(acceptedFile[0]);
      } else {
        toast.error("Niepoprawny plik");
      }
    },
    [setSubmitedFile]
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    rootRef,
  } = useDropzone({
    onDrop,
    onDropRejected: () => {
      toast.error("Może dać tylko 1 plik jpg lub png");
    },
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
    multiple: false,
  });
  useEffect(() => {
    if (submitedFile && rootRef.current) {
      rootRef.current.style.backgroundImage = `url(${URL.createObjectURL(
        submitedFile
      )})`;
    }
  }, [submitedFile, rootRef]);

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer flex-[1] flex bg-cover flex-col items-center justify-center transition-colors p-2 mt-4 mb-2 text-center m-auto w-full h-28 border-2 "bg-zinc-900" rounded-md border-dashed outline-none ${
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
