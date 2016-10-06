/**
 * Popula la Base de Datos al iniciar el servidor
 * para deshabilitar, editar config/environment/index.js, y poner `seedDB: false`
 */

'use strict';

// var Thing = require('../api/thing/thing.model');
// var User = require('../api/user/user.model');
// //Finance models
// var ManagerCenter = require('../api/managerCenter/managerCenter.model');
// var Finality = require('../api/finality/finality.model');
// var DepartmentFunction = require('../api/departmentFunction/departmentFunction.model');
// var DepartmentSubFunction = require('../api/departmentSubFunction/departmentSubFunction.model');
// var InstitutionalActivity = require('../api/institutionalActivity/institutionalActivity.model');
// var SpentType = require('../api/spentType/spentType.model');
// var Spent = require('../api/spent/spent.model');
// var financeData = require('../api/inspectors_data/financeData.json');
// var managerCenterArray = financeData['DATA'];
// var managerCenterLength = financeData['DATA'].length;
// //Genre models
// var JobClassification = require('../api/jobClassification/jobClassification.model');
// var Genre = require('../api/genre/genre.model');
// var Sector = require('../api/sector/sector.model');
// var genreData = require('../api/inspectors_data/genreData.json');
// var genreDataArray = genreData['DATA'];
// var genreDataLength = genreDataArray.length;
//
//
// Thing.find({}).remove(function() {
//   Thing.create({
//     name : 'Development Tools',
//     info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
//   }, {
//     name : 'Server and Client integration',
//     info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
//   }, {
//     name : 'Smart Build System',
//     info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
//   },  {
//     name : 'Modular Structure',
//     info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
//   },  {
//     name : 'Optimized Build',
//     info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
//   },{
//     name : 'Deployment Ready',
//     info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
//   });
// });
//
// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'Test User',
//     email: 'test@test.com',
//     password: 'test'
//   }, {
//     provider: 'local',
//     role: 'admin',
//     name: 'Admin',
//     email: 'admin@admin.com',
//     password: 'admin'
//   }, function() {
//       console.log('finished populating users');
//     }
//   );
// });
//
// var dbCollections = {
//   ManagerCenter: [],
//   Finality: [],
//   SpentType: [],
//   DepartmentFunction: [],
//   DepartmentSubFunction: [],
//   InstitutionalActivity: [],
//   Spent: []
// };
//
// var dbModels = {
//   ManagerCenter: ManagerCenter,
//   Finality: Finality,
//   SpentType: SpentType,
//   DepartmentFunction: DepartmentFunction,
//   DepartmentSubFunction: DepartmentSubFunction,
//   InstitutionalActivity: InstitutionalActivity,
//   Spent: Spent
// };
//
// var dbCompareModels = {
//   ManagerCenter: {},
//   Finality: {},
//   SpentType: {},
//   DepartmentFunction: {},
//   DepartmentSubFunction: {},
//   InstitutionalActivity: {}
// };
//
// var dbModelsId = {
//   ManagerCenter: 'managerId',
//   Finality: 'finalityId',
//   SpentType: 'spentTypeId',
//   DepartmentFunction: 'departmentId',
//   DepartmentSubFunction: 'departmentSubId',
//   InstitutionalActivity: 'institutionalId'
// };
//
// var genreDBCollections = {
//   Sector: [],
//   Genre: [{name: 'Masculino'},{name: 'Femenino'}],
//   JobClassification: [
//     {name: 'Estabilidad Laboral'},
//     {name: 'Haberes'},
//     {name: 'Mando Medio'},
//     {name: 'Mando Superior'},
//     {name: 'Tecnico Operativo de Base'},
//     {name: 'Tecnico Operativo de Confianza'}
//   ]
// };
//
// var genreDBModelComparation = {
//   Genre: {},
//   JobClassification: {}
// };
//
// var financeCounter = {
//   countTotal: 0,
//   countTotalFinished: 0
// };
//
// var genreCounter = {
//   countTotal: 0,
//   countTotalFinished: 0
// };
//
// function removeComparedModels() {
//   dbCompareModels = {
//     ManagerCenter: {},
//     Finality: {},
//     SpentType: {},
//     DepartmentFunction: {},
//     DepartmentSubFunction: {},
//     InstitutionalActivity: {}
//   };
//   dbCollections = {
//     ManagerCenter: [],
//     Finality: [],
//     SpentType: [],
//     DepartmentFunction: [],
//     DepartmentSubFunction: [],
//     InstitutionalActivity: [],
//     Spent: []
//   };
// }
//
// function removeGenreComparedCollections (){
//   genreDBModelComparation = {
//     Genre: {},
//     JobClassification: {}
//   };
//   genreDBCollections.Sector = [];
//   genreDBCollections.Genre = [];
//   genreDBCollections.JobClassification = [];
// }
//
// function getManagerCenterModelData (key) {
//   return {
//     managerId: managerCenterArray[key].MANAGERCENTER_ID,
//     name: managerCenterArray[key].NAME,
//     dependency: Number(managerCenterArray[key].DEPENDENCY)
//   };
// }
//
// function getFinalityModelData (key) {
//   return {
//     finalityId: managerCenterArray[key].FINALITY.FINALITY_ID,
//     name: managerCenterArray[key].FINALITY.NAME
//   };
// }
//
// function getSpentTypeModelData (key) {
//   return {
//     spentTypeId: managerCenterArray[key].SPENTS.SPENTTYPE_ID,
//     name: managerCenterArray[key].SPENTS.SPENTTYPE_NAME
//   };
// }
//
// function getDepartmentFunctionModelData (key) {
//   return {
//     departmentId: managerCenterArray[key].DFUNCTION.DFUNCTION_ID,
//     name: managerCenterArray[key].DFUNCTION.NAME
//   };
// }
//
// function getDepartmentSubFunctionModelData (key) {
//   return {
//     departmentSubId: managerCenterArray[key].DSUBFUNCTION.DSUBFUNCTION_ID,
//     name: managerCenterArray[key].DSUBFUNCTION.NAME
//   };
// }
//
// function getInstitutionalActivityModelData (key) {
//   return {
//     institutionalId: managerCenterArray[key].INSTITUTIONAL_ACTIVITY.INSTITUTIONAL_ACTIVITY_ID,
//     name: managerCenterArray[key].INSTITUTIONAL_ACTIVITY.NAME,
//     year: managerCenterArray[key].INSTITUTIONAL_ACTIVITY.YEAR,
//     budgetProgramId: managerCenterArray[key].INSTITUTIONAL_ACTIVITY.BUDGETPROGRAM_ID,
//     budgetProgramName: managerCenterArray[key].INSTITUTIONAL_ACTIVITY.BUDGETPROGRAM_NAME
//   };
// }
//
// function getSpentModelData (key) {
//   return {
//     priorityOrder: key,
//     investmentProject: managerCenterArray[key].SPENTS.INVESTMENTPROYECT,
//     originalSpent: Number(managerCenterArray[key].SPENTS.ORIGINALSPENT.split(',').join('')),
//     modifiedSpents: {
//       january: managerCenterArray[key].SPENTS.MODIFIED_SPENTS.JANUARY.length > 0 ? Number(managerCenterArray[key].SPENTS.MODIFIED_SPENTS.JANUARY.split(',').join('')) : 0,
//       february: managerCenterArray[key].SPENTS.MODIFIED_SPENTS.FEBRUARY.length > 0 ? Number(managerCenterArray[key].SPENTS.MODIFIED_SPENTS.FEBRUARY.split(',').join('')) : 0,
//       march: managerCenterArray[key].SPENTS.MODIFIED_SPENTS.MARCH.length > 0 ? Number(managerCenterArray[key].SPENTS.MODIFIED_SPENTS.MARCH.split(',').join('')) : 0,
//       april: managerCenterArray[key].SPENTS.MODIFIED_SPENTS.APRIL.length > 0 ? Number(managerCenterArray[key].SPENTS.MODIFIED_SPENTS.APRIL.split(',').join('')) : 0,
//       may: managerCenterArray[key].SPENTS.MODIFIED_SPENTS.MAY.length > 0 ? Number(managerCenterArray[key].SPENTS.MODIFIED_SPENTS.MAY.split(',').join('')) : 0,
//       june: managerCenterArray[key].SPENTS.MODIFIED_SPENTS.JUNE.length > 0 ? Number(managerCenterArray[key].SPENTS.MODIFIED_SPENTS.JUNE.split(',').join('')) : 0,
//       july: managerCenterArray[key].SPENTS.MODIFIED_SPENTS.JULY.length > 0 ? Number(managerCenterArray[key].SPENTS.MODIFIED_SPENTS.JULY.split(',').join('')) : 0,
//       august: managerCenterArray[key].SPENTS.MODIFIED_SPENTS.AUGUST.length > 0 ? Number(managerCenterArray[key].SPENTS.MODIFIED_SPENTS.AUGUST.split(',').join('')) : 0,
//       september: managerCenterArray[key].SPENTS.MODIFIED_SPENTS.SEPTEMBER.length > 0 ? Number(managerCenterArray[key].SPENTS.MODIFIED_SPENTS.SEPTEMBER.split(',').join('')) : 0,
//       october: managerCenterArray[key].SPENTS.MODIFIED_SPENTS.OCTOBER.length > 0 ? Number(managerCenterArray[key].SPENTS.MODIFIED_SPENTS.OCTOBER.split(',').join('')) : 0,
//       november: managerCenterArray[key].SPENTS.MODIFIED_SPENTS.NOVEMBER.length > 0 ? Number(managerCenterArray[key].SPENTS.MODIFIED_SPENTS.NOVEMBER.split(',').join('')) : 0,
//       december: managerCenterArray[key].SPENTS.MODIFIED_SPENTS.DECEMBER.length > 0 ? Number(managerCenterArray[key].SPENTS.MODIFIED_SPENTS.DECEMBER.split(',').join('')) : 0
//     },
//     executedSpents: {
//       january: managerCenterArray[key].SPENTS.EXECUTED_SPENTS.JANUARY.length > 0 ? Number(managerCenterArray[key].SPENTS.EXECUTED_SPENTS.JANUARY.split(',').join('')) : 0,
//       february: managerCenterArray[key].SPENTS.EXECUTED_SPENTS.FEBRUARY.length > 0 ? Number(managerCenterArray[key].SPENTS.EXECUTED_SPENTS.FEBRUARY.split(',').join('')) : 0,
//       march: managerCenterArray[key].SPENTS.EXECUTED_SPENTS.MARCH.length > 0 ? Number(managerCenterArray[key].SPENTS.EXECUTED_SPENTS.MARCH.split(',').join('')) : 0,
//       april: managerCenterArray[key].SPENTS.EXECUTED_SPENTS.APRIL.length > 0 ? Number(managerCenterArray[key].SPENTS.EXECUTED_SPENTS.APRIL.split(',').join('')) : 0,
//       may: managerCenterArray[key].SPENTS.EXECUTED_SPENTS.MAY.length > 0 ? Number(managerCenterArray[key].SPENTS.EXECUTED_SPENTS.MAY.split(',').join('')) : 0,
//       june: managerCenterArray[key].SPENTS.EXECUTED_SPENTS.JUNE.length > 0 ? Number(managerCenterArray[key].SPENTS.EXECUTED_SPENTS.JUNE.split(',').join('')) : 0,
//       july: managerCenterArray[key].SPENTS.EXECUTED_SPENTS.JULY.length > 0 ? Number(managerCenterArray[key].SPENTS.EXECUTED_SPENTS.JULY.split(',').join('')) : 0,
//       august: managerCenterArray[key].SPENTS.EXECUTED_SPENTS.AUGUST.length > 0 ? Number(managerCenterArray[key].SPENTS.EXECUTED_SPENTS.AUGUST.split(',').join('')) : 0,
//       september: managerCenterArray[key].SPENTS.EXECUTED_SPENTS.SEPTEMBER.length > 0 ? Number(managerCenterArray[key].SPENTS.EXECUTED_SPENTS.SEPTEMBER.split(',').join('')) : 0,
//       october: managerCenterArray[key].SPENTS.EXECUTED_SPENTS.OCTOBER.length > 0 ? Number(managerCenterArray[key].SPENTS.EXECUTED_SPENTS.OCTOBER.split(',').join('')) : 0,
//       november: managerCenterArray[key].SPENTS.EXECUTED_SPENTS.NOVEMBER.length > 0 ? Number(managerCenterArray[key].SPENTS.EXECUTED_SPENTS.NOVEMBER.split(',').join('')) : 0,
//       december: managerCenterArray[key].SPENTS.EXECUTED_SPENTS.DECEMBER.length > 0 ? Number(managerCenterArray[key].SPENTS.EXECUTED_SPENTS.DECEMBER.split(',').join('')) : 0
//     }
//   };
// }
//
// function createDocumentCollection (Model, params) {
//   return Model.create(params);
// }
//
// function saveDataInModelArray(modelArray, isSpentModel, params, currentItem, referenceId, jsonDocId, hasSubProperty) {
//   if (modelArray.length == 0 || isSpentModel) {
//     modelArray.push(params)
//   } else {
//     var check = false;
//     var property = hasSubProperty ? jsonDocId.split('.')[0] : jsonDocId;
//     var subProperty = hasSubProperty ? jsonDocId.split('.')[1] : null;
//     for (var j = 0; j < modelArray.length; j++) {
//       var current = hasSubProperty ? currentItem[property][subProperty] : currentItem[property];
//       if (modelArray[j][referenceId] === current) {
//         check = false;
//         break;
//       } else {
//         check = true;
//       }
//     }
//     if (check) {
//       modelArray.push(params);
//     }
//   }
// }
//
// function totalWait(callback, params) {
//   if (params.countTotal == params.countTotalFinished) {
//     params.countTotal = 0;
//     params.countTotalFinished = 0;
//     callback();
//   } else {
//     setTimeout(function(){return totalWait(callback, params)}, 1000);
//   }
// }
//
//
// function createDataWithoutDocReferences() {
//   var i;
//   //Populate All non-duplicated data in a plain object Model-arrays
//   for (i = 0; i < managerCenterLength; i++) {
//     saveDataInModelArray(dbCollections.ManagerCenter, false, getManagerCenterModelData(i), managerCenterArray[i], 'managerId', 'MANAGERCENTER_ID', false);
//     saveDataInModelArray(dbCollections.Finality, false, getFinalityModelData(i), managerCenterArray[i], 'finalityId', 'FINALITY.FINALITY_ID', true);
//     saveDataInModelArray(dbCollections.SpentType, false, getSpentTypeModelData(i), managerCenterArray[i], 'spentTypeId', 'SPENTS.SPENTTYPE_ID', true);
//     saveDataInModelArray(dbCollections.DepartmentFunction, false, getDepartmentFunctionModelData(i), managerCenterArray[i], 'departmentId', 'DFUNCTION.DFUNCTION_ID', true);
//     saveDataInModelArray(dbCollections.DepartmentSubFunction, false, getDepartmentSubFunctionModelData(i), managerCenterArray[i], 'departmentSubId', 'DSUBFUNCTION.DSUBFUNCTION_ID', true);
//     saveDataInModelArray(dbCollections.InstitutionalActivity, false, getInstitutionalActivityModelData(i), managerCenterArray[i], 'institutionalId', 'INSTITUTIONAL_ACTIVITY.INSTITUTIONAL_ACTIVITY_ID', true);
//     saveDataInModelArray(dbCollections.Spent, true, getSpentModelData(i), managerCenterArray[i], '', '', false);
//   }
//   //Iterate over the object Model-arrays and create a Mongoose Model for each property of the object and also create an ModelComparator plain object which it will be used to compare relationships between documents(tables)
//   //Control each process (Model creation and ModelComparator creation) with a counter once the counter is completed then it follows the next process which is to populate all related ID's of all documents.
//   for (var key in dbCollections) {
//     if (dbCollections.hasOwnProperty(key)) {
//       financeCounter.countTotal++;
//       createDocumentCollection(dbModels[key], dbCollections[key]).then(
//         function (key) {
//           return function (docs) {
//             if (key != 'Spent') {
//               for (var i = 0; i < docs.length; i++) {
//                 if (dbCompareModels[key][docs[i][dbModelsId[key]]] == null) {
//                   dbCompareModels[key][docs[i][dbModelsId[key]]] = docs[i]._id;
//                 }
//               }
//               financeCounter.countTotalFinished++;
//             }
//           };
//
//         }(key))
//     }
//   }
//   financeCounter.countTotal--;
//   totalWait(populateCollectionRelationship, financeCounter);
// }
//
// function sortSpentsByPriorityOrder(arr) {
//   if (arr.length > 0) {
//     arr.sort(function(a, b) {
//       return a.priorityOrder - b.priorityOrder;
//     });
//   }
//   return arr;
// }
//
// function populateCollectionRelationship() {
//   console.log('Finance Collections have been populated without reference ID relationships');
//   financeCounter.countTotal++;
//   Spent.find(function (err, docs) {
//     if (err) {console.log(err);}
//     docs = sortSpentsByPriorityOrder(docs);
//     for (var i = 0; i < managerCenterLength; i++) {
//       docs[i]['managerCenter'] = dbCompareModels.ManagerCenter[managerCenterArray[i]['MANAGERCENTER_ID']];
//       docs[i]['finality'] = dbCompareModels.Finality[managerCenterArray[i]['FINALITY']['FINALITY_ID']];
//       docs[i]['departmentFunction'] = dbCompareModels.DepartmentFunction[managerCenterArray[i]['DFUNCTION']['DFUNCTION_ID']];
//       docs[i]['departmentSubFunction'] = dbCompareModels.DepartmentSubFunction[managerCenterArray[i]['DSUBFUNCTION']['DSUBFUNCTION_ID']];
//       docs[i]['institutionalActivity'] = dbCompareModels.InstitutionalActivity[managerCenterArray[i]['INSTITUTIONAL_ACTIVITY']['INSTITUTIONAL_ACTIVITY_ID']];
//       docs[i]['spentType'] = dbCompareModels.SpentType[managerCenterArray[i]['SPENTS']['SPENTTYPE_ID']];
//       docs[i].save(function (i) {
//         return function (err) {
//           if (err) {console.log(err);}
//           if (i == managerCenterLength - 1) {
//             financeCounter.countTotalFinished++;
//           }
//         }
//       }(i));
//     }
//     totalWait(function() {
//       removeComparedModels();
//       console.log('All Finance collections are populated!');
//     }, financeCounter);
//
//   });
//
// }
//
// function saveGenreModelComparatorObjReference (modelObj, docs) {
//   for (var i = 0; i < docs.length; i++) {
//     modelObj[docs[i].name] = docs[i]._id;
//   }
// }
//
// function populateSectorsGenreCollectionData () {
//   console.log('Genre collections without reference Ids are populated!');
//   console.log('Starting to populate collection with reference id!');
//   for (var i = 0; i < genreDataLength; i++) {
//     genreDBCollections.Sector.push({
//       name: genreDataArray[i].SECTOR,
//       staffNo: genreDataArray[i].STAFF_NO,
//       avgBruteSalary: genreDataArray[i].AVG_BRUTE_SALARY,
//       avgBaseSalary: genreDataArray[i].AVG_BASE_SALARY,
//       avgExtraordinaryTime: genreDataArray[i].AVG_EXTRAORDINARY_TIME,
//       avgOtherBenefits: genreDataArray[i].AVG_OTHER_BENEFITS,
//       sumBruteSalary: genreDataArray[i].SUM_BRUTE_SALARY,
//       sumBaseSalary: genreDataArray[i].SUM_BASE_SALARY,
//       sumExtraordinaryTime: genreDataArray[i].SUM_EXTRAORDINARY_TIME,
//       sumOtherBenefits: genreDataArray[i].SUM_OTHER_BENEFITS,
//       recruitments: genreDataArray[i].RECRUITMENTS,
//       promotions: genreDataArray[i].PROMOTIONS,
//       genre: genreDBModelComparation.Genre[genreDataArray[i].GENRE],
//       jobClassification: genreDBModelComparation.JobClassification[genreDataArray[i].JOB_CLASSIFICATION]
//     });
//   }
//   Sector.create(genreDBCollections.Sector).then(function () {
//     genreCounter.countTotalFinished++;
//   });
// }
//
// function createGenreDataWithoutDocReferences () {
//   genreCounter.countTotal++;
//   totalWait(function () {
//     removeGenreComparedCollections();
//     console.log('All Genre Collections are populated!');
//   }, genreCounter);
//   Genre.create(genreDBCollections.Genre).then(function (docs) {
//     saveGenreModelComparatorObjReference(genreDBModelComparation.Genre, docs);
//     return JobClassification.create(genreDBCollections.JobClassification);
//   }).then(function (docs) {
//     saveGenreModelComparatorObjReference(genreDBModelComparation.JobClassification, docs);
//     populateSectorsGenreCollectionData();
//   });
//
// }
//
// (function populateDatabase() {
//   console.log('Check if Finance collections are populated...');
//   Spent.find(function (err, docs) {
//     if (err) console.log(err);
//     var length = docs.length;
//     if (length == 0) {
//       console.log('Finance collections are not populated yet, population process starting now...');
//       //Avoid callback hell!! use promises!!!!
//       Spent.find().remove().then(function () {
//         return InstitutionalActivity.find().remove();
//       }).then(function () {
//         return DepartmentSubFunction.find().remove();
//       }).then(function () {
//         return DepartmentFunction.find().remove();
//       }).then(function () {
//         return SpentType.find().remove();
//       }).then(function () {
//         return ManagerCenter.find().remove();
//       }).then(function () {
//         return Finality.find().remove();
//       }).then(function () {
//         createDataWithoutDocReferences();
//       });
//     } else {
//       console.log('Finance collections are already populated!');
//     }
//   });
//   console.log('Check if Genre collections are populated...');
//   Sector.find(function (err, docs) {
//     if (err) {console.log(err);}
//     var length = docs.length;
//     if (length == 0) {
//       console.log('Genre collections are not populated yet, population process starting now...');
//       Sector.find().remove().then(function (err, docs) {
//         return Genre.find().remove();
//       }).then(function () {
//         return JobClassification.find().remove();
//       }).then(function () {
//         createGenreDataWithoutDocReferences();
//       });
//     } else {
//       removeGenreComparedCollections();
//       console.log('Genre collections are already populated!')
//     }
//   });
// })();

var Financefilter = require('../api/financefilter/financefilter.model');
var financefilterData = require('../api/inspectors_data/Finanzas_General.json');

Financefilter.find({}, function(err, financefilters) {
  if (financefilters.length == 0) {
    console.log("Populating finance filter.");
    Financefilter.create(financefilterData.DATA, function() {
      console.log("Finished populating finance filter.");
    });
  } else {
    console.log("Already populated.");
  }
});
