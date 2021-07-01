'use strict';

import showdown from 'showdown';
const converter = new showdown.Converter();

export const footnotes = () => [
  // References - E.g:
  // I am the text in the body[^1].
  // [^1]: I am a reference
  {
    type: 'lang',
    filter: (text) =>
      text.replace(
        /^\[\^([\d\w]+)\]:\s*((\n+(\s{2,4}|\t).+)+)$/gm,
        (_str, name, rawContent, _, padding) => {
          const content = converter.makeHtml(
            rawContent.replace(new RegExp(`^${padding}`, 'gm'), '')
          );
          return `<div class="reference" id="reference-${name}"><a class="reference-link" href="#reference-${name}-backlink"><sup>[${name}]</sup></a>:${content}</div>`;
        }
      )
  },
  {
    type: 'lang',
    filter: (text) =>
      text.replace(
        /^\[\^([\d\w]+)\]:( |\n)((.+\n)*.+)$/gm,
        (_str, name, _, content) =>
          `<small class="reference" class="reference-link" id="reference-${name}"><a class="reference-link" href="#reference-${name}-backlink"><sup>[${name}]</sup></a>: ${content}</small>`
      )
  },
  {
    type: 'lang',
    filter: (text) =>
      text.replace(
        /\[\^([\d\w]+)\]/gm,
        (_str, name) =>
          `<a href="#reference-${name}" class="reference-link" id="reference-${name}-backlink"><sup>[${name}]</sup></a>`
      )
  },
  // Footnotes - E.g:
  // Help I am trapped in this code(1).
  // (1): I'm not actually trapped
  // http://rauschma.github.io/html_demos/footnotes.html
  {
    type: 'lang',
    filter: (text) =>
      text.replace(/^\(\^([\d\w]+)\):\s*(.*)$/gm, (_str, name, content) => {
        return `<div class="footnote footnote-body" id="footnote-${name}-body"><sup>(${name})</sup> ${content}</div>`;
      })
  },
  {
    type: 'lang',
    filter: (text) =>
      text.replace(
        /\(\^([\d\w]+)\)/gm,
        (_str, name) =>
          `<span class="footnote footnote-link" id="footnote-${name}"><sup>(${name})</sup></span>`
      )
  }
];
