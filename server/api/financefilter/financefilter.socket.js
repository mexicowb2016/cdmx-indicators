/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Financefilter = require('./financefilter.model');

exports.register = function(socket) {
  Financefilter.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Financefilter.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('financefilter:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('financefilter:remove', doc);
}