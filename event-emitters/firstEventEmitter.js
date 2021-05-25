import EventEmitter from 'events';

const firstEmitter = new EventEmitter();

// イベントを発生させる
firstEmitter.emit('My first event');
