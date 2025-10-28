import { test, expect } from "@playwright/test";
import LoginPage from "../pageobjects/loginpage.js";
import credentials from "../testdata/credentials.json";
import newusers from "../testdata/newusers.json";
import HomePage from "../pageobjects/homepage.js";
import AdminUsers from "../pageobjects/adminusers.js";
import{generateRandomName} from "../helpers/index.js"

let loginPage,homePage,page,context,adminUsers,newUserSuccessAlert;
let randomName= generateRandomName()

test.beforeAll(async({browser})=>{
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    adminUsers = new AdminUsers(page)
})

test('Verify the Create User Functionality in the Admin Users Module',async()=>{
    await loginPage.launchURL();
    await loginPage.login(credentials.username, credentials.password);
    await adminUsers.clickOnAdminUsersDashBoard();
    for(let i=0;i<3;i++)
    {
        randomName=await generateRandomName()
        newUserSuccessAlert = await adminUsers.newUserCreation(`${newusers.userSet1.username} ${randomName}`,newusers.userSet1.password,newusers.userSet1.user_type);
        console.log(newUserSuccessAlert)
    }
    
    
    expect(await newUserSuccessAlert).toContain("User Created Successfully")  
})

test('Verify the Existing User Creation Functionality in the Admin Users Module.',async()=>{
    await loginPage.launchURL();
    await loginPage.login(credentials.username, credentials.password);
    await adminUsers.clickOnAdminUsersDashBoard();
    let existingUserCreationAlert = await adminUsers.existingUserCreation(newusers.userSet1.username,newusers.userSet1.password,newusers.userSet1.user_type);
    console.log(existingUserCreationAlert)
    expect(await existingUserCreationAlert).toContain("Username already exists.")
    
})

test('Verify the Search User Functionality in the Admin Users Module.',async()=>{
    await loginPage.launchURL();
    await loginPage.login(credentials.username, credentials.password);
    await adminUsers.clickOnAdminUsersDashBoard();
    let searchUserDetails = await adminUsers.searchUserDetails(newusers.userSet1.username);
    console.log(searchUserDetails)   
    expect(await searchUserDetails).toContain("Anitta")
})

test('Verify the Lock User Functionality in the Admin Users Module.',async()=>{
    await loginPage.launchURL();
    await loginPage.login(credentials.username, credentials.password);
    await adminUsers.clickOnAdminUsersDashBoard();
    await adminUsers.searchUser(newusers.userSet1.username);
    let lockStatus = await adminUsers.changeUserStatus(newusers.userSet1.username)
    console.log(lockStatus)
    expect(await lockStatus).toContain("User Status Changed Successfully")
})

test('Verify the Delete User Functionality in the Admin Users Module.',async()=>{
    await loginPage.launchURL();
    await loginPage.login(credentials.username, credentials.password);
    await adminUsers.clickOnAdminUsersDashBoard();
    let deletedUserDetails = await adminUsers.deleteInactiveUser("Anitta Cazinn")
    expect(await deletedUserDetails).toContain('RESULT NOT FOUND')
})

test('Verify the Edit User Functionality in the Admin Users Module.',async()=>{//not working
    await loginPage.launchURL();
    await loginPage.login(credentials.username, credentials.password);
    await adminUsers.clickOnAdminUsersDashBoard();
    await adminUsers.editUserDetails("Anitta Uipxxv",newusers.UserType.staff,randomName)
})

