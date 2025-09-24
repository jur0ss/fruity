import './App.css'
import { useEffect, useState } from "react";

type Fruit = {
    name: string;
    genus: string;
    family: string;
    order: string;
    nutritions: {
        carbohydrates: number;
        fat: number;
        protein: number;
        calories: number;
        sugar: number;
    };
};

const familyMap: Record<string, string> = {
    "Rosaceae": "Różowate",
    "Rutaceae": "Rutowate",
    "Actinidiaceae": "Aktinidiowate",
    "Musaceae": "Bananowate",
    "Cucurbitaceae": "Dyniowate / Ogórkowate",
    "Anacardiaceae": "Nanerczowate",
    "Moraceae": "Morwowate",
    "Solanaceae": "Psiankowate",
    "Ericaceae": "Wrzosowate",
    "Myrtaceae": "Mirtowate",
    "Passifloraceae": "Męczennicowate",
    "Apocynaceae": "Toinowate",
    "Sapindaceae": "Sapindowate",
    "Meliaceae": "Meliowate",
    "Lamiaceae": "Jasnotowate",
    "Cannabaceae": "Konopiowate",
    "Urticaceae": "Pokrzywowate",
    "Rhamnaceae": "Rhamnaceae",
    "Ulmaceae": "Wiązowate",
    "Ebenaceae": "Hebanowate",
    "Malvaceae": "Ślazowate",
    "Bromeliaceae": "Bromeliowate",
    "Grossulariaceae": "Agrestowate / Porzeczkowate",
    "Cactaceae": "Kaktusowate",
    "Lythraceae": "Punatowate",
    "Vitaceae": "Winoroślowate",
    "Lauraceae": "Wawrzynowate",
    "Betulaceae": "Brzozowate",
    "Clusiaceae": "Garcinowate / Kluzjowate",
    "Caricaceae": "Papajowate",
    "Annonaceae": "Flaszowcowate",
    "Salicaceae": "Wierzbowate"
};

function App() {
    const [fruits, setFruits] = useState<Fruit[]>([]);
    const [filter, setFilter] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    const fetchData = () => {
        fetch("/api/api/fruit/all")
            .then(res => res.json())
            .then((jsonData: Fruit[]) => setFruits(jsonData))
            .catch(error => console.log("Błąd:", error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const families = Array.from(new Set(fruits.map(f => f.family)));

    const filteredFruits = filter ?
        fruits.filter(f => f.family === filter) : fruits
        .filter(f => f.name.toLowerCase().includes(search.toLowerCase()));


    return (
        <>
            <h1>Owoce z Fruityvice API</h1>

            <div>
                <input type="text"
                       placeholder="Szukaj po nazwie: "
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}></input>
            </div>

            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="">Wszystkie</option>
                {families.map(fam => (
                    <option key={fam} value={fam}>{familyMap[fam]} || {fam}</option>
                ))}

            </select>

            <div style={{ display: "grid", gap: "12px", marginTop: "16px" }}>
                {filteredFruits.map(fruit => (
                    <div key={fruit.name} style={{ border: "1px solid #ccc", padding: "8px" }}>
                        <h2>{fruit.name}</h2>
                        <h3>Wartości odżywcze (w 100g)</h3>
                        <p>Kalorie: {fruit.nutritions.calories}</p>
                        <p>Cukier: {fruit.nutritions.sugar}</p>
                        <p>Białko: {fruit.nutritions.protein}</p>
                        <p>Tłuszcz: {fruit.nutritions.fat}</p>
                        <p>Węglowodany: {fruit.nutritions.carbohydrates}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;