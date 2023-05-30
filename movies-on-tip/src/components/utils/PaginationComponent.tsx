import React from "react";
import { Pagination } from "react-bootstrap";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <Pagination 
    className="custom-pagination"
    >
      <Pagination.First onClick={() => handlePageChange(1)} />
      <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />

      {Array(totalPages)
        .fill(0)
        .map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}

      <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
      <Pagination.Last onClick={() => handlePageChange(totalPages)} />
    </Pagination>
  );
};

export default PaginationComponent;
