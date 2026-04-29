// Wedding Constants - Edit this file to customize your wedding invitation
// "Undangan Pernikahan Nisa & Fata - 6 Juni 2026"

export const weddingData = {
  // Couple names
  couple: {
    male: {
      fullName: "Fata Akromul Muttaqin",
      nickName: "Fata",
      father: "Bapak M.Syarifuddin",
      mother: "Ibu Sri Pujiati",
      position: "Putra Ketiga",
      instagram: "https://instagram.com/fataakromulm",
    },
    female: {
      fullName: "Nisaul' Azizah",
      nickName: "Nisa",
      father: "Bapak Saefulloh",
      mother: "Ibu Siti",
      position: "Putri Pertama",
      instagram: "https://instagram.com/nisaulazizah",
    },
  },

  // Wedding date
  date: {
    full: "Sabtu, 6 Juni 2026",
    day: "Sabtu",
    date: "6",
    month: "Juni",
    year: "2026",
    timestamp: new Date("2026-06-06T10:00:00+07:00").getTime(),
  },

  // Events
  events: {
    akad: {
      name: "Akad Nikah",
      time: "10.00 WIB",
      date: "6 Juni 2026",
      location: "Dukuh Kedungkwali, Desa Klapasawit",
      mapUrl: "https://maps.google.com/?q=Dukuh+Kedungkwali+Desa+Klapasawit",
    },
    resepsi: {
      name: "Resepsi",
      time: "11.00 - 14.00 WIB",
      date: "6 Juni 2026",
      location: "Dukuh Kedungkwali, Desa Klapasawit",
      mapUrl: "https://maps.google.com/?q=Dukuh+Kedungkwali+Desa+Klapasawit",
    },
  },

  // Dresscode
  dresscode: {
    name: "Dresscode",
    description: "Semi Formal - Dominan Warna Hijau & Pink Soft",
    colorHint: "Hijau Sage, Blush Pink, atau Cream",
  },

  // Gift accounts (replace with actual account numbers)
  gifts: {
    bankAccounts: [
      {
        bank: "BCA",
        accountNumber: "1234567890",
        accountName: "Nisaul' Azizah",
      },
      {
        bank: "Mandiri",
        accountNumber: "9876543210",
        accountName: "Fata Akromul Muttaqin",
      },
      {
        bank: "BNI",
        accountNumber: "1122334455",
        accountName: "Nisaul' Azizah",
      },
    ],
    giftAddress: "Dukuh Kedungkwali, Desa Klapasawit, Kecamatan Puring, Kabupaten Kebumen, Jawa Tengah 54383",
    whatsapp: "+6281234567890",
  },

  // Quran verse
  quranVerse: {
    surah: "Ar-Rum",
    chapter: 30,
    verse: 21,
    text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu mawaddah dan rahmah. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang memikirkan.",
  },

  // Opening salam
  salam: "Assalamu'alaikum Warahmatullahi Wabarakatuh",

  // Love story milestones
  loveStory: [
    {
      year: "2021",
      title: "Pertemuan Pertama",
      description: "Pertemuan di sebuah acara komunitas, senyum pertama yang saling exchanging.",
      date: "Januari 2021",
    },
    {
      year: "2022",
      title: "Pendekatan",
      description: "Saling mengenal lebih dalam, berbagi cerita dan mimpi bersama.",
      date: "Juni 2022",
    },
    {
      year: "2023",
      title: "Komitmen",
      description: "Memutuskan untuk bersama dalam suka duka.",
      date: "Maret 2023",
    },
    {
      year: "2025",
      title: "Lamaran",
      description: "Ijab Kabul di hadapan keluarga besar kedua belah pihak.",
      date: "Desember 2025",
    },
  ],

  // Streaming URL (placeholder)
  liveStreaming: {
    enabled: true,
    platform: "YouTube",
    url: "https://youtube.com/@fataakromulm",
  },

  // Contact person
  contacts: [
    { name: "Fata (Pengantin Pria)", phone: "+6281234567890" },
    { name: "Nisa (Pengantin Wanita)", phone: "+6281234567891" },
  ],
};

// Audio settings
export const audioSettings = {
  intro: "/audio/intro.mp3", // Place your audio file in public/audio/
  loop: true,
  volume: 0.5,
};
