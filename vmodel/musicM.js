var musicM = {
	version: '1.0',
	top: '音乐',
	urlapi: 'https://api.uomg.com/api/rand.music?sort=热歌榜&format=json',
	mplayer: null,
	musicInfo:{
		pic: '',
		name: '',
		sname: '',
		url: ''
	},
	playStated:false,  //播放状态
	mutedstate:false   //静音状态
}