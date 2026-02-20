import { useEffect, useState } from "react";


export default function Location() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  // 🔄 Load addresses
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(saved);
  }, []);

  // 💾 Save addresses
  const saveAddresses = (data) => {
    setAddresses(data);
    localStorage.setItem("addresses", JSON.stringify(data));
  };

  // ➕ Add / ✏️ Update address
  const handleSubmit = () => {
    if (!form.name || !form.street || !form.city) {
      alert("Please fill all fields");
      return;
    }

    let updated = [...addresses];

    if (editingIndex !== null) {
      updated[editingIndex] = {
        ...form,
        isDefault: updated[editingIndex].isDefault,
      };
    } else {
      updated.push({ ...form, isDefault: updated.length === 0 });
    }

    saveAddresses(updated);
    setForm({
      name: "",
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  // 🗑 Remove
  const removeAddress = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    saveAddresses(updated);
  };

  // ⭐ Set default
  const setDefault = (index) => {
    const updated = addresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index,
    }));
    saveAddresses(updated);
  };

  // ✏️ Edit
  const editAddress = (index) => {
    setForm(addresses[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gray-100 min-h-screen">

     <div className="flex justify-between items-center mb-10">
  <h2 className="text-3xl p-5 bg-green-800 text-white rounded-2xl">
    Your Shipping Addresses
  </h2>

  <button
    onClick={() => setShowForm(true)}
    className="bg-green-700 hover:bg-green-800 transition
               text-white px-6 py-3 rounded-lg shadow-md"
  >
    + Add new address
  </button>
</div>



      {/* ADDRESS CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        {addresses.length === 0 && (
          <p className="text-gray-500">No saved addresses yet.</p>
        )}

        {addresses.map((addr, index) => (
          <div
  key={index}
  className={`relative border-2 rounded-xl p-6 transition
    hover:shadow-xl hover:-translate-y-1
    ${addr.isDefault ? "bg-orange-50 shadow-xl border-orange-300" : "bg-orange-50  border-orange-300"}
  `}
>

          <p className="font-semibold text-lg text-gray-800 mb-1">
  {addr.name}
</p>

<p className="text-gray-600">{addr.street}</p>

<p className="text-gray-600">
  {addr.city}, {addr.state} {addr.pincode}
</p>

<p className="text-gray-600 mb-4">{addr.country}</p>

           <div className="flex items-center gap-3 mt-6">
  <button
    onClick={() => editAddress(index)}
    className="px-4 py-1.5 text-white bg-green-700 rounded-lg
               hover:bg-green-800 transition"
  >
    Edit
  </button>

  <button
    onClick={() => removeAddress(index)}
    className="px-4 py-1.5 rounded-lg
               text-white bg-red-500
               hover:bg-red-600 transition"
  >
    Remove
  </button>

  <label className="flex items-center gap-2 ml-auto text-sm text-gray-700">
    <input
      type="checkbox"
      checked={addr.isDefault}
      onChange={() => setDefault(index)}
      className="accent-green-700"
    />
    Default
  </label>
</div>

          </div>
        ))}
      </div>

      {/* ADD / EDIT FORM */}
      {showForm && (
       <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

         <div className="bg-orange-100 p-8 rounded-2xl w-[420px] shadow-2xl animate-fadeIn">

            <h3 className="text-lg font-semibold mb-4">
              {editingIndex !== null ? "Edit Address" : "Add Address"}
            </h3>

            {["name", "street", "city", "state", "country", "pincode"].map(
              (field) => (
                <input
                  key={field}
                  placeholder={field.toUpperCase()}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  className="border w-full p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"

                />
              )
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-green-800 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
