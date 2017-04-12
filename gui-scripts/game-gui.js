const mainScreenJSON = {
	id: 'mainScreen',
	component: 'Window',
	padding: 4,
	position: { x: 0, y: 0 },
	width: 960,
	height: 600,

	layout: [1, 4],
	children: [
        {
            id: 'label1',
            text: 'Awesome Gelly',
            font: {
                size: '50px',
                family: 'Skranji',
                color: '#8f8'
            },
            component: 'Label',
            position: 'center',
            width: 600,
            height: 80
        },
		{
		  id: 'playBtn',
		  text: 'Play',
		  component: 'Button',
		  position: 'center',

		  width: 190,
		  height: 80
		},
		{
		  id: 'optionsBtn',
		  text: 'Controls',
		  component: 'Button',
		  position: 'center',
		  width: 190,
		  height: 80
		}
	]
}

const avatarSelectScreenJSON = {
}


const levelSelectScreenJSON = {
}


const fakeGameScreenJSON = {
}


const dialog1JSON = {
	id: 'dialog1',
	component: 'Window',
	image: '../../assets/img/controls.png',
	padding: 4,
	position: { x: 0, y: 0 },
	width: 500,
	height: 500,
	children: [
		{
		  id: 'dialog1HideBtn',
		  text: 'Hide',
		  component: 'Button',
		  image:'../../assets/img/orange-btn.png',
		  position: { x: 190, y: 350 },
		  font: {
		      size: '30px',
		      family: 'Skranji',
		      color: 'white'
		  },
		  anchor: {x:0.5, y:0.5},
		  width: 100,
		  height: 60
      }
	]
}

const dialog2JSON = {
	id: 'dialog2',
	component: 'Window',
	image: '../../assets/img/panel-650x400.png',
	header: { position: { x: 0, y: -40 }, height: 100, image:'../../assets/img/lvlcomplete.png', },
	padding: 4,
	position: { x: 0, y: 0 },
	width: 400,
	height: 400,
    layout:[1, 4],
    children: [

        {

            position: 'center',
            image: '../../assets/img/star2.png',
            width: 150,
            height: 60

        },
        null,
		{
		    id: 'dialog2HideBtn',
		    text: 'Hide',
		    component: 'Button',
		    image: '../../assets/img/orange-btn.png',
		    position: { x: 150, y: -60 },
		    font: {
		        size: '30px',
		        family: 'Skranji',
		        color: 'white'
		    },
		    anchor: { x: 0.5, y: 0.5 },
		    width: 100,
		    height: 60
		}
	]
}

const dialog3JSON = {
	id: 'dialog3',
	component: 'Window',
	image: '../../assets/img/panel-650x400.png',
	header: { position: { x: 0, y: -40 }, height: 100, image:'../../assets/img/gameOver.png', },
	padding: 4,
	position: { x: 0, y: 0 },
	width: 400,
	height: 400,
    layout:[1, 4],
    children: [

        {

            position: 'center',
            image: '../../assets/img/star-gameOver.png',
            width: 150,
            height: 60

        },
        null,
		{
		    id: 'dialog3HideBtn',
		    text: 'Hide',
		    component: 'Button',
		    image: '../../assets/img/orange-btn.png',
		    position: { x: 150, y: -60 },
		    font: {
		        size: '30px',
		        family: 'Skranji',
		        color: 'white'
		    },
		    anchor: { x: 0.5, y: 0.5 },
		    width: 100,
		    height: 60
		}
	]
}
