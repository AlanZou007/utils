// 生成小程序码
const axios = require('axios');
const fs = require('fs');

const appid = 'xxxxxxxxxx';
const secret = 'xxxxxxx';

const storeList = [{
  id: xx,
  name: "xx"
},
];

const getToken = () => new Promise((resolve, reject) => {
  axios('https://api.weixin.qq.com/cgi-bin/token', {
    params: {
      appid,
      secret,
      grant_type: 'client_credential'
    }
  }).then(({data}) => {
    resolve(data);
  });
});

const getWxacode = (data, filename) => new Promise((resolve, reject) => {
  const {access_token} = data;
  delete data.access_token;
  axios({
    method: 'post',
    url: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=' + access_token,
    responseType: 'stream',
    data
  }).then(function (response) {
    response.data.pipe(fs.createWriteStream(filename));
  });
});


const start = async () => {
  const {access_token} = await getToken();


  for (let item of storeList) {
    getWxacode({access_token, path: `路由路径`, width: 1000}, `./wxacode/${item.name}_${item.id}.jpg`);
  }

  // getWxacode({ access_token, path: "pages/home/index?storePosition=1", width: 500 },`./wxacode/①类目牌1（1000元礼包）.jpg`)
  // getWxacode({ access_token, path: "pages/user/code/index?storePosition=2", width: 500 },`./wxacode/②类目牌2（购物100%返红包）.jpg`)
  // getWxacode({ access_token, path: "pages/user/code/index?storePosition=3", width: 500 },`./wxacode/③收银台卡1（送购物袋）.jpg`)
  // getWxacode({ access_token, path: "pages/user/code/index?storePosition=4", width: 500 },`./wxacode/④收银台卡2（支付返红包）.jpg`)
};

start();
