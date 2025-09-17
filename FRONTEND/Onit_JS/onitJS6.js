// Advanced JavaScript in ONE piece

// Generator for unique IDs
function* idGen() {
  let id = 1;
  while (true) yield id++;
}
const gen = idGen();

// User factory with closure + Proxy + descriptors
function createUser(name, age) {
  let secret = "TOP-SECRET";

  const user = {
    id: gen.next().value,
    name,
    age,
    getSecret: () => secret, // closure
  };

  // Hide `secret` from enumeration
  Object.defineProperty(user, "getSecret", {
    enumerable: false,
  });

  return new Proxy(user, {
    get(target, prop) {
      return prop in target ? target[prop] : "No such property!";
    },
    set(target, prop, value) {
      if (prop === "age" && value < 0) throw new Error("Age must be positive");
      target[prop] = value;
      return true;
    }
  });
}

// Async simulation of fetching user
async function showUser() {
  const u = createUser("Aditya", 18);

  console.log("User created:", u.name, "| ID:", u.id);
  console.log("Hidden Secret:", u.getSecret());

  // Async call
  await new Promise(res => setTimeout(res, 1000));
  console.log("After async delay →", u.email); // Proxy intercepts
}

showUser();
