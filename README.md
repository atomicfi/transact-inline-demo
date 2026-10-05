# Transact inline demo

Two small apps, one in React and one in Vue 3, that embed Transact in a page with `theme.display: "inline"` instead of opening it as a modal. Each directory's README covers setup.

The `.npmrc` in each app points the `@atomicfi` scope at the public npm registry, so installs work on machines that map `@atomicfi` to GitHub Packages.

## Inline mode notes

- `close()` and the SDK's own finish/close handling detach the message listener but leave an inline iframe in its container. Both apps empty the container on unmount.
- The SDK keeps one module-level message listener, so only one Transact instance can be live at a time.
- The JS SDK tells Transact it's inside an app (`inSdk: true`) unless the config says otherwise. Inline on a web page, that shows Transact's own close and return buttons, and using them leaves the iframe frozen. The React demo sets `inSdk: false` to hide them; the Vue demo still uses the default.
