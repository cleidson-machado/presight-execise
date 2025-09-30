import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const styles = {
  container: { padding: "20px", fontFamily: "sans-serif" },
  list: { listStyle: "none", padding: 0 },
  listItem: {
    border: "1px solid #eee",
    padding: "10px",
    marginBottom: "5px",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
  },
  statusPending: { color: "orange" },
  statusCompleted: { color: "green" },
};

const WorkerPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("task-result", (result) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === result.id
            ? { ...task, status: "Completed", result: result.result }
            : task
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleStartProcessing = async () => {
    const initialTasks = Array.from({ length: 20 }, (_, i) => ({
      id: `task-${i + 1}`,
      status: "Pending",
      result: "...",
    }));
    setTasks(initialTasks);

    const requests = initialTasks.map((task) =>
      fetch(`/api/process-request/${task.id}`)
    );

    try {
      await Promise.all(requests);
      console.log(
        "All 20 requests have been sent and acknowledged as pending."
      );
    } catch (error) {
      console.error("Error sending requests:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Task 3: Web Worker & WebSockets</h2>
      <button onClick={handleStartProcessing}>Start 20 Requests</button>
      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.listItem}>
            <span>Request ID: {task.id}</span>
            <span
              style={
                task.status === "Pending"
                  ? styles.statusPending
                  : styles.statusCompleted
              }
            >
              {task.status === "Pending"
                ? "Status: Pending"
                : `Result: ${task.result}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkerPage;
