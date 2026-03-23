"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

interface Booking {
  id: string;
  user: string;
  hotel: string;
  checkIn: string;
  nights: number;
  created: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatCard[]>([
    {
      title: "Total Hotels",
      value: 6,
      icon: "🏨",
      color: "bg-blue-100",
    },
    {
      title: "Total Bookings",
      value: 0,
      icon: "📅",
      color: "bg-green-100",
    },
    {
      title: "Total Users",
      value: 2,
      icon: "👥",
      color: "bg-orange-100",
    },
    {
      title: "Active Bookings",
      value: 2,
      icon: "⚡",
      color: "bg-purple-100",
    },
  ]);

  const [recentBookings, setRecentBookings] = useState<Booking[]>([
    {
      id: "1",
      user: "John Doe",
      hotel: "Mountain View Lodge",
      checkIn: "May 20, 2026",
      nights: 3,
      created: "Mar 16, 2026",
    },
    {
      id: "2",
      user: "John Doe",
      hotel: "Grand Palace Hotel",
      checkIn: "Apr 15, 2026",
      nights: 2,
      created: "Mar 15, 2026",
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--surface-page)] py-8">
        <div className="mx-auto w-[var(--general-width)]">
          <div className="text-center text-[#8a909a]">Loading dashboard...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--surface-page)]">
      <div className="mx-auto w-[var(--general-width)] py-8 md:py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center text-white text-xl">
              👤
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-heading)]">
                Admin Dashboard
              </h1>
              <p className="text-[#8a909a] mt-1">
                Manage your hotel booking system
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-[#e5e7eb]"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[#8a909a] text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-[var(--text-heading)] mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-xl`}>
                  {stat.icon}
                </div>
              </div>
              <Link 
                href={
                  stat.title === "Total Hotels" 
                    ? "/admin/hotels" 
                    : stat.title === "Total Bookings"
                    ? "/admin/bookings"
                    : "#"
                } 
                className="text-blue-500 text-sm font-medium hover:underline"
              >
                View all →
              </Link>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/admin/hotels"
            className="bg-white rounded-lg shadow-sm p-8 border border-[#e5e7eb] hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                🏨
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-heading)]">
                  Manage Hotels
                </h3>
                <p className="text-[#8a909a] text-sm mt-1">
                  Add, edit, or remove hotels
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/bookings"
            className="bg-white rounded-lg shadow-sm p-8 border border-[#e5e7eb] hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-xl">
                📅
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-heading)]">
                  All Bookings
                </h3>
                <p className="text-[#8a909a] text-sm mt-1">
                  View and manage all bookings
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e5e7eb]">
          <div className="p-6 border-b border-[#e5e7eb]">
            <h2 className="text-xl font-bold text-[var(--text-heading)]">
              Recent Bookings
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                  <th className="px-6 py-3 text-left font-semibold text-[#6b7280]">
                    User
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[#6b7280]">
                    Hotel
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[#6b7280]">
                    Check-in
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[#6b7280]">
                    Nights
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[#6b7280]">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking, index) => (
                  <tr
                    key={booking.id}
                    className={`border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors ${
                      index === recentBookings.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-[var(--text-heading)]">
                      {booking.user}
                    </td>
                    <td className="px-6 py-4 text-[var(--text-heading)]">
                      {booking.hotel}
                    </td>
                    <td className="px-6 py-4 text-[#6b7280]">
                      {booking.checkIn}
                    </td>
                    <td className="px-6 py-4 text-[#6b7280]">
                      {booking.nights}
                    </td>
                    <td className="px-6 py-4 text-[#6b7280]">
                      {booking.created}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="border-t border-[#d6d8dc] py-8 text-center text-xs text-[#8a909a] mt-12">
        © 2028 HotelBook. All rights reserved.
      </footer>
    </main>
  );
}
