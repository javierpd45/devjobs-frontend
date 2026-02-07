import { Link as AppLink, NavLink as HeaderLink } from "react-router";
import styles from "./Link.module.css";

export function Link({ href, children, ...restOfProps }) {
  // const { currentPath } = useRouter();
  // const isActive = currentPath === href;

  return (
    <AppLink to={href} {...restOfProps}>
      {children}
    </AppLink>
  );
}

export function NavLink({ href, children, ...restOfProps }) {
  return (
    <HeaderLink
      className={({ isActive }) => (isActive ? styles.navLinkActive : "")}
      to={href}
      {...restOfProps}
    >
      {children}
    </HeaderLink>
  );
}
