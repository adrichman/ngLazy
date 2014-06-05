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
                  config = options;
    },  

    getData : function(){
                data          = config.data;
                collectionKey = config.collectionKey;
                fetch         = config.fetchData;
                responseKeys  = config.dataKeys;
                range         = config.range;
                appendDelay   = config.appendDelay;
                startDelay    = config.startDelay;
                
                var deferred  = $q.defer();

                $rootScope.$broadcast('showLoading');

                if (!cache.data[collectionKey]) {
                  fetch().then(function(res){
                    angular.forEach(responseKeys, function(key){
                      cache.data[key] = res.data[key];
                      if (key === collectionKey) {
                        data[key]       = [];
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
              var deferred = $q.defer();
              var _this = this;

              $rootScope.$broadcast('showLoading');
              
              var loadTimer = $timeout(function(){ 
                _this.getData().then(function(col){
                  deferred.resolve(col);
                });
              }, startDelay);
              
              loadTimer.then(function(){ 
                $timeout.cancel(loadTimer);
              });

              return deferred.promise;
    }
  });
}]);