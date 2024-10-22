const apiKey = 'a3a1ebe3ac1c456eac4135618242110'; // Reemplaza con tu API Key

// Función para mostrar el pronóstico a 10 días en la página
const mostrarPronosticoClima10Dias = (data) => {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Limpiar el contenido anterior

    data.forecast.forecastday.forEach((dia) => {
        const diaElement = document.createElement('div');
        diaElement.className = 'forecast-card'; // Aplicar clase para el estilo

        diaElement.innerHTML = `
            <div class="day-info">
                <h3>${dia.date}</h3>
                <p class="description">${dia.day.condition.text}</p>
                <p class="temperature">Temperatura promedio: ${dia.day.avgtemp_c}°C</p>
            </div>
            <div>
                <img src="https:${dia.day.condition.icon}" alt="${dia.day.condition.text}">
                <p class="temperature">Máxima: ${dia.day.maxtemp_c}°C / Mínima: ${dia.day.mintemp_c}°C</p>
            </div>
        `;
        
        forecastContainer.appendChild(diaElement);
    });
};

// Función para obtener el pronóstico del clima a 10 días
const getPronosticoClima = async () => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Floridablanca&lang=es&days=10`; // Cambiado a 10 días

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        const data = await response.json();
        console.log("Pronóstico a 10 días:", data);

        // Llama a la función para mostrar los datos en el HTML
        mostrarPronosticoClima10Dias(data);

    } catch (error) {
        console.error('Error:', error);
    }
};

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', getPronosticoClima);
