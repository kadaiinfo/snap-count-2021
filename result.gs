function result() {
  const spreadSheet = SpreadsheetApp.openById('1zrOeSVXec3rnNj3_8OyEI0V9FVL7oJT4PczWbdiFmXM');
  const ga4Sheet = spreadSheet.getSheetByName('GA4');
  const youtubeSheet = spreadSheet.getSheetByName('youtube');
  const voteSheet = spreadSheet.getSheetByName('投票');
  const resultSheet = spreadSheet.getSheetByName('結果');

  let maleResult = [];
  let femaleResult = [];

  Object.keys(nameToId).map((name, i) => {
    const gender = idToGender[nameToId[name]];
    if (gender == 'male') {

      // first: 0-6, second: 0-16, third: 17-23, forth: 24-30

      let pageView = 0;
      for (j = 24; j < 30; j++) {
        pageView += Number(ga4Sheet.getRange(2 + 3 * j, 2 + i).getValue());
      }

      let viewCounts = 0;
      viewCounts += Number(youtubeSheet.getRange(1, 2 + i).getValue());
      // 1st Stage + Return stageを引く
      viewCounts -= Number(youtubeSheet.getRange(12, 2 + i).getValue());

      let votePoints = 0;
      for (j = 24; j < 30; j++) {
        votePoints += Number(voteSheet.getRange(2 + 5 * j, 2 + i).getValue() * 5);
        votePoints += Number(voteSheet.getRange(3 + 5 * j, 2 + i).getValue() * 3);
      }

      const point = pageView + viewCounts + votePoints;

      maleResult.push(point);

      resultSheet.getRange(2 + i, 2).setValue(point);
    } else {

      const k = i - 12

      let pageView = 0;
      for (j = 24; j < 30; j++) {
        pageView += Number(ga4Sheet.getRange(3 + 3 * j, 2 + k).getValue());
      }

      let viewCounts = 0;
      viewCounts += Number(youtubeSheet.getRange(2, 2 + k).getValue());
      // 1st Stage + Return stageを引く
      viewCounts -= Number(youtubeSheet.getRange(13, 2 + i).getValue());

      let votePoints = 0;
      for (j = 24; j < 30; j++) {
        votePoints += Number(voteSheet.getRange(4 + 5 * j, 2 + k).getValue() * 5);
        votePoints += Number(voteSheet.getRange(5 + 5 * j, 2 + k).getValue() * 3);
      }

      const point = pageView + viewCounts + votePoints;

      femaleResult.push(point);

      resultSheet.getRange(2 + i, 2).setValue(point);
    }
  });

  console.log(maleResult);
  console.log(femaleResult);
}
