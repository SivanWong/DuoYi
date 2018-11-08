import services from './services.js'

//发布闲置
function addGoods(fn, data,config) {
  services.post('/duoyi/goods/add', data,config)
      .then(function (res) {
        fn(false, res);
      }).catch(function (err) {
        fn(err);
      });
}

//发布闲置
function showGoods(fn) {
  services.get('/duoyi/goods/getAll')
      .then(function (res) {
        fn(false, res);
      }).catch(function (err) {
        fn(err);
      });
}
export {
  addGoods,
  showGoods
}