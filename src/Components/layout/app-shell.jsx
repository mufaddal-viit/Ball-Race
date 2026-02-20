function AppShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg-page)] text-[var(--text-main)] ">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo-500/20 blur-[100px]" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-sky-500/15 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo-500/20 blur-[100px]" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-sky-500/15 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-100/50 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo-500/20 blur-[100px]" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-sky-500/15 blur-[120px]" />
      </div>

      <main className="relative z-10 mx-auto w-full px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

export { AppShell };
