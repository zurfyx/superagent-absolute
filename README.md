# Superagent Absolute

> Superagent with default absolute URLs.

[![Build Status](https://travis-ci.org/zurfyx/superagent-absolute.svg?branch=master)](https://travis-ci.org/zurfyx/superagent-absolute)
[![npm version](https://badge.fury.io/js/superagent-absolute.svg)](https://badge.fury.io/js/superagent-absolute)

Tired of writing `http://localhost` in front of every [superagent](https://github.com/visionmedia/superagent) request?
With superagent absolute you'll only write it once per host in your whole environment.

## Install

```
npm install superagent-absolute
```

## Usage

```
var superagent = require('superagent');
var superagentAbsolute = require('superagent-absolute');

var agent = superagent.agent();
global.request = superagentAbsolute(agent)('http://localhost:3030');
```

## Example

```
const superagent = require('superagent');
const superagentAbsolute = require('superagent-absolute');

const agent = superagent.agent();
const request = superagentAbsolute(agent)('http://localhost:3030');

it('should should display "It works!"', (done) => {
  request
    .get('/')
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.eql({ msg: 'It works!' });
      done();
    });
});
```

Requested absolute URLs must start with `/`, otherwise they will be treated as relative.


## License

MIT © [Gerard Rovira Sánchez](//zurfyx.com)