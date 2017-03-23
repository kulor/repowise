const Search = props => {
  return (
    <form className="search" action="/">
      <input
        value={props.value}
        type="search"
        name="query"
        placeholder="Find a package"
        onChange={(e) => { return props.onChange(e.target.value) }}
      />
    </form>
  );
}

export default Search