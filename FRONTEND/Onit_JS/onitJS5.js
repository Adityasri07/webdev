class TaskScheduler {
  constructor(maxConcurrent = 2) {
    this.maxConcurrent = maxConcurrent;
    this.queue = [];
    this.activeCount = 0;
  }

  async runTask(task) {
    this.activeCount++;
    try {
      const result = await task();
      return result;
    } finally {
      this.activeCount--;
      this._next();
    }
  }

  add(task) {
    return new Promise(resolve => {
      const wrapped = async () => {
        const res = await this.runTask(task);
        resolve(res);
      };

      if (this.activeCount < this.maxConcurrent) {
        wrapped();
      } else {
        this.queue.push(wrapped);
      }
    });
  }

  _next() {
    if (this.queue.length > 0 && this.activeCount < this.maxConcurrent) {
      const nextTask = this.queue.shift();
      nextTask();
    }
  }
}

// Example usage
(async () => {
  const scheduler = new TaskScheduler(2); // only 2 tasks at once

  const fakeTask = (id, delay) => async () => {
    console.log(`🚀 Starting task ${id}`);
    await new Promise(r => setTimeout(r, delay));
    console.log(`✅ Finished task ${id}`);
    return `Task ${id} done`;
  };

  // Add tasks
  const results = await Promise.all([
    scheduler.add(fakeTask(1, 2000)),
    scheduler.add(fakeTask(2, 1000)),
    scheduler.add(fakeTask(3, 1500)),
    scheduler.add(fakeTask(4, 500)),
    scheduler.add(fakeTask(5, 3000)),
  ]);

  console.log("All results:", results);
})();
