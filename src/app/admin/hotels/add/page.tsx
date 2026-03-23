"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddHotelPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    district: "",
    province: "",
    postalcode: "",
    tel: "",
    region: "",
    imageUrl: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.address ||
        !formData.district ||
        !formData.province ||
        !formData.postalcode ||
        !formData.tel ||
        !formData.region
      ) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Validate postal code is 5 digits
      if (!/^\d{5}$/.test(formData.postalcode)) {
        setError("Postal code must be exactly 5 digits");
        setLoading(false);
        return;
      }

      const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
        process.env.BACKEND_BASE_URL;
      const response = await fetch(`${baseUrl}/api/v1/hotels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          district: formData.district,
          province: formData.province,
          postalcode: formData.postalcode,
          tel: formData.tel,
          region: formData.region,
          image: formData.imageUrl || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.message || "Failed to add hotel. Please try again."
        );
        setLoading(false);
        return;
      }

      // Success - redirect to hotels list
      router.push("/admin/hotels");
    } catch (err) {
      console.error("Error adding hotel:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/hotels");
  };

  return (
    <main className="min-h-screen bg-[var(--surface-page)]">
      <div className="mx-auto w-[var(--general-width)] py-8 md:py-12">

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e5e7eb] p-8 max-w-2xl">
          <h1 className="text-3xl font-bold text-[var(--text-heading)] mb-8">
            Add New Hotel
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hotel Name */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                Hotel Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Grand Palace Hotel"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#d6d8dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="123 Main Street"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#d6d8dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* District and Province */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  placeholder="Phra Nakhon"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#d6d8dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  Province
                </label>
                <input
                  type="text"
                  name="province"
                  placeholder="Bangkok"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#d6d8dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Postal Code and Phone */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  Postal Code (5 digits)
                </label>
                <input
                  type="text"
                  name="postalcode"
                  placeholder="10200"
                  value={formData.postalcode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#d6d8dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={5}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="tel"
                  placeholder="02-123-4567"
                  value={formData.tel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#d6d8dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                Region
              </label>
              <input
                type="text"
                name="region"
                placeholder="Central"
                value={formData.region}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#d6d8dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                placeholder="https://images.unsplash.com/..."
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#d6d8dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {loading ? "Adding..." : "Add Hotel"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="border-t border-[#d6d8dc] py-8 text-center text-xs text-[#8a909a] mt-12">
        © 2028 HotelBook. All rights reserved.
      </footer>
    </main>
  );
}
