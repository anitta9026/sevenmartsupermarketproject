import credentials from "../testdata/credentials.json"
class Common{
    constructor(page){
        this.page= page
        this.$inputField = (name) =>page.locator(`//input[@name="${name}"]`);
        this.$cardMoreInfo =(more) =>page.locator(`//a[contains(@href,"${more}") and @class="small-box-footer"]`)
        this.$allTabsName = this.page.locator('//div[@class="inner"]//p')
        this.$statusAlert = this.page.locator('//div[@class="alert alert-success alert-dismissible"]')
    }

    async launchURL(){
        await this.page.goto(credentials.url)
    }

}
module.exports = Common