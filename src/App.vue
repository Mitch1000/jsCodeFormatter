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
            Enter your code for formatting here:
          </h3>
        </form>
        <form class="js-text-formatter__form js-text-formatted-area" >
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
            Formatted code will display here:
          </h3>
        </form>
      </div>

      <div class="js-text-codemirror-container">
        <div
        class="js-text-formatter__text-area"
        id="codemirror-formatted"/>
        <div class="git-hub-link">
          <a href="https://github.com/Mitch1000/jsCodeFormatter" class="git-hub-logo-2">
            GitHub
          </a>
          <a href="https://github.com/Mitch1000/jsCodeFormatter" class="git-hub-logo">
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import codeFormatter from './helpers/codeFormatter';
import codeMirror from './utilities/codeMirror';

export default {
  data() {
    return {
      textForFormatting: '',
      formattedText: '',
      formats: ['camelCase', 'snake_case', 'kebab-case', 'PascalCase'],
      formatFrom: 'snake_case',
      formatTo: 'camelCase',
    };
  },

  mounted() {
    this.codeMirror = codeMirror();
  },

  methods: {
    formatCode() {
      const textForFormatting = this.codeMirror.edit.getValue();
      const formattedCode = codeFormatter(textForFormatting, this.formatTo, this.formatFrom);
      this.codeMirror.rightOriginal().setValue(formattedCode);
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
  @import "./css/buttons.css";

  .buttons-container {
    margin-top: -4%;
    display: flex;
    flex-wrap: wrap;
  }

  .selections-container {
    margin-bottom: 5%;
  }

  .convert-button-container {
    margin-bottom:2%;
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

  .git-hub-logo-2 {
    margin-right: 0.3em;
    display: block;
    text-indent: -9999px;
    width: 20px;
    height: 20px;
    background: url(https://git-scm.com/images/logos/downloads/Git-Icon-Black.png);
    background-size: 20px 20px;
  }

  .git-hub-logo {
    margin-top: 2px;
    display: block;
    text-indent: -9999px;
    width: 60px;
    height: 15px;
    background: url(https://github-media-downloads.s3.amazonaws.com/github-logo.svg);
    background-size: 60px 15px;
  }

  div.git-hub-link {
    display: flex;
    margin-bottom: 1em;
    margin-top: 1em;
    font-size: 14pt;
    color: #505050;
  }

  div.git-hub-link > a:visited {
    color: #a16a94;
  }

  .js-text-formatted-area {
    padding-left: 6%;
  }

  .js-text-formatter {
    color: #505050;
    width: 98%;
    margin: auto;
  }

  .js-text-formatter__form {
    width: 98%;
  }

  .js-text-codemirror-container {
    height: 930px;
  }

  .js-text-formatter__text-area {
    min-width: 100%;
    font-family: "museo-sans",sans-serif;
    font-size: 1.14em;
  }

  .js-text-formatter__text-area:focus {
    border-color: #B9AEF0;
  }
</style>
