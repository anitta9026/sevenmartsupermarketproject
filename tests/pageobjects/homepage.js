import Common from "./common";
class HomePage extends Common {
  constructor(page) {
    super(page);
    this.$profileIcon = this.page.locator(
      '//img[@class="img-circle elevation-2"]'
    );
  }
}
module.exports = HomePage;
