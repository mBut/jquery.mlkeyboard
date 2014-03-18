var KEYS_COUNT = 53;

function Keyboard(options){
  this.defaults = {
    layout: 'en_us',
    active_shift: true,
    active_caps: false,
    is_hidden: true,
    open_speed: 300,
    close_speed: 100,
    enabled: true
  };

  this.global_options = $.extend({}, this.defaults, options);
  this.options = $.extend({}, {}, this.global_options);

  this.keys = [];

  this.$keyboard = $("<div/>").attr("id", "mlkeyboard");
  this.$modifications_holder = $("<ul/>").addClass('mlkeyboard-modifications');
  this.$current_input = $("input[type='text']").first();
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

Keyboard.prototype.setUpFor = function(obj) {
  var _this = this;

  obj.bind('focus', function(){
    // If here is no any input in focus or focus was changed to different input
    // then keyboard should be set-upped and showed
    var input_changed = !_this.$current_input || $(this)[0] !== _this.$current_input[0];

    if (!_this.keep_focus || input_changed) {
      if (input_changed) _this.keep_focus = true;

      _this.$current_input = $(this);
      _this.options = $.extend({}, _this.global_options, _this.inputLocalOptions());

      if (!_this.options.enabled) {
        _this.keep_focus = false;
        return;
      }

      if (_this.$current_input.val() !== '') {
        _this.options.active_shift = false;
      }

      _this.setUpKeys();

      if (_this.options.is_hidden) {
        _this.$keyboard.slideDown(_this.options.openSpeed);
      }
    }
  });

  obj.bind('blur', function(){
    var VERIFY_STATE_DELAY = 500;

    // Input focus changes each time when user click on keyboard key
    // To prevent momentary keyboard collapse input state verifies with timers help
    // Any key click action set current inputs keep_focus variable to true
    clearTimeout(_this.blur_timeout);

    _this.blur_timeout = setTimeout(function(){
      if (!_this.keep_focus) {
        if (_this.options.is_hidden) {
          _this.$keyboard.slideUp(_this.options.closeSpeed);
        }
      } else {
        _this.keep_focus = false;
      }
    }, VERIFY_STATE_DELAY);

  });
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
  var current_val = this.$current_input.val();
  this.$current_input.val(current_val + char);
  this.$current_input.focus().trigger("input");
};

Keyboard.prototype.deleteChar = function() {
  var current_val = this.$current_input.val();
  this.$current_input.val(current_val.slice(0,-1));
  this.$current_input.focus().trigger("input");
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