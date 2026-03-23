const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || process.env.BACKEND_BASE_URL;

export interface Hotel {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel?: string;
  region: string;
  imgSrc?: string;
}

export interface Booking {
  _id: string;
  checkInDate: string;
  nights: number;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  hotel: {
    _id: string;
    name: string;
    province: string;
    tel?: string;
    imgSrc?: string;
  };
  createdAt: string;
}

// Hotel Management
export async function getAllHotels(token: string): Promise<{ success: boolean; data?: Hotel[]; count?: number }> {
  try {
    const response = await fetch(`${API_URL}/api/v1/hotels`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch hotels:", error);
    return { success: false };
  }
}

export async function createHotel(
  hotel: Omit<Hotel, "_id">,
  token: string
): Promise<{ success: boolean; data?: Hotel; message?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/v1/hotels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(hotel),
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to create hotel:", error);
    return { success: false, message: "Failed to create hotel" };
  }
}

export async function updateHotel(
  hotelId: string,
  hotel: Partial<Hotel>,
  token: string
): Promise<{ success: boolean; data?: Hotel; message?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/v1/hotels/${hotelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(hotel),
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to update hotel:", error);
    return { success: false, message: "Failed to update hotel" };
  }
}

export async function deleteHotel(
  hotelId: string,
  token: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/v1/hotels/${hotelId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to delete hotel:", error);
    return { success: false, message: "Failed to delete hotel" };
  }
}

export async function getHotelById(
  hotelId: string,
  token: string
): Promise<{ success: boolean; data?: Hotel; message?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/v1/hotels/${hotelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch hotel:", error);
    return { success: false, message: "Failed to fetch hotel" };
  }
}

// Booking Management (Admin gets all bookings)
export async function getAllBookings(token: string): Promise<{ success: boolean; data?: Booking[]; count?: number }> {
  try {
    const response = await fetch(`${API_URL}/api/v1/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return { success: false };
  }
}

export async function updateBooking(
  bookingId: string,
  booking: { checkInDate?: string; nights?: number },
  token: string
): Promise<{ success: boolean; data?: Booking; message?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/v1/bookings/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(booking),
    });
    return await response.json();
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
    const response = await fetch(`${API_URL}/api/v1/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return { success: false, message: "Failed to delete booking" };
  }
}
