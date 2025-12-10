export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  district: string; // added district field
  address: string;
  images: string[];
  beds: number;
  baths: number;
  amenities: string[];
  rules: string[];
  nearbyUniversities: NearbyUniversity[]; // added nearby universities with distances
  owner: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    responseTime: string;
    phone: string;
    email: string;
    verifiedListings: number;
    joinedDate: string;
    bio: string;
  };
  reviews: Review[];
  university?: string;
  rating: number;
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface NearbyUniversity {
  id: number;
  name: string;
  distance: number; // in km
}

export interface University {
  id: number;
  name: string;
  shortName: string;
  fullName: string;
  image: string;
  listings: number;
}

export interface District {
  name: string;
  universityCount: number;
  listingCount: number;
}

export const districts: District[] = [
  { name: "San Isidro", universityCount: 3, listingCount: 45 },
  { name: "Miraflores", universityCount: 2, listingCount: 38 },
  { name: "San Miguel", universityCount: 4, listingCount: 52 },
  { name: "Pueblo Libre", universityCount: 3, listingCount: 41 },
  { name: "Jesús María", universityCount: 2, listingCount: 35 },
  { name: "Lince", universityCount: 1, listingCount: 28 },
  { name: "San Borja", universityCount: 2, listingCount: 32 },
  { name: "Surco", universityCount: 3, listingCount: 48 }
];

