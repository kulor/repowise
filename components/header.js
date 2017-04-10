import Link from 'next/link'
import Search from './search'
import Router from 'next/router'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: props.url.query.query || '',
    }
  }

  onChangeQuery(query) {
    this.setState({
      query: query
    })
  }

  onSubmitSearch() {
    // Search happens by observing the props.query change to ensure url persistence is kept in sync
    Router.push({
      pathname: '/search',
      query: { query: this.state.query }
    })
  }

  render () {
    return (
      <div>
        <div className='header'>
          <Link href="/">
            <a><span className="header-logo">Repo <strong>Wise</strong></span></a>
          </Link>

          <Search
            value={this.state.query}
            onChange={this.onChangeQuery.bind(this)}
            onSubmit={this.onSubmitSearch.bind(this)} />

          { this.props.children }

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

          .header-logo {
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
  }
}
