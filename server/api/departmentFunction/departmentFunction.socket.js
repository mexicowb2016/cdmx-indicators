/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var DepartmentFunction = require('./departmentFunction.model');

exports.register = function(socket) {
  DepartmentFunction.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  DepartmentFunction.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('departmentFunction:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('departmentFunction:remove', doc);
}