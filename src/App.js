import React from "react";
import BasicTabs from "./components/TabPanel";

const API_KEY = '8c625c180aee6040b1253fc7c17313c0'

class App extends React.Component {

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        error: undefined
    }

    gettingWeather = async (e) => {
        e.preventDefault();
        let city = e.target.elements.city.value;

        if(city) {
            const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            const data = await api_url.json();
            this.setState({
                temp: Math.floor(data.main.temp - 273),
                city: data.name,
                country: data.sys.country,
                error: undefined
            });

        } else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                error: "Введите название города"
            });
        }
    }

    render() {
        return (
                <div className='wrapper'>
                    <BasicTabs
                        weatherMethod={this.gettingWeather}
                        temp={this.state.temp}
                        city={this.state.city}
                        country={this.state.country}
                        error={this.state.error}
                    />
                </div>
        );
    }
    
}

export default App;