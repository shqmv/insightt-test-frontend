import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute component that restricts access to authenticated users only.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - The component(s) to render if the user is authenticated.
 * @returns {JSX.Element} Redirects to the login page if the user is not authenticated, otherwise renders the children.
 *
 * @description
 * Uses the `useAuth` hook to check if the user is authenticated.
 * If not, it redirects the user to `/login` using React Router's `<Navigate />`.
 * Otherwise, it renders the protected child components.
 */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}