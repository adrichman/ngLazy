'use strict';


angular.module('ngLazy.factories',[])  
.factory('lazyLoader', ['$timeout','$rootScope', '$q', function($timeout, $rootScope, $q){
  var cache = { data : {} },
      config,
      data,
      collectionKey,
      fetch,
      responseKeys,
      range,
      appendDelay,
      startDelay;

  return ({

    configure:  function(options){
                  config        = options;
                  data          = config.data;
                  collectionKey = config.collectionKey;
                  fetch         = config.fetchData;
                  responseKeys  = config.dataKeys;
                  range         = config.range;
                  appendDelay   = config.appendDelay;
                  startDelay    = config.startDelay;
    },  

    getData : function(){
                var deferred  = $q.defer();
                $rootScope.$broadcast('showLoading');

                if (!cache.data[collectionKey]) {
                  fetch().then(function(res){
                    angular.forEach(responseKeys, function(key){
                      cache.data[key] = res.data[key];
                      if (key === collectionKey) {
                        data[key] = [];
                        data[key] = data[key].concat(cache.data[key].splice(0, range));
                      } else {
                        data[key] = cache.data[key]; 
                      }
                    });
                    deferred.resolve(data);
                    $rootScope.$broadcast('hideLoading');
                  });
                } else {
                  $timeout(function(){ 
                    data[collectionKey] = data[collectionKey].concat(cache.data[collectionKey].splice(0, range));
                    deferred.resolve(data);
                    $rootScope.$broadcast('hideLoading');
                  }, appendDelay);
                }
                return deferred.promise;
    },

    load :  function(){
              var deferred              = $q.defer();
              var _this                 = this;
              var undefinedConfigValues = false;

              $rootScope.$broadcast('showLoading');
              
              // Check for config bindings before initiating a request with undefined parameters 
              angular.forEach(Object.keys(config), function(key){
                if (!config[key]) { undefinedConfigValues = true; }
              });

              if (undefinedConfigValues){

                // wait for bindings and try again
                deferred.reject(new Error('Bindings are not yet defined'));

              } else {
                var loadTimer = $timeout(function(){ 
                  _this.getData().then(function(col){
                    deferred.resolve(col);
                  });
                }, startDelay);
                
                loadTimer.then(function(){ 
                  $timeout.cancel(loadTimer);
                });
              }
              return deferred.promise;
    }
  });
}]);