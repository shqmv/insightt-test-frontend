import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

import { useAuth } from '../context/AuthContext';

/**
 * PublicRoute component that restricts access to unauthenticated users only.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - The component(s) to render if the user is not authenticated.
 * @returns {JSX.Element} Redirects to the home page if the user is authenticated, otherwise renders the children.
 *
 * @description
 * Uses the `useAuth` hook to check if the user is already authenticated.
 * If the user is authenticated, it redirects them to `/home` to prevent access to public routes like login or register.
 * If not authenticated, it renders the intended public components.
 */
export default function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
}