document.addEventListener('DOMContentLoaded', () => {
    const temperature = 15; // Static value in °C
    const windSpeed = 10; // Static value in km/h

    function calculateWindChill(temp, speed) {
        return (temp <= 10 && speed > 4.8) ? (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(2) : 'N/A';
    }

    document.getElementById('wind-chill').textContent = calculateWindChill(temperature, windSpeed);

    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;

    document.getElementById('current-year').textContent = currentYear;
    document.getElementById('last-modified').textContent = lastModified;
});