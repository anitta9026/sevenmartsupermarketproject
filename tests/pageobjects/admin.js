import Common from "./common"

class DashBoard extends Common{
    constructor(page){
        super(page);
        this.page=page
        this.$adminPageHeading = this.page.locator('//h1[@class="m-0 text-dark"]')
        this.$newUserCreation = this.page.locator('//a[@class="btn btn-rounded btn-danger"')      
    }

    async getMoreInfo() {
      return  await this.$cardMoreInfo("list-admin").textContent()
    }

    async getAllTabContents(){
      let allTabs =  await this.$allTabsName.allTextContents()
      let trimmedData = await allTabs.map((text)=>text.trim())
      console.log(trimmedData.length)
      return trimmedData
    }
    
   async clickOnAdminUsersDashBoard(){
     await this.$cardMoreInfo("list-admin").click()
     await this.page.waitForTimeout(1000)
     let headline = await this.$adminPageHeading.textContent()
     return headline
  }

}
module.exports=DashBoard;