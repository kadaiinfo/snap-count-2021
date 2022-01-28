function youtube() {

  const result = YouTube.PlaylistItems.list(['contentDetails', 'snippet'], { playlistId: 'PLus9RDtiOcCIdT3pRR9no5avO-EBxBX-9', maxResults: 50 });

  let maleViewCounts = Array(12);
  maleViewCounts.fill(0);
  let femaleViewCounts = Array(11);
  femaleViewCounts.fill(0);

  result.items.map(item => {
    if(item.snippet == null) return;
    const rowTitle = item.snippet.title;
    const halfName = rowTitle.split('【')[1];
    if(halfName == null) return;
    const fullName = halfName.split('】')[0];
    const id = nameToId[fullName];
    const gender = idToGender[id];
    const entryNumber = idToNumber[id];

    const video = YouTube.Videos.list(['statistics'], {id: item.contentDetails.videoId});
    if(video.items[0] == null) return;
    
    if(gender == 'male') {
      maleViewCounts[entryNumber - 1] += Number(video.items[0].statistics.viewCount);
    } else {
      femaleViewCounts[entryNumber - 1] += Number(video.items[0].statistics.viewCount);
    }
  });

  const output = {
    'maleViewCounts': maleViewCounts,
    'femaleViewCounts': femaleViewCounts
  };

  return output;
}







