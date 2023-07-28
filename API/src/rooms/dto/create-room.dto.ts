export class CreateRoomDto {
  id: number;
  title: string;
  thumbnail: string;
  images: Array<{ title: string, url: string }>;
  price: number;
  lon: number;
  lat: number;
  address: string;
  description: string;
  features: Array<{ name: string }>
  type: string;
  ownerId: number;
} 
