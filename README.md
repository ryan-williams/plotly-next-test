# plotly.js / next.js issues

**Update:** it seems like the errors in the latter two pages below manifest on macOS but not Linux, possibly due to macOS filesystem case-insensitivity.

Boot dev mode:
```bash
next dev
```

Visit:
- [127.0.0.1:3000](http://127.0.0.1:3000):
  - Renders a plot, though `react-plotly.js` is loaded asynchronously after the rest of the page
  - See [pages/index.js](pages/index.js)
- [127.0.0.1:3000/to-image](http://127.0.0.1:3000/to-image)
  - Attempts to lazily import `plotly.js` (per [docs example]())
  - Errors while importing [this line in `nodeca/probe-image-size@7.2.3/lib/parse_stream/avif.js`](https://github.com/nodeca/probe-image-size/blob/7.2.3/lib/parse_stream/avif.js#L20)
  - `require('probe-image-size/lib/common')` returns an empty object
- [127.0.0.1:3000/probe-image-size-import](http://127.0.0.1:3000/probe-image-size-import)
  - Simplest example: page fails to load due to (unused) `import common from "probe-image-size/lib/common"`
