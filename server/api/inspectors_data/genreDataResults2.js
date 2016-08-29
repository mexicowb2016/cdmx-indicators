var genreData2 = require('./genreData2.json');

var genreData2FilterDemographic = function(dependency, classification) {
  var results = {};
  for (var i = 0; i < genreData2.DATA.length; i++) {
    var data = genreData2.DATA[i];
    if (data['DEPENDENCY'] == dependency && data['CLASSIFICATION'] == classification) {
      results[data['SECTOR']] = {
        proportion: parseFloat(data['PROPORTION_WOMEN']),
        women: parseInt(data['QUANTITY_WOMEN']),
        men: parseInt(data['QUANTITY_MEN'])
      };
    }
  }
  return results;
};

var genreData2FilterRemuneration = function(dependency, classification) {
  var results = {};
  for (var i = 0; i < genreData2.DATA.length; i++) {
    var data = genreData2.DATA[i];
    if (data['DEPENDENCY'] == dependency && data['CLASSIFICATION'] == classification) {
      results[data['SECTOR']] = {
        salaryGap: parseFloat(data['SALARY_GAP'])
      };
    }
  }
  return results;
};

module.exports = {
  genreData2: genreData2,
  genreData2FilterDemographic: genreData2FilterDemographic,
  genreData2FilterRemuneration: genreData2FilterRemuneration
};
