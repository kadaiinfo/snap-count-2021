function firestore() {
  const FSSA = firestoreServiceAccount();
  const _firestore = FirestoreApp.getFirestore(FSSA.client_email, FSSA.private_key, FSSA.project_id);
  const votes = _firestore.getDocuments('binanbijo_vote');

  let result = {};

  votes.map(vote => {
    const data = vote.fields;

    const date = new Date(data.createdAt.timestampValue);
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    if (result[dateString] == null) result[dateString] = [];

    result[dateString].push({
      // 'createdAt': data.createdAt.timestampValue,
      'isStudent': data.isStudent.booleanValue,
      'entryNumber': data.entryNumber.integerValue,
      'gender': data.gender.stringValue
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
