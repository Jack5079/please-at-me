/* global open */

async function start (e, options) {
  let clicked = false
  const opts = options || `width=200,height=20, left=${e.screenX - 20}, top=${e.screenY - 100}`
  const win = open('about:blank', '', opts)
  win.document.body.style.margin = '0'
  win.document.body.innerHTML = `
  <input style="display: none" type="text" autofocus></input>
<a style="height: 100%; width: 100%; user-focus: none; display: block; background: black; color: white; text-align: center;" href="https://twitter.com/intent/tweet?text=@Jack5O79%20I%20like%20your%20website">Tweet to @Jack5o79</a>
`
  win.focus()
  win.document.querySelector('input').focus()
  win.document.title = document.title
  win.addEventListener('mousemove', e => {
    win.focus()
    win.document.querySelector('input').focus()
    if (!clicked) {
      win.resizeTo(200, 200)
      win.moveTo(e.screenX - 100, e.screenY - 100)
    }
  })

  win.document.querySelector('a').addEventListener('click', e => {
    win.document.querySelector('input').focus()
    clicked = true
    e.preventDefault()
    let i = 400
    let x = win.screenX
    let y = win.screenY
    setInterval(() => {
      i += 1
      if (x > 0 && y > 0) {
        x -= x / 10
        y -= x / 10
      }
      win.resizeTo(i, i)
      win.moveTo(x, y)
    }, 10)
    setTimeout(() => { start(e); win.location = e.target.href }, 1000)
  })

  win.addEventListener('keydown', key => {
    if (!key.repeat && (key.altKey || key.ctrlKey)) start(e, `width=${win.innerWidth},height=${win.innerHeight},left=${win.screenX},top=${win.screenY}`)
  })
}
document.querySelector('button').addEventListener('click', e => {
  start(e)
})
