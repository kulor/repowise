import Head from 'next/head'

const Search = props => {
  const onSubmit = (e) => {
    e.preventDefault()
    props.onSubmit(e.target.value)
  }

  const onChange = (e) => (
    props.onChange(e.target.value)
  )

  return (
    <form className="search" action="/" onSubmit={onSubmit}>
      <input
        value={props.value}
        type="search"
        name="query"
        placeholder="Find a package"
        autoComplete="off"
        onChange={onChange}
      />
      <Head>
        <link href="/static/search.css" media="all" rel="stylesheet" />
      </Head>
    </form>
  );
}

export default Search
