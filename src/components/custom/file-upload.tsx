import {
  FileUpload as ShadcnFileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { CloudUpload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const FileUpload = ({
  value,
  onChange,
  accept,
  maxFiles,
  maxSize,
  multiple,
}: {
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  accept?: string;
  value?: Array<File>;
  onChange?: (value: Array<File>) => void;
}) => {
  return (
    <ShadcnFileUpload
      value={value}
      onValueChange={onChange}
      accept={accept}
      maxFiles={maxFiles}
      maxSize={maxSize}
      multiple={multiple}
      onFileReject={(_, message) => {
        toast.error(message);
      }}
    >
      <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
        <CloudUpload className="size-4" />
        Drag and drop or
        <FileUploadTrigger asChild>
          <Button variant="link" size="sm" className="p-0">
            choose files
          </Button>
        </FileUploadTrigger>
        to upload
        {maxFiles && <div>Max files: {maxFiles}</div>}
        {maxSize && <div>Max size/file: {maxSize}</div>}
      </FileUploadDropzone>
      <FileUploadList>
        {value?.map((file, index) => (
          <FileUploadItem key={index} value={file}>
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <FileUploadItemDelete asChild>
              <Button variant="ghost" size="icon" className="size-7">
                <X />
                <span className="sr-only">Delete</span>
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </ShadcnFileUpload>
  );
};
