reddit-tracking-client
========

A client library to allow lightweight components to be shared across reddit stacks.

### Build

`npm install && gulp`

### Usage Examples

#### In the browser

```js
var tracker = new Metron.Tracker({
  domain: 'https://redditanalytics.com',
});

tracker.send({
  event: 'embed',
  action: 'create',
  thing: id,
  sr: sr,
  live: live,
}, callback);
```
