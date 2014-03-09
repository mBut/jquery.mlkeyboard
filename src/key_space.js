function KeySpace() {
  Key.call(this, arguments);

  this.id = "mlkeyboard-space";
  this.default_value = ' ';
}

KeySpace.prototype = new Key();
KeySpace.prototype.constructor = KeySpace;