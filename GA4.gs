function GA4() {

  const propertyId = '295006604';

  const metric = AnalyticsData.newMetric();
  metric.name = 'screenPageViews';

  const dimension = AnalyticsData.newDimension();
  dimension.name = 'pagePath';

  let output = {};

  const firstDate = new Date('2021-12-01T00:00:00+09:00');
  for (i = 0; i < 31; i++) {
    const date = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + i);
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const dateRange = AnalyticsData.newDateRange();
    dateRange.startDate = dateString;
    dateRange.endDate = dateString;

    const request = AnalyticsData.newRunReportRequest();
    request.dimensions = [dimension];
    request.metrics = [metric];
    request.dateRanges = dateRange;

    const report = AnalyticsData.Properties.runReport(request, 'properties/' + propertyId);

    let malePageViews = Array(12);
    malePageViews.fill(0);
    let femalePageViews = Array(11);
    femalePageViews.fill(0);

    if(report.rows == null) continue;

    report.rows.map(row => {
      const id = row.dimensionValues[0].value.split('/')[1];
      if (id == null) return;
      if (idToGender[id] == null) return;
      const gender = idToGender[id];
      const entryNumber = idToNumber[id];
      if (gender == 'male') {
        malePageViews[entryNumber - 1] = Number(row.metricValues[0].value);
      } else {
        femalePageViews[entryNumber - 1] = Number(row.metricValues[0].value);
      }
    });

    output[dateString] = {
      'malePageViews': malePageViews,
      'femalePageViews': femalePageViews
    };
  }

  return output;
}
