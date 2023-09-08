import { createPinia } from 'pinia'
import type { App } from 'vue'
import useUserStore from './user/user'

const pinia = createPinia()
const registerStore = (app: App<Element>) => {
  app.use(pinia)

  const userStore = useUserStore()
  userStore.loadLocalCache()
}

export default registerStore
