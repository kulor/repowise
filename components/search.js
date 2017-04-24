import Head from 'next/head'

const Search = props => {
  const onSubmit = (e) => {
    e.preventDefault()
    props.onSubmit(e.target.value)
  }

  return (
    <form className="search" action="/" onSubmit={onSubmit}>
      <input
        value={props.value}
        type="search"
        name="query"
        placeholder="Find a package"
        autoComplete="off"
        onChange={(e) => { return props.onChange(e.target.value) }}
      />
      <Head>
        <style>{`
        .search {
          position: relative;
          padding-left: 30px;
        }

        .search:before {
          content: "";
          display:block;
          width: 20px;
          height: 20px;
          background: url(/static/search.svg) no-repeat;
          background-size:contain;
          position: absolute;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
          opacity: 0.7;
        }

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

        .search input:placeholder-shown,
        .search input::-webkit-input-placeholder
        {
          color: rgba(255,255,255, 0.3)
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
