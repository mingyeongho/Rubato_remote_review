import type { TFileWithPreview } from "@/App";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CircleX } from "lucide-react";
import type React from "react";

interface IPreview {
  file: TFileWithPreview;
  setFile: React.Dispatch<React.SetStateAction<TFileWithPreview | null>>;
}

const Preview = ({ file, setFile }: IPreview) => {
  const { name, preview, size, type } = file;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const onRemoveFile = () => {
    setFile((prev) => {
      if (prev) {
        URL.revokeObjectURL(prev.preview);
      }
      return null;
    });
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          {preview && (
            <img
              src={preview || "/placeholder.svg"}
              alt={name}
              className="w-16 h-16 object-cover rounded-lg"
            />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {formatFileSize(size)} • {type}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hover:cursor-pointer"
          onClick={onRemoveFile}
        >
          <CircleX />
        </Button>
      </div>
    </Card>
  );
};

export default Preview;
