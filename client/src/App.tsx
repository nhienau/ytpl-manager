import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MainApp from "./pages/MainApp";
import MainLayout from "./ui/MainLayout";
import GlobalStyles from "./styles/GlobalStyles";
import Redirect from "./pages/Redirect";
import GoogleSignIn from "./features/authentication/GoogleSignIn";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import AuthLayout from "./ui/AuthLayout";
import { SidebarProvider } from "./context/SidebarContext";
import { handleQueryError } from "./utils/error";
import RouteFallback from "./ui/RouteFallback";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<RouteFallback />}>
        <Route element={<AuthLayout />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/login/google" element={<GoogleSignIn />} />
        </Route>
        <Route path="/login/redirect" element={<Redirect />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/app" element={<MainApp />} />
          <Route path="/app/playlist/:playlistId" element={<MainApp />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </>
  )
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError: handleQueryError,
  }),
});

function App() {
  return (
    <SidebarProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <RouterProvider
          router={router}
          future={{
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_relativeSplatPath: true,
            v7_skipActionErrorRevalidation: true,
            v7_startTransition: true,
          }}
        />
      </QueryClientProvider>
    </SidebarProvider>
  );
}

export default App;
