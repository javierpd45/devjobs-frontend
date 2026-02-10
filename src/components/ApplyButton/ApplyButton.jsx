import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import styles from "./ApplyButton.module.css";

export function ApplyButton({ jobId }) {
  const [isApplied, setIsApplied] = useState(false);
  const { isLoggedIn } = useAuthStore();

  const handleApplyClick = () => {
    setIsApplied(true);
  };

  const buttonClasses = isApplied
    ? styles.applyButton + " " + styles.isApplied
    : styles.applyButton;

  const buttonText = () => {
    if (!isLoggedIn) return "Inicia sesión para aplicar";
    if (isApplied) return "Aplicado";
    return "Aplicar";
  };

  return (
    <button
      className={buttonClasses}
      onClick={handleApplyClick}
      disabled={!isLoggedIn}
    >
      {buttonText()}
    </button>
  );
}
