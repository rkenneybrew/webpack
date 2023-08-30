'use strict'

const test = require('tap').test
const Parser = require('../')

test('Parser', (t) => {
  t.throws(() => {
    new Parser()
  }, /str must be a string/)

  t.throws(() => {
    new Parser('')
  }, /validator is required and must be an object/)

  t.throws(() => {
    new Parser('', null)
  }, /validator is required and must be an object/)

  t.throws(() => {
    new Parser('', {})
  }, 'validator.report() is required')

  t.throws(() => {
    new Parser({}, { report: () => {}})
  }, /Invalid api format/)

  t.throws(() => {
    new Parser(null, { report: () => {}})
  }, /Invalid api format/)

  {
    const input = `commit e7c077c610afa371430180fbd447bfef60ebc5ea
Author: Calvin Metcalf <cmetcalf@appgeo.com>
Date:   Tue Apr 12 15:42:23 2016 -0400

    stream: make null an invalid chunk to write in object mode

    this harmonizes behavior between readable, writable, and transform
    streams so that they all handle nulls in object mode the same way by
    considering them invalid chunks.

    PR-URL: https://github.com/nodejs/node/pull/6170
    Reviewed-By: James M Snell <jasnell@gmail.com>
    Reviewed-By: Matteo Collina <matteo.collina@gmail.com>`

    const data = { name: 'biscuits' }

    const v = {
      report: (obj) => {
        t.pass('called report')
        t.equal(obj.data, data, 'obj')
      }
    }
    const p = new Parser(input, v)
    t.equal(p.sha, 'e7c077c610afa371430180fbd447bfef60ebc5ea', 'sha')
    t.equal(p.author, 'Calvin Metcalf <cmetcalf@appgeo.com>', 'author')
    p.report(data)

    const input2 = require('./fixtures/commit')
    const p2 = new Parser(input2, v)
    t.equal(p2.sha, p.sha, 'sha')
    t.equal(p2.author, p.author, 'author')
    t.deepEqual(p2.body, p.body, 'body')
    t.equal(p2.title, p.title, 'title')
    const j1 = p.toJSON()
    delete j1.date
    const j2 = p2.toJSON()
    delete j2.date
    t.deepEqual(j1, j2, 'toJSON()')

    const input3 = require('./fixtures/pr')[0]
    const p3 = new Parser(input3, v)
    t.equal(p3.sha, p2.sha, 'sha')
    t.equal(p3.author, p2.author, 'author')
    t.deepEqual(p3.body, p2.body, 'body')
    t.equal(p3.title, p2.title, 'title')
    const j3 = p3.toJSON()
    delete j3.date
    t.deepEqual(j3, j2, 'toJSON()')
  }

  {
    const input = `commit e7c077c610afa371430180fbd447bfef60ebc5ea
Author:     Calvin Metcalf <cmetcalf@appgeo.com>
AuthorDate: Tue Apr 12 15:42:23 2016 -0400
Commit:     James M Snell <jasnell@gmail.com>
CommitDate: Tue Apr 12 15:42:23 2016 -0400

    stream: make null an invalid chunk to write in object mode

    this harmonizes behavior between readable, writable, and transform
    streams so that they all handle nulls in object mode the same way by
    considering them invalid chunks.

    PR-URL: https://github.com/nodejs/node/pull/6170
    Reviewed-By: James M Snell <jasnell@gmail.com>
    Reviewed-By: Matteo Collina <matteo.collina@gmail.com>`

    const data = { name: 'biscuits' }

    const v = {
      report: (obj) => {
        t.pass('called report')
        t.equal(obj.data, data, 'obj')
      }
    }
    const p = new Parser(input, v)
    t.equal(p.sha, 'e7c077c610afa371430180fbd447bfef60ebc5ea', 'sha')
    t.equal(p.author, 'Calvin Metcalf <cmetcalf@appgeo.com>', 'author')
    p.report(data)
  }
  t.end()
})
