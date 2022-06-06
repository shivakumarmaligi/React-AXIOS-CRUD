import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from '../libraries/Axios';

const EditEmp = () => {

  let navigate = useNavigate();

  let { id } = useParams();
  let [name, setName] = useState("");
  let [designation, setDesignation] = useState("");
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    let fetchData = async () => {
      let payload = await Axios.get(`/employees/${id}`);
      let { data } = payload;
      let { name, designation } = data;
      setName(name);
      setDesignation(designation);
    };
    fetchData();
  }, [id]);

  let handleSubmit =  async e => {
    e.preventDefault();
    try {
      setLoading(true);
      let payload = { name, designation };
      await Axios.put(`/employees/${id}`, payload);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setName("");
    setDesignation("");
    setLoading(false);
  }


  return (
    <section id="authBlock">
      <article>
        <div>
          <h2>Update Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="emp_name">emp name</label>
              <input
                type="text"
                name="name"
                id="emp_name"
                value={name}
                required
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emp_dest">Designation</label>
              <input
                type="text"
                name="designation"
                id="emp_dest"
                value={designation}
                required
                onChange={e => setDesignation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button
                style={
                  loading === true
                    ? { background: "#fff", color: "#111" }
                    : { background: "yellow", color: "#111" }
                }
              >
                {loading === true ? "Updating..." : "Update Employee"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default EditEmp;
