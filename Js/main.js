const apiKey = 'a3a1ebe3ac1c456eac4135618242110'; // Reemplaza con tu API Key

// Función para mostrar el clima actual en la página
const mostrarClimaActual = (data) => {
    const todayForecast = data.forecast.forecastday[0]; // Pronóstico del día actual

    // Mostrar la fecha en el formato deseado (YYYY-MM-DD por defecto)
    const fechaActual = todayForecast.date;
    document.getElementById('fecha').textContent = ` ${fechaActual}`;

    document.getElementById('current-temp').textContent = `${data.current.temp_c}°C`;
    document.getElementById('weather-description').textContent = data.current.condition.text;
    document.getElementById('location').textContent = data.location.name;

    // Mostrar el icono del clima proporcionado por la API
    const weatherIconUrl = `https:${data.current.condition.icon}`;
    document.getElementById('weather-icon').src = weatherIconUrl;

    // Mostrar las temperaturas del día y de la noche
    document.getElementById('day-temp').textContent = `Day: ${todayForecast.day.maxtemp_c}°C`;
    document.getElementById('night-temp').textContent = `Night: ${todayForecast.day.mintemp_c}°C`;

    // Mostrar datos adicionales de la API
    document.getElementById('wind-speed').textContent = `${data.current.wind_kph} km/h`; // Velocidad del viento
    document.getElementById('rain-chance').textContent = `${todayForecast.day.daily_chance_of_rain}%`; // Probabilidad de lluvia
    document.getElementById('pressure').textContent = `${data.current.pressure_mb} hPa`; // Presión
    document.getElementById('uv-index').textContent = data.current.uv; // Índice UV
};

// Función para mostrar el pronóstico horario en la página
const mostrarPronosticoHorarios = (data) => {
    const hourlyForecast = data.forecast.forecastday[0].hour; // Pronóstico horario del día actual

    // Mostrar los datos de pronóstico para cada hora
    document.getElementById('temp-now').textContent = `${hourlyForecast[0].temp_c}°`;
    document.getElementById('icon-now').src = `https:${hourlyForecast[0].condition.icon}`;

    document.getElementById('temp-10am').textContent = `${hourlyForecast[10].temp_c}°`;
    document.getElementById('icon-10am').src = `https:${hourlyForecast[10].condition.icon}`;

    document.getElementById('temp-11am').textContent = `${hourlyForecast[11].temp_c}°`;
    document.getElementById('icon-11am').src = `https:${hourlyForecast[11].condition.icon}`;

    document.getElementById('temp-12pm').textContent = `${hourlyForecast[12].temp_c}°`;
    document.getElementById('icon-12pm').src = `https:${hourlyForecast[12].condition.icon}`;

    document.getElementById('temp-1pm').textContent = `${hourlyForecast[13].temp_c}°`;
    document.getElementById('icon-1pm').src = `https:${hourlyForecast[13].condition.icon}`;

    document.getElementById('temp-2pm').textContent = `${hourlyForecast[14].temp_c}°`;
    document.getElementById('icon-2pm').src = `https:${hourlyForecast[14].condition.icon}`;
};

// Función para mostrar el gráfico de pronóstico
const mostrarGraficoPronostico = (data) => {
    const hourlyForecast = data.forecast.forecastday[0].hour; // Pronóstico horario del día actual

    // Extraer las horas y las temperaturas
    const horas = hourlyForecast.map(hora => `${hora.time.split(' ')[1]}`); // Solo la hora
    const temperaturas = hourlyForecast.map(hora => hora.temp_c); // Temperatura en grados Celsius

    // Crear el gráfico utilizando Chart.js
    const ctx = document.getElementById('dayForecastChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line', // Tipo de gráfico (línea)
        data: {
            labels: horas, // Etiquetas (horas)
            datasets: [{
                label: 'Temperatura (°C)', // Leyenda del dataset
                data: temperaturas, // Datos (temperaturas)
                borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo
                borderWidth: 1 // Ancho del borde
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false // Las temperaturas no comienzan en 0
                }
            }
        }
    });
};

// Función para obtener el clima actual y el pronóstico horario
const getClimaActual = async () => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Floridablanca&lang=es&days=1`; 

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        const data = await response.json();
        console.log("Datos del clima:", data);

        // Llama a las funciones para mostrar los datos en el HTML
        mostrarClimaActual(data);
        mostrarPronosticoHorarios(data);
        mostrarGraficoPronostico(data); // Llama a la función del gráfico
    } catch (error) {
        console.error('Error:', error);
    }
};

// Obtener el clima actual al cargar la página
getClimaActual();

// Agregar evento de scroll
window.addEventListener('scroll', () => {
    const backgroundImg = document.querySelector('.background-img');
    const weatherInfo = document.querySelector('.weather-info');
    
    // Calcula el desplazamiento basado en la posición del scroll
    const scrollPosition = window.scrollY;

    // La imagen se desplazará hacia arriba y su opacidad se reducirá
    backgroundImg.style.transform = `translateY(-${scrollPosition * 0.5}px)`; // Cambia el valor según lo rápido que quieras que se mueva
    backgroundImg.style.opacity = `${1 - scrollPosition / 400}`; // Ajusta el divisor para cambiar la velocidad de desvanecimiento

    // Si quieres ocultar completamente la imagen después de cierto scroll
    if (scrollPosition > 400) {
        backgroundImg.style.display = 'none'; // Oculta la imagen completamente después de 400px
        weatherInfo.classList.add('visible'); // Asegúrate de que el clima sea visible
    } else {
        backgroundImg.style.display = 'block'; // Muestra la imagen si el scroll es menor a 400px
        weatherInfo.classList.remove('visible'); // Oculta la información del clima
    }
});
