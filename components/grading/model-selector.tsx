import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AVAILABLE_MODELS, type AIModel } from "@/lib/constants/ai-models";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const currentModel = AVAILABLE_MODELS.find((m) => m.id === selectedModel);

  return (
    <div className="space-y-2">
      <Label className="text-slate-700 font-semibold">
        AI Model
      </Label>
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="w-full bg-white border-slate-300 hover:border-purple-400 transition-colors">
          <SelectValue>
            {currentModel ? currentModel.name : 'Select a model'}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white border border-slate-300 shadow-xl z-50">
          {AVAILABLE_MODELS.map((model) => (
            <SelectItem 
              key={model.id} 
              value={model.id} 
              className="cursor-pointer hover:bg-slate-100 focus:bg-slate-100 py-2"
            >
              {model.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
