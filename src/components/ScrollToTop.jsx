const ScrollToTop = () => {
  window.addEventListener('scroll', function () {
    let scroll = document.querySelector('.scrollTop')
    scroll.classList.toggle('active', window.scrollY > 300)
  })
  return (
    <div
      className='scrollTop'
      onClick={() => {
        window.scrollTo({
          top: 0,
        })
      }}
    ></div>
  )
}

export default ScrollToTop
