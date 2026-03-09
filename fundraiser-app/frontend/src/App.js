import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [fundraisers, setFundraisers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  const [donationInputs, setDonationInputs] = useState({});

  /* ======================
     FETCH FUNDRAISERS
  ====================== */

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/fundraisers")
      .then((res) => {
        setFundraisers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  /* ======================
     CREATE FUNDRAISER
  ====================== */

  const createFundraiser = () => {
    if (!title || !description || !goalAmount) {
      alert("Please fill all fields");
      return;
    }

    axios
      .post("http://localhost:5000/api/fundraisers", {
        title,
        description,
        goalAmount,
      })
      .then((res) => {
        setFundraisers([...fundraisers, res.data]);
        setTitle("");
        setDescription("");
        setGoalAmount("");
      })
      .catch((err) => console.log(err));
  };

  /* ======================
     DONATE
  ====================== */

  const donate = (id) => {
    const amount = donationInputs[id];

    if (!amount || amount <= 0) {
      alert("Enter valid donation amount");
      return;
    }

    axios
      .post(`http://localhost:5000/api/fundraisers/donate/${id}`, {
        amount: Number(amount),
      })
      .then((res) => {
        setFundraisers(
          fundraisers.map((f) => (f._id === id ? res.data : f))
        );

        setDonationInputs({
          ...donationInputs,
          [id]: "",
        });
      })
      .catch((err) => console.log(err));
  };

  /* ======================
     UPDATE FUNDRAISER
  ====================== */

  const updateFundraiser = (id) => {
    const newTitle = prompt("Enter new title");
    const newDescription = prompt("Enter new description");
    const newGoal = prompt("Enter new goal amount");

    if (!newTitle || !newDescription || !newGoal) {
      alert("All fields required");
      return;
    }

    axios
      .put(`http://localhost:5000/api/fundraisers/${id}`, {
        title: newTitle,
        description: newDescription,
        goalAmount: newGoal,
      })
      .then((res) => {
        setFundraisers(
          fundraisers.map((f) => (f._id === id ? res.data : f))
        );
      })
      .catch((err) => console.log(err));
  };

  /* ======================
     DELETE FUNDRAISER
  ====================== */

  const deleteFundraiser = (id) => {

  if (!window.confirm("Delete this fundraiser?")) return;

  axios
    .delete(`http://localhost:5000/api/fundraisers/${id}`)
    .then(() => {

      setFundraisers(
        fundraisers.filter((f) => f._id !== id)
      );

    })
    .catch(err => console.log(err));
};

  return (
    <div className="container">

      <h1>Fundraisers</h1>

      {/* CREATE FUNDRAISER */}

      <div className="form">
        <h2>Create Fundraiser</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Goal Amount"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
        />

        <button onClick={createFundraiser}>Create</button>
      </div>

      {/* FUNDRAISER LIST */}

      <div className="cards">

        {fundraisers.map((f) => (

          <div className="card" key={f._id}>

            <h3>{f.title}</h3>

            <p>{f.description}</p>

            <p>Goal: ₹{f.goalAmount}</p>

            <p>Raised: ₹{f.raisedAmount}</p>

            <progress
              value={f.raisedAmount}
              max={f.goalAmount}
            ></progress>

            {/* DONATION */}

            <input
              placeholder="Donation Amount"
              value={donationInputs[f._id] || ""}
              onChange={(e) =>
                setDonationInputs({
                  ...donationInputs,
                  [f._id]: e.target.value,
                })
              }
            />

            <button onClick={() => donate(f._id)}>
              Donate
            </button>

            {/* EDIT */}

            <button onClick={() => updateFundraiser(f._id)}>
              Edit
            </button>

            {/* DELETE */}

            <button onClick={() => deleteFundraiser(f._id)}>
  Delete
</button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;