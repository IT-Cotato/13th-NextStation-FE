import type { ComponentType, SVGProps } from "react";
import StampAchasan from "@/assets/stamp/stamp-achasan.svg?react";
import StampAeogae from "@/assets/stamp/stamp-aeogae.svg?react";
import StampAhyeon from "@/assets/stamp/stamp-ahyeon.svg?react";
import StampAirportMarket from "@/assets/stamp/stamp-airport-market.svg?react";
import StampAmsa from "@/assets/stamp/stamp-amsa.svg?react";
import StampBangi from "@/assets/stamp/stamp-bangi.svg?react";
import StampBomun from "@/assets/stamp/stamp-bomun.svg?react";
import StampChangsin from "@/assets/stamp/stamp-changsin.svg?react";
import StampChildrensGrandPark from "@/assets/stamp/stamp-childrens-grand-park.svg?react";
import StampDongjak from "@/assets/stamp/stamp-dongjak.svg?react";
import StampDongmyo from "@/assets/stamp/stamp-dongmyo.svg?react";
import StampDongnimmun from "@/assets/stamp/stamp-dongnimmun.svg?react";
import StampGangdongGuOffice from "@/assets/stamp/stamp-gangdong-gu-office.svg?react";
import StampGeumho from "@/assets/stamp/stamp-geumho.svg?react";
import StampGongneung from "@/assets/stamp/stamp-gongneung.svg?react";
import StampGwangheungchang from "@/assets/stamp/stamp-gwangheungchang.svg?react";
import StampHagye from "@/assets/stamp/stamp-hagye.svg?react";
import StampHanseongBaekje from "@/assets/stamp/stamp-hanseong-baekje.svg?react";
import StampHansungUniv from "@/assets/stamp/stamp-hansung-univ.svg?react";
import StampHanyangUniv from "@/assets/stamp/stamp-hanyang-univ.svg?react";
import StampHeukseok from "@/assets/stamp/stamp-heukseok.svg?react";
import StampHufs from "@/assets/stamp/stamp-hufs.svg?react";
import StampHyochangPark from "@/assets/stamp/stamp-hyochang-park.svg?react";
import StampIchon from "@/assets/stamp/stamp-ichon.svg?react";
import StampJamsillaru from "@/assets/stamp/stamp-jamsillaru.svg?react";
import StampJamwon from "@/assets/stamp/stamp-jamwon.svg?react";
import StampJayang from "@/assets/stamp/stamp-jayang.svg?react";
import StampJegiDong from "@/assets/stamp/stamp-jegi-dong.svg?react";
import StampKoreaUniv from "@/assets/stamp/stamp-korea-univ.svg?react";
import StampMajang from "@/assets/stamp/stamp-majang.svg?react";
import StampMongchontoseong from "@/assets/stamp/stamp-mongchontoseong.svg?react";
import StampMuakjae from "@/assets/stamp/stamp-muakjae.svg?react";
import StampMullae from "@/assets/stamp/stamp-mullae.svg?react";
import StampNamseong from "@/assets/stamp/stamp-namseong.svg?react";
import StampNamyeong from "@/assets/stamp/stamp-namyeong.svg?react";
import StampNodeul from "@/assets/stamp/stamp-nodeul.svg?react";
import StampOksu from "@/assets/stamp/stamp-oksu.svg?react";
import StampSeokchon from "@/assets/stamp/stamp-seokchon.svg?react";
import StampSeonyudo from "@/assets/stamp/stamp-seonyudo.svg?react";
import StampSingeumho from "@/assets/stamp/stamp-singeumho.svg?react";
import StampSinjeongnegeori from "@/assets/stamp/stamp-sinjeongnegeori.svg?react";
import StampSinseolDong from "@/assets/stamp/stamp-sinseol-dong.svg?react";
import StampSongpa from "@/assets/stamp/stamp-songpa.svg?react";
import StampSungshinWomensUniv from "@/assets/stamp/stamp-sungshin-womens-univ.svg?react";
import StampSuyu from "@/assets/stamp/stamp-suyu.svg?react";
import StampWorldCupStadium from "@/assets/stamp/stamp-world-cup-stadium.svg?react";
import StampYangcheonGuOffice from "@/assets/stamp/stamp-yangcheon-gu-office.svg?react";
import StampYangcheonHyanggyo from "@/assets/stamp/stamp-yangcheon-hyanggyo.svg?react";
import StampYeongdeungpoMarket from "@/assets/stamp/stamp-yeongdeungpo-market.svg?react";
import StampYongmasan from "@/assets/stamp/stamp-yongmasan.svg?react";

export type StampIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const STATION_STAMP_MAP: Record<string, StampIconComponent> = {

  // 1호선
  제기동역: StampJegiDong,
  동묘앞역: StampDongmyo,
  신설동역: StampSinseolDong,
  외대앞역: StampHufs,
  남영역: StampNamyeong,

  // 2호선
  문래역: StampMullae,
  아현역: StampAhyeon,
  한양대역: StampHanyangUniv,
  잠실나루역: StampJamsillaru,
  양천구청역: StampYangcheonGuOffice,
  신정네거리역: StampSinjeongnegeori,

  // 3호선
  독립문역: StampDongnimmun,
  무악재역: StampMuakjae,
  금호역: StampGeumho,
  옥수역: StampOksu,
  잠원역: StampJamwon,

  // 4호선
  한성대입구역: StampHansungUniv,
  성신여대입구역: StampSungshinWomensUniv,
  수유역: StampSuyu,
  이촌역: StampIchon,
  동작역: StampDongjak,

  // 5호선
  마장역: StampMajang,
  애오개역: StampAeogae,
  신금호역: StampSingeumho,
  아차산역: StampAchasan,
  영등포시장역: StampYeongdeungpoMarket,
  방이역: StampBangi,

  // 6호선
  보문역: StampBomun,
  창신역: StampChangsin,
  효창공원앞역: StampHyochangPark,
  고려대역: StampKoreaUniv,
  광흥창역: StampGwangheungchang,
  월드컵경기장역: StampWorldCupStadium,

  // 7호선
  공릉역: StampGongneung,
  어린이대공원역: StampChildrensGrandPark,
  용마산역: StampYongmasan,
  자양역: StampJayang,
  하계역: StampHagye,
  남성역: StampNamseong,

  // 8호선
  암사역: StampAmsa,
  몽촌토성역: StampMongchontoseong,
  강동구청역: StampGangdongGuOffice,
  송파역: StampSongpa,
  석촌역: StampSeokchon,

  // 9호선
  노들역: StampNodeul,
  선유도역: StampSeonyudo,
  한성백제역: StampHanseongBaekje,
  양천향교역: StampYangcheonHyanggyo,
  흑석역: StampHeukseok,
  공항시장역: StampAirportMarket,
};
