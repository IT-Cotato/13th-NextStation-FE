import { exploreAsset } from "@/assets/explore";
const DEFAULT_COURSE_COUNT = 0;

const conceptTourDefinitions = [
  { slug: "stationery", title: "\uBB38\uAD6C \uD22C\uC5B4", description: "\uC791\uC740 \uBB38\uAD6C\uC810\uACFC \uCC45\uBC29\uC744\n\uCC3E\uC544\uAC00\uB294 \uCF54\uC2A4", artwork: exploreAsset("concept-stationery.svg"), combinedStyle: { right: 4, top: 8, width: 100, height: 96 } },
  { slug: "value", title: "\uAC00\uC131\uBE44 \uD22C\uC5B4", description: "\uB3C8\uC740 \uC801\uAC8C, \uB9CC\uC871\uC740\n\uCDA9\uBD84\uD55C \uC54C\uB730 \uCF54\uC2A4", artwork: exploreAsset("concept-value.svg"), combinedStyle: { right: 4, top: 8, width: 92, height: 94 } },
  { slug: "culture", title: "\uBB38\uD654\uC7AC \uD22C\uC5B4", description: "\uC11C\uC6B8 \uC18D \uC624\uB798\uB41C\n\uD754\uC801\uC744 \uB9CC\uB098\uB294 \uCF54\uC2A4", artwork: exploreAsset("concept-culture.svg"), combinedStyle: { right: 4, top: 8, width: 92, height: 95 } },
  { slug: "nature", title: "\uC790\uC5F0 \uC18D \uD790\uB9C1 \uD22C\uC5B4", description: "\uD558\uCC9C\uACFC \uACF5\uC6D0\uC744 \uB530\uB77C\n\uC26C\uC5B4\uAC00\uB294 \uCF54\uC2A4", artwork: exploreAsset("concept-nature.svg"), combinedStyle: { right: 4, top: 8, width: 92, height: 96 } },
  { slug: "rain", title: "\uBE44 \uC624\uB294 \uB0A0 \uD22C\uC5B4", description: "\uD750\uB9B0 \uB0A0\uC5D0\uB3C4 \uAC77\uAE30 \uC88B\uC740\n\uC2E4\uB0B4 \uC911\uC2EC \uCF54\uC2A4", artwork: exploreAsset("concept-rain.svg"), combinedStyle: { right: 4, top: 8, width: 92, height: 92 } },
  { slug: "neighborhood", title: "\uB3D9\uB124 \uD0D0\uBC29 \uD22C\uC5B4", description: "\uC775\uC219\uD558\uC9C0 \uC54A\uC740 \uACE8\uBAA9\uACFC\n\uB3D9\uB124\uB97C \uB9CC\uB098\uB294 \uCF54\uC2A4", artwork: exploreAsset("concept-neighborhood.svg"), combinedStyle: { right: 4, top: 8, width: 92, height: 92 } },
  { slug: "books", title: "\uC804\uC2DC\u00B7\uC11C\uC810 \uD22C\uC5B4", description: "\uC870\uC6A9\uD788 \uBCF4\uACE0 \uBA38\uBB34\uB294\n\uBB38\uD654 \uACF5\uAC04 \uCF54\uC2A4", artwork: exploreAsset("concept-books.svg"), combinedStyle: { right: 4, top: 8, width: 92, height: 91 } },
  { slug: "after-work", title: "\uD1F4\uADFC \uD6C4 2\uC2DC\uAC04 \uD22C\uC5B4", description: "\uC9E7\uAC8C \uB2E4\uB140\uC640\uB3C4\n\uAE30\uBD84 \uC804\uD658\uB418\uB294 \uCF54\uC2A4", artwork: exploreAsset("concept-after-work.svg"), combinedStyle: { right: 4, top: 8, width: 92, height: 94 } },
] as const;

export const conceptTours = conceptTourDefinitions.map((tour) => ({
  ...tour,
  courseCount: DEFAULT_COURSE_COUNT,
}));
export const featuredConceptTours = [
  {
    ...conceptTours[0],
    description: "\uC791\uC740 \uBB38\uAD6C\uC810\uACFC \uCC45\uBC29\uC744 \uCC3E\uC544\uAC00\uB294 \uCF54\uC2A4",
    featuredArtwork: exploreAsset("featured-concept-stationery.svg"),
    featuredStyle: { right: 13, top: 0, width: 97, height: 80 },
  },
  {
    ...conceptTours[1],
    description: "\uB3C8\uC740 \uC801\uAC8C, \uB9CC\uC871\uC740 \uCDA9\uBD84\uD55C \uC54C\uB730 \uCF54\uC2A4",
    featuredArtwork: exploreAsset("featured-concept-value.svg"),
    featuredStyle: { right: 14, top: 2, width: 140, height: 76 },
  },
  {
    ...conceptTours[2],
    description: "\uC11C\uC6B8 \uC18D \uC624\uB798\uB41C \uD754\uC801\uC744 \uB9CC\uB098\uB294 \uCF54\uC2A4",
    featuredArtwork: exploreAsset("featured-concept-culture.svg"),
    featuredStyle: { right: 0, top: 0, width: 97, height: 80 },
  },
] as const;
