// EventEmitter (custom pub-sub system)
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(data));
    }
  }
}

// Fake API call with async/await
function fakeApiCall(msg, delay = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`✅ API Response: ${msg}`);
    }, delay);
  });
}

// Generator function (infinite IDs)
function* idGenerator() {
  let id = 1;
  while (true) yield id++;
}

// Main class
class TaskManager {
  constructor() {
    this.emitter = new EventEmitter();
    this.idGen = idGenerator();

    // Listen to events
    this.emitter.on("taskAdded", task => {
      console.log(`📝 Task added: [${task.id}] ${task.title}`);
    });

    this.emitter.on("taskDone", task => {
      console.log(`🎉 Task completed: [${task.id}] ${task.title}`);
    });
  }

  async addTask(title) {
    const task = { id: this.idGen.next().value, title };
    this.emitter.emit("taskAdded", task);

    // simulate API save
    const res = await fakeApiCall(`Saved task "${title}"`);
    console.log(res);

    return task;
  }

  async completeTask(task) {
    const res = await fakeApiCall(`Completed task "${task.title}"`, 500);
    console.log(res);

    this.emitter.emit("taskDone", task);
  }
}

// --- Usage ---
(async () => {
  const manager = new TaskManager();

  const t1 = await manager.addTask("Learn Differential Equations");
  const t2 = await manager.addTask("Build JS Project");

  await manager.completeTask(t1);
  await manager.completeTask(t2);
})();
