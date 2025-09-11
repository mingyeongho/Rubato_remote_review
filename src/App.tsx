import { CloudUpload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import type React from "react";
import { useRef, useState } from "react";
import { cn } from "./lib/utils";
import Preview from "./components/preview";
import { Button } from "./components/ui/button";

export type TFileWithPreview = {
  preview: string;
} & File;

function App() {
  const [file, setFile] = useState<TFileWithPreview | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const saveFile = (file: File) => {
    const preview = URL.createObjectURL(file);
    const newFile = Object.assign(file, { preview });

    setFile((prev) => {
      if (prev) {
        URL.revokeObjectURL(prev.preview);
      }

      return newFile;
    });
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (files && files.length > 0) {
      const file = files.item(0);
      if (file) {
        saveFile(file);
      }
    }
    setIsDragOver(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files.item(0);
      if (file) {
        saveFile(file);
      }
    }

    // Reset input value to allow selecting the same file again
    e.target.value = "";
  };

  const onClickExtractBtn = () => {
    if (!file) {
      fileInputRef.current?.click();
    }
  };

  return (
    <Card className={cn("w-full max-w-md")}>
      <CardHeader className="justify-center text-center">
        <CardTitle className="text-lg">
          영수증이나 결제 내역을 업로드해주세요!
        </CardTitle>
        <CardDescription>사진으로 리뷰 대상을 분석해요.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <section>
          <label
            htmlFor="file"
            className={cn(
              "flex flex-col justify-center items-center text-center border-2 border-dashed rounded-md border-muted-foreground/20 px-4 py-8 transition-colors hover:cursor-pointer hover:border-muted-foreground",
              isDragOver && "border-muted-foreground bg-muted"
            )}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <CloudUpload className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-base font-semibold mb-2">
              사진을 선택해주세요!
            </h3>
            <p className="text-sm text-muted-foreground">
              사진은 하나만 첨부할 수 있어요!
            </p>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            id="file"
            hidden
            accept="image/*"
            onChange={onChange}
          />
        </section>
        {file && <Preview file={file} setFile={setFile} />}
      </CardContent>
      <CardFooter className="justify-end">
        <Button className="hover:cursor-pointer" onClick={onClickExtractBtn}>
          추출
        </Button>
      </CardFooter>
    </Card>
  );
}

export default App;
