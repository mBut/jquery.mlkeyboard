var KEYS_COUNT = 53;

function Keyboard(selector, options){
  this.defaults = {
    layout: 'en_US',
    active_shift: true,
    active_caps: false,
    is_hidden: true,
    open_speed: 300,
    close_speed: 100,
    show_on_focus: true,
    hide_on_blur: true,
    trigger: undefined,
    enabled: true
  };

  this.global_options = $.extend({}, this.defaults, options);
  this.options = $.extend({}, {}, this.global_options);

  this.keys = [];

  this.$keyboard = $("<div/>").attr("id", "mlkeyboard");
  this.$modifications_holder = $("<ul/>").addClass('mlkeyboard-modifications');
  this.$current_input = $(selector);
}

Keyboard.prototype.init = function() {
  this.$keyboard.append(this.renderKeys());
  this.$keyboard.append(this.$modifications_holder);
  $("body").append(this.$keyboard);

  if (this.options.is_hidden) this.$keyboard.hide();

  this.setUpKeys();
};

Keyboard.prototype.setUpKeys = function() {
  var _this = this;

  this.active_shift = this.options.active_shift;
  this.active_caps = this.options.active_caps;

  $.each(this.keys, function(i, key){

    key.preferences = mlKeyboard.layouts[_this.options.layout][i];
    key.setCurrentValue();
    key.setCurrentAction();
    key.toggleActiveState();
  });
};

Keyboard.prototype.renderKeys = function() {
  var $keys_holder = $("<ul/>");

  for (var i = 0; i<= KEYS_COUNT; i++) {
    var key;

    switch(i) {
    case 13:
      key = new KeyDelete(this);
      break;
    case 14:
      key = new KeyTab(this);
      break;
    case 28:
      key = new KeyCapsLock(this);
      break;
    case 40:
      key = new KeyReturn(this);
      break;
    case 41:
      key = new KeyShift(this, "left");
      break;
    case 52:
      key = new KeyShift(this, "right");
      break;
    case 53:
      key = new KeySpace(this);
      break;
    default:
      key = new Key(this);
      break;
    }

    this.keys.push(key);
    $keys_holder.append(key.render());
  }

  return $keys_holder;
};

Keyboard.prototype.setUpFor = function($input) {
  var _this = this;

  if (this.options.show_on_focus) {
    $input.bind('focus', function() { _this.showKeyboard($input); });
  }

  if (this.options.hide_on_blur) {
    $input.bind('blur', function() {
      var VERIFY_STATE_DELAY = 500;

      // Input focus changes each time when user click on keyboard key
      // To prevent momentary keyboard collapse input state verifies with timers help
      // Any key click action set current inputs keep_focus variable to true
      clearTimeout(_this.blur_timeout);

      _this.blur_timeout = setTimeout(function(){
        if (!_this.keep_focus) { _this.hideKeyboard(); }
        else { _this.keep_focus = false; }
      }, VERIFY_STATE_DELAY);
    });
  }

  if (this.options.trigger) {
    var $trigger = $(this.options.trigger);
    $trigger.bind('click', function(e) {
      e.preventDefault();

      if (_this.isVisible) { _this.hideKeyboard(); }
      else {
        _this.showKeyboard($input);
        $input.focus();
      }
    });
  }
};

Keyboard.prototype.showKeyboard = function($input) {
  var input_changed = !this.$current_input || $input[0] !== this.$current_input[0];

  if (!this.keep_focus || input_changed) {
    if (input_changed) this.keep_focus = true;

    this.$current_input = $input;
    this.options = $.extend({}, this.global_options, this.inputLocalOptions());

    if (!this.options.enabled) {
      this.keep_focus = false;
      return;
    }

    if (this.$current_input.val() !== '') {
      this.options.active_shift = false;
    }

    this.setUpKeys();

    if (this.options.is_hidden) {
      this.isVisible = true;
      this.$keyboard.slideDown(this.options.openSpeed);
    }
  }
};

Keyboard.prototype.hideKeyboard = function() {
  if (this.options.is_hidden) {
    this.isVisible = false;
    this.$keyboard.slideUp(this.options.closeSpeed);
  }
};

Keyboard.prototype.inputLocalOptions = function() {
  var options = {};
  for (var key in this.defaults) {
    var input_option = this.$current_input.attr("data-mlkeyboard-"+key);
    if (input_option == "false") {
      input_option = false;
    } else if (input_option == "true") {
      input_option = true;
    }
    if (typeof input_option !== 'undefined') { options[key] = input_option; }
  }

  return options;
};

Keyboard.prototype.printChar = function(char) {
  var selStart = this.$current_input[0].selectionStart;
  var selEnd = this.$current_input[0].selectionEnd;
  var textAreaStr = this.$current_input.val();
  var value = textAreaStr.substring(0, selStart) + char + textAreaStr.substring(selEnd);

  this.$current_input.val(value).focus();
  this.$current_input[0].selectionStart = selStart+1, this.$current_input[0].selectionEnd = selStart+1;

};

Keyboard.prototype.deleteChar = function() {
  var selStart = this.$current_input[0].selectionStart;
  var selEnd = this.$current_input[0].selectionEnd;

  var textAreaStr = this.$current_input.val();
  var after = textAreaStr.substring(0, selStart-1);
  var value = after + textAreaStr.substring(selEnd);
  this.$current_input.val(value).focus();
  this.$current_input[0].selectionStart = selStart-1, this.$current_input[0].selectionEnd = selStart-1;

};

Keyboard.prototype.showModifications = function(caller) {
  var _this = this,
      holder_padding = parseInt(_this.$modifications_holder.css('padding'), 10),
      top, left, width;

  $.each(this.modifications, function(i, key){
    _this.$modifications_holder.append(key.render());

    key.setCurrentValue();
    key.setCurrentAction();
  });

  // TODO: Remove magic numbers
  width = (caller.$key.width() * _this.modifications.length) + (_this.modifications.length * 6);
  top = caller.$key.position().top - holder_padding;
  left = caller.$key.position().left - _this.modifications.length * caller.$key.width()/2;

  this.$modifications_holder.one('mouseleave', function(){
    _this.destroyModifications();
  });

  this.$modifications_holder.css({
    width: width,
    top: top,
    left: left
  }).show();
};

Keyboard.prototype.destroyModifications = function() {
  this.$modifications_holder.empty().hide();
};

Keyboard.prototype.upperRegister = function() {
  return ((this.active_shift && !this.active_caps) || (!this.active_shift && this.active_caps));
};

Keyboard.prototype.toggleShift = function(state) {
  this.active_shift = state ? state : !this.active_shift;
  this.changeKeysState();
};

Keyboard.prototype.toggleCaps = function(state) {
  this.active_caps = state ? state : !this.active_caps;
  this.changeKeysState();
};

Keyboard.prototype.changeKeysState = function() {
  $.each(this.keys, function(_, key){
    key.setCurrentValue();
    key.toggleActiveState();
  });
};
