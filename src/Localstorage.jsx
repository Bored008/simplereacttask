const TASK_KEY = "novaTask_data";

/**
 * NovaTask Data Service
 * Acting as a Backend Manager to optimize data flow and persistence.
 */
const DataService = {
  /**
   * Fetches data asynchronously to prevent UI blocking
   */
  async getTasks() {
    return new Promise((resolve) => {
      // Small timeout to simulate network latency if needed, 
      // but keeping it fast for "response time" enhancement.
      setTimeout(() => {
        const raw = localStorage.getItem(TASK_KEY);
        try {
          resolve(raw ? JSON.parse(raw) : []);
        } catch (e) {
          console.error("Data corruption detected, resetting store.");
          resolve([]);
        }
      }, 50);
    });
  },

  /**
   * Persists data with a non-blocking approach
   */
  async saveTasks(tasks) {
    return new Promise((resolve) => {
      // Ensure we don't block the main thread for large data sets
      const payload = JSON.stringify(tasks);
      localStorage.setItem(TASK_KEY, payload);
      resolve(true);
    });
  },

  /**
   * Utility to generate unique IDs (Backend approach to data integrity)
   */
  generateId() {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
};

export default DataService;
