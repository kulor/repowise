import Head from 'next/head'
import Link from 'next/link'

export default ({ children }) => (
  <div className='app'>
    <Head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>Package Size</title>
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

      table {
        border: 1px solid #ccc;
        border-radius: 3px;
        width: 100%;
      }

      td, th {
        font-weight: 400;
        padding: 4px;
      }

      thead th {
        border-bottom: 1px solid #ccc;
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

    `}} />
    </Head>

    { children }

    <div className="about">
      <p>The "About section": Be aware of the size of javascript libraries you depend on. This project works by fetching packages from cdnjs, creating a gzipped version and publishing the results. If a package you care about is missing, send me a tweet.</p>
      <p>A project by <a href="https://twitter.com/kulor">@kulor</a>.</p>
    </div>
  </div>
)
