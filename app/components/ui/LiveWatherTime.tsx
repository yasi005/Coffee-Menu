"use client";

import { useState, useEffect } from "react";
import { CloudSun, Calendar } from "lucide-react";
import { useLanguage } from "../../hooks/LanguageContext";

export default function LiveWeatherTime() {
  const { lang } = useLanguage();
  const [time, setTime] = useState(new Date());
  const [temp, setTemp] = useState<number | null>(null);

  useEffect(() => {
    // 1. Keep the time perfectly synced (updates every 60 seconds)
    const timer = setInterval(() => setTime(new Date()), 60000);
    
    // 2. Fetch live weather for Athens (Lat: 37.9838, Long: 23.7275)
    // Using Open-Meteo because it requires NO API Key for basic use!
    const fetchWeather = async () => {
      try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=37.9838&longitude=23.7275&current_weather=true");
        const data = await res.json();
        setTemp(Math.round(data.current_weather.temperature));
      } catch (error) {
        console.error("Failed to fetch weather", error);
      }
    };

    fetchWeather();
    // Refresh weather every 30 minutes so we don't spam the API
    const weatherTimer = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => {
      clearInterval(timer);
      clearInterval(weatherTimer);
    };
  }, []);

  // Format the date dynamically based on your English/Greek language toggle
  const dateStr = time.toLocaleDateString(lang === "el" ? "el-GR" : "en-US", { 
    weekday: "long", 
    day: "numeric", 
    month: "long" 
  });

  return (
    <div className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
      <span className="flex items-center gap-2">
        <Calendar size={14} strokeWidth={2} />
        {dateStr}
      </span>
      <span className="w-1 h-1 rounded-full bg-border" /> {/* Separator dot */}
      <span className="flex items-center gap-2 text-foreground">
        <CloudSun size={15} strokeWidth={2} />
        {/* Shows '--' for a split second while loading, then pops in the real temp */}
        {temp !== null ? `${temp}°C` : "--°C"} Athens
      </span>
    </div>
  );
}