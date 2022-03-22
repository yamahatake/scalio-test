/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react"
import api from '../services/api';
import ReactPaginate from "react-paginate";
import ClipLoader from "react-spinners/ClipLoader";

const Results = (props: any) => {
  const {searchTerm} = props;
  const [listResults, setListResults] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortTerm, setSortTerm] = useState<string>('login');
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [errorCode, setErrorCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const maxItemPage = 9;

  // Sort the list by the set sortTerm
  const sortList = (term: string, list: any[]) => {
    if (isAscending){ 
      return list.sort((a, b) => (a[term].toLowerCase() > b[term].toLowerCase()) ? 1 : -1);
    } else{
      return list.sort((a, b) => (a[term].toLowerCase() > b[term].toLowerCase()) ? -1 : 1);
    }
  }

  // Calculate the total number of pages, the api have a limit of 1000 results
  const calculatePageTotal = (itemCount: number) => {
    setPageNumber(itemCount > 1000 ? Math.ceil(1000 / maxItemPage) : Math.ceil(itemCount / maxItemPage));
  }

  // Update the list and handles the load delay
  const updateList = async (list: any[]) => {
    await setListResults(list)
    setTimeout(() => {
      setLoading(false)
    }, 300);
  }

  // Consumes api service from gibhub and serch by user
  const searchList = async () => {
    try {
      setLoading(true);
      const result = await api.SearchUsers(searchTerm, currentPage, maxItemPage);
      setErrorCode('');
      calculatePageTotal(result.data.total_count);
      const sortedList = sortList(sortTerm, result.data.items);
      updateList(sortedList);
    } catch(error) {
      setErrorCode('error');
      updateList([]);
    }
  }

  // Render the table listing
  const renderList = listResults.map((product: { id: number, avatar_url: string, login: string, type: string }) => {
    const { id, avatar_url, login , type} = product

    return (
      <tr key={id}>
        <td>
          <img src={avatar_url} alt={login} width="40px" />
        </td>
        <td>{login}</td>
        <td>{type}</td>
      </tr>
    )
  })

  // Change the page for navigation
  const changePage = (item: any) => {
    setCurrentPage(item.selected+1)
  }

  // Function to reorderlist results
  const reorderList = async (term: string) => {
    await setSortTerm(term);
    await setIsAscending(!isAscending);
  }

  // Sort the list on title click
  useEffect(() => {
    const sortedList = sortList(sortTerm, listResults);
    updateList(sortedList);
  }, [sortTerm, isAscending])

  // Make a new search on term or page change
  useEffect(() => {
    if (searchTerm) {
      searchList();
    }
  }, [searchTerm, currentPage])

  if (errorCode){
    return (
      <div className="container">
        <h2>Sorry, we could not finish your search, it may be related to reaching the maximun number of searchs in a short perdiod of time, please try again after a couple of minutes.</h2>
      </div>
    )
  } else {
    return (
      <div className="results container">
        <div className="relative">
          {loading && <div className="loading">
            <ClipLoader color={'#000'} loading={true} size={150} />
          </div>}
          <table className="shadow">
            <thead>
              <tr>
                <th>Avatar</th>
                <th><a onClick={() => reorderList('login')}>Login</a></th>
                <th><a onClick={() => reorderList('type')}>Type</a></th>
              </tr>
            </thead>
            <tbody>
              {renderList}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageNumber}
            onPageChange={changePage}
            containerClassName={"pagination__container"}
            previousClassName={"pagination__previous-button"}
            nextClassName={"pagination__next-button"}
            disabledClassName={"pagination__disabled"}
            activeClassName={"pagination__active"}
          />
        </div>
      </div>
    )
  }
}

export default Results