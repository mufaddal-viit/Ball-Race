function AppShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg-page)] text-[var(--text-main)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[96px] sm:h-96 sm:w-96 sm:blur-[120px]" />
        <div className="absolute -bottom-8 left-0 h-48 w-48 rounded-full bg-indigo-500/20 blur-[80px] sm:h-64 sm:w-64 sm:blur-[100px]" />
        <div className="absolute right-0 top-1/3 h-56 w-56 rounded-full bg-sky-500/15 blur-[96px] sm:h-72 sm:w-72 sm:blur-[120px]" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-3 pb-10 pt-4 sm:px-5 sm:pt-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

export { AppShell };
