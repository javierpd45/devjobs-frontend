import { useRouter } from "../hooks/useRouter.js";
import styles from "./Link.module.css";

export function Link({ href, children, ...restOfProps }) {
  const { navigateTo, currentPath } = useRouter();

  const handleClick = (event) => {
    event.preventDefault();
    navigateTo(href);
  };

  const isActive = currentPath === href;

  return (
    <a
      className={isActive ? styles.active : ""}
      href={href}
      {...restOfProps}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
