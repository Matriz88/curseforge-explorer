import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ApiKeyProvider } from '../store/ApiKeyProvider';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export const Route = createRootRoute({
  component: () => (
    <ApiKeyProvider>
      <div className="min-h-screen flex flex-col bg-gray-950">
        <Header />
        <main className="flex-1 bg-gray-950">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ApiKeyProvider>
  ),
});
