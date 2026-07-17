import { useRef, useState } from "react";
import PlusIcon from '@/assets/photoPlus.svg?react';

export default function LogPhotoUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<string[]>([]);

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const nextPhotos = files.map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...nextPhotos]);

    e.target.value = "";
  }

  return (
    <>
      <div className="flex w-full items-center gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-[108px] h-[108px] cursor-pointer items-center justify-center rounded-lg bg-secondary-10 border border-dashed border-secondary-40 outline-none"
        >
          <PlusIcon className="size-3"/>
        </button>

        {photos.map((photo, index) => (
          <div
            key={`${photo}-${index}`}
            className="h-[108px] w-[108px] shrink-0 overflow-hidden rounded-lg"
          >
            <img
              src={photo}
              alt={`upload-${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleAddPhoto}
      />
    </>
  )
}