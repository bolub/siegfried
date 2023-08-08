import { nanoid } from "nanoid";

export const MAX_FILE_SIZE_BYTES = 10485760; // 10mb
export const MAX_FILE_SIZE_ERROR = `Please upload a file that is smaller than ${
  MAX_FILE_SIZE_BYTES / (1024 * 1024)
} MB`;

export const fileFormats = {
  jpeg: "image/jpeg",
  png: "image/png",
  pdf: "application/pdf",
  msword: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export const getBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
};

export const decodeBase64 = (file: string) => {
  const contentType = file.match(/data:(.*);base64/)?.[1];
  const base64FileData = file.split("base64,")?.[1];

  const fileName = nanoid();
  const ext = contentType?.split("/")[1];
  const path = `${fileName}.${ext}`;

  return {
    contentType,
    base64FileData,
    path,
  };
};
