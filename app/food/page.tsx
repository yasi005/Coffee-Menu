"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Star, ArrowLeft, List, GalleryHorizontal,
  Languages, ChevronRight, Flame, Clock, Leaf, Home
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../hooks/LanguageContext";
import CircularReveal from "../components/ui/CircularReveal";

type ViewMode = "carousel" | "list";

interface FoodItem {
  id: number;
  menuType: string;
  category: string;
  titleEn: string;
  titleEl: string;
  volume: string;
  rating: string;
  price: string;
  image: string;
  badge?: string;      // "New" | "Popular" | "Chef's Pick"
  prepMins?: number;
  calories?: number;
  isVeg?: boolean;
}

const foodItems: FoodItem[] = [
  // ── APPETIZERS ──
  { id: 101, menuType: "Appetizers", category: "Local",   titleEn: "Tzatziki & Warm Pita",          titleEl: "Τζατζίκι με Πίτα",               volume: "250g",    rating: "4.8", price: "4.50",  image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=600&fit=crop", badge: "Popular",    prepMins: 5,  calories: 210, isVeg: true },
  { id: 102, menuType: "Appetizers", category: "Pastry",  titleEn: "Traditional Spanakopita",        titleEl: "Παραδοσιακή Σπανακόπιτα",         volume: "1 piece", rating: "4.9", price: "5.00",  image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=600&fit=crop", badge: "Chef's Pick", prepMins: 8,  calories: 320, isVeg: true },
  { id: 103, menuType: "Appetizers", category: "Seafood", titleEn: "Crispy Golden Calamari",         titleEl: "Τραγανό Καλαμάρι",                volume: "300g",    rating: "4.7", price: "9.50",  image: "https://images.unsplash.com/photo-1599487405270-8e7c10b7b1eb?w=600&h=600&fit=crop", badge: "Popular",    prepMins: 12, calories: 380 },
  { id: 104, menuType: "Appetizers", category: "Fries",   titleEn: "Truffle Parmesan Fries",         titleEl: "Πατάτες με Τρούφα",               volume: "350g",    rating: "4.8", price: "6.50",  image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&h=600&fit=crop", badge: "New",         prepMins: 10, calories: 420 },
  { id: 105, menuType: "Appetizers", category: "Breads",  titleEn: "Heirloom Tomato Bruschetta",     titleEl: "Μπρουσκέτα Ντομάτας",            volume: "4 pcs",   rating: "4.6", price: "7.00",  image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&h=600&fit=crop",                           prepMins: 6,  calories: 290, isVeg: true },
  { id: 106, menuType: "Appetizers", category: "Cheese",  titleEn: "Grilled Halloumi & Honey",       titleEl: "Χαλούμι Σχάρας",                  volume: "200g",    rating: "4.9", price: "8.00",  image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&h=600&fit=crop", badge: "Chef's Pick", prepMins: 8,  calories: 340, isVeg: true },
  { id: 107, menuType: "Appetizers", category: "Local",   titleEn: "Feta & Kalamata Olives",         titleEl: "Φέτα & Ελιές Καλαμών",            volume: "200g",    rating: "4.7", price: "5.50",  image: "https://images.unsplash.com/photo-1559561853-08451507cbe7?w=600&h=600&fit=crop",                           prepMins: 3,  calories: 280, isVeg: true },

  // ── BREAKFAST ──
  { id: 201, menuType: "Breakfast",  category: "Eggs",    titleEn: "Smashed Avocado & Eggs",         titleEl: "Τοστ Αβοκάντο με Αυγά",          volume: "450 kcal",rating: "4.9", price: "8.50",  image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=600&fit=crop", badge: "Popular",    prepMins: 10, calories: 450, isVeg: true },
  { id: 202, menuType: "Breakfast",  category: "Eggs",    titleEn: "Royal Eggs Benedict",            titleEl: "Αυγά Benedict",                   volume: "520 kcal",rating: "4.8", price: "11.00", image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&h=600&fit=crop", badge: "Chef's Pick", prepMins: 14, calories: 520 },
  { id: 203, menuType: "Breakfast",  category: "Healthy", titleEn: "Greek Yogurt & Wildflower Honey",titleEl: "Γιαούρτι με Μέλι",               volume: "350 kcal",rating: "4.9", price: "6.50",  image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=600&fit=crop",                           prepMins: 5,  calories: 350, isVeg: true },
  { id: 204, menuType: "Breakfast",  category: "Hot",     titleEn: "Croque Madame",                  titleEl: "Κροκ Μαντάμ",                     volume: "600 kcal",rating: "4.7", price: "9.50",  image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=600&h=600&fit=crop",                           prepMins: 12, calories: 600 },
  { id: 205, menuType: "Breakfast",  category: "Eggs",    titleEn: "Spiced Shakshuka",               titleEl: "Σακσούκα",                        volume: "480 kcal",rating: "4.8", price: "10.00", image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=600&h=600&fit=crop", badge: "New",         prepMins: 16, calories: 480, isVeg: true },
  { id: 206, menuType: "Breakfast",  category: "Oats",    titleEn: "Almond & Mixed Berry Oatmeal",   titleEl: "Βρώμη με Μούρα",                  volume: "320 kcal",rating: "4.6", price: "7.00",  image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=600&h=600&fit=crop",                           prepMins: 8,  calories: 320, isVeg: true },
  { id: 207, menuType: "Breakfast",  category: "Hot",     titleEn: "Breakfast Burrito",              titleEl: "Μπουρίτο Πρωινού",                volume: "550 kcal",rating: "4.7", price: "9.00",  image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=600&fit=crop",                           prepMins: 12, calories: 550 },

  // ── BRUNCH ──
  { id: 301, menuType: "Brunch",     category: "Bagels",  titleEn: "Smoked Salmon Bagel",            titleEl: "Bagel Καπνιστού Σολομού",         volume: "450 kcal",rating: "4.9", price: "12.00", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop", badge: "Popular",    prepMins: 10, calories: 450 },
  { id: 302, menuType: "Brunch",     category: "Sweet",   titleEn: "Fluffy Berry Pancakes",          titleEl: "Pancakes με Μούρα",               volume: "520 kcal",rating: "4.8", price: "9.00",  image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=600&fit=crop", badge: "Popular",    prepMins: 14, calories: 520, isVeg: true },
  { id: 303, menuType: "Brunch",     category: "Sweet",   titleEn: "Maple Bacon Waffles",            titleEl: "Βάφλες με Μπέικον",               volume: "610 kcal",rating: "4.7", price: "10.50", image: "https://images.unsplash.com/photo-1484723091739-30990ff50f72?w=600&h=600&fit=crop",                           prepMins: 16, calories: 610 },
  { id: 304, menuType: "Brunch",     category: "Eggs",    titleEn: "Truffle Mushroom Omelette",      titleEl: "Ομελέτα με Τρούφα",               volume: "420 kcal",rating: "4.9", price: "11.50", image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&h=600&fit=crop", badge: "Chef's Pick", prepMins: 12, calories: 420, isVeg: true },
  { id: 305, menuType: "Brunch",     category: "Healthy", titleEn: "Tropical Acai Bowl",             titleEl: "Acai Bowl",                       volume: "380 kcal",rating: "4.8", price: "9.50",  image: "https://images.unsplash.com/photo-1590301157890-4810ed35a4d4?w=600&h=600&fit=crop", badge: "New",         prepMins: 8,  calories: 380, isVeg: true },
  { id: 306, menuType: "Brunch",     category: "Meat",    titleEn: "Steak & Farm Eggs",              titleEl: "Μπριζόλα με Αυγά",                volume: "750 kcal",rating: "4.9", price: "18.00", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=600&fit=crop", badge: "Chef's Pick", prepMins: 20, calories: 750 },

  // ── BAKERY ──
  { id: 401, menuType: "Bakery",     category: "Croissants",titleEn: "Classic Butter Croissant",     titleEl: "Κρουασάν Βουτύρου",               volume: "290 kcal",rating: "4.7", price: "3.20",  image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=600&fit=crop",                           prepMins: 0,  calories: 290, isVeg: true },
  { id: 402, menuType: "Bakery",     category: "Croissants",titleEn: "Pain au Chocolat",             titleEl: "Κρουασάν Σοκολάτας",              volume: "340 kcal",rating: "4.8", price: "3.80",  image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600&h=600&fit=crop", badge: "Popular",    prepMins: 0,  calories: 340, isVeg: true },
  { id: 403, menuType: "Bakery",     category: "Sweets",  titleEn: "Cinnamon Roll",                  titleEl: "Ρολό Κανέλας",                    volume: "410 kcal",rating: "4.9", price: "4.50",  image: "https://images.unsplash.com/photo-1509365465994-3b4e33eb0c7b?w=600&h=600&fit=crop", badge: "Popular",    prepMins: 0,  calories: 410, isVeg: true },
  { id: 404, menuType: "Bakery",     category: "Cakes",   titleEn: "Walnut Banana Bread",            titleEl: "Κέικ Μπανάνας",                   volume: "350 kcal",rating: "4.8", price: "4.00",  image: "https://images.unsplash.com/photo-1601314002592-b8734bca6604?w=600&h=600&fit=crop",                           prepMins: 0,  calories: 350, isVeg: true },
  { id: 405, menuType: "Bakery",     category: "Pastries",titleEn: "Tiropita (Cheese Pie)",          titleEl: "Τυρόπιτα",                        volume: "380 kcal",rating: "4.7", price: "4.00",  image: "https://images.unsplash.com/photo-1613506161986-b4b3d7a86cf3?w=600&h=600&fit=crop",                           prepMins: 0,  calories: 380, isVeg: true },
  { id: 406, menuType: "Bakery",     category: "Breads",  titleEn: "Artisan Sourdough Loaf",         titleEl: "Προζυμένιο Ψωμί",                 volume: "1 Loaf",  rating: "4.9", price: "6.00",  image: "https://images.unsplash.com/photo-1589367920969-ab8e050eb0e9?w=600&h=600&fit=crop", badge: "Chef's Pick", prepMins: 0,  calories: 0,   isVeg: true },

  // ── LUNCH ──
  { id: 501, menuType: "Lunch",      category: "Salads",  titleEn: "Authentic Greek Salad",          titleEl: "Χωριάτικη Σαλάτα",               volume: "400 kcal",rating: "4.9", price: "9.50",  image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=600&fit=crop", badge: "Popular",    prepMins: 8,  calories: 400, isVeg: true },
  { id: 502, menuType: "Lunch",      category: "Salads",  titleEn: "Grilled Chicken Caesar",         titleEl: "Σαλάτα Καίσαρα",                  volume: "550 kcal",rating: "4.8", price: "11.00", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&h=600&fit=crop",                           prepMins: 10, calories: 550 },
  { id: 503, menuType: "Lunch",      category: "Burgers", titleEn: "Wagyu Truffle Burger",           titleEl: "Burger με Τρούφα",                volume: "850 kcal",rating: "4.9", price: "16.50", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop", badge: "Chef's Pick", prepMins: 18, calories: 850 },
  { id: 504, menuType: "Lunch",      category: "Pasta",   titleEn: "Pesto Penne & Sun Tomatoes",     titleEl: "Πένες Πέστο",                     volume: "610 kcal",rating: "4.8", price: "14.00", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=600&fit=crop",                           prepMins: 14, calories: 610, isVeg: true },
  { id: 505, menuType: "Lunch",      category: "Local",   titleEn: "Chicken Souvlaki Plate",         titleEl: "Μερίδα Σουβλάκι",                volume: "700 kcal",rating: "4.9", price: "13.50", image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=600&h=600&fit=crop", badge: "Popular",    prepMins: 15, calories: 700 },
  { id: 506, menuType: "Lunch",      category: "Bowls",   titleEn: "Atlantic Salmon Quinoa Bowl",    titleEl: "Bowl Κινόα με Σολομό",            volume: "480 kcal",rating: "4.7", price: "15.00", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop",                           prepMins: 12, calories: 480 },
  { id: 507, menuType: "Lunch",      category: "Pizza",   titleEn: "Woodfire Margherita",            titleEl: "Πίτσα Μαργαρίτα",                volume: "800 kcal",rating: "4.8", price: "12.00", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=600&fit=crop",                           prepMins: 20, calories: 800, isVeg: true },

  // ── SANDWICHES ──
  { id: 601, menuType: "Sandwiches", category: "Club",    titleEn: "Luxury Club Sandwich",           titleEl: "Κλαμπ Σάντουιτς",                volume: "680 kcal",rating: "4.8", price: "11.50", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop",                           prepMins: 10, calories: 680 },
  { id: 602, menuType: "Sandwiches", category: "Baguette",titleEn: "Prosciutto & Mozzarella Sub",    titleEl: "Μπαγκέτα Προσούτο",              volume: "520 kcal",rating: "4.9", price: "9.00",  image: "https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?w=600&h=600&fit=crop", badge: "Popular",    prepMins: 8,  calories: 520 },
  { id: 603, menuType: "Sandwiches", category: "Ciabatta",titleEn: "Caprese Ciabatta",               titleEl: "Τσιαπάτα Caprese",               volume: "450 kcal",rating: "4.7", price: "8.50",  image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=600&fit=crop",                           prepMins: 7,  calories: 450, isVeg: true },
  { id: 604, menuType: "Sandwiches", category: "Sourdough",titleEn:"Roast Beef Sourdough Melt",      titleEl: "Sourdough Roast Beef",           volume: "600 kcal",rating: "4.9", price: "12.50", image: "https://images.unsplash.com/photo-1484723091739-30990ff50f72?w=600&h=600&fit=crop", badge: "Chef's Pick", prepMins: 12, calories: 600 },
  { id: 605, menuType: "Sandwiches", category: "Wraps",   titleEn: "Turkey & Feta Wrap",             titleEl: "Αραβική με Γαλοπούλα",            volume: "380 kcal",rating: "4.6", price: "7.50",  image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=600&fit=crop",                           prepMins: 8,  calories: 380 },

  // ── DINNER ──
  { id: 701, menuType: "Dinner",     category: "Local",   titleEn: "Traditional Moussaka",           titleEl: "Παραδοσιακός Μουσακάς",           volume: "650 kcal",rating: "4.9", price: "15.00", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&h=600&fit=crop", badge: "Popular",    prepMins: 20, calories: 650 },
  { id: 702, menuType: "Dinner",     category: "Seafood", titleEn: "Pan-Seared Wild Salmon",         titleEl: "Σολομός Σχάρας",                  volume: "500 kcal",rating: "4.8", price: "22.00", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=600&fit=crop",                           prepMins: 18, calories: 500 },
  { id: 703, menuType: "Dinner",     category: "Steak",   titleEn: "Prime Dry-Aged Ribeye",          titleEl: "Ribeye Steak",                    volume: "850 kcal",rating: "4.9", price: "35.00", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=600&fit=crop", badge: "Chef's Pick", prepMins: 25, calories: 850 },
  { id: 704, menuType: "Dinner",     category: "Pasta",   titleEn: "Wild Mushroom Risotto",          titleEl: "Ριζότο Μανιταριών",               volume: "620 kcal",rating: "4.8", price: "18.50", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=600&fit=crop",                           prepMins: 22, calories: 620, isVeg: true },
  { id: 705, menuType: "Dinner",     category: "Poultry", titleEn: "Lemon & Herb Roast Chicken",     titleEl: "Κοτόπουλο Λεμονάτο",             volume: "480 kcal",rating: "4.7", price: "16.00", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&h=600&fit=crop",                           prepMins: 20, calories: 480 },
  { id: 706, menuType: "Dinner",     category: "Pasta",   titleEn: "Garlic Butter Shrimp Linguine",  titleEl: "Λιγκουίνι με Γαρίδες",           volume: "550 kcal",rating: "4.9", price: "21.00", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=600&fit=crop", badge: "Popular",    prepMins: 18, calories: 550 },
  { id: 707, menuType: "Dinner",     category: "Meat",    titleEn: "Grilled Lamb Chops",             titleEl: "Αρνίσια Παϊδάκια",               volume: "720 kcal",rating: "4.8", price: "26.00", image: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=600&h=600&fit=crop",                           prepMins: 22, calories: 720 },
];

const foodMenus = [
  { id: "Appetizers", titleEn: "Appetizers",  titleEl: "Ορεκτικά",       emoji: "🫒", tagline: "Small plates, big flavour",    image: "https://images.unsplash.com/photo-1541529086526-db283c521140?w=800&h=400&fit=crop" },
  { id: "Breakfast",  titleEn: "Breakfast",   titleEl: "Πρωινό",          emoji: "🥚", tagline: "Start your day right",          image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&h=400&fit=crop" },
  { id: "Brunch",     titleEn: "Brunch",      titleEl: "Μπραντς",         emoji: "🥞", tagline: "Weekend indulgence, all week", image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=400&fit=crop" },
  { id: "Bakery",     titleEn: "Bakery",      titleEl: "Φούρνος",         emoji: "🥐", tagline: "Freshly baked every morning",  image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=400&fit=crop" },
  { id: "Lunch",      titleEn: "Lunch",       titleEl: "Μεσημεριανό",     emoji: "🥗", tagline: "Midday fuel, crafted well",     image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop" },
  { id: "Sandwiches", titleEn: "Sandwiches",  titleEl: "Σάντουιτς",       emoji: "🥖", tagline: "Pressed, stacked & toasted",   image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&h=400&fit=crop" },
  { id: "Dinner",     titleEn: "Dinner",      titleEl: "Βραδινό",         emoji: "🥩", tagline: "An evening to remember",        image: "https://images.unsplash.com/photo-1414235077428-33898ed1e829?w=800&h=400&fit=crop" },
];

const BADGE_COLORS: Record<string, string> = {
  "Popular":     "bg-amber-400/90 text-white",
  "Chef's Pick": "bg-[#c4a47c] text-white",
  "New":         "bg-emerald-400/90 text-white",
};

const CARD_W   = 240;
const CARD_GAP = 18;
const STEP     = CARD_W + CARD_GAP;

export default function FoodPage() {
  const { lang, toggleLang } = useLanguage();

  const [step, setStep]                     = useState<1 | 2>(1);
  const [selectedMenuType, setSelectedMenuType] = useState("Breakfast");
  const [viewMode, setViewMode]             = useState<ViewMode>("carousel");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex]       = useState(0);
  const [wrapWidth, setWrapWidth]           = useState(375);
  const [searchQuery, setSearchQuery]       = useState("");

  const wrapRef   = useRef<HTMLDivElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const baseItems = foodItems.filter(i => i.menuType === selectedMenuType);
  const innerCategories = ["All", ...Array.from(new Set(baseItems.map(i => i.category)))];

  const filteredItems = baseItems
    .filter(i => activeCategory === "All" || i.category === activeCategory)
    .filter(i =>
      searchQuery === "" ||
      i.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.titleEl.includes(searchQuery)
    );

  const N         = filteredItems.length;
  const loopItems = N > 0 ? [...filteredItems, ...filteredItems, ...filteredItems] : [];
  const loopIndex = N + activeIndex;

  const currentItem = filteredItems[activeIndex] ?? filteredItems[0];
  const selectedMenu = foodMenus.find(m => m.id === selectedMenuType)!;

  // ── measure wrap ──────────────────────────────────────────────────────────
  useEffect(() => {
    const measure = () => { if (wrapRef.current) setWrapWidth(wrapRef.current.offsetWidth); };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [step]);

  const centerOffset = (wrapWidth - CARD_W) / 2;

  // ── translate ─────────────────────────────────────────────────────────────
  const applyTranslate = useCallback((idx: number, animated: boolean) => {
    if (!trackRef.current) return;
    const x = centerOffset - idx * STEP;
    trackRef.current.style.transition = animated
      ? "transform 0.45s cubic-bezier(0.16,1,0.3,1)"
      : "none";
    trackRef.current.style.transform = `translateX(${x}px)`;
  }, [centerOffset]);

  useEffect(() => {
    if (viewMode === "carousel" && step === 2 && N > 0) applyTranslate(loopIndex, true);
  }, [loopIndex, viewMode, step, N, applyTranslate]);

  const handleTransitionEnd = useCallback(() => {
    if (loopIndex < N)          applyTranslate(loopIndex + N, false);
    else if (loopIndex >= 2*N)  applyTranslate(loopIndex - N, false);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (trackRef.current)
        trackRef.current.style.transition = "transform 0.45s cubic-bezier(0.16,1,0.3,1)";
    }));
  }, [loopIndex, N, applyTranslate]);

  // ── auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (viewMode !== "carousel" || step !== 2 || N <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % N);
    }, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [viewMode, N, activeCategory, step]);

  // ── nav helpers ───────────────────────────────────────────────────────────
  const handleMenuTypeSelect = (type: string) => {
    setSelectedMenuType(type);
    setActiveCategory("All");
    setActiveIndex(0);
    setSearchQuery("");
    setStep(2);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveIndex(0);
  };

  // ── touch swipe ───────────────────────────────────────────────────────────
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) setActiveIndex(prev => (prev + (dx < 0 ? 1 : -1) + N) % N);
  };

  return (
    <CircularReveal bgColor="bg-[#f9f8f4] dark:bg-[#0f0e0c]">
      <div className="min-h-screen w-full flex flex-col font-sans pb-28 overflow-x-hidden select-none bg-[#f9f8f4] dark:bg-[#0f0e0c] transition-colors duration-300">
        <AnimatePresence mode="wait">

          {/* ══════════════════════════════════════════════════════════════════
              STEP 1 — MENU SELECTION
          ══════════════════════════════════════════════════════════════════ */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
              className="w-full flex flex-col pt-10"
            >
              {/* Header */}
              <header className="px-6 mb-2 flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-black tracking-[0.28em] text-[#c4a47c] uppercase mb-0.5">The Food</p>
                  <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
                    Lab. <span className="text-[#c4a47c]">Menu.</span>
                  </h1>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-1.5">
                    {lang === "el" ? "Διαλέξτε κατηγορία" : "Choose a category to explore"}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Link href="/">
                    <button className="w-9 h-9 rounded-full bg-white dark:bg-white/10 border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 shadow-sm active:scale-90 transition-transform">
                      <Home size={16} strokeWidth={2} />
                    </button>
                  </Link>
                  <button
                    onClick={toggleLang}
                    className="w-9 h-9 rounded-full bg-white dark:bg-white/10 border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-sm active:scale-90 transition-transform"
                  >
                    <Languages size={15} className="text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </header>

              {/* Thin divider */}
              <div className="mx-6 mt-5 mb-5 h-px bg-gradient-to-r from-[#c4a47c]/30 via-gray-200/50 dark:via-white/8 to-transparent" />

              {/* Menu cards */}
              <div className="px-6 flex flex-col gap-3.5 pb-4">
                {foodMenus.map((menu, i) => (
                  <motion.button
                    key={menu.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: [0.16,1,0.3,1] }}
                    onClick={() => handleMenuTypeSelect(menu.id)}
                    className="relative w-full h-[110px] rounded-[22px] overflow-hidden group active:scale-[0.97] transition-transform text-left"
                  >
                    {/* Background image */}
                    <img
                      src={menu.image}
                      alt={menu.titleEn}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-between px-5 z-10">
                      <div className="flex items-center gap-3">
                        {/* Emoji bubble */}
                        <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xl shrink-0">
                          {menu.emoji}
                        </div>
                        <div>
                          <h2 className="text-[17px] font-black text-white tracking-tight leading-tight">
                            {lang === "el" ? menu.titleEl : menu.titleEn}
                          </h2>
                          <p className="text-[10px] text-white/55 font-medium mt-0.5 tracking-wide">
                            {menu.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-white/50 font-bold">
                          {foodItems.filter(f => f.menuType === menu.id).length} items
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                          <ChevronRight size={15} strokeWidth={2.5} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              STEP 2 — ITEMS DISPLAY
          ══════════════════════════════════════════════════════════════════ */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col"
            >

              {/* ── HERO ──────────────────────────────────────────────────── */}
              <div className="relative w-full h-[300px] overflow-hidden">

                {/* Hero background — morphs with active item */}
                <AnimatePresence mode="popLayout">
                  {currentItem && (
                    <motion.div
                      key={currentItem.id}
                      initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1,    filter: "blur(0px)" }}
                      exit={  { opacity: 0, scale: 1.02,  filter: "blur(6px)"  }}
                      transition={{ duration: 0.38, ease: [0.16,1,0.3,1] }}
                      className="absolute inset-0"
                    >
                      <img
                        src={currentItem.image}
                        alt={currentItem.titleEn}
                        className="w-full h-full object-cover"
                        style={{
                          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
                          maskImage:       "linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Top gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none z-10" />

                {/* ── TOP BAR ─────────────────────────────────────────────── */}
                <div className="absolute top-8 left-5 right-5 z-20 flex items-center justify-between">
                  <button
                    onClick={() => { setStep(1); setSearchQuery(""); }}
                    className="w-10 h-10 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/25 flex items-center justify-center text-white active:scale-90 transition-transform"
                  >
                    <ArrowLeft size={18} strokeWidth={2.5} />
                  </button>

                  {/* Menu type pill */}
                  <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full">
                    <span className="text-sm">{selectedMenu?.emoji}</span>
                    <span className="text-[11px] font-black tracking-widest text-white uppercase">
                      {lang === "el" ? selectedMenu?.titleEl : selectedMenu?.titleEn}
                    </span>
                  </div>

                  <button
                    onClick={toggleLang}
                    className="w-10 h-10 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/25 flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <Languages size={16} strokeWidth={2.2} className="text-white" />
                  </button>
                </div>

                {/* ── HERO BOTTOM INFO ─────────────────────────────────────── */}
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <AnimatePresence mode="wait">
                    {currentItem && (
                      <motion.div
                        key={currentItem.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                      >
                        {/* Badge */}
                        {currentItem.badge && (
                          <span className={`inline-flex items-center text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full mb-2 ${BADGE_COLORS[currentItem.badge]}`}>
                            {currentItem.badge}
                          </span>
                        )}
                        <h2 className="text-[22px] font-black text-white tracking-tight leading-tight line-clamp-1">
                          {lang === "el" ? currentItem.titleEl : currentItem.titleEn}
                        </h2>

                        {/* Meta row */}
                        <div className="flex items-center gap-3 mt-1.5">
                          <div className="flex items-center gap-1">
                            <Star size={11} className="text-[#c4a47c]" fill="#c4a47c" />
                            <span className="text-white/90 text-[11px] font-bold">{currentItem.rating}</span>
                          </div>
                          {currentItem.prepMins !== undefined && currentItem.prepMins > 0 && (
                            <div className="flex items-center gap-1">
                              <Clock size={10} className="text-white/50" />
                              <span className="text-white/60 text-[10px] font-medium">{currentItem.prepMins} min</span>
                            </div>
                          )}
                          {currentItem.calories !== undefined && currentItem.calories > 0 && (
                            <div className="flex items-center gap-1">
                              <Flame size={10} className="text-white/50" />
                              <span className="text-white/60 text-[10px] font-medium">{currentItem.calories} kcal</span>
                            </div>
                          )}
                          {currentItem.isVeg && (
                            <div className="flex items-center gap-1">
                              <Leaf size={10} className="text-emerald-400" />
                              <span className="text-emerald-300/80 text-[10px] font-medium">Veg</span>
                            </div>
                          )}
                          <span className="ml-auto text-[15px] font-black text-[#c4a47c]">€{currentItem.price}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* ── SEARCH BAR ─────────────────────────────────────────────── */}
              <div className="px-5 mt-4">
                <div className="bg-white dark:bg-white/8 rounded-full p-2 pl-5 flex items-center border border-gray-100 dark:border-white/10 focus-within:border-[#c4a47c]/50 transition-colors shadow-sm">
                  <Search size={17} className="text-gray-400 dark:text-gray-600 shrink-0" strokeWidth={2.5} />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value); setActiveIndex(0); }}
                    placeholder={lang === "el" ? "Αναζήτηση..." : `Search ${selectedMenu?.titleEn ?? ""}...`}
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm font-medium px-3"
                  />
                  {searchQuery !== "" && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mr-2 w-5 h-5 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center"
                    >
                      <span className="text-gray-400 dark:text-gray-500 text-[10px] font-black">✕</span>
                    </button>
                  )}
                </div>
              </div>

              {/* ── CATEGORIES + VIEW TOGGLE ───────────────────────────────── */}
              <div className="mt-4 px-5 flex items-center gap-3">
                <div className="flex gap-2 overflow-x-auto flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {innerCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all shrink-0 ${
                        activeCategory === cat
                          ? "bg-[#c4a47c] text-white shadow-sm"
                          : "bg-white dark:bg-white/10 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/10"
                      }`}
                    >
                      {cat === "All" ? (lang === "el" ? "Όλα" : "All") : cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center bg-white dark:bg-white/10 border border-gray-100 dark:border-white/10 rounded-full p-1 gap-0.5 shrink-0 shadow-sm">
                  {([
                    { mode: "carousel" as const, Icon: GalleryHorizontal },
                    { mode: "list"    as const, Icon: List },
                  ]).map(({ mode, Icon }) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        viewMode === mode
                          ? "bg-[#c4a47c] text-white"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      <Icon size={14} strokeWidth={2.5} />
                    </button>
                  ))}
                </div>
              </div>

              {/* ── ITEMS DISPLAY ──────────────────────────────────────────── */}
              <AnimatePresence mode="wait">

                {N === 0 && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 gap-2"
                  >
                    <span className="text-3xl">🍽️</span>
                    <p className="text-gray-400 dark:text-gray-600 text-sm font-medium">No dishes found</p>
                  </motion.div>
                )}

                {/* CAROUSEL */}
                {N > 0 && viewMode === "carousel" && (
                  <motion.div
                    key={`carousel-${activeCategory}-${selectedMenuType}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="w-full mt-2"
                  >
                    {/* Dot indicators */}
                    <div className="flex justify-center gap-1.5 mb-3">
                      {filteredItems.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveIndex(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === activeIndex ? "w-5 bg-[#c4a47c]" : "w-1.5 bg-gray-200 dark:bg-white/15"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Track */}
                    <div
                      ref={wrapRef}
                      className="w-full overflow-hidden pt-5 pb-10"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    >
                      <div
                        ref={trackRef}
                        className="flex"
                        onTransitionEnd={handleTransitionEnd}
                        style={{
                          transform: `translateX(${centerOffset - loopIndex * STEP}px)`,
                          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
                          willChange: "transform",
                        }}
                      >
                        {loopItems.map((item, index) => {
                          const isActive = index === loopIndex;
                          return (
                            <div
                              key={`${selectedMenuType}-${item.id}-${index}`}
                              onClick={() => {
                                const offset = index - loopIndex;
                                if (offset !== 0) setActiveIndex(prev => (prev + offset + N) % N);
                              }}
                              style={{
                                width: CARD_W,
                                flexShrink: 0,
                                margin: `0 ${CARD_GAP / 2}px`,
                                transform: isActive ? "scale(1)" : "scale(0.80)",
                                opacity:   isActive ? 1 : 0.32,
                                transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.45s cubic-bezier(0.16,1,0.3,1)",
                                cursor: isActive ? "default" : "pointer",
                              }}
                              className="relative h-[250px] rounded-[28px] overflow-hidden flex flex-col justify-end shadow-xl"
                            >
                              {/* Full-bleed image on card */}
                              <img
                                src={item.image}
                                alt={item.titleEn}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                              {/* Dark gradient over image */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                              {/* Badge */}
                              {item.badge && (
                                <div className="absolute top-3 left-3 z-10">
                                  <span className={`text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full ${BADGE_COLORS[item.badge]}`}>
                                    {item.badge}
                                  </span>
                                </div>
                              )}

                              {/* Veg dot */}
                              {item.isVeg && (
                                <div className="absolute top-3 right-3 z-10 w-5 h-5 rounded-full bg-emerald-400/90 flex items-center justify-center">
                                  <Leaf size={10} strokeWidth={2.5} className="text-white" />
                                </div>
                              )}

                              {/* Card body */}
                              <div className="relative z-10 p-4 flex flex-col gap-1">
                                <h3 className="text-[15px] font-black text-white tracking-tight line-clamp-1">
                                  {lang === "el" ? item.titleEl : item.titleEn}
                                </h3>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-0.5">
                                    <Star size={10} className="text-[#c4a47c]" fill="#c4a47c" />
                                    <span className="text-white/85 text-[10px] font-semibold">{item.rating}</span>
                                  </div>
                                  {item.prepMins !== undefined && item.prepMins > 0 && (
                                    <div className="flex items-center gap-0.5">
                                      <Clock size={9} className="text-white/40" />
                                      <span className="text-white/45 text-[9px]">{item.prepMins}m</span>
                                    </div>
                                  )}
                                  <span className="ml-auto text-[14px] font-black text-[#c4a47c]">€{item.price}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* LIST */}
                {N > 0 && viewMode === "list" && (
                  <motion.div
                    key={`list-${activeCategory}-${selectedMenuType}`}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 px-5 flex flex-col gap-3 pb-12"
                  >
                    {filteredItems.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.22 }}
                        onClick={() => setActiveIndex(i)}
                        className={`flex items-center gap-3.5 p-3 rounded-[20px] border transition-all cursor-pointer ${
                          i === activeIndex
                            ? "bg-white dark:bg-white/10 border-[#c4a47c]/40 shadow-sm"
                            : "bg-white dark:bg-white/6 border-gray-100 dark:border-white/8"
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="w-[60px] h-[60px] shrink-0 rounded-[14px] overflow-hidden relative">
                          <img src={item.image} alt={item.titleEn} className="w-full h-full object-cover" />
                          {item.isVeg && (
                            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center">
                              <Leaf size={8} strokeWidth={2.5} className="text-white" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h3 className="text-[13px] font-bold text-gray-900 dark:text-white line-clamp-1 leading-tight">
                              {lang === "el" ? item.titleEl : item.titleEn}
                            </h3>
                            {item.badge && (
                              <span className={`shrink-0 text-[7px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded-full ${BADGE_COLORS[item.badge]}`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-0.5">
                              <Star size={9} className="text-[#c4a47c]" fill="#c4a47c" />
                              <span className="text-[10px] text-gray-500 dark:text-gray-500 font-medium">{item.rating}</span>
                            </div>
                            {item.prepMins !== undefined && item.prepMins > 0 && (
                              <>
                                <span className="text-gray-200 dark:text-gray-700">·</span>
                                <div className="flex items-center gap-0.5">
                                  <Clock size={9} className="text-gray-400 dark:text-gray-600" />
                                  <span className="text-[10px] text-gray-400 dark:text-gray-600">{item.prepMins} min</span>
                                </div>
                              </>
                            )}
                            {item.calories !== undefined && item.calories > 0 && (
                              <>
                                <span className="text-gray-200 dark:text-gray-700">·</span>
                                <span className="text-[10px] text-gray-400 dark:text-gray-600">{item.calories} kcal</span>
                              </>
                            )}
                          </div>
                        </div>

                        <span className="text-[14px] font-black text-[#c4a47c] shrink-0">€{item.price}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ── FOOTER ────────────────────────────────────────────────────────── */}
        <footer className="fixed bottom-0 left-0 w-full z-50 bg-[#f9f8f4]/88 dark:bg-[#0f0e0c]/92 backdrop-blur-xl border-t border-gray-200/50 dark:border-white/8 py-4 px-6 flex items-center justify-between transition-colors duration-300">
          <div className="flex flex-col">
            <span className="text-[10px] font-black tracking-[0.22em] text-gray-900 dark:text-white uppercase leading-none">
              THE FOOD LAB
            </span>
            <span className="text-[9px] font-medium text-gray-400 dark:text-gray-600 tracking-wider mt-0.5">
              PREMIUM DIGITAL MENU
            </span>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-bold tracking-widest text-gray-400 dark:text-gray-600 uppercase">
              © {new Date().getFullYear()} ALL RIGHTS RESERVED
            </p>
          </div>
        </footer>
      </div>
    </CircularReveal>
  );
}