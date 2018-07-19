/*
  The entry point for the js text formatter
*/

import Vue from 'vue';

import JsTextFormatter from './App.vue';

new Vue({ // eslint-disable-line no-new
  el: '#js-text-formatter',
  render(createElement) {
    return createElement(JsTextFormatter);
  },
});
