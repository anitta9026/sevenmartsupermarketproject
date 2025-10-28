import ExcelJS from "exceljs";
class ExcelRead {
  constructor() {}
  async writeExcelCellValue(filePath, sheetName, cellAddress, newValue) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(sheetName);
    if (!worksheet) {
      throw new Error(`Worksheet "${sheetName}" not found.`);
    }
    const cell = worksheet.getCell(cellAddress);
    cell.value = newValue;
    await workbook.xlsx.writeFile(filePath);
    console.log(
      `Updated cell ${cellAddress} in "${sheetName}" with value: ${newValue}`
    );
  }
}

module.exports = ExcelRead;
