import { useNavigate, useLocation } from "react-router";

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  /* Se devuelve navigate renombrado ya que si lo envolvemos en 
  una funcion se vuelve a crear cada vez y se hace inestable, 
  lo que causa un error ya que se renderiza un bucle infinito */

  return { currentPath: location.pathname, navigateTo: navigate };
}
