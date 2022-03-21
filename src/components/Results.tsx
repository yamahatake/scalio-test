import React, {useEffect, useState, useMemo} from "react"
import axios from "axios"
import ReactPaginate from "react-paginate";

const Results = (props: any) => {
  const {searchTerm} = props;
  const [listResults, setListResults] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [errorCode, setErrorCode] = useState<string>('');
  const maxItemPage = 9;

  const sortList = (term: string) => {
    setIsAscending(!isAscending);
    if (isAscending){ 
      setListResults(listResults.sort((a, b) => (a[term].toLowerCase() > b[term].toLowerCase()) ? 1 : -1));
    } else{
      setListResults(listResults.sort((a, b) => (a[term].toLowerCase() > b[term].toLowerCase()) ? -1 : 1));
    }
  }

  const calculatePageTotal = (itemCount: number) => {
    setPageNumber(itemCount > 1000 ? Math.ceil(1000 / maxItemPage) : Math.ceil(itemCount / maxItemPage));
  }

  const searchList = async () => {
    try {
      const results = await axios.get(`https://api.github.com/search/users?q=${searchTerm}&page=${currentPage}&per_page=${maxItemPage}`)
      setErrorCode('');
      calculatePageTotal(results.data.total_count);
      setListResults(results.data.items);
    } catch (err: any) {
      console.log(err);
      setErrorCode(err.message);
      setListResults([]);
    }
  }

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

  const changePage = (item: any) => {
    setCurrentPage(item.selected+1)
  }

  useEffect(() => {
    if (searchTerm) {
      searchList();
    }
  }, [searchTerm, currentPage])

  if (errorCode.includes('403')){
    return (
      <div className="container">
        <h2>Sorry, we could not finish your search, it may be related to reaching the maximun number of searchs in a short perdiod of time, please try again after a couple of minutes.</h2>
      </div>
    )
  } else {

    return (
      <div className="results container">
        <table className="shadow">
          <thead>
            <tr>
              <th>Avatar</th>
              <th><a onClick={() => sortList('login')}>Login</a></th>
              <th><a onClick={() => sortList('type')}>Type</a></th>
            </tr>
          </thead>
          <tbody>
            {renderList}
          </tbody>
        </table>
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