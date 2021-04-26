"use strict";

export const prettify = () => [
  {
    type: "output",
    filter: function (source) {
      return source.replace(/(<pre[^>]*>)?[\n\s]?<code([^>]*)>/gi, function (
        match,
        pre,
        codeClass
      ) {
        if (pre) {
          return '<pre class="prettyprint linenums"><code' + codeClass + ">";
        } else {
          return ' <code class="prettyprint">';
        }
      });
    },
  },
];
