/***
 * Collection of utility functions used by Magebook but not strictly related to it.
 */
import {writable} from 'svelte/store'





/** Generate random string of given lenght.
Default alphabet includes digits, upper and lower case chars. */
export const randomString = (length : number, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => {
  let   result           = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}





/** Shuffle array in-place. Taken from https://javascript.info/task/shuffle */
export const shuffleArray = <T>(array : T[])=> {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
}





/** Check if n is natural number */
export const isNatNumber = (n : number) => (n > 0 || String(n) === "0") && Math.floor(n) === +n





/** Debounced Svelte Store
Same as Svelte Stores, but result is updated only if result is stable since millis */
export const debounced = <T>(millis : number, defaultValue: T = null)  => {
  let timer : ReturnType<typeof setTimeout>
	let value = defaultValue
  const { subscribe, set } = writable(defaultValue); 

  const flush = () => {
    clearTimeout(timer)
    set(value)
    return value
  }

	return {
		subscribe,
    flush,
    get: flush,
    set: (newValue: T) => {
      value = newValue
      flush()
    },
    lazySet: (newValue: T) => {
      value = newValue
      clearTimeout(timer);
      timer = setTimeout(() => {
        set(value)
      }, millis);
    },
	};
}





/** Completely absorb and prevent click propagation */
export const preventClickPropagation = (node : HTMLElement) => {
  // Helper function 
  const absorbEvent_ = (event : Event) => {
    var e = event || window.event;
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble = true;
  }

  node.ontouchstart = absorbEvent_;
  node.ontouchmove = absorbEvent_;
  node.ontouchend = absorbEvent_;
  node.ontouchcancel = absorbEvent_;
}
