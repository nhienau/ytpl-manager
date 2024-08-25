import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
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
  },
  {
    path: "/login/redirect",
    element: <Redirect />,
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
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
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
