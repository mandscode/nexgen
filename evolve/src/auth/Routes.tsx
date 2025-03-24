// routes.js
import App from "../App";
import Academy from "../pages/Academy";
import AcademyDetails from "../pages/AcademyDetails";
import Index from "../pages/Index";
import Login from "../pages/Login";
import Portfolio from "../pages/Portfolio";
import Profile from "../pages/Profile";
import ProjectDetails from "../pages/ProjectDetails";
import Projects from "../pages/Projects";
import Auth from "./Auth";
import ProtectedRoute from "./ProtectedRoute";

const routes = [
  {
    path: '/auth',
    element: <Auth />,
    children: [
      { path: 'login', element: <Login /> },
    ],
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'portfolio',
        element: (
          <ProtectedRoute>
            <Portfolio />
          </ProtectedRoute>
        ),
      },
      {
        path: '/projects',
        element: (
          // <ProtectedRoute>
            <Projects />
          // </ProtectedRoute>
        ),
      },
      {
        path: '/project/:id',
        element: (
          // <ProtectedRoute>
            <ProjectDetails />
          // </ProtectedRoute>
        ),
      },
      {
        path: '/academy',
        element: (
          // <ProtectedRoute>
            <Academy />
          // </ProtectedRoute>
        ),
      },
      {
        path: '/academy/:id',
        element: (
          // <ProtectedRoute>
            <AcademyDetails />
          // </ProtectedRoute>
        ),
      },
    ],
  },
];

export default routes;