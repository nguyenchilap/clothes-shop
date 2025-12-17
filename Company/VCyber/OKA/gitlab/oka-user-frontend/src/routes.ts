import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  // Login is the default page
  index('views/login/index.tsx'),
  route('/dang-nhap', 'views/login/index.tsx'),
  route('/thu-muc', 'views/folder/index.tsx'),
  route('/thung-rac', 'views/trash/index.tsx')
] satisfies RouteConfig
