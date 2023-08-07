import { useMemo, memo, useCallback } from "react";

import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import { FIRST_PAGE } from "../constants";


const ThePaginate = ({ dataCurrentPage, setCurrentPage, totalPages: LAST_PAGE }) => {

  const atFirstPage = useMemo(() => 
    dataCurrentPage === FIRST_PAGE, 
  [dataCurrentPage]);

  const atCurrentPage = useCallback((currentPage) => 
    dataCurrentPage === currentPage, 
  [dataCurrentPage]);

  const atLastPage = useMemo(() => 
    dataCurrentPage === LAST_PAGE, 
  [dataCurrentPage, LAST_PAGE]);


  return (
    <>
      <Pagination tag="div">
        <PaginationItem disabled={atFirstPage}>
          <PaginationLink 
            first 
            onClick={() => setCurrentPage(FIRST_PAGE)} 
          />
        </PaginationItem>
        
        <PaginationItem disabled={atFirstPage}>
          <PaginationLink 
            previous 
            onClick={() => setCurrentPage(currentPage => currentPage - 1)}
          />
        </PaginationItem>

          {Array.from({ length: LAST_PAGE }, (_, index) => (
            <PaginationItem key={index} active={atCurrentPage(index + 1)}>
              <PaginationLink onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

        <PaginationItem disabled={atLastPage}>
          <PaginationLink 
            next 
            onClick={() => setCurrentPage(currentPage => currentPage + 1)}
          />
        </PaginationItem>
        
        <PaginationItem disabled={atLastPage}>
          <PaginationLink 
            last 
            onClick={() => setCurrentPage(LAST_PAGE)}
          />
        </PaginationItem>
      </Pagination>
    </>
  );
}


const Paginate = memo(ThePaginate);
export default Paginate;