import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AVAILABLE_MODELS, type AIModel } from "@/lib/constants/ai-models";
import { Badge } from "@/components/ui/badge";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const currentModel = AVAILABLE_MODELS.find((m) => m.id === selectedModel);

  return (
    <div className="space-y-2">
      <Label className="text-slate-700 font-semibold flex items-center gap-2">
        <span className="text-lg">🤖</span>
        AI Model
      </Label>
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="w-full bg-white border-slate-300 hover:border-purple-400 transition-colors">
          <SelectValue>
            {currentModel && (
              <div className="flex items-center gap-2">
                <span className="text-lg">{currentModel.icon}</span>
                <span className="font-medium">{currentModel.name}</span>
                {currentModel.recommended && (
                  <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-300">
                    Recommended
                  </Badge>
                )}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[400px]">
          {AVAILABLE_MODELS.map((model) => (
            <SelectItem key={model.id} value={model.id} className="cursor-pointer">
              <div className="flex items-start gap-3 py-2">
                <span className="text-2xl mt-0.5">{model.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-800">{model.name}</span>
                    {model.recommended && (
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-300">
                        ⭐ Recommended
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                    {model.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500">Provider:</span>
                      <span className="font-medium text-slate-700">{model.provider}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500">Speed:</span>
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                        {model.speed}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500">Cost:</span>
                      <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-300">
                        {model.cost}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {currentModel && (
        <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-3 border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Context Window:</span>
            <span className="font-medium text-slate-700">{currentModel.contextWindow} tokens</span>
          </div>
        </div>
      )}
    </div>
  );
}
