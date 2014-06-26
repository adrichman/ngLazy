#ng-Lazy 


#### Lazy-loading and infinite scroll library for AngularJS

__Live Demo: [http://ng-Lazy.com](http://ng-Lazy.com)__

Requires one simple directive wrapping the targeted area.

The widget is configured via the element's attributes, which miror the keys:

  * data          :  The object on which you are storing the data sets:

  ```
  $scope.data = { dbCollection: [], otherHash: {}, anotherList: []} 
  ```
  
  * collectionKey : The key(string) to access the collection you will iterate through:

  ``` 
  collectionKey = "dbCollection" 
  ```

  * dataService : The angular service that makes external api calls

  * fetchMethod : The method on your dataService that makes the api call. 
                  Must return a promise.

  * range       : number of items to be loaded on each lazyLoad trigger

  * dataKeys    : the keys expected to be found on the response of the api
                  call (used to map the response onto a cache object)

  * startDelay  : time in milliseconds to delay the start of the api call

  * appendDelay : time in milliseconds to delay appending the response of the
                  api call (because too quick of a response can feel less magical to the user)

  * spinnerColor: the rgb or hex color code to determine the spinner's
                  fill color

####Implementation:

In your index.html:

```
<script src="bower_components/ngLazy/dist/lazyLoader.js"></script>
```

In your AngularJS app:
```
angular.module('myApp', [
      'aDependency',
      'anotherDependency',
      'ngLazy'
])
```

In your view, wrap the element containing the ng-repeat with the lazy-load element, using the 'lazy' prefix on attributes for configuring:
```
     <lazy-load 
      lazy-data="data" 
      lazy-data-service="dataService" 
      lazy-fetch-method="getData" 
      lazy-range="12" 
      lazy-data-collection-key="dbCollection" 
      lazy-data-keys="['dbCollection','otherHash','anotherList']" 
      lazy-start-delay="150" 
      lazy-append-delay="2000"
      lazy-spinner-color="#4FA7D9">
          <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <td>NAME</td>
                </tr>
              </thead>
               <tbody>
                 <tr class="cohort-id-col fx-fade-down fx-easing-bounce fx-speed-800" ng-repeat="datum in data.mongo">
                      <td class="cohort-pic">
                        <span class="cohort-name">{{ datum.First }} {{ datum.Last }}</span><br>
                        <img class="avi" ng-src="{{ datum.Email | MD5 }}">
                      </td>
                 </tr>
               </tbody>
          </table>
      </lazy-load>
```

#### Testing!

This library is difficult to test, and improve, without any sort of integration in a working application. That's why there's [ng-Lazy.com](http://ng-Lazy.com). Please visit the [ng-Lazy.com repo](https://github.com/adrichman/ngLazy-demo.git) for the unit and e2e tests.

###Library installation:

```
bower install ngLazy
```

###Building and editing

Please reference the demo app and its specs while developing in this library. Upon making changes and needing to re-build:

```
gulp build
```

###Demo App / Specs Installation

clone down the repo:

```
git clone https://github.com/adrichman/ngLazy-demo
```

install the dependencies:

```
cd ngLazy-demo
npm install
bower install
```

###Running it:

serve it:

``` 
grunt serve
```

###Run the specs:

first, serve it. then:

```
grunt test
```

__Pull Requests are Welcomed__

###TODO:
* more flexibility with different api responses and data services