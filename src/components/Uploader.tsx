"use client"
import { toast } from "@/hooks/use-toast";
import {  UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";

export default function Uploader ({onUpload , Image }: {onUpload: (file: string) => void , Image: string}) {
    return (
        <div className="w-full">
            {!Image && <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  res.forEach((image) => {
                    onUpload(image.url);
                  })
                }}
                onUploadError={(error: Error) => {
                    toast({
                        variant: "destructive",
                        title: "An error accured during the Upload of the file",
                        description: "please try agail later",
                      });
                }}
              />}

              {
                Image?.length>0 && (
                    <div className="relative w-full">
                    <img src={Image} alt="" className="w-full aspect-square" />
                    <X className="absolute top-2 right-2 h-4 w-4 cursor-pointer opacity-70 hover:opacity-100" onClick={() => onUpload("")} />
                    </div>
                )
              }
        </div>
    )
}