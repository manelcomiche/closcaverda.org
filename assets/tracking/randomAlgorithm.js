const filePath = './assets/tracking/godzilla.geojson';

function calculateNewPosition(lastPosition) {
    const latMove = (Math.random() * 0.2 - 0.1);
    const longMove = (Math.random() * 0.2 - 0.1);
    return [lastPosition[0] + longMove, lastPosition[1] + latMove];
}

function shouldAddNewPosition(lastTimestamp) {
    const now = new Date();
    const lastUpdateDate = new Date(lastTimestamp);
    lastUpdateDate.setUTCDate(lastUpdateDate.getUTCDate() + 1);

    return now >= lastUpdateDate;
}

fetch(filePath).then(function (response) {
    return response.json();
}).then(function (geojson) {
    let lastPosition = geojson.features[geojson.features.length - 1].geometry.coordinates;
    let currentDate = new Date();

    for (let i = 0; i < 100; i++) {
        const newPosition = calculateNewPosition(lastPosition);

        currentDate.setDate(currentDate.getDate() + 1);
        const timestamp = currentDate.toISOString();

        const newPointFeature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": newPosition
            },
            "properties": {
                "name": "GODZILLA",
                "description": "Posición actualizada",
                "timestamp": timestamp,
            }
        };
        geojson.features.push(newPointFeature);

        lastPosition = newPosition;

        const lineFeatureIndex = geojson.features.findIndex(feature => feature.geometry.type === 'LineString');
        if (lineFeatureIndex !== -1) {
            geojson.features[lineFeatureIndex].geometry.coordinates.push(newPosition);
        } else {
            const newLineFeature = {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [lastPosition, newPosition]
                },
                "properties": {
                    "description": "Ruta actualizada",
                    "timestamp": timestamp,
                }
            };
            geojson.features.push(newLineFeature);
        }
    }

    geojson.timestamp = currentDate.toISOString();

    console.log(geojson);
});