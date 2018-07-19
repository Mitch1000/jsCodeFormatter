<template lang="html">
  <div class="js-text-formatter">
    <div>
      <div class="convert-button-container">
        <a href="#" @click="formatCode" class="fancy-button button bg-gradient1">
          <span>Convert</span>
        </a>
      </div>

      <div class="inputs-container">
        <form class="js-text-formatter__form" @submit="formatCode">
          <div class="selections-container">
            <h3>
              Format from:
            </h3>
            <div class="buttons-container">
              <div :key="format" v-for="format in formats" class="radio-button-container">
                <a
                href="#"
                @click="selectFormatFrom(format)"
                :class="{ 'radio-button-selected': format === formatFrom }"
                class="button radio-button bg-gradient2">
                  <span>{{format}}</span>
                </a>
              </div>
            </div>
          </div>
          <h3>
            Enter your javascript for formatting here:
          </h3>
          <textarea class="js-text-formatter__text-area" v-model="textForFormatting" />
        </form>
        <form class="js-text-formatter__form">
          <div class="selections-container">
            <h3>
              Format to:
            </h3>
            <div class="buttons-container">
              <div :key="format" v-for="format in formats" class="radio-button-container">
                <a
                href="#"
                @click="selectFormatTo(format)"
                :class="{ 'radio-button-selected': format === formatTo,
                'radio-button-not-selectable': format === formatFrom }"
                class="button radio-button bg-gradient2">
                  <span>{{format}}</span>
                </a>
              </div>
            </div>
          </div>
          <h3>
            Formatted javascript will display here:
          </h3>
          <textarea class="js-text-formatter__text-area" v-model="formattedText" />
        </form>
      </div>

    </div>
  </div>
</template>

<script>

import codeFormatter from './helpers/codeFormatter';

export default {
  components: {
  },

  data() {
    return {
      textForFormatting: '',
      formattedText: '',
      formats: ['camelCase', 'snake_case', 'kebab-case', 'PascalCase'],
      formatFrom: 'snake_case',
      formatTo: 'camelCase',
    };
  },

  computed: {
    /**
     * A test compute property
     *
     * @return {Boolean}
     */
    computedProperty() {
    },
  },

  created() {
  },

  methods: {
    formatCode() {
      this.formattedText = codeFormatter(this.textForFormatting, this.formatTo, this.formatFrom);
    },

    selectFormatFrom(format) {
      this.formatFrom = format;
    },

    selectFormatTo(format) {
      this.formatTo = format;
    },
  },
};

</script>

<style lang="css" scoped>
  @import "./buttons.css";

  .buttons-container {
    margin-top: -4%;
    display: flex;
    flex-wrap: wrap;
  }

  .selections-container {
    margin-bottom: 5%;
  }

  .convert-button-container {
    display: flex;
    justify-content: space-around;
  }

  div.inputs-container {
    display: flex;
    justify-content: space-around;
  }

  h3 {
    font-family: Arial, Helvetica, sans-serif;
  }

  .js-text-formatter {
    color: #505050;
    width: 95%;
    margin: auto;
  }

  .js-text-formatter__form {
    min-width: 48%;
  }

  .js-text-formatter__text-area {
    margin-bottom: 20px;
    padding: 6px 10px;
    border: 1px solid grey;
    height: 800px;
    width: 100%;
    min-width: 100%;
    font-family: "museo-sans",sans-serif;
    font-size: 1.14em;
  }

  .js-text-formatter__text-area:focus {
    border-color: #B9AEF0;
  }
</style>
