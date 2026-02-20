import { AppProviders } from "./app/providers";
import { AppShell } from "./Components/layout/app-shell";
import { GameHeader } from "./Components/layout/game-header";
import { useAuth } from "./contexts/auth-context";
import { LoginPanel } from "./features/auth/components/login-panel";
import { GameScreen } from "./features/game/game-screen";

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <AppShell>
      <GameHeader />
      {isAuthenticated ? <GameScreen /> : <LoginPanel />}
    </AppShell>
  );
}

function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}

export default App;
