import { useAppCtx } from "@/context";

export function ErrorState() {
  const [state] = useAppCtx();

  if (!state.error) return null;

  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
      {state.error}
    </div>
  );
}