export const universities: University[] = [
  { id: 1, name: "UNMSM", shortName: "UNMSM", fullName: "Universidad Nacional Mayor de San Marcos", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800", listings: 456 },
  { id: 2, name: "PUCP", shortName: "PUCP", fullName: "Pontificia Universidad Católica del Perú", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800", listings: 384 },
  { id: 3, name: "UPC", shortName: "UPC", fullName: "Universidad Peruana de Ciencias Aplicadas", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800", listings: 298 },
  { id: 4, name: "ULIMA", shortName: "ULIMA", fullName: "Universidad de Lima", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800", listings: 267 },
  { id: 5, name: "USIL", shortName: "USIL", fullName: "Universidad San Ignacio de Loyola", image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800", listings: 234 },
  { id: 6, name: "UNI", shortName: "UNI", fullName: "Universidad Nacional de Ingeniería", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800", listings: 198 }
];

export const featuredListings: Listing[] = [
  {
    id: 1,
    title: "Habitación amplia en San Isidro",
    description: "Hermosa habitación en zona tranquila y segura de San Isidro. A 10 minutos de la PUCP y cerca a transporte público.",
    price: 800,
    location: "San Isidro",
    district: "San Isidro", // added district
    address: "Calle Los Eucaliptos 450, San Isidro",
    images: [
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800",
      "https://images.unsplash.com/photo-1668089677938-b52086753f77?w=800"
    ],
    beds: 1,
    baths: 1,
    amenities: ["WiFi de alta velocidad", "Estacionamiento", "Servicios incluidos", "Amoblado"],
    rules: ["No se permiten mascotas", "No fumar", "Horario de visitas hasta las 10 PM"],
    nearbyUniversities: [ // added nearby universities with distances
      { id: 2, name: "PUCP", distance: 0.8 },
      { id: 4, name: "ULIMA", distance: 2.1 }
    ],
    owner: {
      id: "owner-1",
      name: "María García",
      rating: 4.8,
      responseTime: "2 horas",
      phone: "+51 999 987 654",
      email: "maria.garcia@gmail.com",
      verifiedListings: 3,
      joinedDate: "Enero 2023",
      bio: "Propietaria con más de 2 años de experiencia alquilando habitaciones a estudiantes universitarios. Me encanta crear un ambiente familiar y seguro para los inquilinos."
    },
    reviews: [
      { id: 1, user: "Carlos M.", rating: 5, comment: "Excelente lugar, muy limpio y la propietaria muy amable.", date: "Hace 2 meses" },
      { id: 2, user: "Ana P.", rating: 5, comment: "Perfecta ubicación y muy cómoda.", date: "Hace 4 meses" }
    ],
    university: "PUCP",
    rating: 4.8
  },
  {
    id: 2,
    title: "Suite con baño privado - Pueblo Libre",
    description: "Suite completamente equipada con baño privado. Cerca a la UNMSM y con transporte directo.",
    price: 950,
    location: "Pueblo Libre",
    district: "Pueblo Libre", // added district
    address: "Av. Universitaria 1245, Pueblo Libre",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"
    ],
    beds: 1,
    baths: 1,
    amenities: ["Baño privado", "WiFi", "Escritorio", "Closet amplio"],
    rules: ["No mascotas", "Ambiente tranquilo"],
    nearbyUniversities: [ // added nearby universities with distances
      { id: 1, name: "UNMSM", distance: 0.5 },
      { id: 2, name: "PUCP", distance: 3.2 }
    ],
    owner: {
      id: "owner-2",
      name: "Roberto Sánchez",
      rating: 4.9,
      responseTime: "1 hora",
      phone: "+51 999 123 789",
      email: "roberto.sanchez@gmail.com",
      verifiedListings: 2,
      joinedDate: "Marzo 2023",
      bio: "Ingeniero de profesión que alquila habitaciones en su casa. Busco estudiantes responsables y que valoren un ambiente tranquilo de estudio."
    },
    reviews: [],
    university: "UNMSM",
    rating: 4.9
  },
  {
    id: 3,
    title: "Departamento compartido Miraflores",
    description: "Habitación en departamento compartido con otros estudiantes. Zona moderna y segura.",
    price: 700,
    location: "Miraflores",
    district: "Miraflores", // added district
    address: "Calle Schell 350, Miraflores",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"
    ],
    beds: 1,
    baths: 1,
    amenities: ["WiFi", "Cocina compartida", "Sala de estar", "Lavandería"],
    rules: ["Responsabilidad compartida", "Limpieza semanal"],
    nearbyUniversities: [ // added nearby universities with distances
      { id: 3, name: "UPC", distance: 1.2 },
      { id: 4, name: "ULIMA", distance: 2.8 }
    ],
    owner: {
      id: "owner-3",
      name: "Patricia López",
      rating: 4.7,
      responseTime: "3 horas",
      phone: "+51 999 456 321",
      email: "patricia.lopez@gmail.com",
      verifiedListings: 4,
      joinedDate: "Octubre 2022",
      bio: "Me dedico al alquiler de habitaciones para estudiantes desde hace 5 años. Ofrezco espacios cómodos y seguros cerca de las principales universidades."
    },
    reviews: [
      { id: 1, user: "Luis R.", rating: 4, comment: "Buena habitación, solo que a veces hay ruido.", date: "Hace 1 mes" }
    ],
    university: "UPC",
    rating: 4.7
  },
  {
    id: 4,
    title: "Habitación económica San Miguel",
    description: "Opción económica para estudiantes. Cerca al Centro de Lima y con buena conexión de transporte.",
    price: 600,
    location: "San Miguel",
    district: "San Miguel", // added district
    address: "Av. La Marina 2890, San Miguel",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800"
    ],
    beds: 1,
    baths: 1,
    amenities: ["WiFi", "Servicios incluidos", "Amoblado básico"],
    rules: ["No fumar", "Puntualidad en pagos"],
    nearbyUniversities: [ // added nearby universities with distances
      { id: 1, name: "UNMSM", distance: 1.5 },
      { id: 6, name: "UNI", distance: 2.3 }
    ],
    owner: {
      id: "owner-1",
      name: "María García",
      rating: 4.8,
      responseTime: "2 horas",
      phone: "+51 999 987 654",
      email: "maria.garcia@gmail.com",
      verifiedListings: 3,
      joinedDate: "Enero 2023",
      bio: "Propietaria con más de 2 años de experiencia alquilando habitaciones a estudiantes universitarios."
    },
    reviews: [],
    university: "UNMSM",
    rating: 4.5
  }
];

export const popularUniversities = universities;

export const getListingById = (id: number): Listing | undefined => {
  return featuredListings.find(listing => listing.id === id);
};
