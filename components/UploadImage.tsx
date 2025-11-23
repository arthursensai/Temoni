"use client";

import { UploadButton } from "@/src/utils/uploadthing";

const UploadImage = () => {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        //here I may procceed with other stuff after a successfull upload
      }}
      onUploadError={(error: Error) => {
        //here I may procceed with other stuff after an error
      }}
    />
  );
};

export default UploadImage;
