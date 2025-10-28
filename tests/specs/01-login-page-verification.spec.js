import { test, expect } from "@playwright/test";
import LoginPage from "../pageobjects/loginpage.js";
import credentials from "../testdata/credentials.json";
import HomePage from "../pageobjects/homepage.js";
import{generateRandomName,getTimeStamp} from "../helpers/index.js"
import customtest from "../custom-fixtures/admin-user.js";


let loginPage,homePage,page,context;

test.beforeAll(async({browser})=>{
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
     homePage = new HomePage(page);
})
test("@smoke Verify Login Functionality", async () => {
  await loginPage.launchURL();
  await loginPage.login(credentials.username, credentials.password);
  expect(await homePage.$profileIcon.isVisible()).toBe(true);

});

test("Verify Invalid login error message", async () => {
  await loginPage.launchURL();
  await loginPage.login("Anitta", "1");
  expect(await loginPage.getErrorMessage()).toContain(
    "Invalid Username/Password"
  );
  
});
customtest.only('print',async({adminUser})=>{
  console.log(adminUser.username)

})
