import { useRef, useState } from "react";
import PlusIcon from "@/assets/photoPlus.svg?react";
import DeleteIcon from "@/assets/delete.svg?react";
import {
  createUploadFileName,
  deleteImage,
  getPresignedUrl,
  uploadFileToPresignedUrl,
} from "@/api/image";
import { showToast } from "@/pages/course/components/ShowToast";

interface ProfileImageUploaderProps {
  image: string | null;
  onChange: (image: string | null) => void;
}

export default function ProfileImageUploader({
  image,
  onChange,
}: ProfileImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isUploading) {
      e.target.value = "";
      return;
    }

    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const fileName = createUploadFileName(file);
      const presignedItem = await getPresignedUrl({
        folder: "PROFILE",
        fileName,
      });

      await uploadFileToPresignedUrl(
        presignedItem.presignedUrl,
        file,
        presignedItem.contentType,
      );

      onChange(presignedItem.imageUrl);
    } catch (e) {
      showToast({
        message:
          e instanceof Error
            ? e.message
            : "프로필 이미지 업로드에 실패했습니다.",
      });
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleDeletePhoto = async () => {
    if (isUploading) return;

    const targetImage = image;
    if (!targetImage) return;

    try {
      await deleteImage(targetImage);
      onChange(null);
    } catch (e) {
      showToast({
        message:
          e instanceof Error ? e.message : "대표 사진 삭제에 실패했습니다.",
      });
    }
  };

  return (
    <>
      <div className="flex w-full items-center gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {image === null ? (
          <button
            type="button"
            disabled={isUploading}
            onClick={() => inputRef.current?.click()}
            className="flex w-[108px] h-[108px] cursor-pointer items-center justify-center rounded-lg bg-secondary-10 border border-dashed border-secondary-40 outline-none"
          >
            <PlusIcon className="size-3" />
          </button>
        ) : (
          <div className="relative h-[108px] w-[108px] shrink-0 overflow-hidden rounded-lg">
            <img
              src={image}
              alt="profileImage"
              className="w-full h-full object-cover"
            />

            <button
              type="button"
              disabled={isUploading}
              onClick={() => void handleDeletePhoto()}
              className="absolute top-[10px] right-2"
            >
              <DeleteIcon className="size-5" />
            </button>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={handleAddImage}
      />
    </>
  );
}
