var pokerLounge = angular.module('poker', []);

pokerLounge.controller('pokerController', function(PokerDealer){
  var vm = this;
  vm.hand = [];
  vm.post = [];
  vm.render = [];

  vm.deal = function() {
    PokerDealer.getHand()
    .then(function(res){
      res.data.cards.forEach(function(item){
        vm.post.push(item.code);
      })
      console.log("hands", vm.post);
      vm.hand = res.data.cards;
      PokerDealer.track(vm.post);
      vm.post = [];
    })
    .catch(function(err){
      throw err;
    })
  }
  vm.data = function() {
    PokerDealer.getData()
    .then(function(res){
      vm.render = res.data;
    })
    .catch(function(err){
      throw err;
    })
  }
})




pokerLounge.factory('PokerDealer', function($http){

  var getHand = function(){
    return $http.get('/api/draw')
    .then(function(data){
      return data;
    })
    .catch(function(err){
      console.log(err);
    })
  }

  var track = function(array) {
    console.log("array in track ", array);
    return $http({
      method:'POST',
      url: '/api/hand',
      data: array
    })
  }

  var getData = function() {
    return $http.get('/api/info')
    .then(function(data){
      console.log(data);
      return data;
    })
    .catch(function(err){
      console.log(err);
    })
  }

  return {
    getHand : getHand,
    track: track,
    getData: getData
  }

})
