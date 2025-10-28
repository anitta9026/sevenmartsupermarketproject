import { test, expect } from "@playwright/test";
import LoginPage from "../pageobjects/loginpage.js";
import newusers from "../testdata/newusers.json";
import HomePage from "../pageobjects/homepage.js";


let loginPage,homePage,page,context;

test.beforeAll(async({browser})=>{
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
})
test("Verify User Login Functionality", async () => {
  await loginPage.launchURL();
  await loginPage.login(newusers.userSet1.username, newusers.userSet1.password); 
  expect(await homePage.$profileIcon.isVisible()).toBe(true);
});