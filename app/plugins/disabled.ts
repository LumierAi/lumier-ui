export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('disabled', {
    mounted(el, { value }) {
      if (!value)
        return
      el.classList.add('relative')
      const div = document.createElement('div')
      div.classList.add('absolute', 'size-full', 'z-10', 'top-0', 'left-0', 'bg-current', 'opacity-[0.08]')
      el.appendChild(div)
    },
    updated(el, { value }) {
      const div = el.querySelector('div.absolute.size-full.z-10.top-0.left-0.bg-current')
      if (value) {
        div?.classList.remove('hidden')
      }
      else {
        div?.classList.add('hidden')
      }
    },
  })
})
