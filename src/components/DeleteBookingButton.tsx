"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteBooking } from "@/libs/hotelApi";

interface DeleteBookingButtonProps {
  bookingId: string;
}

export default function DeleteBookingButton({
  bookingId
}: DeleteBookingButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    const token = session?.user?.token || "";
    if (!token) {
      alert("You must be logged in to delete a booking");
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteBooking(bookingId, token);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.message || "Failed to delete booking");
      }
    } catch {
      alert("Failed to delete booking");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-md border border-red-500 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
