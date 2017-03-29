import Head from 'next/head'

export default ({ children }) => (
  <div className='app'>
    <Head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>Package Size</title>
      <style>{`
      body {
        background: transparent no-repeat;


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
        /*background: linear-gradient(0, #24C6DC 0%, #514A9D 100%);*/
        background: linear-gradient(130deg, #19547b 0%, #ffd89b 100%);
        background: linear-gradient(130deg, #2b5876 0%,  #4e4376 100%);
      }

      * {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
      }

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

      .header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.2);
        z-index: 1;
      }

      .header .logo {
        margin: 10px 0 3px 20px;
        padding: 2px 4px;
        display: inline-block;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.4);
      }

      .about {
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
