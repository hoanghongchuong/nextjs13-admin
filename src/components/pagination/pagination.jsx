import React from "react";
import { Pagination } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const PaginationCustom = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  const renderPages = () => {
    const pages = [];
    if (totalPages < 1) {
      return <p className="text-center">Nothing item</p>;
    }

    pages.push(
      <Pagination.Prev
        key="prev"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
    );
    // Tạo danh sách các trang để hiển thị
    for (let i = 1; i <= totalPages; i++) {
      // Hiển thị trang hiện tại và các trang xung quanh nó
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 3 && i <= currentPage + 3)
      ) {
        pages.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
      // Hiển thị dấu "..." nếu có trang bị ẩn
      else if (
        (i === currentPage - 4 && currentPage > 4) ||
        (i === currentPage + 4 && currentPage < totalPages - 3)
      ) {
        pages.push(<Pagination.Ellipsis key={i} />);
      }
    }
    pages.push(
      <Pagination.Next
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    );

    return pages;
  };

  return (
    <div className="float-end">
        <Pagination>{renderPages()}</Pagination>
    </div>
  );
};

export default PaginationCustom;
