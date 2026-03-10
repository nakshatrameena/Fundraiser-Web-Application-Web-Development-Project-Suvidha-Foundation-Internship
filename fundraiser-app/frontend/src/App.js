import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "https://fundraiser-web-application-web.onrender.com/api";

function App() {

  /* ======================
        STATES
  ====================== */

  const [fundraisers, setFundraisers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignGoal, setCampaignGoal] = useState("");
  const [creatorName, setCreatorName] = useState("");

  const [donationInputs, setDonationInputs] = useState({});
  const [donationInputsCampaign, setDonationInputsCampaign] = useState({});

  /* ======================
        LOAD DATA
  ====================== */

  const loadFundraisers = async () => {
    try {
      const res = await axios.get(`${API}/fundraisers`);
      setFundraisers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCampaigns = async () => {
    try {
      const res = await axios.get(`${API}/campaigns`);
      setCampaigns(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFundraisers();
    loadCampaigns();
  }, []);

  /* ======================
        CREATE FUNDRAISER
  ====================== */

  const createFundraiser = async () => {
    if (!title || !description || !goalAmount) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${API}/fundraisers`, {
        title,
        description,
        goalAmount
      });

      setFundraisers([...fundraisers, res.data]);

      setTitle("");
      setDescription("");
      setGoalAmount("");

    } catch (err) {
      console.log(err);
    }
  };

  /* ======================
        CREATE CAMPAIGN
  ====================== */

  const createCampaign = async () => {

    if (!campaignTitle || !campaignDescription || !campaignGoal || !creatorName) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${API}/campaigns`, {
        title: campaignTitle,
        description: campaignDescription,
        goalAmount: campaignGoal,
        creatorName: creatorName
      });

      setCampaigns([...campaigns, res.data]);

      setCampaignTitle("");
      setCampaignDescription("");
      setCampaignGoal("");
      setCreatorName("");

    } catch (err) {
      console.log(err);
    }
  };

  /* ======================
        DONATE FUNDRAISER
  ====================== */

  const donate = async (id) => {

    const amount = donationInputs[id];

    if (!amount || amount <= 0) {
      alert("Enter valid donation amount");
      return;
    }

    try {

      const res = await axios.post(`${API}/fundraisers/donate/${id}`, {
        amount: Number(amount)
      });

      setFundraisers(
        fundraisers.map((f) => (f._id === id ? res.data : f))
      );

      setDonationInputs({ ...donationInputs, [id]: "" });

    } catch (err) {
      console.log(err);
    }
  };

  /* ======================
        DONATE CAMPAIGN
  ====================== */

  const donateToCampaign = async (id) => {

    const amount = donationInputsCampaign[id];

    if (!amount || amount <= 0) {
      alert("Enter valid donation amount");
      return;
    }

    try {

      const res = await axios.post(`${API}/campaigns/donate/${id}`, {
        amount: Number(amount)
      });

      setCampaigns(
        campaigns.map((c) => (c._id === id ? res.data : c))
      );

      setDonationInputsCampaign({ ...donationInputsCampaign, [id]: "" });

    } catch (err) {
      console.log(err);
    }
  };

  /* ======================
        UPDATE
  ====================== */

  const updateFundraiser = async (id) => {

    const newTitle = prompt("Enter new title");
    const newDescription = prompt("Enter new description");
    const newGoal = prompt("Enter new goal amount");

    if (!newTitle || !newDescription || !newGoal) return;

    try {

      const res = await axios.put(`${API}/fundraisers/${id}`, {
        title: newTitle,
        description: newDescription,
        goalAmount: newGoal
      });

      setFundraisers(
        fundraisers.map((f) => (f._id === id ? res.data : f))
      );

    } catch (err) {
      console.log(err);
    }
  };

  const updateCampaign = async (id) => {

    const newTitle = prompt("Enter new title");
    const newDescription = prompt("Enter new description");
    const newGoal = prompt("Enter new goal amount");

    if (!newTitle || !newDescription || !newGoal) return;

    try {

      const res = await axios.put(`${API}/campaigns/${id}`, {
        title: newTitle,
        description: newDescription,
        goalAmount: newGoal
      });

      setCampaigns(
        campaigns.map((c) => (c._id === id ? res.data : c))
      );

    } catch (err) {
      console.log(err);
    }
  };

  /* ======================
        DELETE
  ====================== */

  const deleteFundraiser = async (id) => {

    if (!window.confirm("Delete fundraiser?")) return;

    try {

      await axios.delete(`${API}/fundraisers/${id}`);

      setFundraisers(
        fundraisers.filter((f) => f._id !== id)
      );

    } catch (err) {
      console.log(err);
    }
  };

  const deleteCampaign = async (id) => {

    if (!window.confirm("Delete campaign?")) return;

    try {

      await axios.delete(`${API}/campaigns/${id}`);

      setCampaigns(
        campaigns.filter((c) => c._id !== id)
      );

    } catch (err) {
      console.log(err);
    }
  };

  /* ======================
        UI
  ====================== */

  return (
    <div className="container">

      <h1>Create Campaign</h1>

      <input placeholder="Title"
        value={campaignTitle}
        onChange={(e) => setCampaignTitle(e.target.value)}
      />

      <textarea placeholder="Description"
        value={campaignDescription}
        onChange={(e) => setCampaignDescription(e.target.value)}
      />

      <input type="number"
        placeholder="Goal Amount"
        value={campaignGoal}
        onChange={(e) => setCampaignGoal(e.target.value)}
      />

      <input placeholder="Creator Name"
        value={creatorName}
        onChange={(e) => setCreatorName(e.target.value)}
      />

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
                setDonationInputsCampaign({
                  ...donationInputsCampaign,
                  [c._id]: e.target.value
                })
              }
            />

            <button onClick={() => donateToCampaign(c._id)}>Donate</button>
            <button onClick={() => updateCampaign(c._id)}>Edit</button>
            <button onClick={() => deleteCampaign(c._id)}>Delete</button>

          </div>

        ))}

      </div>


      <h1>Create Fundraiser</h1>

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
        type="number"
        placeholder="Goal Amount"
        value={goalAmount}
        onChange={(e) => setGoalAmount(e.target.value)}
      />

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
              onChange={(e) =>
                setDonationInputs({
                  ...donationInputs,
                  [f._id]: e.target.value
                })
              }
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