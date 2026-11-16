import { createContext, useContext } from "react";
import useResource from "../hooks/useResource";
import { ResourceState } from "../components/portal/UI";

const StudentPortalContext = createContext();

export function StudentPortalProvider({ children }) {
  const resource = useResource("/api/student/portal");
  return <ResourceState {...resource}><StudentPortalContext.Provider value={resource}>{children}</StudentPortalContext.Provider></ResourceState>;
}

export function useStudentPortal() {
  return useContext(StudentPortalContext);
}
