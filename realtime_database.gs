function realtimeDatabase() {
  const legacySecret = 'RqecxfXD8XbM25NA8QBWPfGzSlGpaKqVpMBxrrht';
  const dbUrl = 'https://kadai-info-flutter-default-rtdb.asia-southeast1.firebasedatabase.app/';
  const _rtDB = FirebaseApp.getDatabaseByUrl(dbUrl, legacySecret);
  const allData = _rtDB.getData('binanbijo_vote');

  const result = {};

  Object.keys(allData).map(key => {
    const data = allData[key];
    const date = new Date(data.createdAt);
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    if (result[dateString] == null) result[dateString] = [];

    result[dateString].push({
      'entryNumber': data.entryNumber,
      'gender': data.gender,
      'isStudent': data.isStudent
    });
  });

    let output = {};

  Object.keys(result).map(dateString => {

    let maleStudentVotes = Array(12);
    maleStudentVotes.fill(0);
    let maleGeneralVotes = Array(12);
    maleGeneralVotes.fill(0);
    let femaleStudentVotes = Array(11);
    femaleStudentVotes.fill(0);
    let femaleGeneralVotes = Array(11);
    femaleGeneralVotes.fill(0);

    result[dateString].map(vote => {
      if (vote.gender == '男') {
        if (vote.isStudent) {
          maleStudentVotes[vote.entryNumber - 1]++;
        } else {
          maleGeneralVotes[vote.entryNumber - 1]++;
        }
      } else {
        if (vote.isStudent) {
          femaleStudentVotes[vote.entryNumber - 1]++;
        } else {
          femaleGeneralVotes[vote.entryNumber - 1]++;
        }
      }
    });

    output[dateString] = {
      'maleStudentVotes': maleStudentVotes,
      'maleGeneralVotes': maleGeneralVotes,
      'femaleStudentVotes': femaleStudentVotes,
      'femaleGeneralVotes': femaleGeneralVotes,
    }
  });

  return output;
}
