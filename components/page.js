import Head from 'next/head'

export default ({ children }) => (
  <div className='app'>
    <Head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>Package Size</title>
      <style>{`
      body {
        background: #2a3351;
        padding-top: 95px;
        color: #fff;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
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
        border-bottom: 1px solid rgba(233, 30, 99, 0.5);
        border-radius: 0;
        transition: border 180ms ease-in-out;
        -webkit-appearance: none;
        -webkit-border-radius:0px;
      }

      .search input:focus {
        outline: none;
        border-color: rgba(233, 30, 99, 1); 
      }


      .app {
        max-width: 600px;
        margin: 0 auto;
        margin-top: 20px;
        position: relative;
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
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #2a3351;
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
        color: rgba(255, 255, 255, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.4);
      }

    `}</style>
    </Head>

    { children }
  </div>
)