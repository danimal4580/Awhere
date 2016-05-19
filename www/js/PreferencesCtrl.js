angular.module('awhere.controllers')

.controller('PreferencesCtrl', function($scope, Preset, $stateParams, $state) {

  $scope.prefs = {};
  $scope.prefs.interests = [];

  $scope.savePrefs = function() {
    if ($stateParams.ind === "add")
    {
      Preset.add($scope.prefs);
    }
    else
    {
      Preset.update($stateParams.ind, $scope.prefs);
    }
    $state.go("presets");
  };

  $scope.loadPrefs = function() {
    var loadedVal = Preset.find($stateParams.ind);
    console.log(loadedVal);
    $scope.prefs = loadedVal;

  };

  $scope.categories = [
    {name:          "Professional / Future Schooling", 
     subcategories: ["Graduate School", 
                     "Career"]},
    {name:          "Academic", 
     subcategories: ["Engineering / Design", 
                     "Math", 
                     "Sciences", 
                     "Languages",
                     "English / Journalism / Lit",
                     "Music",
                     "Business / Economics",
                     "Social Sciences / History",
                     "Psych / Cog Sci",
                     "Education and Organization",
                     "Other"]},
    {name:           "Athletic",
     subcategories:  ["Varsity",
                      "Club",
                      "Intramural"]},
    {name:           "Social",
     subcategories:  ["Club Sponsored",
                      "Greek Life Sponsored",
                      "Other"]},
    {name:           "Arts",
     subcategories:  ["Theater",
                      "Music",
                      "Dance",
                      "Comedy",
                      "Film",
                      "Other"]},
    {name:            "Other",
     subcategories:  ["Food",
                      "Philanthropy / Service",
                      "Unique"]}
                        ];

  $scope.stuff = function(cat,subcat) {

    var name = cat + ":" + subcat;
    var index = $scope.prefs.interests.indexOf(name);

    if (index == -1)
    {
      $scope.prefs.interests.push(name);
    }
    else
    {
      $scope.prefs.interests.splice(index,1);
    }

    console.log($scope.prefs.interests);
  };

  $scope.morestuff = function(cat,subcat) {
    var name = cat + ":" + subcat;
    var index = $scope.prefs.interests.indexOf(name);

    if (index == -1)
    {
      return false;
    }
    else
    {
      return true;
    }
  };
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleCategory = function(category) {
    if ($scope.isCategoryShown(category)) {
      $scope.shownCategory = null;
    } else {
      $scope.shownCategory = category;
    }
  };
  $scope.isCategoryShown = function(category) {
    return $scope.shownCategory === category;
  };

  $scope.$on('$ionicView.beforeEnter', function() {
      if ($stateParams.ind != "add") {
        $scope.loadPrefs();
      }
  });
});