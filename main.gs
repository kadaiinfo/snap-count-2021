function main() {
  const ga4Output = GA4();
  const youtubeOutput = youtube();
  const firestoreOutput = firestore();
  const rtDBOutput = realtimeDatabase();

  // 集計
  const spreadSheet = SpreadsheetApp.openById('1zrOeSVXec3rnNj3_8OyEI0V9FVL7oJT4PczWbdiFmXM');

  // GA4
  const ga4Sheet = spreadSheet.getSheetByName('GA4');
  Object.keys(ga4Output).map((date, i) => {
    const dateCells = ga4Sheet.getRange(3 * i + 1, 1, 3, 1);
    dateCells.setValues([[date], ['male'], ['female']]);

    const pvCells = ga4Sheet.getRange(3 * i + 2, 2, 2, 12);

    const addFemalePageViews = ga4Output[date].femalePageViews;
    addFemalePageViews.push(0);

    pvCells.setValues([ga4Output[date].malePageViews, addFemalePageViews]);
  });

  // youtube
  const youtubeSheet = spreadSheet.getSheetByName('youtube');

  const genderCells = youtubeSheet.getRange(1, 1, 2, 1);
  genderCells.setValues([['male'], ['female']]);

  const cells = youtubeSheet.getRange(1, 2, 2, 12);
  const addFemaleViewCounts = youtubeOutput.femaleViewCounts;
  addFemaleViewCounts.push(0);
  cells.setValues([youtubeOutput.maleViewCounts, addFemaleViewCounts]);

  // 投票 2021-12-2 3 4 あとで追加
  const voteSheet = spreadSheet.getSheetByName('投票');

  // Object.keys(firestoreOutput).map((date, i) => {

  //   if (date == '2021-12-2' || date == '2021-12-3' || date == '2021-12-4') {
  //     Object.keys(firestoreOutput[date]).map((key, j) => {

  //       if (key == 'femaleStudentVotes' || key == 'femaleGeneralVotes') {
  //         firestoreOutput[date][key].push(0);
  //       }

  //       if(date == '2021-12-2') {
  //         i = 0;
  //       } else if(date == '2021-12-3') {
  //         i = 1;
  //       } else if(date == '2021-12-4') {
  //         i = 2;
  //       }

  //       const valueCells = sheet.getRange(2 + 5 * i + j, 2, 1, 12);
  //       valueCells.setValues([firestoreOutput[date][key]]);

  //     });
  //   }
  // });

  Object.keys(rtDBOutput).map((date, i) => {

    const dateCells = voteSheet.getRange(16 + 5 * i, 1);
    dateCells.setValue(date);

    Object.keys(rtDBOutput[date]).map((key, j) => {

      const keyCells = voteSheet.getRange(16 + 5 * i + j + 1, 1);
      keyCells.setValue(key);

      rtDBOutput[date][key].map((value, k) => {
        firestoreOutput[date][key][k] += value;
      });

      // 上のコードと排他的
      if(key == 'femaleStudentVotes' || key == 'femaleGeneralVotes') {
        firestoreOutput[date][key].push(0);
      }

      const valueCells = voteSheet.getRange(16 + 5 * i + j + 1, 2, 1, 12);
      valueCells.setValues([firestoreOutput[date][key]]);
    });
  });

  result();
}
