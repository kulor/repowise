import React from 'react'
import Header from '../components/header'
import Page from '../components/page'

export default class extends React.Component {
  render () {
    return (
      <Page>
        <Header {...this.props} />
        <div>
          <h1>About this site</h1>
          <p>RepoWise helps developers be aware of frontend package sizes.</p>

          <h2>Motivation</h2>
          <p>With the ease of including frontend libraries through NPM (and other package managers), it's easy to find yourself bloating your bundles with third party code.</p>

          <p>When considering a new package I wanted an easy means to find the size (only the parts of a repo that would be included in my project). I didn't find anything that solved my needs, so built it myself.</p>

          <h2>Technology</h2>
          <p>The frontend and a light sprinkling of backend is written in React powered by <a href='https://github.com/zeit/next.js'>Next.js</a> and Express.js hosted on Heroku.</p>

          <p><a href='https://cdnjs.com/'>CDNJS</a> is used as a stopgap (whilst work to stabilise a custom solution is made more reliable) to get a list of static files for a package which can be downloaded and gzipped.</p>
          <p>The heavy lifting of downloading, gzipping and calculating package sizes are run as throttled (to be kind to CDNJS' service) Node.js scripts on a <a href='https://github.com/firebase/firebase-queue'>Firebase Queue</a> and is published to a Firebase Database.</p>
          <p>Search is powered using ElasticSearch with the help of <a href='https://github.com/firebase/flashlight'>Flashlight</a> to handle ingest and auto updates of the Firebase data store.</p>

          <h2>Contact</h2>
          <p>Send me a tweet to @kulor.</p>
        </div>
        <style>{`
          a {
            color: #fff;
          }

          h1 {
            font-weight: 400;
          }

          h2 {
            font-weight: 300;
            margin-top: 50px;
          }

          p {
            line-height: 1.3em;
          }
        `}</style>
      </Page>
    )
  }
}
