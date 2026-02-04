/**
 * @OnlyCurrentDoc
 */

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Lounge Asia Automation')
      .addItem('主催者ドロップダウンの設定', 'setOrganiserDropdown')
      .addToUi();
}

function setOrganiserDropdown() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const eventSheet = ss.getSheetByName("Event_Master");
  const organiserSheet = ss.getSheetByName("Organisers");

  if (!eventSheet) {
    SpreadsheetApp.getUi().alert("エラー: 'Event_Master' シートが見つかりません。");
    return;
  }
  if (!organiserSheet) {
    SpreadsheetApp.getUi().alert("エラー: 'Organisers' シートが見つかりません。");
    return;
  }

  // --- 設定 ---
  // G列はインデックス 7 (A=1, B=2, ... G=7)
  const TARGET_COLUMN_INDEX = 7; 
  const HEADER_ROW = 1;
  const START_ROW = 2; // データは2行目から開始
  
  // 主催者のソース設定
  // 'Organisers' シートの A列 (インデックス 1) に名前があると仮定
  const SOURCE_COLUMN_INDEX = 1; 
  const SOURCE_START_ROW = 2;
  // ---------------------

  // ドロップダウンの範囲を定義 (Event_Master G列)
  const numRows = eventSheet.getMaxRows() - START_ROW + 1;
  if (numRows < 1) return; // 利用可能なデータ範囲がない
  
  const dropdownRange = eventSheet.getRange(START_ROW, TARGET_COLUMN_INDEX, numRows, 1);

  // 'Organisers' シートから主催者リストを取得
  const lastSourceRow = organiserSheet.getLastRow();
  // データがあるか確認
  if (lastSourceRow < SOURCE_START_ROW) {
     SpreadsheetApp.getUi().alert("警告: 'Organisers' リストが空のようです。");
  }
  
  // 'Organisers' シートの範囲を指す入力規則を作成
  const sourceRange = organiserSheet.getRange(
    SOURCE_START_ROW, 
    SOURCE_COLUMN_INDEX, 
    Math.max(lastSourceRow - SOURCE_START_ROW + 1, 10), // 少なくとも10行、または実際のデータ数
    1
  );

  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(sourceRange)
    .setAllowInvalid(false) // リストにない入力を拒否
    .setHelpText("ドロップダウンリストから有効な主催者を選択してください。")
    .build();

  // ルールを適用
  dropdownRange.setDataValidation(rule);
  
  SpreadsheetApp.getUi().alert("成功: 'Organizer' 列 (G) にドロップダウンの入力規則を適用しました。");
}
