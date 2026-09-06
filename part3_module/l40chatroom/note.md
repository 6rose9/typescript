### exports is not defined

``` text
Uncaught ReferenceError: exports is not defined
    <anonymous> http://127.0.0.1:5500/part3_module/l40chatroom/dist/app.js:2

``` 

- app.js combines seperated js files using exports (commonjs module system)

- Typescript targets ESM and then generates commonjs (defined by tsconfig.json)
- Browser doesn't support standalone commonjs module
- Need buddled JS tool (webpack/vite/...)

or

An alternative is changing TypeScript to emit ES modules:

`"module": "esnext"`
`"moduleResolution": "bundler"`

```text 
<script type="module" src="./app.js"></script>
```

---

### Webpack build error:

```text
TS2307: Cannot find module '!../node_modules/style-loader/...'
```

Why:

- `style-loader` and `css-loader` were included in the rule for `.ts` files.
- Webpack therefore treated `app.ts` as CSS and passed loader-generated CSS runtime code to `ts-loader`.
- TypeScript could not resolve those generated loader imports.

Solution:

- Use `ts-loader` only for `.ts` files.
- Add a separate `.css` rule using `style-loader` and `css-loader`.
- Import the stylesheet from the TypeScript entry file, for example:

```ts
import "../css/style.css";
```

- Add a declaration such as `src/style.d.ts`:

```ts
declare module "*.css";
```

Then build and run through webpack instead of opening `dist/app.js` directly:

```bash
npm run build
npm run dev
```

Open `http://localhost:3000`. Webpack generates `dist/bundle.js` and handles the CommonJS modules for the browser.

---

### HTML copy issue:

- `HtmlWebpackPlugin` copies the template `index.html` into the webpack output folder.
- Because the output folder is `dist`, webpack creates another file at `dist/index.html`.
- This can be confusing when the real project page is the root `index.html`; opening the copied file directly may also use a different relative path for `bundle.js`.
- After `dist/index.html` is removed, opening it gives a missing-file error because it is no longer generated.

Solution:

- Keep the source page at the project root: `index.html`.
- Remove `HtmlWebpackPlugin` when the HTML page should not be copied into `dist`.
- Load the webpack output from the root page:

```html
<script src="./dist/bundle.js"></script>
```

- Serve the project with webpack so the root page and generated bundle are available together:

```bash
npm run build
npm run dev
```

Open `http://localhost:3000`, not `dist/index.html`.

---

### Why `tsc -w` is not needed:

- `tsc -w` watches TypeScript files and emits separate `.js` files into the `dist` folder.
- With `"module": "commonjs"`, `tsc -w` output uses the CommonJS module system and is not the browser-ready bundle.
- Webpack already watches the source files, runs `ts-loader`, processes CSS, combines all modules, and creates `dist/bundle.js`.
- Running both watchers can create duplicate or confusing output files, webpack does not use the individual JavaScript files emitted by `tsc -w`.

Use webpack's watch/dev server instead:

```bash
npx tsc -w
```

Use only the bundled file from the root page:

```html
<script src="./dist/bundle.js"></script>
```

Do not load files such as `dist/app.js` directly. If you run `tsc -w` for learning or type-checking, treat its emitted files as temporary compiler output and do not use them in the browser.

---

### Firebase Subscription vs. SQL Connection

**Core Purpose (The Similarity)**
* Both serve as the **entry gateway/bridge** between your app and the database.
* Both rely on an initial **network handshake** (authentication & security) to establish communication. Without either mechanism, your app cannot send or receive data.


**Terminology**
* **`onSnapshot()`**: The literal Firebase function you execute in code.
* **Subscription**: The active, live real-time connection created when `onSnapshot()` runs.
* **`unsubscribe()`**: The cleanup function returned by `onSnapshot()` used to close the connection.


**Key Differences**

| Feature | SQL Connection | Firebase Subscription (`onSnapshot`) |
| :--- | :--- | :--- |
| **Model** | **Pull** (Request-Response) | **Push** (Real-Time Event Stream) |
| **Lifetime** | Short-lived (Executes a query, then closes or returns to a pool). | Long-lived (Keeps an active WebSocket connection open). |
| **Responsibility** | **Your App** must manually ask for updates repeatedly. | **Firebase** automatically monitors changes and pushes updates to your app. |


**Best Practice** : Clean up connections:** Always call `unsubscribe()` when leaving a page or unmounting a component to avoid memory leaks and unnecessary Firebase billing reads.

---