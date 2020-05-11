import { RouteConfig } from 'vue-router'

const settingRoutes: RouteConfig[] = [
  {
    path: '/setting',
    name: 'setting',
    component: () => import('~/renderer/views/setting'),
    meta: {
      title: '设置'
    }
  }
]

export default settingRoutes