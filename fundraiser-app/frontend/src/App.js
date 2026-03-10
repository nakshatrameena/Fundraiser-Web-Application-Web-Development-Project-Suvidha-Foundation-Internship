import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "https://Fundraiser-Web-Application-Web-Development-Project-Suvidha-Foundation-Internship.onrender.com/api";
function App() {
  /* ======================
     STATES
  ====================== */
  
  const [fundraisers, setFundraisers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  // Fundraiser creation
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  // Campaign creation
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignGoal, setCampaignGoal] = useState("");
  const [creatorName, setCreatorName] = useState("");

  // Donation inputs
  const [donationInputs, setDonationInputs] = useState({});
  const [donationInputsCampaign, setDonationInputsCampaign] = useState({});

  /* ======================
     FETCH FUNDRAISERS & CAMPAIGNS
  ====================== */

  useEffect(() => {
    // Fundraisers
    axios
      .get(`${API}/fundraisers`)
      .then((res) => setFundraisers(res.data))
      .catch((err) => console.log(err));

    // Campaigns
    axios
      .get(`${API}/campaigns`)
      .then((res) => setCampaigns(res.data))
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
      .post(`${API}/fundraisers`, { title, description, goalAmount })
      .then((res) => {
        setFundraisers([...fundraisers, res.data]);
        setTitle(""); setDescription(""); setGoalAmount("");
      })
      .catch((err) => console.log(err));
  };

  /* ======================
     CREATE CAMPAIGN
  ====================== */

  const createCampaign = async () => {
  const campaign = {
    title: title,
    description: description,
    goalAmount: goalAmount,
  };

  try {
    const res = await fetch(
      "https://fundraiser-web-application-web.onrender.com/api/campaigns",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaign),
      }
    );

    const data = await res.json();
    console.log(data);
    alert("Campaign created successfully!");
  } catch (error) {
    console.error(error);
    alert("Error creating campaign");
  }
};

  /* ======================
     DONATE FUNCTIONS
  ====================== */
  const donate = (id) => {
    const amount = donationInputs[id];
    if (!amount || amount <= 0) {
      alert("Enter valid donation amount");
      return;
    }

    axios
      .post(`${API}/fundraisers/donate/${id}`, { amount: Number(amount) })
      .then((res) => {
        setFundraisers(fundraisers.map((f) => (f._id === id ? res.data : f)));
        setDonationInputs({ ...donationInputs, [id]: "" });
      })
      .catch((err) => console.log(err));
  };

  const donateToCampaign = (id) => {
    const amount = donationInputsCampaign[id];
    if (!amount || amount <= 0) {
      alert("Enter valid donation amount");
      return;
    }

    axios
      .post(`http://localhost:5000/api/campaigns/donate/${id}`, { amount: Number(amount) })
      .then((res) => {
        setCampaigns(campaigns.map((c) => (c._id === id ? res.data : c)));
        setDonationInputsCampaign({ ...donationInputsCampaign, [id]: "" });
      })
      .catch((err) => console.log(err));
  };

  /* ======================
     UPDATE FUNCTIONS
  ====================== */
  const updateFundraiser = (id) => {
    const newTitle = prompt("Enter new title");
    const newDescription = prompt("Enter new description");
    const newGoal = prompt("Enter new goal amount");

    if (!newTitle || !newDescription || !newGoal) { alert("All fields required"); return; }

    axios
      .put(`http://localhost:5000/api/fundraisers/${id}`, { title: newTitle, description: newDescription, goalAmount: newGoal })
      .then((res) => setFundraisers(fundraisers.map((f) => (f._id === id ? res.data : f))))
      .catch((err) => console.log(err));
  };

  const updateCampaign = (id) => {
    const newTitle = prompt("Enter new title");
    const newDescription = prompt("Enter new description");
    const newGoal = prompt("Enter new goal amount");

    if (!newTitle || !newDescription || !newGoal) { alert("All fields required"); return; }

    axios
      .put(`http://localhost:5000/api/campaigns/${id}`, { title: newTitle, description: newDescription, goalAmount: newGoal })
      .then((res) => setCampaigns(campaigns.map((c) => (c._id === id ? res.data : c))))
      .catch((err) => console.log(err));
  };

  /* ======================
     DELETE FUNCTIONS
  ====================== */
  const deleteFundraiser = (id) => {
    if (!window.confirm("Delete this fundraiser?")) return;
    axios
      .delete(`${API}/fundraisers/${id}`)
      .then(() => setFundraisers(fundraisers.filter((f) => f._id !== id)))
      .catch((err) => console.log(err));
  };

  const deleteCampaign = (id) => {
    if (!window.confirm("Delete this campaign?")) return;
    axios
      .delete(`http://localhost:5000/api/campaigns/${id}`)
      .then(() => setCampaigns(campaigns.filter((c) => c._id !== id)))
      .catch((err) => console.log(err));
  };

  /* ======================
     RENDER
  ====================== */
  return (
    <div className="container">
      <h1>Create Campaign</h1>
      <input placeholder="Title" value={campaignTitle} onChange={(e) => setCampaignTitle(e.target.value)} />
      <textarea placeholder="Description" value={campaignDescription} onChange={(e) => setCampaignDescription(e.target.value)} />
      <input placeholder="Goal Amount" type="number" value={campaignGoal} onChange={(e) => setCampaignGoal(e.target.value)} />
      <input placeholder="Creator Name" value={creatorName} onChange={(e) => setCreatorName(e.target.value)} />
      <button onClick={createCampaign}>Create Campaign</button>

      <h1>Campaigns</h1>
      <div className="cards">
        {campaigns.map((c) => (
          <div className="card" key={c._id}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <p>Goal: ₹{c.goalAmount}</p>
            <p>Raised: ₹{c.raisedAmount}</p>
            <progress value={c.raisedAmount} max={c.goalAmount}></progress>

            <input
              placeholder="Donation Amount"
              value={donationInputsCampaign[c._id] || ""}
              onChange={(e) =>
                setDonationInputsCampaign({ ...donationInputsCampaign, [c._id]: e.target.value })
              }
            />
            <button onClick={() => donateToCampaign(c._id)}>Donate</button>
            <button onClick={() => updateCampaign(c._id)}>Edit</button>
            <button onClick={() => deleteCampaign(c._id)}>Delete</button>
          </div>
        ))}
      </div>

      <h1>Create Fundraiser</h1>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input placeholder="Goal Amount" type="number" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} />
      <button onClick={createFundraiser}>Create Fundraiser</button>

      <h1>Fundraisers</h1>
      <div className="cards">
        {fundraisers.map((f) => (
          <div className="card" key={f._id}>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
            <p>Goal: ₹{f.goalAmount}</p>
            <p>Raised: ₹{f.raisedAmount}</p>
            <progress value={f.raisedAmount} max={f.goalAmount}></progress>

            <input
              placeholder="Donation Amount"
              value={donationInputs[f._id] || ""}
              onChange={(e) => setDonationInputs({ ...donationInputs, [f._id]: e.target.value })}
            />
            <button onClick={() => donate(f._id)}>Donate</button>
            <button onClick={() => updateFundraiser(f._id)}>Edit</button>
            <button onClick={() => deleteFundraiser(f._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;