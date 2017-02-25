const expect = require('chai').expect;
const sinon = require('sinon');

const superagentAbsolute = require('.');

it('should override absolute paths', () => {
  const spy = sinon.spy();
  const agent = { get: spy };
  const agentAbsolute = superagentAbsolute(agent)('localhost');
  agentAbsolute.get('/lollipop');
  expect(spy.withArgs('/lollipop').calledOnce).to.be.false;
  expect(spy.withArgs('localhost/lollipop').calledOnce).to.be.true;
});

it('should not override relative paths', () => {
  const spy = sinon.spy();
  const agent = { get: spy };
  const agentAbsolute = superagentAbsolute(agent)('localhost');
  agentAbsolute.get('lollipop');
  expect(spy.withArgs('lollipop').calledOnce).to.be.true;
  expect(spy.withArgs('localhost/lollipop').calledOnce).to.be.false;
});

it('should not override unrecognised paths', () => {
  const spy = sinon.spy();
  const agent = { get: spy };
  const agentAbsolute = superagentAbsolute(agent)('localhost');
  const watIsDisUrl = () => {};
  agentAbsolute.get(watIsDisUrl);
  expect(spy.withArgs(watIsDisUrl).calledOnce).to.be.true;
});

it('should ignore anything that\'s not related to the request url', () => {
  const spy = sinon.spy();
  const agent = { end: spy };
  const agentAbsolute = superagentAbsolute(agent)('localhost');
  const endFun = (error, result) => result.body;
  agentAbsolute.end(endFun);
  expect(spy.withArgs(endFun).calledOnce).to.be.true;
});
