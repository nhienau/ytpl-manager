import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import { handleError } from "./utils/error";
import RouteFallback from "./ui/RouteFallback";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
    errorElement: <RouteFallback />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login/google",
        element: <GoogleSignIn />,
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
    ],
    errorElement: <RouteFallback />,
  },
  {
    path: "/login/redirect",
    element: <Redirect />,
    errorElement: <RouteFallback />,
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/app",
        element: <MainApp />,
      },
    ],
    errorElement: <RouteFallback />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError: handleError,
  }),
});

function App() {
  return (
    <SidebarProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SidebarProvider>
  );
}

export default App;
