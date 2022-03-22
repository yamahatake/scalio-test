import { SetStateAction, useState } from "react";

const Search = (props: any) => {
  const [login, setLogin] = useState<string>("");

  // Watch state login
  const onChange = (e: { target: { value: SetStateAction<string> } }) => {
    setLogin(e.target.value);
  }

  // Submit to update search term
  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(login);
  }

  return (
    <div className="search container">
      <div className="search__container shadow">
        <h1 className="search__title">Search on github by login</h1>
        <form onSubmit={onSubmitForm} className="search__form">
          <input  name="login" type="text" onChange={onChange} placeholder="login name" required />
          <button className="primary-bg white" type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Search