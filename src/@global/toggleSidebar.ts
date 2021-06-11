import { Status } from 'ts-type-util'

const toggleSidebar = (): Status => {
  const root = document.getElementById('root')
  const toggler = document.getElementById('sidebar-toggler')
  const navItemSidebar = document.getElementById('nav-main-sidebar')
  if (!root || !toggler || !navItemSidebar) return 1

  document.getElementById('root')?.classList.toggle('move')
  document.getElementById('sidebar-toggler')?.classList.toggle('sidebar-toggler--appear')
  document.getElementById('nav-main-sidebar')?.classList.toggle('nav-main--active')
  return 0
}

export default toggleSidebar
