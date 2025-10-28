import { test, expect } from "@playwright/test";
import LoginPage from "../pageobjects/loginpage.js";
import credentials from "../testdata/credentials.json";
import HomePage from "../pageobjects/homepage.js";
import DashBoard from "../pageobjects/admin.js";

let loginPage,homePage,page,context,dashBoard;

test.beforeAll(async({browser})=>{
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    dashBoard = new DashBoard(page)
})

test('Verify Admin Dashboard Functionality',async()=>{
    await loginPage.launchURL();
    await loginPage.login(credentials.username, credentials.password);
    console.log(await dashBoard.getAllTabContents());
    console.log(await dashBoard.getMoreInfo());
    let pageHeading = await dashBoard.getAdminUsersDashBoard();
    expect(await pageHeading).toContain("Admin Users")

})