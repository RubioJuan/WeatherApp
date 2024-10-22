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
    document.getElementById('pressure').textContent = `${data.current.pressure_mb} hPa`; // Presión
    document.getElementById('uv-index').textContent = data.current.uv; // Índice UV

    mostrarAmanecerAtardecer(todayForecast.astro);
};

// Función para mostrar amanecer y atardecer
const mostrarAmanecerAtardecer = (astroData) => {
    const sunriseTime = astroData.sunrise;
    const sunsetTime = astroData.sunset;

    // Mostrar la hora de amanecer y atardecer
    document.getElementById('sunrise-time').textContent = sunriseTime;
    document.getElementById('sunset-time').textContent = sunsetTime;

    // Obtener la hora actual
    const horaActual = new Date();

    // Convertir la hora del amanecer y el atardecer a objetos Date
    const [sunriseHour, sunriseMin] = convertirHora12A24(sunriseTime);
    const [sunsetHour, sunsetMin] = convertirHora12A24(sunsetTime);

    const amanecer = new Date(horaActual);
    amanecer.setHours(sunriseHour, sunriseMin, 0, 0); // Configurar la hora del amanecer

    const atardecer = new Date(horaActual);
    atardecer.setHours(sunsetHour, sunsetMin, 0, 0); // Configurar la hora del atardecer

    // Calcular tiempo desde el amanecer
    const tiempoDesdeAmanecer = horaActual - amanecer;
    const horasDesdeAmanecer = Math.floor(tiempoDesdeAmanecer / (1000 * 60 * 60));

    if (horasDesdeAmanecer >= 0) {
        document.getElementById('time-since-sunrise').textContent = `${horasDesdeAmanecer}h ago`;
    } else {
        document.getElementById('time-since-sunrise').textContent = '--h ago';
    }

    // Calcular tiempo hasta el atardecer
    const tiempoHastaAtardecer = atardecer - horaActual;
    const horasHastaAtardecer = Math.ceil(tiempoHastaAtardecer / (1000 * 60 * 60));

    if (horasHastaAtardecer >= 0) {
        document.getElementById('time-to-sunset').textContent = `in ${horasHastaAtardecer}h`;
    } else {
        document.getElementById('time-to-sunset').textContent = 'Sunset has passed';
    }
};

// Función para convertir horas de formato 12h (AM/PM) a formato 24h
const convertirHora12A24 = (hora12) => {
    const [time, period] = hora12.split(' ');
    let [hour, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hour !== 12) {
        hour += 12;
    } else if (period === 'AM' && hour === 12) {
        hour = 0;
    }

    return [hour, minutes];
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

// Función para mostrar la probabilidad de lluvia en una barra
const mostrarProbabilidadLluvia = (data) => {
    const hourlyData = data.forecast.forecastday[0].hour; // Pronóstico horario

    const rainChanceDetails = document.getElementById('rain-chance-details');
    rainChanceDetails.innerHTML = ''; // Limpiar contenido previo

    // Iteramos sobre los datos de probabilidad de lluvia
    hourlyData.forEach((hour) => {
        const time = hour.time.split(' ')[1]; // Obtener solo la hora
        const chance = hour.chance_of_rain; // Asegúrate de que esta propiedad sea correcta

        // Crear un contenedor para la hora y la barra de probabilidad
        const rainInfo = document.createElement('div');
        rainInfo.classList.add('rain-info'); // Agregar clase para estilo

        const timeText = document.createElement('span');
        timeText.textContent = `${time}`; // Hora

        const rainBarContainer = document.createElement('div');
        rainBarContainer.classList.add('rain-bar-container');

        const rainBar = document.createElement('div');
        rainBar.classList.add('rain-bar');
        rainBar.style.width = `${chance}%`; // Establecer el ancho de la barra según la probabilidad de lluvia
        rainBar.textContent = `${chance}%`; // Mostrar porcentaje en la barra

        // Añadir elementos al contenedor
        rainBarContainer.appendChild(rainBar);
        rainInfo.appendChild(timeText);
        rainInfo.appendChild(rainBarContainer);
        rainChanceDetails.appendChild(rainInfo);
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
        mostrarProbabilidadLluvia(data); // Llama a la función para mostrar la probabilidad de lluvia
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

// Referencias a los elementos del DOM
const suggestionsContainer = document.getElementById('suggestions');
const input = document.getElementById('location-input'); // Input de búsqueda de ciudad
const searchIcon = document.getElementById('search-icon'); // Icono de lupa

// Evento para manejar el clic en una sugerencia de ciudad
suggestionsContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'P') { // Asegúrate de que se haga clic en un elemento <p>
        const selectedCity = event.target.textContent; // Obtén la ciudad seleccionada
        buscarCiudad(selectedCity); // Llama a la función que busca el clima para esa ciudad
        input.style.display = 'none'; // Ocultar el input después de seleccionar
        suggestionsContainer.innerHTML = ''; // Limpiar sugerencias al seleccionar
        suggestionsContainer.style.display = 'none'; // Ocultar sugerencias
    }
});

// Función para mostrar/ocultar el input de búsqueda al hacer clic en la lupa
searchIcon.addEventListener('click', (event) => {
    event.stopPropagation(); 
    if (input.style.display === 'none' || input.style.display === '') {
        input.style.display = 'block'; // Mostrar el input
        input.focus(); // Enfocar el input
        suggestionsContainer.style.display = 'block'; // Mostrar sugerencias al abrir el input
    } else {
        input.style.display = 'none'; // Ocultar el input
        suggestionsContainer.innerHTML = ''; // Limpiar sugerencias al ocultar
        suggestionsContainer.style.display = 'none'; // Ocultar sugerencias
    }
});

// Ocultar el input al hacer clic en cualquier lugar de la página
document.addEventListener('click', (event) => {
    if (event.target !== input && event.target !== searchIcon) {
        input.style.display = 'none'; // Ocultar el input
        suggestionsContainer.innerHTML = ''; // Limpiar sugerencias
        suggestionsContainer.style.display = 'none'; // Ocultar sugerencias
    }
});

// Evitar que el clic dentro del input lo oculte
input.addEventListener('click', (event) => {
    event.stopPropagation();
});

// Función para buscar el clima en una ciudad ingresada por el usuario
const buscarCiudad = async (ciudad) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudad}&lang=es&days=1`; 

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        const data = await response.json();
        console.log("Datos del clima para la ciudad:", data);

        // Llama a las funciones para mostrar los datos en el HTML
        mostrarClimaActual(data);
        mostrarPronosticoHorarios(data);
        mostrarGraficoPronostico(data); // Llama a la función del gráfico
        mostrarProbabilidadLluvia(data); // Llama a la función para mostrar la probabilidad de lluvia
    } catch (error) {
        console.error('Error:', error);
    }
};

