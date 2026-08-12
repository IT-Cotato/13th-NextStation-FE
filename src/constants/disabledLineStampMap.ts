import type { ComponentType, SVGProps } from "react";
import StampDisabledLine1 from "@/assets/stamp-disabled/stamp-disabled-line-1.svg?react";
import StampDisabledLine2 from "@/assets/stamp-disabled/stamp-disabled-line-2.svg?react";
import StampDisabledLine3 from "@/assets/stamp-disabled/stamp-disabled-line-3.svg?react";
import StampDisabledLine4 from "@/assets/stamp-disabled/stamp-disabled-line-4.svg?react";
import StampDisabledLine5 from "@/assets/stamp-disabled/stamp-disabled-line-5.svg?react";
import StampDisabledLine6 from "@/assets/stamp-disabled/stamp-disabled-line-6.svg?react";
import StampDisabledLine7 from "@/assets/stamp-disabled/stamp-disabled-line-7.svg?react";
import StampDisabledLine8 from "@/assets/stamp-disabled/stamp-disabled-line-8.svg?react";
import StampDisabledLine9 from "@/assets/stamp-disabled/stamp-disabled-line-9.svg?react";

export type DisabledIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const DISABLED_LINE_STAMP_MAP: Record<string, DisabledIconComponent> = {
  "1호선": StampDisabledLine1,
  "2호선": StampDisabledLine2,
  "3호선": StampDisabledLine3,
  "4호선": StampDisabledLine4,
  "5호선": StampDisabledLine5,
  "6호선": StampDisabledLine6,
  "7호선": StampDisabledLine7,
  "8호선": StampDisabledLine8,
  "9호선": StampDisabledLine9,
};