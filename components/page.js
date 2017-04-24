import Head from 'next/head'
import Link from 'next/link'

export default ({ children }) => (
  <div className='app'>
    <Head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>RepoWise - Frontend package sizes</title>
      <link href="/static/page.css" media="all" rel="stylesheet" />
      <link href="/static/card.css" media="all" rel="stylesheet" />
      <link href="/static/tables.css" media="all" rel="stylesheet" />
    </Head>

    { children }

    <div className="about">
      <p>
        <Link href="/about"><a>About</a></Link>.
        A project by <a href="https://twitter.com/kulor">@kulor</a>.
      </p>
    </div>
  </div>
)
