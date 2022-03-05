// const mentions = new RegExp(`<!@(^[0-9]*$)>`);
const mentions = new RegExp(/<!@\d+>/g);
const userId = new RegExp(/\d+/g);

class RichText {

    #raw_content;

    #content = [];

    constructor(text) {
        this.#raw_content = text;
    }

    cover(text) {
        this.#raw_content = text;
        this.#content = [];
    }

    #scannerMentions() {
        let match = this.#raw_content.match(mentions);

        if (match == null) {
            return;
        }
        let mentionsHub = [];
        let mentionsId  = 0;
        for (let i = 0; i < match.length; i++) {
            mentionsId = match[i].match(userId);
            if (mentionsId.length !== 1) {
                continue;
            }
            this.#content['text'] = this.#raw_content.replace(match[i], '');
            mentionsHub.push(mentionsId[0]);
        }

        this.#content['mentions'] = mentionsHub;
    }

    compile() {
        this.#content['text'] = this.#raw_content;
        this.#scannerMentions();
        return this.#content;
    }
}

export {
    RichText,
    bigText,
    bigTextW
}

const bigText = `相信用过Flickr下载图片的人都知道从Flickr上下载原图的操作有点小麻烦。楼主花了许久时间在网上寻找批量下载工具，一直没找到合适的。（其实有的合适的受限于国内网络的问题）。于是就自己动手写了个Win8应用：FlickrDownloader，功能是实现从Flickr上批量下载原图。

声明：此应用对网络环境要求比较高，因为Flickr是国外的网站，所以有时会出现意外奔溃，还请见谅。

直接进入正题，接下来讲解如何使用FlickrDownloader批量下载Flickr的相册。此应用为Beta版，因此下面的解决方案并不是最优的。

准备工作：
1、电脑系统必须是Win8系统或者以上
2、从应用商店搜索并下载FlickrDownloaderBeta应用程序(下载地址：http://apps.microsoft.com/windows/zh-cn/app/flickrdownloaderbeta/61dcb695-230d-40ba-9c61-a672be1454b4)
3、需要你的电脑能够访问Flickr官方网站，也就是说你有梯子能翻墙啦~~(如何翻墙这篇文章就不多做说明，网上很多教程的)

下面直接举个例子说明如何操作吧~
1、找到你要下载的Flickr相册地址，如 https://www.flickr.com/photos/91908428@N07/sets/72157640247429163/
2、在页面中(非图片处，如空白区域)单击鼠标右键(博主使用的是chrome浏览器)，选择"查看网页源代码(V)"


3、在新标签页中空白处右击鼠标，选择“另存为”


4、在弹出的另存为对话框中保存类型选择为“网页，仅HTML”。在填写合适的文件名和保存位置后点击保存。


5、打开下载完成的FlickrDownloaderBeta应用程序，点击“选择文件”按钮，选择第4步中保存的文件(如flicker.html)

6、应用程序会自动统计文档中所含照片数目，并将其显示。此处需要注意，如果你浏览的Flickr相册需要翻页，那么在第4步保存的文件只有当前页面的照片，应用程序也只能识别到这些。你需要下载第二页的源文件然后重新选择文件开始下载。

7、点击“开始下载”按钮。应用程序将会开启Flickr照片批量下载功能。只需仅仅得等待照片完成下载。

8、下载完成后，打开下面的文件路径(可以直接复制在文件资源管理器上)就可以找到你要的图片了~~
"C:\\Users\\**\\AppData\\Local\\Packages\\17662.FlickrDownloaderBeta_zamgka4g509xj\\LocalState"
此处的**代表你的计算机用户名，同时因为是测试环境，正式发布后如果发生改变会在及时更正。

9、需要强调的一点是，因为Flickr是国外网站，网络如果不稳定会导致意外的Bugs。
此时需要打开步骤“8”中的文件路径，删除文件大小为0的图片后(一般是最后一张)，继续下载。


9、需要强调的一点是，因为Flickr是国外网站，网络如果不稳定会导致意外的Bugs。
此时需要打开步骤“8”中的文件路径，删除文件大小为0的图片后(一般是最后一张)，继续下载。


8、下载完成后，打开下面的文件路径(可以直接复制在文件资源管理器上)就可以找到你要的图片了~~
"C:\\Users\\**\\AppData\\Local\\Packages\\17662.FlickrDownloaderBeta_zamgka4g509xj\\LocalState"
此处的**代表你的计算机用户名，同时因为是测试环境，正式发布后如果发生改变会在及时更正。`;

