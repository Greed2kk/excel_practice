import { $ } from '@core/dom'

export function resizeHandler($root, e) {
  return new Promise(resolve => {
    const $resizer = $(e.target)
    // const $parent = $resizer.$el.parentNode //bad
    // const $parent = $resizer.$el.closest('.column') //better
    const $parent = $resizer.closest(
      '[data-type="resizable"]'
    )
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    const sideOffset =
      type === 'col'
        ? $root.$el.offsetHeight
        : $root.$el.offsetWidth
    $resizer.css({
      opacity: 1,
      [sideProp]: `${-sideOffset}px`,
    })
    let value
    document.onmousemove = event => {
      if (type === 'col') {
        const delta = Math.floor(event.pageX - coords.right)
        value = coords.width + delta
        $resizer.css({ right: `${-delta}px` })
      } else {
        const delta = Math.floor(
          event.pageY - coords.bottom
        )
        value = coords.height + delta
        $resizer.css({ bottom: `${-delta}px` })
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      if (type === 'col') {
        $parent.css({ width: `${value}px` })
        $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => (el.style.width = `${value}px`))
      } else {
        $parent.css({ height: `${value}px` })
      }

      resolve({
        value,
        id: type === 'col' ? $parent.data.col : null,
      })
      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      })
    }
  })
}
