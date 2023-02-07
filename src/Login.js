import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { onValue, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const Login = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const currentDate = moment().format("DD MMM YYYY");

  useEffect(() => {
    onValue(ref(db, "users"), (snapshot) => {
      setUsers(
        Object.entries(snapshot.val()).map(([userId, userData]) => ({
          userId,
          ...userData,
        }))
      );
      // console.log(users);
      // console.log(snapshot.val());
    });
  }, []);

  const handleLogin = (username, password) => {
    //Iteration
    console.log(username);
    console.log(password);
    users.forEach((snapshot) => {
      // console.log(snapshot);

      if (snapshot.EmpID === username && snapshot.password === password) {
        console.log("correct password and username");
        const { Name, EmpID, userId } = snapshot;
        set(ref(db, `users/${userId}/Login`), "Yes");

        onValue(
          ref(db, `users/${userId}/Activity/${currentDate}/Login`),
          (snapshot) => {
            if (!snapshot.exists()) {
              set(
                ref(db, `users/${userId}/Activity/${currentDate}/Login`),
                moment().format("HHmm")
              ).then(
                set(ref(db, `users/${userId}/Activity/${currentDate}/Status`), {
                  Idle: "1",
                  OnMail: "0",
                  Meeting: "0",
                  Break: "0",
                })
              );
              const dashboardurl = `Dashboard/${Name}/${userId}`;
              navigate(dashboardurl, { state: { Name, EmpID, userId } });

              return;
            } else {
              set(ref(db, `users/${userId}/Activity/${currentDate}/Status`), {
                Idle: "1",
                OnMail: "0",
                Meeting: "0",
                Break: "0",
              });
              const dashboardurl = `Dashboard/${Name}/${userId}`;
              navigate(dashboardurl, { state: { Name, EmpID, userId } });
              return;
            }
          },

          {
            onlyOnce: true,
          }
        );
      } else {
        console.log("Wrong password or username");
      }
    });
    return;
  };
  return (
    <>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="te"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          console.log(password);
        }}
      />
      <button onClick={() => handleLogin(username, password)}>Login</button>
    </>
  );
};

export default Login;
