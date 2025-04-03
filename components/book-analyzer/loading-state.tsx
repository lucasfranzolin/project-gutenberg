import { useAppCtx } from "@/context";
import { Loader2 } from "lucide-react";
import { Progress } from "../ui/progress";

export function LoadingState() {
  const [state] = useAppCtx();

  if (!state.isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 animate-spin text-slate-400" />
      <div className="mt-4 space-y-2 text-center">
        <h3 className="text-xl font-medium text-slate-900">Analyzing Book</h3>
        <p className="text-sm text-slate-500">
          This may take a few minutes depending on the book length...
        </p>
        <p className="text-sm text-slate-500 mt-2">{state.loadingStep}</p>
        <Progress
          className="mt-4 w-full"
          value={state.loadingStep.includes("Analyzing") ? 50 : 25}
        />
      </div>
    </div>
  );
}
