var musicAc = {
	createPlayer:function() {
		musicM.mplayer = document.createElement("audio");
	},
	playerMusic:function() {
		var pan = mui("#panel")[0];
		var imgPan = mui(".music_pic")[0];
		if(musicM.playStated == false) {
			//暂停时，则播放
			pan.classList.remove("musicPaused");
			imgPan.classList.remove("musicPaused");
			//业务处理
			mui(".play_bar>div>img")[1].src="../image/pause.png";
			mui(".play_bar>div>img")[1].style.marginLeft="0px";
			if(musicM.mplayer != null) {
				musicM.mplayer.play();
			}else {
				musicAc.getMusicInfo("playbtn");
			}
			// if(musicM.mplayer == null) {
			// 	musicAc.createPlayer();
			// }
			// musicM.mplayer.src = musicM.musicInfo.url;
			// musicM.mplayer.play();
			musicM.playStated = true;
		}else {
			//播放时，则暂停
			pan.classList.add("musicPaused");
			imgPan.classList.add("musicPaused");
			//业务处理
			mui(".play_bar>div>img")[1].src="../image/play.png";
			mui(".play_bar>div>img")[1].style.marginLeft="10px";
			musicAc.pauseMusic();
			musicM.playStated = false;
		}

	},
	pauseMusic:function() {
		if(musicM.mplayer == null) {
			musicAc.createPlayer();
		}
		musicM.mplayer.pause();
	},
	playMuted:function() {
		if(musicM.mplayer == null) {
			return;
		}
		if(musicM.mutedstate == false) {
			//变成静音
			musicM.mplayer.muted = true;
			musicM.mutedstate = true;
			mui(".play_bar>div>img")[0].src = "../image/novoice.png";
			mui.toast('静音状态', {duration:1500, type:"div"});
		}else {
			//取消静音
			musicM.mplayer.muted = false;
			musicM.mutedstate = false;
			mui(".play_bar>div>img")[0].src = "../image/voice.png";
			mui.toast('取消静音', {duration:1500, type:"div"});
		}
	},
	getMusicInfo:function(fromck) {
		// if(musicAc.playerMusic() != null) {
		// 	musicAc.createPlayer().clear();
		// 	musicAc.createPlayer();
		// }
		mui.getJSON(musicM.urlapi, {}, function(info) {
			musicM.musicInfo.name = info.data.name;
			musicM.musicInfo.pic = info.data.picurl;
			musicM.musicInfo.sname = info.data.artistsname;
			musicM.musicInfo.url = info.data.url;
			if(fromck == "run") {
				musicAc.playerMusic();
			}

			musicAc.setMusicInfo();
			if(musicM.mplayer == null) {
				musicAc.createPlayer();
			}
			musicM.mplayer.src = musicM.musicInfo.url;
			musicM.mplayer.play();
		});
	},
	runMusic:function() {
		if(musicM.mplayer != null) {
			musicAc.playerMusic();   //用于在随机切歌后，唱片和播放按钮能处于播放状态
			musicAc.getMusicInfo("run");
		}else {
			return;
		}
		
	},
	setMusicInfo:function() {
		// mui("img")[0].src = musicM.musicInfo.pic;
		// mui(".sname")[0].innerHTML = musicM.musicInfo.sname;
		// mui(".name")[0].innerHTML = musicM.musicInfo.name;
		mui(".music_name")[0].innerHTML = musicM.musicInfo.name;
		mui(".music_actor")[0].innerHTML = musicM.musicInfo.sname;
		//mui(".background")[0].src = musicM.musicInfo.pic;
		//这里使用到了ES6/7的语法,反引号
		mui(".music_pic")[0].style.backgroundImage = `url(${musicM.musicInfo.pic})`;
		mui(".music_pic_bg")[0].style.backgroundImage = `url(${musicM.musicInfo.pic})`;
		//处理上一首数据
		// localStorage.setItem("preMusic", musicM);
		localStorage.setItem("preMusic", JSON.stringify(musicM.musicInfo));
	},
	init:function() {
		setInterval(function(){
			if(musicM.mplayer != null) {
				playTime = musicM.mplayer.currentTime / musicM.mplayer.duration * 100;
				mui(".music_currentTime")[0].style.width = playTime + "%";
				if(musicM.mplayer.ended) {
					musicAc.runMusic();
				}
			} 
		}, 3000);
	}
}