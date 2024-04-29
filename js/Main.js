'use strict';

let screenWidth = 960;
let screenHeight = 540;

// ページの読み込みが完了した後に処理を実行
addEventListener('load', () => {
    /**
     * ゲームづくりの基本となるクラス
     */
    const main = () => {
        const canvas = document.createElement("canvas");
		const scale = window.devicePixelRatio || 1;
		canvas.width = screenWidth * scale;
		canvas.height = screenHeight * scale;
		

        document.getElementById("app").appendChild(canvas);
        const ctx = canvas.getContext("2d");
		ctx.scale(scale, scale);
		canvas.style.width = screenWidth + 'px';
		canvas.style.height = screenHeight + 'px';

		// 画面を白色で塗りつぶす
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		const image = new Image();
		image.src = 'img/character.png'
        const titlescreen = new TitleScreen(screenWidth, screenHeight);
        
        const draw = () => {
            // 描画のための処理
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
        
            if(!IsNewGameOR.isclick) {
                titlescreen.draw(ctx,canvas)
            }
            
			
        };

        // 60fpsで描画を更新する
        setInterval(draw, 1000 / 60);
    };

    main();
});




// // getContext('2d')メソッドを呼び出してコンテキストを取得
// const ctx = canvas.getContext('2d');

// // ピクセル比を取得し、Canvasの解像度を改善
// ctx.scale(scale, scale);

// // キャンバスのスタイルを設定して、CSSでサイズを変更しなくても正しいサイズで描画されるようにする
// canvas.style.width = screenWidth + 'px';
// canvas.style.height = screenHeight + 'px';

// // 画面を白色で塗りつぶす
// ctx.fillStyle = '#ffffff';
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// // その他の処理を行う
// // 例: オブジェクトの更新、メインループの開始など
