import React, { useState } from "react";

const Problem1 = () => {
  // ------------States---------------
  const [show, setShow] = useState("all");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState([]);

  // ----------Show Tabs function------------
  const handleClick = (val) => {
    setShow(val);
  };

  // --------new Tasks add function---------
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { name, status };
    setTasks([...tasks, newTask]);
    setName("");
    setStatus("");
  };

  //--------sort by status--------------
  const sortedTasks = [...tasks].sort((a, b) => {
    const order = {
      Active: 1,
      active: 1,
      Completed: 2,
      completed: 2
    };

    const statusA = order[a.status] || 3;
    const statusB = order[b.status] || 3;

    if (statusA !== statusB) {
      return statusA - statusB;
    }

    return a.name.localeCompare(b.name);
  });

  //--------Filter Tasks by status---------
  const filteredTask =
    show === "active" ? sortedTasks.filter((task) => task.status.toLowerCase() === "Active".toLowerCase()) : show === "completed" ? sortedTasks.filter((task) => task.status.toLowerCase() === "Completed".toLowerCase()) : sortedTasks;

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
            <div className="col-auto">
              <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col-auto">
              <input type="text" className="form-control" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} required />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button className={`nav-link ${show === "all" && "active"}`} type="button" onClick={() => handleClick("all")}>
                All
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${show === "active" && "active"}`} type="button" onClick={() => handleClick("active")}>
                Active
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${show === "completed" && "active"}`} type="button" onClick={() => handleClick("completed")}>
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTask.map((task, idx) => (
                <tr key={idx}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
