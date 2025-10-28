import Common from "./common";

class AdminUsers extends Common {
  constructor(page) {
    super(page);
    this.page = page;
    this.$adminPageHeading = this.page.locator('//h1[@class="m-0 text-dark"]');
    this.$newUser = this.page.locator('//a[@class="btn btn-rounded btn-danger"]');
    this.$newUserDetails = (name) =>this.page.locator(`//input[@name="${name}"]`);
    this.$userType = this.page.locator('//select[@id="user_type"]');
    this.$createNewUsers = this.page.locator('//button[@name="Create"]');
    this.$searchUser = this.page.locator('//a[@class="btn btn-rounded btn-primary"]')
    this.$existingUserAlert = this.page.locator('//div[@class="alert alert-danger alert-dismissible"]')
    this.$searchUserDetails = this.page.locator('//button[@name="Search"]');
    this.$searchUserResult = this.page.locator('//table[@class="table table-bordered table-hover table-sm"]//tbody')
    this.$userStatus = this.page.locator('//table[@class="table table-bordered table-hover table-sm"]//tbody//tr[1]//td[3]')
    this.$deleteUser = this.page.locator('//table[@class="table table-bordered table-hover table-sm"]//tbody//tr[1]//td[5]//a[3]')
    this.$lockUser = this.page.locator('//table[@class="table table-bordered table-hover table-sm"]//tbody//tr[1]//td[5]//a[1]')
    this.$editUser = this.page.locator('//table[@class="table table-bordered table-hover table-sm"]//tbody//tr[1]//td[5]//a[2]')
    this.$deletedUserStatus = this.page.locator('//table[@class="table table-bordered table-hover table-sm"]//tbody//tr//td')
    this.$updateUserDetails =  this.page.locator('//button[@class="btn btn-block-sm btn-info"]')
  }

  async clickOnAdminUsersDashBoard() {
    await this.$cardMoreInfo("list-admin").click();
    await this.page.waitForTimeout(1000);
    let headline = await this.$adminPageHeading.textContent();
    return headline;
  }

  async newUserCreation(username, password, user_type) {
    await this.$newUser.click();
    await this.page.waitForTimeout(1000);
    await this.$newUserDetails("username").fill(username);
    await this.$newUserDetails("password").fill(password);
    await this.$userType.click();
    await this.$userType.selectOption(user_type);
    await this.$createNewUsers.click();
    await this.page.waitForTimeout(3000);
    let successAlert = await this.$statusAlert.textContent();
    return successAlert;
  }

  async existingUserCreation(username, password, user_type) {
    await this.$newUser.click();
    await this.page.waitForTimeout(1000);
    await this.$newUserDetails("username").fill(username);
    await this.$newUserDetails("password").fill(password);
    await this.$userType.click();
    await this.$userType.selectOption(user_type);
    await this.$createNewUsers.click();
    await this.page.waitForTimeout(3000);
    let warningAlert = await this.$existingUserAlert.textContent();
    return warningAlert;
  }

  async searchUser(username) {
    await this.$searchUser.click();
    await this.$newUserDetails("un").fill(username);
    await this.$searchUserDetails.click();
  }

  async searchUserDetails(username) {
    await this.searchUser(username);
    let userDetails = await this.$searchUserResult.textContent();
    return userDetails;
  }

  async changeStatus(username) {
    await this.searchUser(username);
    let userStatusBefore = await this.$userStatus.textContent();
    console.log(userStatusBefore);
    await this.$lockUser.click();
    let userStatusUpdated = await this.$userStatus.textContent();
    console.log(userStatusUpdated);
  }

  async changeUserStatus(username) {
    await this.changeStatus(username);
    let statusChangeAlert = await this.$statusAlert.textContent();
    return statusChangeAlert;
  }

  async editUserDetails(username,user_type,updatedname) {
    await this.searchUser(username);
    await this.$editUser.click()
    await this.page.waitForTimeout(1000)
    await this.$newUserDetails("username").fill(updatedname);
    await this.$newUserDetails("password").fill(updatedname);
    await this.$userType.click();
    await this.$userType.selectOption(user_type);
    await this.$updateUserDetails.click()
    let changeUserDetailsAlert = await this.$statusAlert.textContent();
    return changeUserDetailsAlert;
  }

  async deleteInactiveUser(username) {
    await this.searchUser(username);
    let userCurrentStatus = await this.$userStatus.innerText();
    console.log("userCurrentStatus", userCurrentStatus);
    if (userCurrentStatus != "Inactive") {
      console.log("inside loop");
      await this.changeStatus(username);
    }
    await this.searchUser(username)
    console.log("Clicking delete")
    console.log(await this.$deleteUser.isVisible())
       await this.page.once('dialog', async dialog => {
        await dialog.accept();         
      }); 
   await this.$deleteUser.scrollIntoViewIfNeeded();
   await this.$deleteUser.click();
   await this.searchUser(username)
   let userStatus = await this.$deletedUserStatus.textContent()
   return userStatus;
  }
}
module.exports = AdminUsers;
