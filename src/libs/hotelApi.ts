const API_URL = `${process.env.BACKEND_BASE_URL}/api/v1/hotels`;

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
