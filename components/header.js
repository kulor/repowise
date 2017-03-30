import Link from 'next/link'

export default ({ children }) => (
  <div>
    <div className='header'>
      <Link href="/">
        <a><span className="logo">Package <strong>Mass</strong></span></a>
      </Link>
      { children }

      <style jsx>{`
      .header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.2);
        min-height: 42px;
        z-index: 1;
      }

      .logo {
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

    `}</style>
    </div>
  </div>
)
