import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { useState } from "react";

interface FileUploadProps {
  onChange: (fileUrl: string, file: File) => void; // Return both fileUrl and file
  currentImage?: string;
}

export default function FileUpload({
  onChange,
  currentImage,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImage || ""
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      onChange(url, selectedFile); // Pass both fileUrl and file
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
          <File className="h-12 w-12 text-gray-400" />
          <span className="text-sm font-medium text-gray-500">
            Drag and drop a file or click to browse
          </span>
          <span className="text-xs text-gray-500">
            PDF, image, video, or audio
          </span>
          {previewUrl && (
            <div className="mt-4">
              <img
                src={previewUrl}
                alt="preview"
                className="h-32 w-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        <div className="space-y-2 text-sm">
          <Label htmlFor="file" className="text-sm font-medium">
            File
          </Label>
          <Input
            id="file"
            type="file"
            placeholder="File"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button size="lg" disabled={!file}>
          Upload
        </Button>
      </CardFooter>
    </Card>
  );
}
