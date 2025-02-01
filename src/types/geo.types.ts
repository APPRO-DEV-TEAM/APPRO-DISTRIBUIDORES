// const localizations = {
//   geo: {
//     distributorId: id
//     latitude: selectedPlace?.location.latitude,
//     longitude: selectedPlace?.location.longitude,
//   },
// }

export type GeoProps = {
  lat: number;
  lng: number;
  distributorId: string;
};

// E no Maps:
export type MapsProps = {
  locations: Array<{
    lat: number;
    lng: number;
    distributorId: number;
  }>;
};