const bigTextW = `A month ago, Chinese leader Xi Jinping declared there was "no limit" to Beijing's newly strengthened relationship with Russia.

He and his Russian counterpart Vladimir Putin had met face-to-face in Beijing, culminating in a joint document - and then they went off to see the opening of the Winter Olympic Games. Days after the Games ended, Russia invaded Ukraine.

China's government has neither condemned nor condoned the attack and has even refrained from calling it an "invasion" in the first place. It has always said that it does not interfere in the internal affairs of others, a core principle of its foreign policy.

But earlier this week, China's Foreign Minister Wang Yi signalled that it was ready to play a role in mediating a ceasefire. State media here reported that Mr Wang "reaffirmed China's unwavering support for Ukraine's sovereignty" and assured his counterpart of China's readiness to make every effort to end the war... through diplomacy".

China's government also recently expressed "regret" about the military action, saying it was extremely concerned about the harm to civilians.

China has also done one other thing of note. Alongside India, it was one of 34 nations that abstained from voting on a United Nations resolution condemning Russia's invasion - something analysts say has come as a surprise. Many had expected China to vote alongside Russia.

So, is it a sign of a shift in China's policy?

It is more likely a sign that China is trying to strike a balance between the principle of respecting Ukraine's sovereignty while recognising what it describes as the "legitimate security concerns" of Russia.

If you look back to the 5,000-word document signed off by Presidents Xi and Putin when they declared their deepening, unlimited alliance you'll see that objection to Nato expansion unites them, though the agreement covers multiple areas of common ground and planned co-operation; in space, in the Arctic, on Covid-19 vaccines.

What is Nato and how is it responding to the Ukraine crisis?
Why has Putin invaded Ukraine?
The Ukraine crisis is a major challenge for China
It is their shared vision of a future in which China and Russia work much more closely, for mutual benefit.

Fundamental differences - and similarities
The other key context to why China might stand fast in its support for Russia and Vladimir Putin - or its lack of condemnation, depending on how you see it - is Taiwan.

The self-governing island, regarded as a rogue province by Beijing, is a place that President Xi wants to see "reunited" with his motherland. Were Mr Xi to do that by military force China would likely face a similar - or likely more serious - reaction from the US and its allies; condemnation, heightened sanctions, cultural exclusion.

Taiwan is not Ukraine. If nothing else, the legal status of the two places is different.

But in acknowledging what it calls Russia's "legitimate security concerns" and caveating the core principle of respecting sovereignty because of "complex and unique historical context", China's leader likely sees a future in which he can seek to justify to the world an "invasion" of Taiwan, and expect Russia's reciprocal support.

And then there's the personal relationship between Mr Xi and Mr Putin. The two have met in person nearly 40 times now.

When he arrived for the Winter Games last month, Russia's president was the most prominent leader by far to come to China since Covid-19 began.

Both are autocratic leaders who share an ambition to deepen the ties and allegiance between their people and their "motherland". Xi Jinping sees a future where China - a vast economy - is more-self-reliant, decoupled to an extent from some of the global ties it has benefitted from.

But the new "no limit" partnership with Russia may not mean an inevitable re-alignment away from the US, its allies and the established world order.

It is, after all, an order in which China has sought to do more in recent years; on climate change, on peace keeping.

And there are also the politics to consider. Not electoral politics, but the politics of association with a warring nation.

China censors much of what its people can see and read but the severity of the war, which - more than any other conventional conflict - is being documented in often horrific detail, by the minute, on social media, may become an important factor in Beijing's calculations over its stance on Russia.

Xi Jinping and the other senior leaders around him may conclude that there is, in fact, a limit to the relationship, and they need to step back - or step up and try to play the role of mediator with Moscow. A role that it told Ukraine it was prepared to take on, but which it has yet to show any sign of starting.`;
