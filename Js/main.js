// Cambia 'TU_API_KEY_AQUI' por tu clave real sin comillas adicionales
const apiKey = 'a3a1ebe3ac1c456eac4135618242110'; // Reemplaza con tu API Key

// Función para mostrar el clima actual en la página
const mostrarClimaActual = (data) => {
    document.getElementById('current-temp').textContent = `${data.current.temp_c}°C`;
    document.getElementById('weather-description').textContent = data.current.condition.text;
    document.getElementById('location').textContent = data.location.name;
};

// Función para obtener el clima actual
const getClimaActual = async () => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Floridablanca&lang=es`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        const data = await response.json();
        console.log("Clima actual:", data);

        // Llama a la función para mostrar los datos en el HTML
        mostrarClimaActual(data);

    } catch (error) {
        console.error('Error:', error);
    }
};

// Función para mostrar el clima de un día específico en la página
const mostrarClimaDiaEspecifico = (data) => {
    document.getElementById('current-temp').textContent = `${data.forecast.forecastday[0].day.avgtemp_c}°C`;
    document.getElementById('weather-description').textContent = data.forecast.forecastday[0].day.condition.text;
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
        pronosticoTexto += `<p>${dia.date}: ${dia.day.avgtemp_c}°C - ${dia.day.condition.text}</p>`;
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

// Obtener el clima actual
getClimaActual();

// Obtener el clima para un día específico (1 de octubre de 2024)
getClimaDiaEspecifico('2024-10-01');

// Obtener el pronóstico del clima para los próximos 14 días
getPronosticoClima();
