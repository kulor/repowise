import React from 'react'
import Header from '../components/header'
import Page from '../components/page'
import Link from 'next/link'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Page>
        <Header {...this.props} />
        <div>
          <h1>About this site</h1>
          <p>Packagemass is a service that helps savvy frontend developers be aware of package sizes.</p>
          <p>This is an important concern as we send these packages to our users which leads to a slower experience.</p>

          <h2>Motivation</h2>
          <p>With the ease of including frontend libraries through npm etc, it's easy to find yourself with bloated static bundles. As part of the due-dilligence phase when considering a new package (Github stars, Github issues, trial and error etc..) I wanted a means to <em>easily</em> know an approximate footprint. I didn't find anything that solved my needs, so built it myself.</p>

          <h2>Technology</h2>
          <p><a href="https://github.com/zeit/next.js">Next.js</a> for the web serving aspect hosted on Heroku.</p>
          <p>The heavy lifting of downloading, gzipping and calculating package sizes are Node.js scripts (async network and disk I/O is a bonus here) that run on a queue system using <a href="https://github.com/firebase/firebase-queue">Firebase Queue</a> and is published to a Firebase Database.</p>
          <p>Search is powered using ElasticSearch with the help of <a href="https://github.com/firebase/flashlight">Flashlight</a> to handle ingest and auto updates of the Firebase data store.</p>

          <h2>Contact</h2>
          <p>Send me a tweet to @kulor.</p>
        </div>
        <style>{`
          a {
            color: #fff;
          }
        `}</style>
      </Page>
    )
  }

  componentDidMount () {}

}
