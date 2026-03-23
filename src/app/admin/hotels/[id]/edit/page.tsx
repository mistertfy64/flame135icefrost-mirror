"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getHotelById, updateHotel } from "@/libs/adminApi";

export default function EditHotelPage() {
  const router = useRouter();
  const params = useParams();
  const hotelId = params.id as string;
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    district: "",
    province: "",
    postalcode: "",
    tel: "",
    region: "",
    imgSrc: "",
  });

  const token = session?.user?.token || "";

  useEffect(() => {
    if (token && hotelId) {
      loadHotel();
    }
  }, [token, hotelId]);

  const loadHotel = async () => {
    setLoading(true);
    const result = await getHotelById(hotelId, token);
    if (result.success && result.data) {
      const hotel = result.data;
      setFormData({
        name: hotel.name,
        address: hotel.address,
        district: hotel.district,
        province: hotel.province,
        postalcode: hotel.postalcode,
        tel: hotel.tel || "",
        region: hotel.region,
        imgSrc: hotel.imgSrc || "",
      });
    } else {
      setError("Failed to load hotel");
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    // Validate required fields
    if (
      !formData.name ||
      !formData.address ||
      !formData.district ||
      !formData.province ||
      !formData.postalcode ||
      !formData.region
    ) {
      setError("Please fill in all required fields");
      setSaving(false);
      return;
    }

    // Validate postal code is 5 digits
    if (!/^\d{5}$/.test(formData.postalcode)) {
      setError("Postal code must be exactly 5 digits");
      setSaving(false);
      return;
    }

    const result = await updateHotel(hotelId, formData, token);

    if (result.success) {
      router.push("/admin/hotels");
    } else {
      setError(result.message || "Failed to update hotel. Please try again.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-44px)] bg-gray-50 py-8">
        <div className="mx-auto max-w-2xl px-4">
          <div className="text-center text-gray-500">Loading hotel...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-44px)] bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/admin/hotels"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-500 shadow hover:bg-gray-50"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">Edit Hotel</h1>
        </div>

        {/* Form */}
        <div className="rounded-lg bg-white p-6 shadow">
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Hotel Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Grand Palace Hotel"
                value={formData.name}
                onChange={handleInputChange}
                maxLength={50}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Address *
              </label>
              <input
                type="text"
                name="address"
                placeholder="123 Main Street"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  District *
                </label>
                <input
                  type="text"
                  name="district"
                  placeholder="Phra Nakhon"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Province *
                </label>
                <input
                  type="text"
                  name="province"
                  placeholder="Bangkok"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="postalcode"
                  placeholder="10200"
                  value={formData.postalcode}
                  onChange={handleInputChange}
                  maxLength={5}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Telephone
                </label>
                <input
                  type="tel"
                  name="tel"
                  placeholder="02-123-4567"
                  value={formData.tel}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Region *
              </label>
              <input
                type="text"
                name="region"
                placeholder="Central"
                value={formData.region}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                name="imgSrc"
                placeholder="https://images.unsplash.com/..."
                value={formData.imgSrc}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-lg bg-blue-500 py-2.5 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <Link
                href="/admin/hotels"
                className="flex-1 rounded-lg border border-gray-300 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
