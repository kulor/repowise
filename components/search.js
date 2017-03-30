import Head from 'next/head'

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
      <Head>
        <style>{`
        .search {}

        .search input {
          background: transparent;
          padding: 20px;
          font-size: 26px;
          font-weight: 300;
          color: #fff;
          display: block;
          width: 100%;
          border: none;

          border-radius: 0;
          transition: border 180ms ease-in-out;
          -webkit-appearance: none;
          -webkit-border-radius:0px;
        }

        .search input:focus {
          outline: none;

        }
        `}</style>
      </Head>
    </form>
  );
}

export default Search
