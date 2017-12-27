const parseUrl = {
  getUrlParam: function (name, url) {
    if(!name){
        return '';
    }
    url = url || window.location.href;
    var reg = new RegExp('(?:[?&]|^)' + name + '=([^?&#]*)', 'i');
    var match = url.match(reg);
    return !match ? '' : match[1].split(',');
  },
  getUrlParams: function (url) {
    url = url || window.location.href;
    var queryArray = url.split(/[?&]/).slice(1);
    var i;
    var args = {};
    queryArray.map((item) => {
      var match = item.match(/([^=]+)=([^=]+)/);
      if(match) {
        args[match[1]] = match[2].split(',');
      }
    });
    return args;
  }
};

export default parseUrl;
