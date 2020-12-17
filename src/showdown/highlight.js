"use strict";

const decodeHtml = require("html-encoder-decoder").decode;
const showdown = require("showdown");
const hljs = require("highlight.js");
const classAttr = 'class="';

module.exports = () => [
  {
    type: "output",
    filter(text, converter, options) {
      let left = "<pre><code\\b[^>]*>";
      let right = "</code></pre>";
      let flags = "g";

      let replacement = (wholeMatch, match, left, right) => {
        match = decodeHtml(match);
        let lang = (left.match(/class=\"([^ \"]+)/) || [])[1];

        if (left.includes(classAttr)) {
          let attrIndex = left.indexOf(classAttr) + classAttr.length;
          left = left.slice(0, attrIndex) + "hljs " + left.slice(attrIndex);
        } else {
          left = left.slice(0, -1) + ' class="hljs">';
        }

        if (lang && hljs.getLanguage(lang)) {
          return left + hljs.highlight(lang, match).value + right;
        } else {
          return left + hljs.highlightAuto(match).value + right;
        }
      };

      return showdown.helper.replaceRecursiveRegExp(
        text,
        replacement,
        left,
        right,
        flags
      );
    },
  },
];
