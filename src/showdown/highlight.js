"use strict";

import showdown from 'showdown';
import hljs from 'highlight.js';
import { decode } from 'html-encoder-decoder';

const classAttr = 'class="';

export const highlight = () => [
  {
    type: 'output',
    filter(text, converter, options) {
      let left = '<pre><code\\b[^>]*>';
      let right = '</code></pre>';
      let flags = 'g';

      let replacement = (wholeMatch, match, left, right) => {
        match = decode(match);
        let lang = (left.match(/class="(\w+)/) || [])[1];

        if (left.includes(classAttr)) {
          let attrIndex = left.indexOf(classAttr) + classAttr.length;
          left = left.slice(0, attrIndex) + 'hljs ' + left.slice(attrIndex);
        } else {
          left = left.slice(0, -1) + ' class="hljs">';
        }

        if (lang && hljs.getLanguage(lang)) {
          return left + hljs.highlight(match, { language: lang }).value + right;
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
