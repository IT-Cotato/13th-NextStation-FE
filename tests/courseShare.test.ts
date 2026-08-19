import assert from "node:assert/strict";
import test from "node:test";

import {
  buildSharedCourseMessage,
  buildSharedCoursePath,
  buildSharedCourseUrl,
} from "../src/utils/courseShare.ts";

test("buildSharedCoursePath returns the share-token verify route", () => {
  assert.equal(
    buildSharedCoursePath("abc-123"),
    "/course/share/abc-123/verify",
  );
});

test("buildSharedCourseUrl joins the origin and share route", () => {
  assert.equal(
    buildSharedCourseUrl("abc-123", "https://nextstation.example.com"),
    "https://nextstation.example.com/course/share/abc-123/verify",
  );
});

test("buildSharedCourseUrl trims a trailing slash from the origin", () => {
  assert.equal(
    buildSharedCourseUrl("abc-123", "https://nextstation.example.com/"),
    "https://nextstation.example.com/course/share/abc-123/verify",
  );
});

test("buildSharedCourseMessage returns share copy with message then link", () => {
  assert.equal(
    buildSharedCourseMessage(
      "수유역 환승여행 코스",
      "https://nextstation.example.com/course/share/abc-123/verify",
    ),
    "수유역 환승여행 코스를 확인해보세요!\nhttps://nextstation.example.com/course/share/abc-123/verify",
  );
});
