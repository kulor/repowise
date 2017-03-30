import Head from 'next/head'

export default ({ children }) => (
  <div className='app'>
    <Head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>Package Size</title>
      <style>{`
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

      * {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
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

    `}</style>
    </Head>

    { children }

    <div className="about">
      <p>A project by <a href="https://twitter.com/kulor">@kulor</a></p>
    </div>
  </div>
)
