'use strict'
//味方キャラ
const Helene = new Sprite('img/charaChip/Helene.png');
const Laura = new Sprite('img/charaChip/Laura.png');

Helene.x = 600;
Helene.y = 600;
Helene.frame = 7

Laura.x = 700;
Laura.y = 600
Laura.frame = 4
const encoutnanimation = new EncoutAnimation(583, 435, 533, 714, screenWidth);
//吹き出し画像
const speech_bubble = new Img('img/speech_bubble.png', 0, 0, 959.19, 383.54);

//吹き出し画像反転
const speech_bubble_reverse = new Img('img/speech_bubble_reverse.png', 0, 0, 959.19, 383.54);

const characterIcon_reverse = new Image()
characterIcon_reverse.src = "img/charaIcon/CharacterIcon_reverse.png"

const characterIcon = new Image()
characterIcon.src = "img/charaIcon/characterIcon.png"

//ビックリマーク
const exclamationMark = new Image()
exclamationMark.src = "img/exclamationMark.png"

//敵キャラ 
const Skeleton = new Sprite("img/enemyChip/Skeleton.png")
Skeleton.x = 650
Skeleton.y = 1200
Skeleton.frame = 10

//雨
const rainArray = [];
for(let i = 1; i <= 20; i++) {
    const img = new Img('img/rain/雨_斜め_trans_p' + i + '.png', 0, 0, 1920, 1080, 1.0)
    rainArray.push(img);
}
// for(let i = 1; i <= 40; i++) {
//     const img = new Img('img/rain/rainNormal/rainNormal_p' + i + '.png', 0, 0, 1920, 1080, 1.0)
//     rainArray.push(img);
// }



class GameScreen {

    /**
     * 引数
     * width : ゲームの横幅
     * height : ゲームの縦幅
     */
    constructor(width, height) {
        //canvas要素を作成
        this.width = width
        this.height = height
        this.isTalk = false;

        this.TalkIndex = 0;

        this.dontTalk = false

    } //constructor() 終

    draw(ctx, canvas) {

        clickItems = [];


        // Titleの背景
        ctx.globalAlpha = 1
        ctx.drawImage(chapter01background, aspect(-195), aspect(-459), aspect(2311), aspect(1552));
        const map = new MapSprite(MapChapter01_Under.image, aspect(64), MapChapter01_Under.map)
        map.y = aspect(200)
        map.draw(ctx)
        Laura.draw(ctx)
        Helene.draw(ctx);
      
        
        rainArray[rainAnimation % 20].draw(ctx)

        //チャプター１のはじめのイベント
        if (SaveData.Chapter == 1 && !SaveData.Event_1) {
            Skeleton.draw(ctx)
            console.log("javascript")
            this.isTalk = true
            if (this.TalkIndex >= talk.chapter01.length) {


                encoutnanimation.animation = true
                if (encoutnanimation.lineheight >= screenHeight / 1.2) {

                    this.isTalk = false
                    this.TalkIndex = 0;


                }

            } else {

                let key = Object.keys(talk.chapter01[this.TalkIndex]);

                if (key[0] == "骸") {
                    if (Skeleton.y <= 801) {
                        this.dontTalk = false
                    } else {
                        this.dontTalk = true


                        this.TalkIndex = this.TalkIndex - 1;

                    }

                }
                if (this.dontTalk) {
                    Helene.frame = 1
                    Laura.frame = 1;
                    ctx.drawImage(exclamationMark, aspect(Helene.x + 21), aspect(Helene.y - 88), aspect(39), aspect(78));
                    ctx.drawImage(exclamationMark, aspect(Laura.x + 21), aspect(Laura.y - 88), aspect(39), aspect(78));
                    Skeleton.y += (800 - Skeleton.y) / 5;

                }


                let Character_x = 0;
                let Character_y = 0;

                let s = Whois(key[0])
                Character_x = s.x
                Character_y = s.y
                if (!this.dontTalk) {
                    // speech_bubble.x = 85
                    // speech_bubble.y = 138.12
                    // speech_bubble.draw(ctx)

                    // ctx.drawImage(characterIcon, Character_x - aspect(161), Character_y - aspect(330), aspect(197), aspect(262));
                    // const talkTex = new Text(Character_x - aspect(-60), Character_y - aspect(180), talk.chapter01[this.TalkIndex][key], 'white', 28, false, 'normal', 700);
                    // talkTex.drawText(ctx);



                    //普通の吹き出しか(0)反転した吹き出しか(1)どうか
                    let which = 0;
                    if (key[0] == "ヘレーネ") {
                        which = 0
                    } else {
                        which = 1;
                    }



                    if (which === 0) {
                        speech_bubble.x = Character_x - 340
                        speech_bubble.y = Character_y - 360
                        speech_bubble.draw(ctx)
                        ctx.drawImage(characterIcon, aspect(Character_x - 580 + 240), aspect(Character_y - 350 - 50), aspect(268.46), aspect(356.89));
                        const talkTexc = new Text(Character_x - 104, Character_y - 180, talk.chapter01[this.TalkIndex][key], 'white', 32, false, 'normal', 500);
                        talkTexc.drawText(ctx, Character_x - 104);
                    } else {
                        speech_bubble_reverse.x = Character_x - 580
                        speech_bubble_reverse.y = Character_y - 360
                        speech_bubble_reverse.draw(ctx)
                        ctx.drawImage(characterIcon_reverse, aspect(Character_x - 580 + 718), aspect(Character_y - 350 - 50), aspect(268.46), aspect(356.89));
                        const talkTexc = new Text(Character_x - 444, Character_y - 180, talk.chapter01[this.TalkIndex][key], 'white', 32, false, 'normal', 500);
                        talkTexc.drawText(ctx, Character_x - 444);

                    }





                }

            }
        }

        if (encoutnanimation.animation) {
            ctx.globalAlpha = 1;
            encoutnanimation.draw(ctx);
            encoutnanimation.linewidth += screenWidth / 12;

            if (encoutnanimation.linewidth >= screenWidth * 4) {
                encoutnanimation.lineheight += screenHeight / 25
                encoutnanimation.y = (screenHeight / 2) - encoutnanimation.lineheight / 2;
                if (encoutnanimation.lineheight >= screenHeight / 1.2) {
                    IsGameScreen.isclick = false;
                    IsBattleScreen.isclick = true;

                }
                if (encoutnanimation.lineheight >= screenHeight / 2) {
                    encoutnanimation.whiteRec = true;
                }
            }
            if (encoutnanimation.whiteRec) {
                encoutnanimation.y1 -= screenHeight / 30;
                encoutnanimation.y2 -= screenHeight / 30;
                encoutnanimation.y3 += screenHeight / 30;
                encoutnanimation.y4 += screenHeight / 30;
            }
        }


    }
}

function Whois(s) {
    let x = {
        x: 0,
        y: 0
    }
    if (s === "ラウラ") {
        x.x = Laura.x
        x.y = Laura.y
    } if (s === "ヘレーネ") {
        x.x = Helene.x
        x.y = Helene.y
    } else if (s === "骸") {
        x.x = Skeleton.x
        x.y = Skeleton.y
    }
    return x
}