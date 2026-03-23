const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || process.env.BACKEND_BASE_URL}/api/v1/hotels`;

export interface Hotel {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  region: string;
  bookings: Array<unknown>;
  id: string;
}

export interface HotelsResponse {
  success: boolean;
  count: number;
  data: Hotel[];
}

export async function fetchAllHotels(): Promise<Hotel[]> {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 10 },
    });
    const data: HotelsResponse = await response.json();
    if (data.success && data.data) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch hotels:", error);
    return [];
  }
}

export async function fetchTopBookedHotels(limit: number = 3): Promise<Hotel[]> {
  try {
    const hotels = await fetchAllHotels();
    return hotels
      .sort((a, b) => (b.bookings?.length || 0) - (a.bookings?.length || 0))
      .slice(0, limit);
  } catch (error) {
    console.error("Failed to fetch top booked hotels:", error);
    return [];
  }
}

export function formatHotelLocation(hotel: Hotel): string {
  return `${hotel.district}, ${hotel.province} ${hotel.postalcode}`;
}

export interface Booking {
  _id?: string;
  hotelId: string;
  hotelName?: string;
  checkIn: string;
  checkOut: string;
  roomCount: number;
  guestCount: number;
  status?: string;
  createdAt?: string;
}

export async function createBooking(
  booking: Booking,
  token: string
): Promise<{ success: boolean; data?: Booking; message?: string }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || process.env.BACKEND_BASE_URL;
    const response = await fetch(`${baseUrl}/api/v1/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(booking),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create booking:", error);
    return { success: false, message: "Failed to create booking" };
  }
}

export async function getMyBookings(
  token: string
): Promise<{ success: boolean; data?: Booking[]; message?: string }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || process.env.BACKEND_BASE_URL;
    const response = await fetch(`${baseUrl}/api/v1/bookings/my-bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return { success: false, message: "Failed to fetch bookings" };
  }
}

export async function updateBooking(
  bookingId: string,
  booking: Booking,
  token: string
): Promise<{ success: boolean; data?: Booking; message?: string }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || process.env.BACKEND_BASE_URL;
    const response = await fetch(`${baseUrl}/api/v1/bookings/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(booking),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update booking:", error);
    return { success: false, message: "Failed to update booking" };
  }
}

export async function deleteBooking(
  bookingId: string,
  token: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || process.env.BACKEND_BASE_URL;
    const response = await fetch(`${baseUrl}/api/v1/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return { success: false, message: "Failed to delete booking" };
  }
}
