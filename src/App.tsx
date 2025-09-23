import './App.css'
import {useEffect, useState} from "react";

const BASE_URL = "https://www.fruityvice.com/api/fruit";

type Fruit = {
    name: string;
    carbohydrates: number;
    fat: number;
    protein: number;
    calories: number;
    sugar: number;
}

function App() {

    const [fruits, setFruits] = useState<Fruit[]>([]);

    const fetchData = async () => {

        const getAllFruits = () => {
            fetch(`${BASE_URL}/all`)
                .then (data => data.json())
                .then (jsonData => setFruits(jsonData))
                .catch(error => console.log(error));
        }


    }

}

export default App
