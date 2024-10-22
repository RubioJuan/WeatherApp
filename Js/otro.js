// Función para mostrar el clima de un día específico en la página
const mostrarClimaDiaEspecifico = (data) => {
    const forecastDay = data.forecast.forecastday[0];

    // Mostrar las temperaturas promedio del día
    document.getElementById('current-temp').textContent = `${forecastDay.day.avgtemp_c}°C`;
    document.getElementById('weather-description').textContent = forecastDay.day.condition.text;

    // Mostrar las temperaturas máximas y mínimas (día y noche)
    document.getElementById('day-temp').textContent = `Day: ${forecastDay.day.maxtemp_c}°C`;
    document.getElementById('night-temp').textContent = `Nigh: ${forecastDay.day.mintemp_c}°C`;

    // Mostrar el icono del clima proporcionado por la API
    const weatherIconUrl = `https:${forecastDay.day.condition.icon}`;
    document.getElementById('weather-icon').src = weatherIconUrl;
};

// Función para obtener el clima en un día específico
const getClimaDiaEspecifico = async (fecha) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Floridablanca&lang=es&dt=${fecha}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        const data = await response.json();
        console.log("Clima en el día específico:", data);

        // Llama a la función para mostrar los datos en el HTML
        mostrarClimaDiaEspecifico(data);

    } catch (error) {
        console.error('Error:', error);
    }
};

// Función para mostrar el pronóstico a 14 días en la página
const mostrarPronosticoClima = (data) => {
    let pronosticoTexto = '';
    data.forecast.forecastday.forEach((dia) => {
        pronosticoTexto += `<p>${dia.date}: Day ${dia.day.maxtemp_c}°C / Night ${dia.day.mintemp_c}°C - ${dia.day.condition.text}</p>`;
    });
    document.getElementById('weather-description').innerHTML = pronosticoTexto;
    document.getElementById('location').textContent = data.location.name;
};

// Función para obtener el pronóstico del clima a 14 días
const getPronosticoClima = async () => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Floridablanca&lang=es&days=14`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        const data = await response.json();
        console.log("Pronóstico a 14 días:", data);

        // Llama a la función para mostrar los datos en el HTML
        mostrarPronosticoClima(data);

    } catch (error) {
        console.error('Error:', error);
    }
};

// Ejemplos de uso:

// Obtener el clima para un día específico (1 de octubre de 2024)
getClimaDiaEspecifico('2024-10-01');

// Obtener el pronóstico del clima para los próximos 14 días
getPronosticoClima();