import { http } from "./http";

export interface Album {
  id: string;
  albumId: string;
  title: string;
  url: string;
  image: string;
  price: string;
}

export const getAllAlbum = async (): Promise<{
  data: Album[];
}> => {
  const path = `/photos`;

  const d = (await (await http.get(path))?.data) || [];

  const data: Album[] = d.map((item: any) => ({
    id: item.id,
    albumId: item.albumId,
    title: item.title,
    url: item.url,
    // random image
    image: `https://picsum.photos/seed/${item.id}/200/300`,
    price: `$${(Math.random() * 3900 + 99).toFixed(2)}`,
  }));

  return {
    data,
  };
};
