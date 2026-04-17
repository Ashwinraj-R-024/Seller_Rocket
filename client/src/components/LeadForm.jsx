import { useState } from "react";
import axios from "axios";

function LeadForm() {
  const initialForm = {
    name: "",
    phone: "",
    email: "",
    platform: "Amazon",
    message: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!/^[0-9]{10}$/.test(form.phone)) {
      err.phone = "Phone must be 10 digits";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      err.email = "Invalid email";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post(
        "https://seller-rocket-sgzb.onrender.com/api/leads",
        form
      );

      alert("Lead submitted!");

      // ✅ RESET FORM
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      alert("Error submitting form");
    }
  };

  return (
    <section id="form">
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />
        {errors.phone && <p>{errors.phone}</p>}

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        {errors.email && <p>{errors.email}</p>}

        <select
          value={form.platform}
          onChange={(e) =>
            setForm({ ...form, platform: e.target.value })
          }
        >
          <option>Amazon</option>
          <option>Flipkart</option>
          <option>Shopify</option>
          <option>WordPress</option>
        </select>

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default LeadForm;