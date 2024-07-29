
//What the page will do upon loading
document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display weather
    getDates();
    fetchWeather();
    // Display date and time
    updateDateTime();
    setInterval(updateDateTime, 1000); // Update every second
    fetchNews();
    getQuote();
});

//function for fetching forecasts in Manhattan and Oceanside
function fetchWeather() {
    const oLat = 40.64;
    const oLon = -73.65;

    fetch(`/api/weather?lat=${oLat}&lon=${oLon}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.list && data.list.length > 0) {
                document.getElementById('day1Temp').innerHTML = `${(data.list[0].main.temp).toFixed(1)}°F`;
                document.getElementById('day1Icon').src = `icons/weather/${data.list[0].weather[0].icon}.png`;
                document.getElementById('day2Temp').innerHTML = `${(data.list[8].main.temp).toFixed(1)}°F`;
                document.getElementById('day2Icon').src = `icons/weather/${data.list[8].weather[0].icon}.png`;
                document.getElementById('day3Temp').innerHTML = `${(data.list[16].main.temp).toFixed(1)}°F`;
                document.getElementById('day3Icon').src = `icons/weather/${data.list[16].weather[0].icon}.png`;
                document.getElementById('day1TempN').innerHTML = `${(data.list[4].main.temp).toFixed(1)}°F`;
                document.getElementById('day1IconN').src = `icons/weather/${data.list[4].weather[0].icon}.png`;
                document.getElementById('day2TempN').innerHTML = `${(data.list[12].main.temp).toFixed(1)}°F`;
                document.getElementById('day2IconN').src = `icons/weather/${data.list[12].weather[0].icon}.png`;
                document.getElementById('day3TempN').innerHTML = `${(data.list[20].main.temp).toFixed(1)}°F`;
                document.getElementById('day3IconN').src = `icons/weather/${data.list[20].weather[0].icon}.png`;
            } else {
                document.getElementById('weatherBox1').innerHTML = `
                    <div>No weather data available</div>
                `;
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('weatherBox1').innerHTML = `
                <div>Error fetching weather data</div>
            `;
        });

    const nyLat = 40.71;
    const nyLon = -74.01;

    fetch(`/api/weather?lat=${nyLat}&lon=${nyLon}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.list && data.list.length > 0) {
            document.getElementById('day1Temp2').innerHTML = `${(data.list[0].main.temp).toFixed(1)}°F`;
            document.getElementById('day1Icon2').src = `icons/weather/${data.list[0].weather[0].icon}.png`;
            document.getElementById('day2Temp2').innerHTML = `${(data.list[8].main.temp).toFixed(1)}°F`;
            document.getElementById('day2Icon2').src = `icons/weather/${data.list[8].weather[0].icon}.png`;
            document.getElementById('day3Temp2').innerHTML = `${(data.list[16].main.temp).toFixed(1)}°F`;
            document.getElementById('day3Icon2').src = `icons/weather/${data.list[16].weather[0].icon}.png`;
            document.getElementById('day1Temp2N').innerHTML = `${(data.list[4].main.temp).toFixed(1)}°F`;
            document.getElementById('day1Icon2N').src = `icons/weather/${data.list[4].weather[0].icon}.png`;
            document.getElementById('day2Temp2N').innerHTML = `${(data.list[12].main.temp).toFixed(1)}°F`;
            document.getElementById('day2Icon2N').src = `icons/weather/${data.list[12].weather[0].icon}.png`;
            document.getElementById('day3Temp2N').innerHTML = `${(data.list[20].main.temp).toFixed(1)}°F`;
            document.getElementById('day3Icon2N').src = `icons/weather/${data.list[20].weather[0].icon}.png`;
        } else {
            document.getElementById('weatherBox2').innerHTML = `
                <div>No weather data available</div>
            `;
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        document.getElementById('weatherBox2').innerHTML = `
            <div>Error fetching weather data</div>
        `;
    });
}

