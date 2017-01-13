/*Images URL for use later*/
var atlImages = [
	'http://i.huffpost.com/gen/1716876/images/o-ATLANTA-TRAFFIC-facebook.jpg',
	'http://2.bp.blogspot.com/--XZFLg6LSq8/U4YV65sb2MI/AAAAAAAAO8A/cFl-Em5Zb0A/s1600/Sawfish_Atlanta_Aquarium.jpg',
	'https://upload.wikimedia.org/wikipedia/commons/a/a3/Piedmont-park-urban-park.jpg'
]

var BootstrapNavBar = React.createClass ({
	render: function() {
		return (
		<nav className="navbar navbar-default">
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <a className="navbar-brand" href="#">Atlanta</a>
		    </div>
		    <ul className="nav navbar-nav">
		    	<li><ReactRouter.IndexLink to="/" activeClassName="active">Home</ReactRouter.IndexLink></li>
		      	<li><ReactRouter.Link to="/about" activeClassName="active">About</ReactRouter.Link></li>
		      	<li><ReactRouter.Link to="/images" activeClassName="active">Images</ReactRouter.Link></li>
		      	<li><ReactRouter.Link to="/weather" activeClassName="active">Weather</ReactRouter.Link></li>
		      	<li><ReactRouter.Link to="/four" activeClassName="active">Four</ReactRouter.Link></li>
		    </ul>
		  </div>
		</nav> 
		)
	}
})

var App = React.createClass ({
	render: function() {
		return (
			<div className="main">
				<BootstrapNavBar />
				{this.props.children}
			</div>
		)
	}
})

var Home = React.createClass ({
	render: function() {
		return (
			<div id="home-page">
				<h2>Welcome to Atlanta!</h2>
			</div>
		)
	}
})

var About = React.createClass ({
	render: function() {
		return (
			<div>
				<h2>The Beautiful City of Atlanta!</h2>
					<p>Atlanta is the capital of and the most populous city in the U.S. state of Georgia, with an estimated 2015 population of 463,878.[6] Atlanta is the cultural and economic center of the Atlanta metropolitan area, home to 5,710,795 people and the ninth largest metropolitan area in the United States.[13] Atlanta is the county seat of Fulton County, and a small portion of the city extends eastward into DeKalb County.</p>

			</div>
		)
	}
})

function Images(props){
    return(
        <div>
            {props.route.image.map(function(image, index){
                return <img key={index} src={image} />
            })}
        </div>
    )
}

var Weather = React.createClass ({
	getInitialState: function() {
		return({
			icon: "",
			temp: "",
			temp_min: "",
			temp_max: "",
			desc: ""
		})
	},
	componentDidMount: function() {
		var url = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=30305,us&appid=482c145ce8edf1d69ea5168f9d06460c';
		$.getJSON(url, (weatherData) =>{
			console.log(weatherData);
			this.setState({
				temp: weatherData.main.temp,
				temp_max: weatherData.main.temp_max,
				temp_min: weatherData.main.temp_min,
				icon: weatherData.weather[0].icon,
				desc: weatherData.weather[0].description,
			})
		});
	},
	render: function(){
		return(
			<div>
				<h1>Real-time Atlanta Weather!</h1>
				<p>The temp is: {this.state.temp}</p>
				<p>The max temp is: {this.state.temp_max}</p>
			</div>
		);
	}
});

var Four = React.createClass ({
	render: function() {
		return (
			<div>
				<h2>FOUR</h2>
			</div>
		)
	}
})

ReactDOM.render (
	<ReactRouter.Router>
		<ReactRouter.Route path="/" component={App}>
			<ReactRouter.IndexRoute component={Home} />
			<ReactRouter.Route path="About" component={About} />
			<ReactRouter.Route path="Images" component={Images} image={atlImages}/>
			<ReactRouter.Route path="Weather" component={Weather} />
			<ReactRouter.Route path="four" component={Four} />
		</ReactRouter.Route>
	</ReactRouter.Router>,
	document.getElementById('container')
)