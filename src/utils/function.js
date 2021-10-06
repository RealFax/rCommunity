import { menu } from '../env'

const strlen = (str) => {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 2;
        }
    }
    return len;
}

const getRandEmoji = () => {
    let allEmojis = [
        "😀",
        "😁",
        "😂",
        "😃",
        "😄",
        "😅",
        "😆",
        "😇",
        "😈",
        "👿",
        "😉",
        "😊",
        "☺️",
        "😋",
        "😌",
        "😍",
        "😎",
        "😏",
        "😐",
        "😑",
        "😒",
        "😓",
        "😔",
        "😕",
        "😖",
        "😗",
        "😘",
        "😙",
        "😚",
        "😛",
        "😜",
        "😝",
        "😞",
        "😟",
        "😠",
        "😡",
        "😢",
        "😣",
        "😤",
        "😥",
        "😦",
        "😧",
        "😨",
        "😩",
        "😪",
        "😫",
        "😬",
        "😭",
        "😮",
        "😯",
        "😰",
        "😱",
        "😲",
        "😳",
        "😴",
        "😵",
        "😶",
        "😷"
      ];
    return allEmojis[Math.floor(Math.random() * allEmojis.length)];
}

const getMenu = (userId, codeList) => {
    var data = [];
    for(var i = 0; i < codeList.length; i++){
        var s = menu[codeList[i]];
        if(!s) {
            continue;
        }
        if(s.Rendering){
            s.url = s.url.replace('{userId}', userId);
        }
        data.push(s);
    }
    return data;
}

export{
    strlen,
    getRandEmoji,
    getMenu
}