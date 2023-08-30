'use strict'

const headingRE = /([^\:]+):([\s]+)(.*)/

module.exports = class Parser {
  constructor(str, validator) {
    if (typeof str !== 'string' && typeof str !== 'object') {
      throw new TypeError('str must be a string or an object')
    }
    if (!validator || typeof validator !== 'object') {
      throw new TypeError('validator is required and must be an object')
    }
    if (!validator.report) {
      throw new Error('validator.report() is required')
    }
    if (typeof str === 'string') {
      this._type = 'cli'
      this._rawstr = str
      this._raw = str
    } else {
      this._type = 'github-api'
      if (!str || !str.sha) {
        throw new Error('Invalid api format')
      }
      this._raw = transformAPIJson(str)
      this._rawstr = this._raw.message
    }

    this.sha = null
    this.title = null
    this.author = null
    this.date = null
    this.body = null
    this.validator = validator
    this.options = validator.config
    this.parse()
  }

  toJSON() {
    return {
      sha: this.sha
    , title: this.title
    , author: this.author
    , date: this.date
    , body: this.body
    }
  }

  inspect(depth, opts) {
    if (opts && opts.showHidden) {
      return Object.assign(this.toJSON(), {
        _raw: this._raw
      })
    }
    return this.toJSON()
  }

  parse() {
    switch (this._type) {
      case 'cli':
        this._parseCLI()
        break
      case 'github-api':
        this._parseAPI()
        break
    }
  }

  _parseAPI() {
    this.sha = this._raw.sha
    this.date = this._raw.date
    this.author = this._raw.author

    const splits = this._rawstr.split('\n')
    this.title = splits.shift()
    this.body = splits
  }

  _parseCLI() {
    const splits = this._raw.split('\n')
    const commitLine = splits.shift()

    this.sha = commitLine.replace('commit ', '')
    var line
    while (line = splits.shift()) {
      line = line.trim()
      if (!line) break // stop on the first empty line
      const matches = line.match(headingRE)
      if (matches) {
        const key = matches[1].toLowerCase()
        const val = matches[3]
        if (key === 'date' || key === 'authordate') {
          this.date = val
        } else if (key === 'author') {
          this.author = val
        }
      }
    }

    const body = splits.map((item) => {
      // TODO(evanlucas) maybe support commit messages that are not
      // indented by 4 spaces
      if (item.length) return item.slice(4, item.length)
      return ''
    })

    this.title = body.shift()

    this.body = body
  }

  report(data) {
    this.validator.report({
      commit: this
    , data: data
    })
  }
}

function transformAPIJson(obj) {
  const commit = obj.commit && typeof obj.commit === 'object'
    && (obj.commit.author || obj.commit.committer)
    ? obj.commit
    : obj

  const out = {
    sha: obj.sha
  , author: null
  , date: null
  , message: commit.message
  }

  const author = commit.author || commit.committer
  if (author) {
    out.author = `${author.name} <${author.email}>`
    out.date = author.date
  }

  return out
}
