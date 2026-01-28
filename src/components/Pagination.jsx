import styles from "./Pagination.module.css";

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}) {
  // Generar un array de paginas a mostrar
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const styleLinkLeft = {
    opacity: isFirstPage ? 0.5 : 1,
    // cursor: isFirstPage ? "not-allowed" : "pointer",
    pointerEvents: isFirstPage ? "none" : "auto",
  };

  const styleLinkRight = {
    opacity: isLastPage ? 0.5 : 1,
    // cursor: isLastPage ? "not-allowed" : "pointer",
    pointerEvents: isLastPage ? "none" : "auto",
  };

  const handlePrevious = (event) => {
    event.preventDefault();
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (event) => {
    event.preventDefault();
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (event, page) => {
    event.preventDefault();
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav className={styles.pagination}>
      <a href="#" style={styleLinkLeft} onClick={handlePrevious}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </a>

      {pages.map((page) => (
        <a
          key={page}
          href="#"
          className={currentPage === page ? styles.isActive : ""}
          onClick={(event) => handlePageClick(event, page)}
        >
          {page}
        </a>
      ))}

      <a href="#" style={styleLinkRight} onClick={handleNext}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </a>
    </nav>
  );
}
