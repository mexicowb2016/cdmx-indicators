/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Spent = require('./spent.model');

exports.register = function(socket) {
  Spent.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Spent.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('spent:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('spent:remove', doc);
}