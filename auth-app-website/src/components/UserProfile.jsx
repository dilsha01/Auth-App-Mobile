import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
