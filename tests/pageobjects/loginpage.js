import Common from "./common";
class LoginPage extends Common {
  constructor(page) {
    super(page);
            this.page=page;
    
    this.$signInButton = page.locator('//button[text()="Sign In"]');
    this.$rememberBox = page.locator('//input[@id="remember"]');
    this.$errorMessage = page.locator('//div[@class="alert alert-danger alert-dismissible"]')
  }

  async login(username, password) {
    await this.$inputField("username").fill(username);
    await this.$inputField("password").fill(password);
    await this.$signInButton.click();
  }

  async getErrorMessage(){
    return await this.$errorMessage.textContent()
  }
  
}
module.exports=LoginPage
