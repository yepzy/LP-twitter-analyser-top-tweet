const _ = require('lodash');

function Bus(){
  const _lapinou = {};

  function _ensureEventExist(eventName){
    if(!_lapinou[eventName]){
      _lapinou[eventName] = {callbacks:[]};
    }
  }

  function send(eventName, message){
    _ensureEventExist(eventName);
    _lapinou[eventName].callbacks.forEach(function(f){
      f._queue.push(message);
      f._loadNext();
    });
  }

  function _initConsumer(consumer){
    consumer._isConsuming = false;
    consumer._queue = [];


    consumer._loadNext = function(){
      if(consumer._isConsuming){
        return;
      }

      if(consumer._queue.length > 0){
        consumer._isConsuming = true;
        const nextMessage = _.extend({}, consumer._queue.pop());
        nextMessage.handle = consumer._handle;
        consumer(nextMessage);
        return;
      }

      consumer._isConsuming = false;
    };

    consumer._handle = {
      getQueueSize: function(){
        return consumer._queue.length;
      },
      acknowledge:function(){
        consumer._isConsuming = false;
        consumer._loadNext();
      }
    };

    return consumer;
  }

  function listen(eventName, options, f){
    _ensureEventExist(eventName);
    _lapinou[eventName].callbacks.push(_initConsumer(f));
  }

  return {
    send: send,
    listen: listen,
  };
}

const bus = Bus();


setInterval(function() {
  bus.send('my.event', {
    server: 'yolo',
    metric: Math.floor(Math.random() * 1000),
    createdAt: + new Date()
  });
}, 100);


bus.listen('my.event', {ack: true}, function logger(event) {
  console.log('B',event.handle.getQueueSize(), event);
  setTimeout(function(){
    event.handle.acknowledge();
  }, 500);
});

bus.listen('my.event', {ack: true}, function alerting(event) {
  console.log('A',event.handle.getQueueSize(),  event);
  setTimeout(function(){
      event.handle.acknowledge();
  }, 1000);
});