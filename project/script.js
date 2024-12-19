document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('maintenance-form');
    const scheduleBody = document.getElementById('schedule-body');
    const searchInput = document.getElementById('search');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const vehicle = document.getElementById('vehicle').value;
        const date = document.getElementById('date').value;
        const service = document.getElementById('service').value;

        const newRow = document.createElement('tr');

        const vehicleCell = document.createElement('td');
        vehicleCell.textContent = vehicle;
        newRow.appendChild(vehicleCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = date;
        newRow.appendChild(dateCell);

        const serviceCell = document.createElement('td');
        serviceCell.textContent = service;
        newRow.appendChild(serviceCell);

        scheduleBody.appendChild(newRow);

        form.reset();
    });

    searchInput.addEventListener('input', function () {
        const filter = searchInput.value.toLowerCase();
        const rows = scheduleBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const cell = rows[i].getElementsByTagName('td')[0];
            if (cell) {
                const textValue = cell.textContent || cell.innerText;
                rows[i].style.display = textValue.toLowerCase().indexOf(filter) > -1 ? '' : 'none';
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const totalVehiclesElement = document.getElementById('total-vehicles');
    const upcomingServicesElement = document.getElementById('upcoming-services');
    const commonServiceElement = document.getElementById('common-service');

    // Example data
    const maintenanceData = [
        { vehicle: 'Truck 1', date: '2025-01-15', service: 'Oil Change' },
        { vehicle: 'Van 3', date: '2025-01-20', service: 'Tire Rotation' },
        { vehicle: 'Truck 2', date: '2025-02-10', service: 'Brake Inspection' },
    ];

    function updateDashboard() {
        const totalVehicles = maintenanceData.length;
        const upcomingServices = maintenanceData.filter(record => new Date(record.date) > new Date()).length;
        const serviceCount = {};

        maintenanceData.forEach(record => {
            if (serviceCount[record.service]) {
                serviceCount[record.service]++;
            } else {
                serviceCount[record.service] = 1;
            }
        });

        const commonService = Object.keys(serviceCount).reduce((a, b) => serviceCount[a] > serviceCount[b] ? a : b, 'N/A');

        totalVehiclesElement.textContent = totalVehicles;
        upcomingServicesElement.textContent = upcomingServices;
        commonServiceElement.textContent = commonService;
    }

    updateDashboard();
});