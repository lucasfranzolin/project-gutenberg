import { BookAnalyzer } from "@/components/book-analyzer";

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-12 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
          Project Gutenberg Book Analyzer
        </h1>
        <p className="text-slate-600 mb-8">
          Enter a Project Gutenberg book ID to analyze characters and their
          interactions.
        </p>
        <BookAnalyzer />
      </div>
    </main>
  );
}
