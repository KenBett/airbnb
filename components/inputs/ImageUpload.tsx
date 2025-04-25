"use client";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
  type CloudinaryUploadWidgetOptions, // ✅ Import the correct type
} from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

// If you need to declare it globally (e.g., for `cloudinary.openUploadWidget`)
declare global {
  const cloudinary: {
    openUploadWidget: (
      options: CloudinaryUploadWidgetOptions,
      callback: (error: Error | null, result: CloudinaryUploadWidgetResults) => void
    ) => void;
  };
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: CloudinaryUploadWidgetResults) => {
      if (
        result.info &&
        typeof result.info === "object" &&
        "secure_url" in result.info
      ) {
        onChange(result.info.secure_url);
      }
    },
    [onChange]
  );

  const uploadOptions: CloudinaryUploadWidgetOptions = {
    maxFiles: 1,
    multiple: false,
    resourceType: "image",
    // sources: ["local", "camera"], // Optional: Explicitly set allowed sources
  };

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="airbnb"
      options={uploadOptions}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed
              border-2
              p-20
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;