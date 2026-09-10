import Link from "next/link";

export default function NotFound() {
  return (
    <div className="marketing-resize-smooth flex min-h-full flex-1 flex-col bg-[#040404]">
      <div className="flex min-h-full flex-1 flex-col bg-brand-bg text-white">
        <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <p className="font-display text-5xl font-medium tracking-tight">404</p>
          <p className="mt-3 text-base text-white/55">
            This page could not be found.
          </p>
          <Link
            href="/"
            className="mt-8 text-sm text-white/70 transition-colors hover:text-white"
          >
            Back to home
          </Link>
        </main>
      </div>
    </div>
  );
}
