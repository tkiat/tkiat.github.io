const toggleSidebar = () => {
  document.getElementById('root')!.classList.toggle('move')
  document.getElementById('sidebar-toggler')!.classList.toggle('sidebar-toggler--appear')
  document.getElementById('duck-sidebar')!.classList.toggle('duck--active')
}

export default toggleSidebar
