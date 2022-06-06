// import React, { useEffect, useState, Fragment } from "react";
// import Axios from "../libraries/Axios";
// import Spinner from "./Spinner";
// const Employees = () => {
//   let [emp, setEmp] = useState([]);
//   let [loading, setLoading] = useState(false);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let body = await Axios.get("/users");
//         let { data } = body;
//         setEmp(data);
//         setLoading(true);
//       } catch (error) {
//         console.log(error);
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, []);
//   return (
//     <Fragment>
//       {loading ===true ? (
//         <Spinner />
//       ) : (
//         emp.map(user => {
//           return (
//             <Fragment key={user.id}>
//               <h2>{user.name}</h2>
//             </Fragment>
//           );
//         })
//       )}
//     </Fragment>
//   );
// };

// export default Employees;


import React, { useEffect, useState, Fragment } from "react";
import Axios from "../libraries/Axios";
import Spinner from "./Spinner";
import { Link } from 'react-router-dom';
import { FcEditImage, FcFullTrash } from "react-icons/fc";


const Employees = () => {
  let [emp, setEmp] = useState([]);
  let [loading, setLoading] = useState(false);


  let removeEmp = async (id) => {
    await Axios.delete(`/employees/${id}`);
    window.location.assign("/");
  }



  useEffect(() => {
    const fetchEmp = async () => {
      try {
        let payload = await Axios.get("/employees");
        let { data } = payload;
        setEmp(data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchEmp();
  }, []);



  return (
    <section id="empTable">
      <article>
        <table>
          <thead>
            <tr>
              <th>emp id</th>
              <th>emp name</th>
              <th>Designation</th>
              <th>
                <Link to="#">Edit</Link>
              </th>
              <th>
                <Link to="#">Delete</Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Spinner />
            ) : (
              emp.map(user => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.designation}</td>
                    <td>
                      <Link to={`/edit-emp/${user.id}`}>
                        <span>
                          <FcEditImage />
                        </span>
                        <span>Edit</span>
                      </Link>
                    </td>
                    <td onClick={() => removeEmp(user.id)}>
                      {/* <Link to={`/delete-emp/${id}`}> */}
                        <span>
                          <FcFullTrash />
                        </span>
                        <span>
                          Delete
                        </span>
                      {/* </Link> */}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
};

export default Employees;
