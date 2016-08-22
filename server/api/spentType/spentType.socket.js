/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var SpentType = require('./spentType.model');

exports.register = function(socket) {
  SpentType.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  SpentType.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('spentType:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('spentType:remove', doc);
}