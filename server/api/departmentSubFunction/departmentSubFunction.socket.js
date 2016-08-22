/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var DepartmentSubFunction = require('./departmentSubFunction.model');

exports.register = function(socket) {
  DepartmentSubFunction.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  DepartmentSubFunction.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('departmentSubFunction:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('departmentSubFunction:remove', doc);
}