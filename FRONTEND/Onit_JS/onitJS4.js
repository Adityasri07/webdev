// Reactive state using Proxy
function createReactiveStore(initialState = {}) {
  const listeners = [];

  const proxy = new Proxy(initialState, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      const oldValue = target[prop];
      const result = Reflect.set(target, prop, value, receiver);

      if (oldValue !== value) {
        listeners.forEach(fn => fn(prop, value));
      }
      return result;
    }
  });

  proxy.subscribe = fn => listeners.push(fn);
  return proxy;
}

// Example usage
(async () => {
  const state = createReactiveStore({ user: null, posts: [] });

  // Subscribe to changes
  state.subscribe((key, value) => {
    console.log(`🔄 State changed: ${key} →`, value);
  });

  // Fake async data fetch
  async function fetchPosts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");
    return await res.json();
  }

  // Update state
  state.user = { id: 1, name: "Aditya" };

  const posts = await fetchPosts();
  state.posts = posts;

  // Modify again
  state.user = { id: 1, name: "Aditya Srivastava" };
})();
