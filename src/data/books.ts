export interface BookVolume {
  id: string;
  title: string;
  href: string;
  cover: string;
}

export interface BookEdition {
  id: string;
  name: string;
  context: string;
  volumes: BookVolume[];
}

function volume(id: string, title: string, href = "", cover = ""): BookVolume {
  return { id, title, href, cover };
}

export const bookEditions: BookEdition[] = [
  {
    id: "ai2sd-2025",
    name: "AI2SD’2025",
    context: "",
    volumes: [volume("ai2sd-2025", "6 Volumes")],
  },
  {
    id: "ai2sd-2024",
    name: "AI2SD’2024",
    context: "",
    volumes: [
      volume(
        "ai2sd-2024-1",
        "Volumes 1",
        "https://link.springer.com/book/10.1007/978-3-031-91334-1",
        "/assets/books/978-3-031-91334-1.jpg",
      ),
      volume(
        "ai2sd-2024-2",
        "Volumes 2",
        "https://link.springer.com/book/10.1007/978-3-031-91337-2",
        "/assets/books/978-3-031-91337-2.jpg",
      ),
    ],
  },
  {
    id: "ai2sd-2023-energy",
    name: "AI2SD’2023",
    context: "Global Summit Symposium on Energy, Environment and Agriculture",
    volumes: [
      volume(
        "ai2sd-2023-energy-1",
        "Volume 1 : Advanced Intelligent Systems on Energy, Environment",
        "https://link.springer.com/book/10.1007/978-3-031-54318-0",
        "/assets/books/978-3-031-54318-0.jpg",
      ),
      volume("ai2sd-2023-energy-2", "Volume 2 : Advanced Intelligent Systems on Agriculture"),
    ],
  },
  {
    id: "ai2sd-2023-health",
    name: "AI2SD’2023",
    context: "Global Summit Symposium on Digital Health",
    volumes: [
      volume(
        "ai2sd-2023-health-1",
        "Volume 1 : Advanced Intelligent Systems on Digital Health",
        "https://link.springer.com/book/9783031523878",
        "/assets/books/978-3-031-52388-5.webp",
      ),
      volume(
        "ai2sd-2023-health-2",
        "Volume 2 : Advanced Intelligent Systems on Digital Health",
        "https://link.springer.com/book/9783031523847",
        "/assets/books/978-3-031-52385-4.jpg",
      ),
    ],
  },
  {
    id: "ai2sd-2022",
    name: "AI2SD’2022",
    context: "",
    volumes: [
      volume(
        "ai2sd-2022-1",
        "Volume 1: Advanced Intelligent Systems on Artificial Intelligence, Software, and Data Science",
        "https://link.springer.com/book/10.1007/978-3-031-26384-2",
        "/assets/books/978-3-031-26384-2.jpg",
      ),
      volume(
        "ai2sd-2022-2",
        "Volume 2: Advanced Intelligent Systems on Network, Security, and IoT Applications",
        "https://link.springer.com/book/10.1007/978-3-031-35251-5",
        "/assets/books/978-3-031-35251-5.jpg",
      ),
      volume(
        "ai2sd-2022-3",
        "Volume 3: Advanced Intelligent Systems on Agriculture and Health",
        "https://link.springer.com/book/10.1007/978-3-031-35248-5",
        "/assets/books/978-3-031-35248-5.jpg",
      ),
      volume(
        "ai2sd-2022-4",
        "Volume 4: Advanced Intelligent Systems on Energy, Environment, and Industry 4.0",
        "https://link.springer.com/book/10.1007/978-3-031-35245-4",
        "/assets/books/978-3-031-35245-4.jpg",
      ),
    ],
  },
  {
    id: "ai2sd-2020",
    name: "AI2SD’2020",
    context: "",
    volumes: [
      volume(
        "ai2sd-2020-1",
        "Volume 1: Advanced Intelligent Systems for Sustainable Development",
        "https://link.springer.com/book/10.1007/978-3-030-90633-7",
        "/assets/books/978-3-030-90633-7.jpg",
      ),
      volume(
        "ai2sd-2020-2",
        "Volume 2: Advanced Intelligent Systems for Sustainable Development",
        "https://link.springer.com/book/10.1007/978-3-030-90639-9",
        "/assets/books/978-3-030-90639-9.jpg",
      ),
    ],
  },
  {
    id: "ai2sd-2019",
    name: "AI2SD’2019",
    context: "",
    volumes: [
      volume(
        "ai2sd-2019-1",
        "Volume 1: Advanced Intelligent Systems for Education and Intelligent Learning System",
        "https://link.springer.com/book/10.1007/978-3-030-36653-7",
        "/assets/books/978-3-030-36653-7.jpg",
      ),
      volume(
        "ai2sd-2019-2",
        "Volume 2: Advanced Intelligent Systems for Sustainable Development Applied to Agriculture and Health",
        "https://link.springer.com/book/10.1007/978-3-030-36664-3",
        "/assets/books/978-3-030-36664-3.jpg",
      ),
      volume(
        "ai2sd-2019-3",
        "Volume 3: Advanced Intelligent Systems for Sustainable Development Applied to Environment, Industry and Economy",
        "https://link.springer.com/book/10.1007/978-3-030-36671-1",
        "/assets/books/978-3-030-36671-1.jpg",
      ),
      volume(
        "ai2sd-2019-4",
        "Volume 4: Advanced Intelligent Systems for Applied Computing Sciences",
        "https://link.springer.com/book/10.1007/978-3-030-36674-2",
        "/assets/books/978-3-030-36674-2.jpg",
      ),
      volume(
        "ai2sd-2019-5",
        "Volume 5: Advances Intelligent Systems for Multimedia Processing and Mathematical Modeling",
        "https://link.springer.com/book/10.1007/978-3-030-36677-3",
        "/assets/books/978-3-030-36677-3.jpg",
      ),
      volume(
        "ai2sd-2019-6",
        "Volume 6: Advanced Intelligent Systems for Networks and Systems",
        "https://link.springer.com/book/10.1007/978-3-030-33103-0",
        "/assets/books/978-3-030-33103-0.jpg",
      ),
      volume(
        "ai2sd-2019-7",
        "Volume 7: Advanced Intelligent Systems for Sustainable Development Applied in Energy and Electrical Engineering",
        "https://link.springer.com/book/10.1007/978-3-030-36475-5",
        "/assets/books/978-3-030-36475-5.jpg",
      ),
    ],
  },
  {
    id: "ai2sd-2018",
    name: "AI2SD’2018",
    context: "",
    volumes: [
      volume(
        "ai2sd-2018-1",
        "Volume 1: Advanced Intelligent Systems Applied to Agriculture",
        "https://link.springer.com/book/10.1007/978-3-030-11878-5",
        "/assets/books/978-3-030-11878-5.jpg",
      ),
      volume(
        "ai2sd-2018-2",
        "Volume 2: Advanced Intelligent Systems Applied to Energy",
        "https://link.springer.com/book/10.1007/978-3-030-12065-8",
        "/assets/books/978-3-030-12065-8.jpg",
      ),
      volume(
        "ai2sd-2018-3",
        "Volume 3: Advanced Intelligent Systems Applied to Environment",
        "https://link.springer.com/book/10.1007/978-3-030-11881-5",
        "/assets/books/978-3-030-11881-5.jpg",
      ),
      volume(
        "ai2sd-2018-4",
        "Volume 4: Advanced Intelligent Systems Applied to Health",
        "https://link.springer.com/book/10.1007/978-3-030-11884-6",
        "/assets/books/978-3-030-11884-6.jpg",
      ),
      volume(
        "ai2sd-2018-5",
        "Volume 5: Advanced Intelligent Systems for Computing Sciences",
        "https://link.springer.com/book/10.1007/978-3-030-11928-7",
        "/assets/books/978-3-030-11928-7.jpg",
      ),
    ],
  },
  {
    id: "ait2s-2018",
    name: "AIT2S’2018",
    context: "",
    volumes: [
      volume(
        "ait2s-2018-1",
        "Volume 1: Advanced Information Technology, Services and Systems",
        "https://link.springer.com/book/10.1007/978-3-030-11914-0",
        "/assets/books/978-3-030-11914-0.jpg",
      ),
    ],
  },
  {
    id: "ait2s-2017",
    name: "AIT2S’2017",
    context: "",
    volumes: [
      volume(
        "ait2s-2017-1",
        "Volume 1: Advanced Information Technology, Services and Systems",
        "https://link.springer.com/book/10.1007/978-3-319-69137-4",
        "/assets/books/978-3-319-69137-4.jpg",
      ),
    ],
  },
];
