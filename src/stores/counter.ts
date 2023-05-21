export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function increase() {
    count.value++
  }
  function decrease() {
    count.value--
  }

  return {
    count,
    increase,
    decrease,
  }
})
