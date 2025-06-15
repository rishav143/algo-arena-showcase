
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Save, Loader2 } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "./languageMaps";

interface EditorToolbarProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  fileName: string;
  isUnsaved: boolean;
  onSave: () => void;
  onRun: () => void;
  isRunning: boolean;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  language,
  onLanguageChange,
  fileName,
  isUnsaved,
  onSave,
  onRun,
  isRunning,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Language:</span>
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-gray-500">
          {fileName}
          {isUnsaved && (
            <span className="text-orange-600 ml-1">• (unsaved)</span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          onClick={onSave}
          disabled={!isUnsaved}
          variant="outline"
          size="sm"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button
          onClick={onRun}
          disabled={isRunning}
          className="bg-green-600 hover:bg-green-700"
          size="sm"
        >
          {isRunning ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Play className="w-4 h-4 mr-2" />
          )}
          Run
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
