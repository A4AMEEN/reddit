angular.module('redditApp', [])
  .controller('RedditController', function($scope, $http, $sce) {
    $scope.posts = [];
    
    $scope.fetchPosts = function() {
        console.log('Starting to fetch posts...');
        
        const corsProxy = 'https://api.allorigins.win/raw?url=';
        const redditUrl = 'https://www.reddit.com/r/Angular2.json';
    
        $http.get(corsProxy + encodeURIComponent(redditUrl))
            .then(function(response) {
                console.log('Raw API Response:', response);
                console.log('Response data:', response.data);
                console.log('Children array:', response.data.data.children);
    
                $scope.posts = response.data.data.children;
                console.log('Posts saved to $scope:', $scope.posts);
            })
            .catch(function(error) {
                console.error('Error details:', error);
                $scope.error = 'Failed to load posts';
            });
    };
    
    
    $scope.trustHtml = function(html) {
      console.log('Original HTML:', html);
      var textarea = document.createElement('textarea');
      textarea.innerHTML = html;
      var decodedHtml = textarea.value;
      console.log('Decoded HTML:', decodedHtml);
      return $sce.trustAsHtml(decodedHtml);
    };
    
    // Initialize
    console.log('Initializing controller...');
    $scope.fetchPosts();
  });