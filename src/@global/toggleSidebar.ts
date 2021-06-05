const toggleSidebar = () => {
  document.getElementById('root')?.classList.toggle('move')
  document.getElementById('sidebar-toggler')?.classList.toggle('sidebar-toggler--appear')
  document.getElementById('nav-main-sidebar')?.classList.toggle('nav-main--active')
}

export default toggleSidebar
