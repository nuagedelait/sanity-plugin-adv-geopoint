# sanity-plugin-adv-geopoint

> This is a **Sanity Studio v3** plugin.

## Installation

```sh
npm install sanity-plugin-tabs
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {myPlugin} from 'sanity-plugin-tabs'

export default defineConfig({
  //...
  plugins: [myPlugin({})],
})
```

## License

[BSD 3-Clause "New" or "Revised"](LICENSE) © nuagedelait

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
