"use server";
import { db } from "@/server/db";
import { File } from "buffer";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

type GenerateReportType = {
  name: string;
  age: number;
  image: string;
};
type ResponseType = {
  edges: string | null;
  mask: string | null;
  is_medical_image: boolean;
  tumor_detected: boolean;
};

type UploadFileResponse =
  | { data: UploadData; error: null }
  | { data: null; error: UploadError };
type UploadData = {
  key: string;
  url: string;
  name: string;
  size: number;
};
type UploadError = {
  code: string;
  message: string;
};
export const GenerateReport = async (data: GenerateReportType) => {
  try {
    const request = {
      patient_name: data.name,
      patient_age: data.age,
      image_url: data.image,
    };
    console.log("request:", request);
    const response = await fetch("http://127.0.0.1:8000/detect-tumor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    if (response.status !== 200) throw new Error(response.statusText);
    const result: ResponseType = (await response.json()) as ResponseType;
    console.log("response:", result);
    if (result.mask) {
      const mask = base64ToBlob(result.mask);
      result.mask = await UploadServerBlob(mask, "mask");
    }
    if (result.edges) {
      const edges = base64ToBlob(result.edges);
      result.edges = await UploadServerBlob(edges, "edges");
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const UploadServerBlob = async (blob: Blob, name: string) => {
  const utapi = new UTApi();

  if (!blob) {
    throw new Error("No blob provided");
  }

  try {
    // Convert the blob to a File-like object with a filename
    const file = new File([blob], name, { type: blob.type });

    // Upload the file using UploadThing SDK
    const response = (await utapi.uploadFiles(file)) as UploadFileResponse;
    console.log(response);
    // Return the uploaded file details or URL
    return response?.data?.url ?? null;
  } catch (error) {
    console.error("Upload error:", error);
    // throw new Error("File upload failed");
    return 'File Not Found'
  }
};

function base64ToBlob(base64String: string, mimeType = "png"): Blob {
  const byteCharacters = atob(base64String); // Decodes the Base64 part
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimeType });
}

type ReportType = {
  userId: string;
  result: string;
  images: string[];
};

export const AddReport = async (data: ReportType) => {
  try {
    const report = await db.report.create({ data: { ...data } });
    revalidatePath("/doctor/reports");
    return report;
  } catch (error) {
    throw error;
  }
};
