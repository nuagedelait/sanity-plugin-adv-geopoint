import { definePlugin } from 'sanity'
import schemas from './schemas';

/** @public */
export interface Tabs {
  /* nothing here yet */
}

/** @public */
export const Tabs = definePlugin<Tabs | void>((config = {}) => {
  // eslint-disable-next-line no-console
  console.log('hello from sanity-plugin-tabs')
  return {
    name: 'sanity-plugin-tabs',
    schema: {
      types: schemas,
    },
  }
})
