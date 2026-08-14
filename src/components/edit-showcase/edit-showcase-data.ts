export type EditShowcasePhoto = {
  id: string;
  src: string;
  alt: string;
};

export const EDIT_SHOWCASE_TOP_ROW: EditShowcasePhoto[] = [
  {
    id: "top-1",
    src: "/edit-showcase/top/top-1.jpg",
    alt: "Edited coastal cliff landscape at golden hour",
  },
  {
    id: "top-2",
    src: "/edit-showcase/top/top-2.jpg",
    alt: "Edited mountain valley with moody sky",
  },
  {
    id: "top-3",
    src: "/edit-showcase/top/top-3.jpg",
    alt: "Edited forest landscape with warm light",
  },
  {
    id: "top-4",
    src: "/edit-showcase/top/top-4.jpg",
    alt: "Edited desert dunes at sunset",
  },
  {
    id: "top-5",
    src: "/edit-showcase/top/top-5.jpg",
    alt: "Edited lake reflection with mountain backdrop",
  },
];

export const EDIT_SHOWCASE_BOTTOM_ROW: EditShowcasePhoto[] = [
  {
    id: "bottom-1",
    src: "/edit-showcase/bottom/bottom-1.jpg",
    alt: "Edited urban skyline at dusk",
  },
  {
    id: "bottom-2",
    src: "/edit-showcase/bottom/bottom-2.jpg",
    alt: "Edited rolling hills under dramatic clouds",
  },
  {
    id: "bottom-3",
    src: "/edit-showcase/bottom/bottom-3.jpg",
    alt: "Edited tropical beach with turquoise water",
  },
  {
    id: "bottom-4",
    src: "/edit-showcase/bottom/bottom-4.jpg",
    alt: "Edited canyon landscape with layered rock formations",
  },
  {
    id: "bottom-5",
    src: "/edit-showcase/bottom/bottom-5.jpg",
    alt: "Edited snowy peak above cloud inversion",
  },
];

export const EDIT_SHOWCASE_PHOTO_ASPECT = "aspect-[16/10]";
export const EDIT_SHOWCASE_PHOTO_WIDTH = 360;
export const EDIT_SHOWCASE_PHOTO_HEIGHT = 225;

export const EDIT_SHOWCASE_PHOTO_FRAME =
  "w-[280px] sm:w-[320px] lg:w-[360px] shrink-0";
