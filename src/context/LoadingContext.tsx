/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, ReactNode } from "react";
import { OrbitProgress } from "react-loading-indicators";

/**
 * Interface for the loading context values.
 *
 * @interface LoadingContextType
 * @property {boolean} isLoading - Indicates whether a loading state is active.
 * @property {(value: boolean) => void} setLoading - Function to update the loading state.
 */
interface LoadingContextType {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
};

/**
 * React context to manage and share loading state across the application.
 *
 * @constant
 * @type {React.Context<LoadingContextType | undefined>}
 *
 * @description
 * Provides the current loading state and a method to update it.
 * Must be used within a `LoadingProvider` to function properly.
 */
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

/**
 * Custom hook to access the loading context.
 *
 * @function
 * @returns {LoadingContextType} The current loading state and updater function.
 * @throws Will throw an error if used outside of a `LoadingProvider`.
 *
 * @description
 * Allows components to read and update the global loading state,
 * typically used to show or hide loading indicators.
 */
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};

/**
 * LoadingProvider component that provides loading state to its children.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - Components that will have access to the loading context.
 * @returns {JSX.Element} The context provider wrapping all children components.
 *
 * @description
 * Maintains the global `isLoading` state and displays a loading overlay using Bootstrap classes
 * and the `OrbitProgress` spinner when loading is active.
 */
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
      {isLoading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 d-flex justify-content-center align-items-center z-3">
          <OrbitProgress color="#0d6efd" size="large" />
        </div>
      )}
    </LoadingContext.Provider>
  );
};