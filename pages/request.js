import React from 'react'
import Header from '../components/header'
import Page from '../components/page'
import Package from '../components/package'
import Tasks, {requestPackage} from '../lib/tasks'
import Link from 'next/link'
import {queueTasksDb} from '../lib/db'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      packageName: '',
      hasSubmitted: false
    }
  }

  onSubmit(e) {
    e.preventDefault()
    console.log('requestPackage', requestPackage(this.state.packageName))
    this.setState({
      hasSubmitted: true
    }, () => {
      setTimeout(()=> {
        this.setState({
          hasSubmitted: false,
          packageName: ''
        })
      }, 3000)
    })
  }

  onChangePackageName(e) {
    this.setState({
      packageName: e.target.value
    })
  }

  render () {
    const { pkg } = this.props
    return (
      <Page>
        <Header />
        <form onSubmit={this.onSubmit.bind(this)}>
          <input className="submit-package" placeholder="npm-package-name" value={this.state.packageName} onChange={this.onChangePackageName.bind(this)} autoFocus />
          {this.state.hasSubmitted && <div className="thanks">Thanks, <code>{this.state.packageName}</code> should be on the homepage shortly.</div>}
        </form>
        <style jsx>{`
        .submit-package {
          display: block;
          width: 100%;
          font-size: 20px;
          padding: 10px;
        }

        .thanks {
          margin: 20px 0;
        }
        .thanks code {
          font-weight: bold;
          color: rgba(255, 255, 255, 0.44);
        }
        `}</style>
      </Page>
    )
  }

  componentDidMount () {}
}
