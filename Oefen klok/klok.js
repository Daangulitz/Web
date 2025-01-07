function updateClock() {
    const now = new Date();
    
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const hourDeg = (hours % 12) * 30 + (minutes / 60) * 30; // 360 / 12 = 30 degrees per hour
    const minuteDeg = minutes * 6 + (seconds / 60) * 6;      // 360 / 60 = 6 degrees per minute
    const secondDeg = seconds * 6;                           // 360 / 60 = 6 degrees per second
    
    document.querySelector('.hour-hand').style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    document.querySelector('.minute-hand').style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    document.querySelector('.second-hand').style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize the clock immediately on load
updateClock();
