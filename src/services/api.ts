import axios from "axios"

const SearchUsers = (searchTerm: string, currentPage: number, maxItemPage: number) => {
  const results = axios.get(`https://api.github.com/search/users?q=${searchTerm}&page=${currentPage}&per_page=${maxItemPage}`)
  return results;
}

export default {
  SearchUsers
}