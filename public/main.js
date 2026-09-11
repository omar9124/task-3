const form = document.getElementById("Form");
const input = document.getElementById("Input");
const results = document.getElementById("results");
const error = document.getElementById("error");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    weatherFun();
});

const weatherFun = async () => {
    const location = input.value.trim();

    if (!location) return;

    error.classList.add("hidden");

    try {
        const res = await fetch(`/weather?address=${encodeURIComponent(location)}`);
        const data = await res.json();

        if (data.error) {
            error.innerText = data.error;
            error.classList.remove("hidden");
            results.classList.add("hidden");
        } else {
            document.getElementById("resCountry").innerText = `Country: ${data.placeName}`;
            document.getElementById("resLat").innerText = `Latitude: ${data.latitude}`;
            document.getElementById("resLon").innerText = `Longitude: ${data.longitude}`;
            document.getElementById("resTemp").innerText = `Temperature: ${data.temperatureC}°C`;

            results.classList.remove("hidden");
        }
    } catch (err) {
        error.innerText = "Unable to connect to the server.";
        error.classList.remove("hidden");
        results.classList.add("hidden");
    }
};

