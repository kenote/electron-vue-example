import { RouteConfig } from 'vue-router'

const settingRoutes: RouteConfig[] = [
  {
    path: '/setting',
    name: 'setting',
    component: () => import('~/renderer/views/setting')
  }
]

export default settingRoutes