import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings2, ChevronDown, ChevronUp, Sparkles, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AISettings } from "@/lib/types/grading.types";

interface AISettingsCardProps {
  showSettings: boolean;
  onToggleSettings: () => void;
  aiSettings: AISettings;
  onSettingsChange: (settings: AISettings) => void;
  isGeneratingFeedback: boolean;
  onGenerateFeedback: () => void;
}

export function AISettingsCard({
  showSettings,
  onToggleSettings,
  aiSettings,
  onSettingsChange,
  isGeneratingFeedback,
  onGenerateFeedback,
}: AISettingsCardProps) {
  const updateSettings = (key: keyof AISettings, value: any) => {
    onSettingsChange({ ...aiSettings, [key]: value });
  };

  const updateFocusArea = (area: keyof AISettings["focusAreas"], value: boolean) => {
    onSettingsChange({
      ...aiSettings,
      focusAreas: { ...aiSettings.focusAreas, [area]: value },
    });
  };

  return (
    <Card className="border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
      <CardHeader className="cursor-pointer" onClick={onToggleSettings}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings2 className="h-5 w-5 text-purple-600" />
            AI Feedback Settings
          </CardTitle>
          {showSettings ? (
            <ChevronUp className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400" />
          )}
        </div>
      </CardHeader>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent className="space-y-4 text-sm">
              {/* Feedback Length */}
              <div>
                <Label className="text-slate-700 font-semibold mb-2 block">Feedback Length</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(["short", "medium", "detailed"] as const).map((length) => (
                    <button
                      key={length}
                      onClick={() => updateSettings("feedbackLength", length)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        aiSettings.feedbackLength === length
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {length.charAt(0).toUpperCase() + length.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Style */}
              <div>
                <Label className="text-slate-700 font-semibold mb-2 block">Feedback Style</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(["professional", "conversational", "technical"] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => updateSettings("feedbackStyle", style)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        aiSettings.feedbackStyle === style
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Output Format */}
              <div>
                <Label className="text-slate-700 font-semibold mb-2 block">Output Format</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(["paragraphs", "bullets", "mixed"] as const).map((format) => (
                    <button
                      key={format}
                      onClick={() => updateSettings("outputFormat", format)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        aiSettings.outputFormat === format
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {format.charAt(0).toUpperCase() + format.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Focus Areas */}
              <div>
                <Label className="text-slate-700 font-semibold mb-2 block">Focus Areas</Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(aiSettings.focusAreas).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          updateFocusArea(
                            key as keyof AISettings["focusAreas"],
                            e.target.checked
                          )
                        }
                        className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-xs text-slate-700">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-2 border-t border-slate-200/50 pt-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aiSettings.includeExamples}
                    onChange={(e) => updateSettings("includeExamples", e.target.checked)}
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-xs text-slate-700">Include code examples</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aiSettings.highlightIssues}
                    onChange={(e) => updateSettings("highlightIssues", e.target.checked)}
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-xs text-slate-700">Highlight specific issues</span>
                </label>
              </div>

              {/* Generate Button */}
              <div className="pt-2">
                <Button
                  onClick={onGenerateFeedback}
                  disabled={isGeneratingFeedback}
                  className="w-full border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                  variant="outline"
                >
                  {isGeneratingFeedback ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate AI Feedback
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
