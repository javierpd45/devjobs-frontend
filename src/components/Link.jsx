import { Link as NavLink } from "react-router";
import { useRouter } from "../hooks/useRouter.js";
import styles from "./Link.module.css";

export function Link({ href, children, ...restOfProps }) {
  const { currentPath } = useRouter();
  const isActive = currentPath === href;

  return (
    <NavLink
      className={isActive ? styles.active : ""}
      to={href}
      {...restOfProps}
    >
      {children}
    </NavLink>
  );
}
