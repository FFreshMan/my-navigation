const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
let hashMap = xObject || [
  {
    logo: "A",
    url: "https://www.acfun.cn"
  },
  {
    logo: "B",
    url: "https://www.bilibili.com"
  },
  {
    logo: "C",
    url: "https://codepen.io/"
  },
  {
    logo: "D",
    url: "https://dribbble.com/"
  },
  {
    logo: "E",
    url: "https://www.ebay.pl"
  }
];

const simplifyUrl = url => {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
  // 删除/开头后面，包括/所有内容
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`
        <li>
            <div class="site">
              <div class="logo">${node.logo}</div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class="close">
              <svg class="icon">
              <use xlink:href="#icon-close"></use>
              </svg></div>
            </div>
    </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", e => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
    //   阻止 冒泡，a标签包裹的话阻止不了，所以用window.open代替
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请输入您要创建的网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  const li = {
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  };
  hashMap.push(li);
  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", e => {
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === e.key) {
      window.open(hashMap[i].url);
    }
  }
});
