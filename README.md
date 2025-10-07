# Rsbuild project

## App

App to practice and learn Single Page Application Optimization
By utilizing service worker, cache control, and different technique to improve page load performance to have to web vital
[following The case study in this Article](https://github.com/theninthsky/client-side-rendering?tab=readme-ov-file)

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get started

Start the dev server, and the app will be available at [http://localhost:3000](http://localhost:3000).

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

# Caching & Performance Optimization Guide

## Key Concepts

<details>
<summary><strong>1. Browser Caching Strategy (max-age & Revalidation)</strong></summary>

<br>

The browser handles caching differently for your main HTML file versus versioned assets:

- **index.html**: The browser sets `max-age=0`, which forces it to check with the server every time. This is called revalidation - the browser sends a conditional request using ETag or Last-Modified headers. The server then decides whether to send back a fresh copy (200) or tell the browser to use its cached version (304).

- **Versioned Assets** (like `app.abc123.js`): These use whatever `max-age` you configure. The browser doesn't revalidate - it just serves from cache until the time expires. Once expired, it makes a conditional request to decide between cache or server.

</details>

<details>
<summary><strong>2. Runtime Chunk (Rspack Configuration)</strong></summary>

<br>

Runtime code is a small piece that the bundler injects into your app to make everything work together. It handles:

- Connecting different modules
- Resolving dependencies between files
- Managing dynamic imports (lazy loading)

By separating this into its own chunk, you keep it isolated from your main application code.

</details>

<details>
<summary><strong>3. Vendor Chunks (Third-Party Libraries)</strong></summary>

<br>

We create a separate chunk called "vendor" that contains all your `node_modules` code. Here's why this matters:

- Your own code changes frequently, but libraries like React and React Query stay the same
- When users revisit your site, only the main chunk (your code) downloads from the server
- Vendor code loads from cache, making the site faster

**Pro tip**: You can create individual chunks for each library. This way, when you add a new library, only that new code needs to download. Some smaller libraries might stay bundled together based on the size threshold set by your bundler.

</details>

<details>
<summary><strong>4. Async Chunks (Code Splitting Strategy)</strong></summary>

<br>

With `chunks: 'initial'`, each lazy-loaded component is processed separately. That's why something like `react-big-calendar` gets bundled together with `contact.jsx` instead of going into a shared vendor chunk.

Switch to `chunks: 'all'` to create optimized bundles for both synchronous code and async code (like lazy-loaded components). This creates better vendor splitting across your entire app.

</details>

<details>
<summary><strong>5. Preloading Async Pages</strong></summary>

<br>

Normally, when your main JavaScript loads, it then starts downloading page-specific code like `home.js`. We can do better:

Using Rspack's HTML inject feature, we can download the home page JavaScript at the same time as the main bundle:

- We hook into the build process to get all asset paths
- Map these assets to their corresponding routes
- Inject a small script into the HTML that checks the current URL
- Add `<link rel="preload">` tags for the matching page assets

**Result**: Your home page JavaScript downloads in parallel with the main bundle.

</details>

<details>
<summary><strong>6. Splitting Async Vendors by Page</strong></summary>

<br>

By default, vendor code for lazy-loaded pages only downloads after the page JavaScript loads. We can improve this:

Create vendor chunks based on which pages use them. For example, if both the About and Contact pages use Day.js, create a single `about+contact` chunk containing Day.js. Now this vendor chunk can download in parallel with the page chunks.

Using the injectAssets plugin, we map vendors to routes so we know which vendor chunks are needed for each page.

</details>

<details>
<summary><strong>7. Preloading Page Data</strong></summary>

<br>

Typically, page data only starts downloading after the page JavaScript executes. We can be smarter:

Since we know what data each page needs, we can create a page manifest that lists:

- Page URLs
- Required data endpoints

Then we fetch this data in parallel with the main JavaScript and page JavaScript downloads. When the page code executes, it finds the data already waiting in the cache.

</details>

---

**Note**: These optimizations work together to minimize wait time and maximize parallel downloads, resulting in faster page loads for your users.
