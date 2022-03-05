import { menu } from '@/env'

const strlen = (str) => {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 2;
        }
    }
    return len;
}

const allEmojis = [
    "😀", "😁", "😂", "😃", "😄", "😅", "😆", "😇", "😈", "👿", "😉", "😊", "☺️", "😋", "😌", "😍", "😎",
    "😏", "😐", "😑", "😒", "😓", "😔", "😕", "😖", "😗", "😘", "😙", "😚", "😛", "😜", "😝", "😞", "😟", "😠",
    "😡", "😢", "😣", "😤", "😥", "😦", "😧", "😨", "😩", "😪", "😫", "😬", "😭", "😮", "😯", "😰", "😱", "😲",
    "😳", "😴", "😵", "😶", "😷"
];

const getRandEmoji = () => {

    return allEmojis[Math.floor(Math.random() * allEmojis.length)];
}

const getMenu = (userId, codeList) => {
    let data = [];
    for(let i = 0; i < codeList.length; i++){
        let s = menu[codeList[i]];
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

function getLastUpdate (lastUpdate)  {
    let last = Math.round(new Date().getTime()/1000) - lastUpdate;
    if (last <= 0) {
        return this.$t('Text.topicGround.now');
    }
    if (last < 60) {
        return `${last.toFixed()}${this.$t('Text.topicGround.secondAgo')}`
    }else if (last < 3600) {
        return `${(last / 60).toFixed()}${this.$t('Text.topicGround.minuteAgo')}`;
    }else if (last < 86400){
        return `${(last / 3600).toFixed()}${this.$t('Text.topicGround.hourAgo')}`;
    }else if (last < 2626560) {
        return `${(last / 86400).toFixed()}${this.$t('Text.topicGround.dayAgo')}`;
    }else if (last < 31536000) {
        return `${(last / 2626560).toFixed()}${this.$t('Text.topicGround.monthAgo')}`;
    }else {
        return this.$t('Text.topicGround.longtime')
    }
}

function formatUnit (watch) {
    if (watch < 1000) {
        return watch;
    }else if (watch < 1000000) {
        return (watch / 1000).toFixed(1).toString() + 'K';
    }else if (watch < 1000000000) {
        return (watch / 1000000).toFixed(1).toString() + 'M';
    }else if (watch < 1000000000000) {
        return (watch / 1000000000).toFixed(1).toString() + 'G';
    }else {
        return '∞';
    }
    // return 0;
}

const Weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

function formatDiscussTimestamp(timestamp) {
    let date = new Date(timestamp * 1000);
    let now  = Math.round(new Date().getTime() / 1000);
    if (now - 86400 * 30 > timestamp) {
        // 超过30天
        // 年/日/月
        return `${date.getFullYear()}/${date.getDate()}/${date.getMonth() + 1}`;
    }
    if (now - 86400 > timestamp) {
        // 超过1天
        // 星期
        return `${Weeks[date.getDay()]}`;
    }
    if (now - 30 < timestamp) {
        // 小于30秒
        // 刚刚
        return `刚刚`;
    }
    if (now - 86400 < timestamp) {
        // 小于一天
        // 时间
        return `${date.getHours()}:${date.getMinutes()}`
    }
}

export{
    strlen,
    getRandEmoji,
    getMenu,
    getLastUpdate,
    formatUnit,
    formatDiscussTimestamp
}
