import { test as base } from "@playwright/test";

const customtest = base.extend({
  adminUser: {
    username: "Anitta",
    password: "abcd",
    user_type: "Staff",
  },
});
export default customtest;