import Head from 'next/head'
import Link from 'next/link'

export default ({ children }) => (
  <div className='app'>
    <Head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>RepoWise - Frontend package sizes</title>
      <style dangerouslySetInnerHTML={{__html: `
      * {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      body {
        background: transparent;
        padding-top: 95px;
        color: #fff;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
      }

      body:before {
        content:"";
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(130deg, #2b5876 0%,  #4e4376 100%);
        z-index: -1;
      }

      .app {
        max-width: 600px;
        margin: 0 auto;
        margin-top: 20px;
        padding: 10px;
      }

      .about {
        position: relative;
        text-align: center;
        font-size: 14px;
        color: #fff;
        margin-top: 50px;
      }

      .about a {
        color: #fff;
      }

      a {
        color: #3c59b7;
        text-decoration: none;
      }
      a:hover,
      a:focus {
        color: #3c59b7;
        text-decoration: underline;
      }
      a:focus {
        outline: 5px auto -webkit-focus-ring-color;
        outline-offset: -2px;
      }

    `}} />
      <link href="/static/card.css" media="all" rel="stylesheet" />
      <link href="/static/tables.css" media="all" rel="stylesheet" />
    </Head>

    { children }

    <div className="about">
      <p><Link href="/about"><a>About</a></Link>. A project by <a href="https://twitter.com/kulor">@kulor</a>.</p>
    </div>
  </div>
)