//function to fetch top tech news stories
function fetchNews() {
    const keyWord = 'tech'
    fetch(`/api/news?q=${keyWord}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length >= 3) {
                document.getElementById('newsStory1').innerHTML = `${data.results[0].title}`;
                document.getElementById('newsStory2').innerHTML = `${data.results[1].title}`;
                document.getElementById('newsStory3').innerHTML = `${data.results[2].title}`;

                function capitalizeFirstLetterOfEachWord(str) {
                    if(str.length <= 3){
                        return str.toUpperCase();
                    }
                    return str.replace(/\b\w/g, function(char) {
                        return char.toUpperCase();
                    });
                }

                document.getElementById('newsSource1').innerHTML = capitalizeFirstLetterOfEachWord(`${data.results[0].source_id}`);
                document.getElementById('newsSource2').innerHTML = capitalizeFirstLetterOfEachWord(`${data.results[1].source_id}`);
                document.getElementById('newsSource3').innerHTML = capitalizeFirstLetterOfEachWord(`${data.results[2].source_id}`);

                // Truncate descriptions to 100 characters
                const truncate = (text, maxLength) => {
                    if (!text) {
                        return 'No description available';
                    }
                    if (text.length > maxLength) {
                        return text.substring(0, maxLength) + '...';
                    }
                    return text;
                };

                document.getElementById('newsDescription1').innerHTML = truncate(data.results[0].description, 200);
                document.getElementById('newsDescription2').innerHTML = truncate(data.results[1].description, 200);
                document.getElementById('newsDescription3').innerHTML = truncate(data.results[2].description, 200);

                document.getElementById('newsImg1').src = `${data.results[0].image_url}`;
                document.getElementById('newsImg2').src = `${data.results[1].image_url}`;
                document.getElementById('newsImg3').src = `${data.results[2].image_url}`;
                document.getElementById('newsLink1').href = `${data.results[0].link}`;
                document.getElementById('newsLink2').href = `${data.results[1].link}`;
                document.getElementById('newsLink3').href = `${data.results[2].link}`;
            } else {
                console.error('Not enough news results available');
                // Optionally display an error message to the user
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            // Optionally display an error message to the user
        });
}




//function to update time once per second
function updateDateTime() {
    const now = new Date();
    document.getElementById('datetime').innerHTML = `
        <div>${now.toLocaleDateString()} - ${now.toLocaleTimeString()}</div>
    `;
}

//function to get current date and date of next two days
function getDates() {
    // Get today's date
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0!
    let yyyy = today.getFullYear();

    today = `${mm}/${dd}`;
    document.getElementById('day1Date').innerHTML = `<div>${today}</div>`
    document.getElementById('day1Date2').innerHTML = `<div>${today}</div>`


    // Get tomorrow's date
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dd = tomorrow.getDate();
    mm = tomorrow.getMonth() + 1;
    yyyy = tomorrow.getFullYear();

    tomorrow = `${mm}/${dd}`;
    document.getElementById('day2Date').innerHTML = `<div>${tomorrow}</div>`
    document.getElementById('day2Date2').innerHTML = `<div>${tomorrow}</div>`


    // Get the day after tomorrow's date
    let dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    dd = dayAfterTomorrow.getDate();
    mm = dayAfterTomorrow.getMonth() + 1;
    yyyy = dayAfterTomorrow.getFullYear();

    dayAfterTomorrow = `${mm}/${dd}`;
     document.getElementById('day3Date').innerHTML = `<div>${dayAfterTomorrow}</div>`
     document.getElementById('day3Date2').innerHTML = `<div>${dayAfterTomorrow}</div>`

}

//function to get quote from quote database
function getQuote() {
    let quote;
    let first;
    let last;

    const authorDiv = document.getElementById('authorDiv');
    const quoteDiv = document.getElementById('quoteDiv');

    fetch(`/api/quote`)
        .then(response => response.json())
        .then(data => {
            quote=data.quote;
            author=data.author;

            quoteDiv.innerHTML = quote;
            authorDiv.innerHTML = author;
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
            // Optionally display an error message to the user
            quoteDiv.innerHTML = 'Failed to fetch quote. Please try again later.';
        });
    }
